import React from 'react';
import { ShieldCheck, FileText, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { Button } from '../common/Button';

export const LegalPages: React.FC = () => {
  const { legalTab, setLegalTab, navigateTo, config } = useStudio();

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <button
            onClick={() => navigateTo('home')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Studio</span>
          </button>
          <h1 className="text-3xl font-bold font-display text-white">
            Studio Legal Policies & Service Guarantees
          </h1>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setLegalTab('terms')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              legalTab === 'terms' ? 'bg-slate-800 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setLegalTab('privacy')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              legalTab === 'privacy' ? 'bg-slate-800 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setLegalTab('sla')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              legalTab === 'sla' ? 'bg-slate-800 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SLA & Delivery
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        {legalTab === 'terms' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-white">1. Terms of Service</h2>
            <p>
              Welcome to <strong>Ozero Digital Studio</strong>, owned and operated by Jephthah Ozero. By engaging our services or using our client portal, you agree to these transparent terms.
            </p>

            <h3 className="text-base font-bold text-white">Project Milestones & Payment Schedule</h3>
            <p>
              Standard engagements are structured on a milestone schedule (typically 50% deposit upon kickoff and 50% upon final sign-off prior to production deployment). All payments are processed securely in Nigerian Naira (₦) through verified Paystack gateway or direct transfer.
            </p>

            <h3 className="text-base font-bold text-white">Intellectual Property & Code Ownership</h3>
            <p>
              Upon receipt of final invoice settlement, the client receives full ownership rights to custom source code, assets, design tokens, and database blueprints created specifically for their engagement.
            </p>

            <h3 className="text-base font-bold text-white">Revision Scope</h3>
            <p>
              Each package or milestone includes designated revision cycles (2 to 3 rounds depending on package tier) to polish styling, layouts, and feature behaviors within the agreed project scope.
            </p>
          </div>
        )}

        {legalTab === 'privacy' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-white">2. Privacy & Data Protection Policy</h2>
            <p>
              We treat client confidentiality with the highest priority. We never sell, rent, or publicly expose your project concepts, business plans, or contact records.
            </p>

            <h3 className="text-base font-bold text-white">Data Collection & Least Privilege</h3>
            <p>
              We only collect data necessary to evaluate your project scope and manage communication (name, verified email, phone/WhatsApp number, project specs).
            </p>

            <h3 className="text-base font-bold text-white">Payment Data Security</h3>
            <p>
              Ozero Digital Studio never stores your raw credit card numbers or banking credentials. All transactions are securely tokenized through Paystack's PCI-DSS compliant infrastructure.
            </p>
          </div>
        )}

        {legalTab === 'sla' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-white">3. Service Level Agreement & Post-Launch Support</h2>
            <p>
              We stand behind the performance, accessibility, and security of every digital product we engineer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs">Complimentary Warranty</div>
                <div className="text-[11px] text-slate-400">14 to 60 days of post-launch bug resolution included on all projects.</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs">Uptime & Performance</div>
                <div className="text-[11px] text-slate-400">Sub-2s First Contentful Paint optimized on mobile networks.</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs">Direct Access</div>
                <div className="text-[11px] text-slate-400">Direct WhatsApp and portal coordination with Jephthah Ozero.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
