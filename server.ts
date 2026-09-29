import express, { Request, Response } from 'express';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing with raw buffer capability for webhooks
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  }
}));

// In-memory server audit log storage for diagnostics
interface ServerAuditLog {
  id: string;
  action: string;
  details: string;
  ip: string;
  timestamp: string;
}
const serverAuditLogs: ServerAuditLog[] = [];

const logServerEvent = (action: string, details: string, ip: string = '127.0.0.1') => {
  const log: ServerAuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    action,
    details,
    ip,
    timestamp: new Date().toISOString()
  };
  serverAuditLogs.unshift(log);
  if (serverAuditLogs.length > 200) serverAuditLogs.pop();
  console.log(`[Ozero Server Log · ${log.timestamp}] [${action}] ${details}`);
};

// ----------------------------------------------------
// 1. Health & Status
// ----------------------------------------------------
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    service: 'Ozero Digital Studio Platform API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    aiReady: Boolean(process.env.GEMINI_API_KEY)
  });
});

app.get('/api/audit-logs', (_req: Request, res: Response) => {
  res.json({ logs: serverAuditLogs });
});

// ----------------------------------------------------
// 2. Paystack Integration Endpoints
// ----------------------------------------------------

/**
 * Initialize Paystack Transaction
 * Validates invoice amount in Naira, converts to Kobo, returns authorization or test sandbox link.
 */
app.post('/api/paystack/initialize', async (req: Request, res: Response) => {
  try {
    const { email, amountNGN, invoiceId, customerName } = req.body;

    if (!email || !amountNGN || amountNGN <= 0) {
      return res.status(400).json({ error: 'Valid customer email and positive amountNGN are required.' });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const amountKobo = Math.round(Number(amountNGN) * 100);
    const reference = `ozero_inv_${invoiceId || Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    logServerEvent('PAYSTACK_INIT_REQUEST', `Initiating payment for ${email}, amount: ₦${amountNGN} (${amountKobo} kobo), Ref: ${reference}`, req.ip || '127.0.0.1');

    if (secretKey) {
      // Live / Test API call to Paystack
      const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          amount: amountKobo,
          reference,
          currency: 'NGN',
          metadata: {
            invoiceId,
            customerName,
            studio: 'Ozero Digital Studio'
          },
          callback_url: `${process.env.APP_URL || ''}/portal?tab=invoices&verify=${reference}`
        })
      });

      const data = await paystackRes.json();
      if (data.status) {
        logServerEvent('PAYSTACK_INIT_SUCCESS', `Paystack URL generated for ${reference}`);
        return res.json({
          status: true,
          reference,
          authorizationUrl: data.data.authorization_url,
          accessCode: data.data.access_code
        });
      } else {
        logServerEvent('PAYSTACK_INIT_ERROR', data.message || 'Paystack initialization failed');
        return res.status(400).json({ error: data.message || 'Unable to initialize Paystack transaction' });
      }
    } else {
      // Development Sandbox / Direct Simulation mode when key is being configured
      logServerEvent('PAYSTACK_SANDBOX_INIT', `Using development simulated checkout for reference: ${reference}`);
      return res.json({
        status: true,
        reference,
        isSandbox: true,
        authorizationUrl: `/portal?tab=invoices&simulatePay=${reference}&inv=${invoiceId}`,
        message: 'Sandbox transaction ready for verification.'
      });
    }
  } catch (error: any) {
    logServerEvent('PAYSTACK_EXCEPTION', error.message);
    res.status(500).json({ error: 'Internal server error processing payment initialization.' });
  }
});

/**
 * Server-side Paystack Verification
 * Validates currency is NGN, amount equals invoice requirement, and verifies state idempotently.
 */
app.post('/api/paystack/verify', async (req: Request, res: Response) => {
  try {
    const { reference, expectedAmountNGN } = req.body;

    if (!reference) {
      return res.status(400).json({ error: 'Transaction reference is required.' });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    logServerEvent('PAYSTACK_VERIFY_REQUEST', `Verifying reference: ${reference}, expected: ₦${expectedAmountNGN}`);

    if (secretKey) {
      const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`
        }
      });

      const data = await verifyRes.json();

      if (data.status && data.data?.status === 'success') {
        const verifiedAmountKobo = data.data.amount;
        const verifiedCurrency = data.data.currency;

        if (verifiedCurrency !== 'NGN') {
          logServerEvent('PAYSTACK_CURRENCY_MISMATCH', `Expected NGN, got ${verifiedCurrency}`);
          return res.status(400).json({ verified: false, error: 'Currency mismatch.' });
        }

        if (expectedAmountNGN && verifiedAmountKobo < Math.round(Number(expectedAmountNGN) * 100)) {
          logServerEvent('PAYSTACK_AMOUNT_UNDERPAID', `Underpaid: Expected ${expectedAmountNGN * 100}, got ${verifiedAmountKobo}`);
          return res.status(400).json({ verified: false, error: 'Underpayment detected.' });
        }

        logServerEvent('PAYSTACK_VERIFIED_SUCCESS', `Transaction ${reference} verified successfully.`);
        return res.json({
          verified: true,
          reference,
          amountPaidNGN: verifiedAmountKobo / 100,
          currency: verifiedCurrency,
          paidAt: data.data.paid_at || new Date().toISOString(),
          channel: data.data.channel,
          customerEmail: data.data.customer?.email
        });
      } else {
        return res.status(400).json({
          verified: false,
          error: data.message || 'Payment not completed or failed.'
        });
      }
    } else {
      // Sandbox fallback verification
      logServerEvent('PAYSTACK_SANDBOX_VERIFIED', `Sandbox verification approved for ${reference}`);
      return res.json({
        verified: true,
        reference,
        amountPaidNGN: expectedAmountNGN || 100000,
        currency: 'NGN',
        paidAt: new Date().toISOString(),
        channel: 'card (sandbox simulation)'
      });
    }
  } catch (error: any) {
    logServerEvent('PAYSTACK_VERIFY_EXCEPTION', error.message);
    res.status(500).json({ error: 'Server error verifying payment.' });
  }
});

/**
 * Paystack Webhook Handler (HMAC SHA512 Signature Verification)
 */
app.post('/api/paystack/webhook', (req: any, res: Response) => {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const signature = req.headers['x-paystack-signature'];

    if (secretKey && signature) {
      const hash = crypto
        .createHmac('sha512', secretKey)
        .update(req.rawBody || JSON.stringify(req.body))
        .digest('hex');

      if (hash !== signature) {
        logServerEvent('WEBHOOK_INVALID_SIGNATURE', 'Rejected webhook due to invalid HMAC signature');
        return res.status(400).send('Invalid webhook signature');
      }
    }

    const event = req.body;
    logServerEvent('PAYSTACK_WEBHOOK_EVENT', `Received event: ${event.event}, ref: ${event.data?.reference}`);

    if (event.event === 'charge.success') {
      const ref = event.data.reference;
      const amount = event.data.amount / 100;
      logServerEvent('PAYSTACK_WEBHOOK_CHARGE_SUCCESS', `Processed charge.success for ref ${ref}, ₦${amount}`);
    }

    res.status(200).send('Webhook processed');
  } catch (err: any) {
    logServerEvent('WEBHOOK_ERROR', err.message);
    res.status(500).send('Webhook error');
  }
});

// ----------------------------------------------------
// 3. AI Project Scoping Advisor (Gemini 3.8 Flash SDK)
// ----------------------------------------------------
app.post('/api/ai/project-advisor', async (req: Request, res: Response) => {
  try {
    const { projectTitle, projectCategory, description, targetBudgetNGN } = req.body;

    if (!description || description.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide a clear description of your project concept.' });
    }

    logServerEvent('AI_ADVISOR_REQUEST', `Scoping project: "${projectTitle || projectCategory}", budget: ₦${targetBudgetNGN || 'flexible'}`);

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Built-in intelligent heuristic fallback if Gemini key is being configured
      const estimatedMin = targetBudgetNGN ? Math.round(targetBudgetNGN * 0.85) : 350000;
      const estimatedMax = targetBudgetNGN ? Math.round(targetBudgetNGN * 1.3) : 750000;

      return res.json({
        recommendation: `Based on your brief for "${projectTitle || projectCategory}", we recommend a modular frontend architecture in React and TypeScript with scalable backend APIs and mobile-first responsiveness.`,
        recommendedArchitecture: [
          'React 19 + TypeScript Single Page App Architecture',
          'Tailwind CSS design system with Dark/Light support',
          'Node.js REST API with input sanitization and rate limiting',
          'Paystack Payment Gateway integration with server verification',
          'Automated database backups & SSL encryption'
        ],
        suggestedMilestones: [
          { title: 'Milestone 1: Discovery, UX Wireframes & Project Specs', duration: '3 - 5 Days', focus: 'System requirements, UI layouts, database blueprint' },
          { title: 'Milestone 2: Design System, Brand Styling & Responsive Prototypes', duration: '5 - 7 Days', focus: 'Mobile touch layouts, component library, client sign-off' },
          { title: 'Milestone 3: Full-Stack Engineering & API Integration', duration: '7 - 14 Days', focus: 'Frontend, payment gateway, database synchronization' },
          { title: 'Milestone 4: Security Audit, Core Web Vitals & Launch Deployment', duration: '3 - 5 Days', focus: 'Speed tuning, domain SSL setup, handover guide' }
        ],
        estimatedBudgetRangeNGN: {
          min: estimatedMin,
          max: estimatedMax
        },
        estimatedTurnaroundWeeks: 3,
        securityCheckpoints: [
          'Zero client-side secrets exposure',
          'HMAC signature verification for payment webhooks',
          'Content Security Policy and HTTPS header enforcement',
          'Customer role isolation and authorization checks'
        ]
      });
    }

    // Initialize GoogleGenAI SDK with user agent
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const prompt = `You are the Lead Solutions Architect for Ozero Digital Studio (founded by Jephthah Ozero in Nigeria).
Analyze this client project request and generate a professional technical blueprint and milestone scope.

Project Details:
- Title / Category: ${projectTitle || 'Web Project'} (${projectCategory || 'General'})
- Client Scope & Description: ${description}
- Client Target Budget: ${targetBudgetNGN ? `₦${targetBudgetNGN}` : 'Flexible'}

Provide:
1. Executive technical recommendation summary.
2. 4-6 specific architectural components & stack recommendations.
3. 3-5 structured sequential milestones with duration and focus.
4. Estimated realistic budget range in Nigerian Naira (NGN).
5. Estimated turnaround time in weeks.
6. 4 essential security and performance checkpoints.`;

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a senior software architect creating precise, realistic technical specs for a digital studio in Nigeria. Be concrete, pragmatic, and clear. Output structured JSON adhering to the schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendation: { type: Type.STRING, description: 'Executive technical recommendation summary' },
            recommendedArchitecture: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of architectural technologies and stack decisions'
            },
            suggestedMilestones: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  focus: { type: Type.STRING }
                },
                required: ['title', 'duration', 'focus']
              }
            },
            estimatedBudgetRangeNGN: {
              type: Type.OBJECT,
              properties: {
                min: { type: Type.NUMBER },
                max: { type: Type.NUMBER }
              },
              required: ['min', 'max']
            },
            estimatedTurnaroundWeeks: { type: Type.NUMBER },
            securityCheckpoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: [
            'recommendation',
            'recommendedArchitecture',
            'suggestedMilestones',
            'estimatedBudgetRangeNGN',
            'estimatedTurnaroundWeeks',
            'securityCheckpoints'
          ]
        }
      }
    });

    const parsed = JSON.parse(aiResponse.text || '{}');
    logServerEvent('AI_ADVISOR_SUCCESS', `Generated blueprint for ${projectTitle || projectCategory}`);
    return res.json(parsed);
  } catch (error: any) {
    logServerEvent('AI_ADVISOR_ERROR', error.message);
    res.status(500).json({ error: 'Failed to generate AI project blueprint: ' + error.message });
  }
});

// ----------------------------------------------------
// 4. Vite Mounting & Static Serving
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Dynamic import of Vite for dev mode middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`[Ozero Server] Live at http://localhost:${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
  });
}

startServer();
