import {
  ServiceItem,
  ProjectItem,
  PricingPackage,
  StudioConfig,
  ClientProject,
  Invoice,
  BlogPost,
  User,
  ProjectMessage,
  SupportTicket,
  ReferralCode
} from '../types';

export const INITIAL_STUDIO_CONFIG: StudioConfig = {
  ownerName: 'Jephthah Ozero',
  ownerTitle: 'Web Developer & App Creator',
  ownerEmail: 'ozerojephthah0@gmail.com',
  whatsappNumber: '+2349019016049',
  whatsappDisplay: '+234 901 901 6049',
  location: 'Lagos, Nigeria · Available Worldwide',
  currency: 'NGN',
  announcementNotice: 'Now booking client projects for this quarter. Typical response time under 24 hours.',
  githubProfile: 'https://github.com',
  linkedinProfile: 'https://linkedin.com',
  bioSummary:
    'Jephthah Ozero is an energetic web developer and creator focused on turning complex ideas into high-performing websites and web applications. Specializing in modern frontend architecture, e-commerce storefronts, interactive tools, and responsive user experiences.',
  paystackPublicKey: 'pk_test_ozero_digital_studio_demo_key'
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-business-web',
    category: 'business_website',
    title: 'Business Website Development',
    tagline: 'Establish a credible, high-converting digital presence',
    description:
      'Custom corporate and brand websites tailored to position your business professionally, attract high-intent leads, and present your services clearly on all screen sizes.',
    deliverables: [
      'Custom responsive UI/UX design',
      'High-speed performance optimization',
      'Lead capture & contact forms with email routing',
      'Search engine optimization (SEO) fundamentals',
      'Content management readiness',
      'Cross-browser & mobile testing'
    ],
    startingPriceNGN: 250000,
    estimatedDelivery: '7 - 14 Days',
    idealFor: 'Companies, consultants, service agencies, and growing startups',
    iconName: 'Building2',
    isActive: true
  },
  {
    id: 'srv-ecommerce',
    category: 'ecommerce',
    title: 'E-commerce Website Development',
    tagline: 'Modern, secure storefronts engineered to sell',
    description:
      'Turn shoppers into paying customers with fast-loading product catalogs, seamless shopping cart flows, reliable payment integrations, and intuitive order management.',
    deliverables: [
      'Product catalog & category filtering',
      'Cart, wishlist & fast checkout experience',
      'Secure payment gateway integration (Paystack / Flutterwave / Stripe)',
      'Customer accounts & order tracking UI',
      'Inventory & product management backend',
      'Mobile-optimized shopping flow'
    ],
    startingPriceNGN: 450000,
    estimatedDelivery: '14 - 21 Days',
    idealFor: 'Merchants, digital product creators, and retail brands',
    iconName: 'ShoppingBag',
    isActive: true
  },
  {
    id: 'srv-webapp',
    category: 'web_application',
    title: 'Web Application Development',
    tagline: 'Custom dashboards, SaaS portals, and interactive tools',
    description:
      'End-to-end frontend and full-stack application development. Built with React, TypeScript, modern databases, and clean scalable architecture tailored to your unique workflow.',
    deliverables: [
      'Robust single-page application (SPA) architecture',
      'User authentication & role-based access control',
      'Database modeling & realtime synchronization',
      'Interactive data visualizers & dashboards',
      'REST / API integrations',
      'Defensive security & input validation'
    ],
    startingPriceNGN: 600000,
    estimatedDelivery: '21 - 35 Days',
    idealFor: 'SaaS founders, internal business tooling, and interactive services',
    iconName: 'Code2',
    isActive: true
  },
  {
    id: 'srv-mobile-design',
    category: 'redesign_mobile',
    title: 'Mobile-Friendly Website Design',
    tagline: 'Flawless touch experiences optimized for mobile smartphones',
    description:
      'Design and engineer fluid, mobile-first responsive interfaces that adapt perfectly to iOS, Android, tablets, and varied viewport widths without broken text or side-scrolling.',
    deliverables: [
      'Mobile thumb-friendly navigation and drawer menus',
      'Responsive touch targets (min 44px) and fluid typography',
      'Optimized lightweight images and vector SVG assets',
      'Cross-device testing on low and high bandwidth networks',
      'PWA offline readiness options'
    ],
    startingPriceNGN: 160000,
    estimatedDelivery: '4 - 7 Days',
    idealFor: 'Websites needing top-tier mobile retention and Google mobile indexing rank',
    iconName: 'Smartphone',
    isActive: true
  },
  {
    id: 'srv-landing',
    category: 'landing_portfolio',
    title: 'Portfolio & Landing-Page Creation',
    tagline: 'High-impact single-page experiences designed to impress and convert',
    description:
      'Distinguished landing pages for product launches, creative portfolios for specialists, and targeted marketing pages with compelling calls to action.',
    deliverables: [
      'High-converting headline & layout structuring',
      'Custom animations & smooth micro-interactions',
      'Interactive showcase / portfolio gallery',
      'Direct WhatsApp & calendar booking integration',
      'Fast 1-second load times on mobile networks'
    ],
    startingPriceNGN: 140000,
    estimatedDelivery: '4 - 7 Days',
    idealFor: 'Creators, freelancers, speakers, and product launches',
    iconName: 'Sparkles',
    isActive: true
  },
  {
    id: 'srv-redesign-bugfix',
    category: 'bugfix_maintenance',
    title: 'Website Redesign & Bug Fixing',
    tagline: 'Modernize outdated designs and fix broken layout bugs',
    description:
      'Transform slow, clunky websites into sleek, modern experiences while repairing broken JavaScript functions, console errors, form bugs, and styling glitches.',
    deliverables: [
      'Visual aesthetic overhaul with modern typography & color system',
      'Diagnostic code audit & console bug extermination',
      'Form & database connectivity troubleshooting',
      'Core Web Vitals & page speed acceleration',
      'Cross-browser layout repairs'
    ],
    startingPriceNGN: 180000,
    estimatedDelivery: '5 - 10 Days',
    idealFor: 'Businesses with existing websites losing customers to bugs or old styling',
    iconName: 'Wrench',
    isActive: true
  },
  {
    id: 'srv-maintenance',
    category: 'bugfix_maintenance',
    title: 'Website Maintenance & Retainers',
    tagline: 'Reliable uptime, security updates, and regular content improvements',
    description:
      'Proactive ongoing technical maintenance to ensure your digital properties remain secure, fast, backed up, and updated with your latest business announcements.',
    deliverables: [
      'Monthly dependency updates & security patches',
      'Scheduled automated cloud backups & recovery tests',
      'Uptime monitoring and instant incident triage',
      'Minor content updates & banner refreshes',
      'Monthly performance health check reports'
    ],
    startingPriceNGN: 75000,
    estimatedDelivery: 'Ongoing Monthly',
    idealFor: 'Business owners who want peace of mind without hiring in-house developers',
    iconName: 'Clock',
    isActive: true
  },
  {
    id: 'srv-security',
    category: 'security_review',
    title: 'Website Security Reviews',
    tagline: 'Identify vulnerabilities and harden your digital assets',
    description:
      'Comprehensive security assessment of your web properties to prevent data breaches, XSS, insecure headers, unauthorized access, and credential leakage.',
    deliverables: [
      'Vulnerability scanning & authentication review',
      'Database security rules & authorization audit',
      'Content Security Policy & secure HTTP headers setup',
      'Input sanitization & API endpoint hardening report',
      'Actionable remediation report & implementation'
    ],
    startingPriceNGN: 150000,
    estimatedDelivery: '3 - 5 Days',
    idealFor: 'Web applications handling customer data and financial transactions',
    iconName: 'ShieldCheck',
    isActive: true
  },
  {
    id: 'srv-uiux-design',
    category: 'ui_ux_design',
    title: 'UI/UX Design & Interactive Prototyping',
    tagline: 'User-centered visual systems and clickable product wireframes',
    description:
      'Craft intuitive user interfaces, wireframes, design systems, and clickable prototypes tailored to delight users before a single line of code is written.',
    deliverables: [
      'User journey mapping & information architecture',
      'High-fidelity interactive prototype screens',
      'Custom component library & color token design system',
      'Mobile & desktop viewport responsive specs',
      'Developer handoff assets and design documentation'
    ],
    startingPriceNGN: 220000,
    estimatedDelivery: '7 - 12 Days',
    idealFor: 'Startups, product managers, and founders looking to test ideas rapidly',
    iconName: 'Layers',
    isActive: true
  },
  {
    id: 'srv-custom-solution',
    category: 'custom_solution',
    title: 'Custom Digital Solutions & Integrations',
    tagline: 'Tailor-made software solving unique business challenges',
    description:
      'Bespoke systems, webhook automations, third-party API orchestrations, custom payment workflows, and specialized database portals engineered to your precise workflow.',
    deliverables: [
      'Technical discovery & architectural specifications',
      'Custom API development & webhook event routing',
      'Third-party software synchronization (CRM, ERP, Billing)',
      'Automated batch reporting and administrative consoles',
      'Full source code ownership & deployment documentation'
    ],
    startingPriceNGN: 500000,
    estimatedDelivery: '14 - 30 Days',
    idealFor: 'Enterprises and organizations needing bespoke custom automation',
    iconName: 'Cpu',
    isActive: true
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-cartnova',
    title: 'CartNova Store',
    tagline: 'Modern e-commerce platform with seamless shopping experience',
    description:
      'A full-featured e-commerce storefront featuring instant search, dynamic product filtering, persistent cart state, responsive checkout UI, and modular inventory management.',
    story:
      'Engineered to solve slow catalog browsing in traditional web stores. CartNova implements client-side state caching, optimistic UI updates, and lightweight payment flow to maximize conversion rates on mobile devices.',
    category: 'ecommerce',
    status: 'completed',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'State Management', 'Payment APIs'],
    features: [
      'Instant search and faceted category filtering',
      'Persistent shopping bag with local storage sync',
      'Mobile-first responsive drawer checkout',
      'Dynamic currency and tax calculation',
      'Product variant selection (sizes, colors)'
    ],
    imagePath: '/images/project_cartnova_store_1790706868373.jpg',
    liveDemoUrl: 'https://demo-cartnova.example.com',
    githubUrl: 'https://github.com/ozero/cartnova-store',
    year: '2025',
    highlights: ['Sub-second catalog search', '100% Mobile responsive', 'Integrated checkout flow']
  },
  {
    id: 'proj-beatbox',
    title: 'Beatbox Pro',
    tagline: 'Interactive web-based audio rhythm machine & beat creator',
    description:
      'A responsive in-browser digital audio synthesizer and drum sequencer allowing musicians and creators to compose custom beats, loop rhythm tracks, and export audio sessions.',
    story:
      'Created to explore the Web Audio API with low-latency timing. Features 16 customizable step sequencing pads, real-time waveform visualization, customizable BPM, and preset sound banks.',
    category: 'audio_tool',
    status: 'completed',
    technologies: ['React', 'Web Audio API', 'Canvas API', 'TypeScript', 'Tailwind CSS'],
    features: [
      '16-step grid sequencer with sample triggering',
      'Live audio frequency and waveform visualizer',
      'Adjustable tempo (BPM), swing, and volume mixers',
      'Multiple drum kits (808, Electronic, Acoustic, Lofi)',
      'Pattern saving and playback loops'
    ],
    imagePath: '/images/project_beatbox_pro_1790706879034.jpg',
    liveDemoUrl: 'https://demo-beatbox.example.com',
    githubUrl: 'https://github.com/ozero/beatbox-pro',
    year: '2025',
    highlights: ['Zero-latency playback', 'Interactive Canvas visualizer', 'Custom beat saving']
  },
  {
    id: 'proj-novella',
    title: 'Novella',
    tagline: 'Elegant storytelling & novel reading web application',
    description:
      'A distraction-free reading and digital publishing platform offering customizable typography, chapter bookmarks, ambient background themes, and author publishing tools.',
    story:
      'Novella was designed with reader comfort at its core. It calculates reading times, saves reading progress per device, and adapts typography scale and line height for optimal readability.',
    category: 'content_app',
    status: 'completed',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'IndexedDB', 'Rich Text'],
    features: [
      'Distraction-free focus reading mode',
      'Custom font sizing, line spacing, and theme presets (Dark, Sepia, Paper)',
      'Chapter navigation drawer and automatic bookmarking',
      'Reading time estimator and progress percentage',
      'Offline caching for saved stories'
    ],
    imagePath: '/images/project_novella_reader_1790706889128.jpg',
    liveDemoUrl: 'https://demo-novella.example.com',
    githubUrl: 'https://github.com/ozero/novella-app',
    year: '2025',
    highlights: ['Adaptive typography', 'Reading progress memory', 'Distraction-free UI']
  },
  {
    id: 'proj-budget-tracker',
    title: 'Budget Expense Tracker',
    tagline: 'Personal finance dashboard with visual spending analytics',
    description:
      'A practical financial tracking tool enabling users to record daily income and expenses, set monthly category budgets, and visualize spending habits through interactive charts.',
    story:
      'Designed to provide clear visual insight into financial health without tedious spreadsheets. Built with intuitive transaction logging and instant summary metric cards.',
    category: 'fintech',
    status: 'completed',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js / SVG', 'LocalStorage'],
    features: [
      'Real-time balance, income, and expense calculations',
      'Categorized transaction logging with date filters',
      'Visual expense breakdown charts & budget limit bars',
      'Export financial report to CSV / JSON',
      'Support for multiple currencies with Naira (₦) baseline'
    ],
    imagePath: '/images/project_budget_tracker_1790706899873.jpg',
    liveDemoUrl: 'https://demo-budget.example.com',
    githubUrl: 'https://github.com/ozero/budget-tracker',
    year: '2024',
    highlights: ['Interactive spending charts', 'Custom budget alerts', 'Instant data export']
  },
  {
    id: 'proj-image-game',
    title: 'Ozero Image Guessing Game',
    tagline: 'Interactive visual puzzle and trivia challenge game',
    description:
      'A fun, fast-paced picture trivia game where players reveal blurred image tiles piece by piece, guessing the mystery subject before time runs out to earn high scores.',
    story:
      'Developed as an engaging casual game testing visual acuity. Includes multiple difficulty tiers, countdown timer mechanics, streak multipliers, and local high score tracking.',
    category: 'game',
    status: 'completed',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web Animations', 'Game Loop'],
    features: [
      'Tile-by-tile image unmasking mechanic',
      'Timed guess challenge with bonus multiplier',
      'Sound effects and animated victory celebrations',
      'Leaderboard score history and difficulty settings',
      'Responsive touch controls for mobile play'
    ],
    imagePath: '/images/proj_image_guess_1790716496954.jpg',
    liveDemoUrl: 'https://demo-imagegame.example.com',
    githubUrl: 'https://github.com/ozero/image-guessing-game',
    year: '2024',
    highlights: ['Touch-optimized game mechanics', 'Dynamic scoring algorithms', 'Engaging visual feedback']
  },
  {
    id: 'proj-quiz-master',
    title: 'Quiz Master',
    tagline: 'Dynamic multiplayer-ready trivia quiz platform',
    description:
      'An engaging trivia quiz application offering topic categories, customizable question pools, countdown timers, instant answer explanations, and performance scorecards.',
    story:
      'Built to provide interactive learning and entertainment. Features randomized question ordering, detailed review modes to study missed questions, and shareable results.',
    category: 'game',
    status: 'completed',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Trivia API', 'State Machine'],
    features: [
      'Diverse trivia categories (Tech, Science, General Knowledge, Pop Culture)',
      'Custom question timers with streak bonuses',
      'Post-quiz diagnostic review with explanations',
      'Detailed accuracy metrics & speed rating',
      'Shareable score card generator'
    ],
    imagePath: '/images/proj_quiz_master_1790716508119.jpg',
    liveDemoUrl: 'https://demo-quizmaster.example.com',
    githubUrl: 'https://github.com/ozero/quiz-master',
    year: '2024',
    highlights: ['Instant answer analysis', 'Custom quiz creator', 'Speed scoring metrics']
  },
  {
    id: 'proj-coderush',
    title: 'Ozero-CodeRush Game',
    tagline: 'Fast-paced coding speed challenges & syntax puzzles',
    description:
      'An upcoming developer arcade game where programmers solve syntax puzzles, fix bug snippets against the clock, and compete for top developer speed rankings.',
    story:
      'Currently in active prototype development. Aiming to make learning programming syntax and debugging reflexes addictive and fun with arcade-style combos.',
    category: 'game',
    status: 'in_development',
    technologies: ['React', 'TypeScript', 'Monaco / Code Highlighter', 'Tailwind CSS', 'WebSockets'],
    features: [
      'Syntax typo sprint and bug-hunt challenges',
      'Multi-language support (JavaScript, Python, HTML/CSS)',
      'Combo multipliers for fast accurate keystrokes',
      'Daily developer challenges & global leaderboards (Upcoming)',
      'Integrated code editor preview'
    ],
    imagePath: '/images/proj_coderush_1790716522654.jpg',
    liveDemoUrl: undefined,
    githubUrl: 'https://github.com/ozero/coderush-game',
    year: '2025',
    highlights: ['Active prototype', 'Interactive code mini-games', 'Speed-typing mechanics']
  }
];

export const INITIAL_PACKAGES: PricingPackage[] = [
  {
    id: 'pkg-starter',
    name: 'Starter',
    badge: 'Fast Launch',
    description:
      'Perfect for professionals, creators, and new businesses needing a clean, mobile-ready digital presence fast.',
    priceNGN: 180000,
    isStartingPrice: true,
    deliveryTimeline: '5 - 7 Days',
    revisions: '2 Rounds of Revisions',
    targetAudience: 'Portfolios, Single-service websites, and landing pages',
    features: [
      'Up to 3 Custom Designed Pages',
      '100% Mobile-first responsive layout',
      'Contact form with email / WhatsApp integration',
      'Fast loading speed optimization',
      'Essential SEO setup (meta tags, sitemap)',
      '14 days post-launch bug support'
    ],
    isPopular: false
  },
  {
    id: 'pkg-business',
    name: 'Business',
    badge: 'Most Popular',
    description:
      'Complete web solution tailored for growing businesses wanting to showcase offerings, generate leads, or sell products.',
    priceNGN: 450000,
    isStartingPrice: false,
    deliveryTimeline: '10 - 18 Days',
    revisions: '3 Rounds of Revisions',
    targetAudience: 'Established businesses, e-commerce stores, and service companies',
    features: [
      'Up to 7 Custom Pages or E-commerce Catalog',
      'Custom animations and distinctive brand styling',
      'Payment gateway integration (Paystack / Flutterwave)',
      'Interactive service quote & enquiry flows',
      'Comprehensive on-page SEO & Structured Schema',
      'Social media integration & Google Maps embed',
      '30 days post-launch support and guidance'
    ],
    isPopular: true
  },
  {
    id: 'pkg-custom',
    name: 'Custom Project',
    badge: 'Full Scale',
    description:
      'Tailor-made web applications, complex dashboards, multi-user platforms, and specialized digital products.',
    priceNGN: 850000,
    isStartingPrice: true,
    deliveryTimeline: '3 - 6 Weeks',
    revisions: 'Continuous Agile Milestone Reviews',
    targetAudience: 'Startups, SaaS platforms, and bespoke custom applications',
    features: [
      'Custom React & TypeScript web application',
      'Database design & secure user authentication',
      'Admin dashboard & analytics reporting',
      'Custom third-party API integrations',
      'End-to-end security review and hardening',
      'Performance audit with sub-2s initial load time',
      '60 days dedicated technical maintenance'
    ],
    isPopular: false
  }
];

export const INITIAL_FAQS = [
  {
    q: 'How does the project process work from start to finish?',
    a: 'We begin with a discovery phase where you submit your requirements via our Project Request form, AI Advisor, or WhatsApp. Once we review the scope, we provide a fixed timeline and clear quote. After project kickoff, you receive milestone preview links for design and development iterations until final deployment on your domain.'
  },
  {
    q: 'Can I request custom features that are not listed on the packages?',
    a: 'Absolutely. Every business is unique. We provide custom quotes for specialized functionality such as interactive calculators, bespoke booking systems, membership portals, and custom API connections.'
  },
  {
    q: 'What technologies do you use to build websites and web apps?',
    a: 'We build with modern, industry-standard technologies including React, TypeScript, Tailwind CSS, Next.js, Node.js, Express, and Firebase. This ensures your website loads exceptionally fast, scales effortlessly, and is easy to maintain.'
  },
  {
    q: 'How are payments and project milestones structured?',
    a: 'Typical projects operate on a milestone structure (e.g., 50% upfront upon agreement and 50% upon final testing before domain handoff). We accept Nigerian Naira (₦) via Paystack card payment, direct bank transfer, or international arrangements.'
  },
  {
    q: 'Will my website work properly on Android phones and low-bandwidth connections?',
    a: 'Yes! Mobile responsiveness and lightweight performance are core engineering priorities at Ozero Digital Studio. We test layouts across phone sizes and optimize assets so your site loads smoothly even on mobile networks.'
  },
  {
    q: 'Do you provide maintenance and updates after the website launches?',
    a: 'Yes. Every project includes complimentary post-launch support (14 to 60 days depending on package). We also offer flexible monthly maintenance plans for ongoing updates, backups, security reviews, and feature additions.'
  }
];

// Initial Seed Users (Customer & Owner)
export const INITIAL_USERS: User[] = [
  {
    id: 'usr-owner-001',
    name: 'Jephthah Ozero',
    email: 'ozerojephthah0@gmail.com',
    role: 'owner',
    company: 'Ozero Digital Studio',
    phone: '+2349019016049',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'usr-cust-001',
    name: 'Alex Adebayo',
    email: 'alex@horizonpay.ng',
    role: 'customer',
    company: 'Horizon Pay Africa',
    phone: '+2348098765432',
    createdAt: '2026-02-15T10:00:00Z'
  }
];

// Initial Client Project for Demo
export const INITIAL_CLIENT_PROJECTS: ClientProject[] = [
  {
    id: 'proj-horizon-01',
    customerId: 'usr-cust-001',
    customerName: 'Alex Adebayo',
    customerEmail: 'alex@horizonpay.ng',
    customerCompany: 'Horizon Pay Africa',
    title: 'Horizon Merchant Web Portal & Checkout',
    serviceCategory: 'Web Application Development',
    status: 'in_development',
    startDate: '2026-09-10',
    targetDate: '2026-10-18',
    budgetNGN: 750000,
    totalPaidNGN: 375000,
    milestones: [
      {
        id: 'm-1',
        title: 'Milestone 1: Architectural Blueprint & UX Wireframes',
        description: 'Complete UI component mockups, user flows, and database schema documentation.',
        percentage: 25,
        amountNGN: 187500,
        status: 'approved',
        dueDate: '2026-09-16',
        approvedAt: '2026-09-15T14:30:00Z'
      },
      {
        id: 'm-2',
        title: 'Milestone 2: Frontend Engineering & Responsive Design',
        description: 'React + TypeScript merchant dashboard with responsive mobile layouts and theme styling.',
        percentage: 25,
        amountNGN: 187500,
        status: 'ready_for_approval',
        dueDate: '2026-09-28'
      },
      {
        id: 'm-3',
        title: 'Milestone 3: Payment Gateway & API Integration',
        description: 'Paystack integration, transaction status hooks, webhook verification and security hardening.',
        percentage: 30,
        amountNGN: 225000,
        status: 'in_progress',
        dueDate: '2026-10-08'
      },
      {
        id: 'm-4',
        title: 'Milestone 4: Security Audit, Testing & Production Deployment',
        description: 'End-to-end testing, Core Web Vitals optimization, SSL certification, and deployment handoff.',
        percentage: 20,
        amountNGN: 150000,
        status: 'pending',
        dueDate: '2026-10-18'
      }
    ],
    revisions: [
      {
        id: 'rev-01',
        milestoneId: 'm-2',
        milestoneTitle: 'Milestone 2: Frontend Engineering',
        title: 'Add dark mode toggle to merchant settings drawer',
        description: 'Ensure merchant operators can switch between deep navy and high-contrast light mode on tablets.',
        priority: 'medium',
        status: 'implemented',
        createdAt: '2026-09-20T11:00:00Z',
        responseNotes: 'Implemented and verified in staging build.'
      }
    ],
    deliverables: [
      {
        id: 'del-01',
        title: 'Horizon_Architecture_Blueprint_v1.pdf',
        fileType: 'PDF Document',
        fileSize: '1.8 MB',
        downloadUrl: '#',
        uploadedAt: '2026-09-15T10:00:00Z',
        description: 'Complete system architecture, API schemas, and security model.'
      },
      {
        id: 'del-02',
        title: 'Staging_Environment_Access_Guide.pdf',
        fileType: 'PDF Document',
        fileSize: '640 KB',
        downloadUrl: '#',
        uploadedAt: '2026-09-27T16:00:00Z',
        description: 'Credentials and test instructions for review.'
      }
    ],
    repositoryUrl: 'https://github.com/ozero-client-vault/horizon-portal',
    stagingUrl: 'https://staging-horizon.ozero.dev',
    updatedAt: '2026-09-28T09:00:00Z'
  }
];

// Initial Invoices
export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1001',
    invoiceNumber: 'OZERO-2026-001',
    projectId: 'proj-horizon-01',
    projectTitle: 'Horizon Merchant Web Portal & Checkout',
    customerId: 'usr-cust-001',
    customerName: 'Alex Adebayo',
    customerEmail: 'alex@horizonpay.ng',
    customerCompany: 'Horizon Pay Africa',
    amountNGN: 375000,
    description: 'Initial Project Kickoff Deposit (50% Milestone 1 & 2)',
    items: [
      { description: 'Milestone 1: Architectural Blueprint & UX Wireframes', amountNGN: 187500 },
      { description: 'Milestone 2: Frontend Engineering & Responsive Prototype', amountNGN: 187500 }
    ],
    status: 'paid',
    dueDate: '2026-09-12',
    createdAt: '2026-09-08T09:00:00Z',
    paidAt: '2026-09-10T14:15:00Z',
    paymentReference: 'ozero_pay_1726000000',
    paymentMethod: 'paystack'
  },
  {
    id: 'inv-1002',
    invoiceNumber: 'OZERO-2026-002',
    projectId: 'proj-horizon-01',
    projectTitle: 'Horizon Merchant Web Portal & Checkout',
    customerId: 'usr-cust-001',
    customerName: 'Alex Adebayo',
    customerEmail: 'alex@horizonpay.ng',
    customerCompany: 'Horizon Pay Africa',
    amountNGN: 375000,
    description: 'Milestone 3 & Final Deployment Handover (50% Balance)',
    items: [
      { description: 'Milestone 3: Payment Gateway & API Integration', amountNGN: 225000 },
      { description: 'Milestone 4: Security Audit, Core Web Vitals & Launch Deployment', amountNGN: 150000 }
    ],
    status: 'pending',
    dueDate: '2026-10-15',
    createdAt: '2026-09-28T09:00:00Z'
  }
];

// Initial Messages
export const INITIAL_MESSAGES: ProjectMessage[] = [
  {
    id: 'msg-01',
    projectId: 'proj-horizon-01',
    senderId: 'usr-owner-001',
    senderName: 'Jephthah Ozero',
    senderRole: 'owner',
    text: 'Hello Alex! Welcome to your project dashboard. Milestone 1 blueprint is ready and signed off, and we have deployed the initial frontend preview to staging.',
    createdAt: '2026-09-16T10:30:00Z'
  },
  {
    id: 'msg-02',
    projectId: 'proj-horizon-01',
    senderId: 'usr-cust-001',
    senderName: 'Alex Adebayo',
    senderRole: 'customer',
    text: 'Thanks Jephthah! The responsiveness on mobile phones is super smooth. We just tested the dark mode toggle and love the feel.',
    createdAt: '2026-09-21T15:45:00Z'
  }
];

// Initial Blog Posts
export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-01',
    slug: 'modern-web-applications-react-typescript',
    title: 'Architecting Resilient Web Applications with React 19 & TypeScript',
    summary: 'Why type safety, modular component state, and zero-bloat styling are critical for long-term scalability and business agility.',
    content: `When building software for growing businesses, architectural discipline early on saves hundreds of hours of debugging later.
    
1. Strict Type Safety with TypeScript:
Eliminating runtime undefined bugs by declaring interfaces for every API endpoint and user payload.

2. Modern Component State and Render Boundaries:
Leveraging React 19 hooks and declarative updates ensures sub-50ms UI response times across all devices.

3. Performance First:
Keeping bundles lightweight with Tailwind CSS and eliminating unnecessary third-party scripts.`,
    category: 'Engineering',
    author: 'Jephthah Ozero',
    readTime: '4 min read',
    publishedAt: '2026-09-15',
    tags: ['React', 'TypeScript', 'Web Architecture', 'Performance'],
    featuredImage: '/images/hero_developer_studio_1790706856452.jpg'
  },
  {
    id: 'blog-02',
    slug: 'optimizing-ecommerce-conversions-mobile-africa',
    title: 'Maximizing Mobile Checkout Conversion in Emerging Markets',
    summary: 'Over 75% of web visitors browse from smartphones. Here is how lightweight payloads and payment speed drive higher sales.',
    content: `In fast-moving digital economies, mobile usability is the single biggest factor determining whether a visitor becomes a paying customer.

Key Principles for High-Converting Storefronts:
- Instant search without page reloads.
- Seamless Paystack and card checkout flows requiring minimum form fields.
- Optimistic UI updates so users never see freezing screens during network latency.`,
    category: 'E-Commerce',
    author: 'Jephthah Ozero',
    readTime: '5 min read',
    publishedAt: '2026-09-08',
    tags: ['E-Commerce', 'Paystack', 'Mobile UX', 'Conversion'],
    featuredImage: '/images/project_cartnova_store_1790706868373.jpg'
  },
  {
    id: 'blog-03',
    slug: 'web-security-essentials-for-modern-businesses',
    title: 'Website Security Essentials: Protecting User Data & Payment Flows',
    summary: 'Essential security practices every digital business must implement to guard against data leaks, XSS, and fraudulent transactions.',
    content: `Security is not an afterthought; it is built into the foundation of every production system.

1. Trusted Server-Side Authorization:
Never trust role checks from client code. Validate permissions and invoices on the server before mutating state.

2. Webhook Signature Verification:
Always verify HMAC SHA512 signatures on payment provider webhooks (like Paystack) before crediting orders.

3. Strict Content Security Policies and Sanitize User Inputs:
Prevent malicious code injection with defensive regex validations and strict input length constraints.`,
    category: 'Security',
    author: 'Jephthah Ozero',
    readTime: '6 min read',
    publishedAt: '2026-08-28',
    tags: ['Security', 'Backend', 'Paystack', 'Best Practices'],
    featuredImage: '/images/project_budget_tracker_1790706899873.jpg'
  }
];

// Initial Support Tickets
export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-101',
    ticketNumber: 'TKT-2026-01',
    customerId: 'usr-cust-001',
    customerName: 'Alex Adebayo',
    customerEmail: 'alex@horizonpay.ng',
    projectId: 'proj-horizon-01',
    subject: 'Paystack Webhook Staging Callback Verification',
    category: 'technical',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2026-09-25T14:00:00Z',
    updatedAt: '2026-09-26T10:15:00Z',
    messages: [
      {
        id: 'tm-1',
        senderId: 'usr-cust-001',
        senderName: 'Alex Adebayo',
        senderRole: 'customer',
        text: 'Hi Jephthah, we are running test transactions with Paystack test cards and wanted to confirm our webhook endpoint is receiving the charge.success payload properly.',
        createdAt: '2026-09-25T14:00:00Z'
      },
      {
        id: 'tm-2',
        senderId: 'usr-owner-001',
        senderName: 'Jephthah Ozero',
        senderRole: 'owner',
        text: 'Hi Alex, the server HMAC verification is active and logging charge.success events with 200 OK. Milestone 3 integration is progressing smoothly.',
        createdAt: '2026-09-26T10:15:00Z'
      }
    ]
  }
];

// Initial Referral Codes
export const INITIAL_REFERRAL_CODES: ReferralCode[] = [
  {
    code: 'OZERO10',
    discountPercentage: 10,
    affiliateName: 'Agency Partner Network',
    usesCount: 4,
    totalGeneratedNGN: 1850000,
    active: true
  },
  {
    code: 'STARTUP2026',
    discountPercentage: 5,
    affiliateName: 'Lagos Tech Hub Referral',
    usesCount: 7,
    totalGeneratedNGN: 3200000,
    active: true
  }
];
