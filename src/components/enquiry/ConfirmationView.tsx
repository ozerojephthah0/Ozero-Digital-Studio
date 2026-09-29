import React from 'react';
import {
  CheckCircle2,
  Clock,
  MessageSquare,
  ArrowLeft,
  Mail,
  FileText,
  DollarSign,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { formatNaira, formatDate, createWhatsAppUrl, generateEnquiryWhatsAppMessage } from '../../utils/formatters';
import { Button } from '../common/Button';
import { logAction } from '../../utils/logger';

export const ConfirmationView: React.FC = () => {
  const { lastSubmittedEnquiry, config, navigateTo } = useStudio();

  if (!lastSubmittedEnquiry) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 space-y-4">
        <h2 className="text-2xl font-bold text-white font-display">No Recent Submission Found</h2>
        <p className="text-slate-400 text-sm max-w-md">
          If you have a project idea in mind, you can submit a project request or chat directly on WhatsApp.
        </p>
        <Button
          variant="primary"
          actionName="Confirmation View: Go To Enquiry Form"
          onClick={() => navigateTo('contact', 'enquiry-form-section')}
        >
          Submit a Project Request
        </Button>
      </div>
    );
  }

  const handleWhatsAppForward = () => {
    logAction('Confirmation View: Forward to WhatsApp', { id: lastSubmittedEnquiry.id });
    const msg = generateEnquiryWhatsAppMessage(
      lastSubmittedEnquiry.customerName,
      lastSubmittedEnquiry.projectCategory,
      lastSubmittedEnquiry.estimatedBudgetNGN,
      lastSubmittedEnquiry.description
    );
    window.open(createWhatsAppUrl(config.whatsappNumber, msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 shadow-2xl space-y-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
            Request Received · Reference #{lastSubmittedEnquiry.id.slice(-6).toUpperCase()}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Thank You, {lastSubmittedEnquiry.customerName}!
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Your project enquiry has been successfully logged at <span className="text-white font-medium">Ozero Digital Studio</span>. Jephthah Ozero will review your requirements and respond via email or WhatsApp within 24 hours.
          </p>
        </div>

        {/* Summary Card */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/90 text-left space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Project Specification Summary
            </span>
            <span className="text-xs font-mono text-cyan-400 font-medium">
              {formatDate(lastSubmittedEnquiry.createdAt)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Customer / Contact:</span>
              <span className="text-slate-200 font-medium">{lastSubmittedEnquiry.customerName}</span>
              <span className="text-slate-400 block font-mono mt-0.5">{lastSubmittedEnquiry.email}</span>
              {lastSubmittedEnquiry.phoneOrWhatsapp && (
                <span className="text-slate-400 block font-mono">{lastSubmittedEnquiry.phoneOrWhatsapp}</span>
              )}
            </div>

            <div>
              <span className="text-slate-400 block mb-1">Category & Budget:</span>
              <span className="text-cyan-300 font-medium block">{lastSubmittedEnquiry.projectCategory}</span>
              <span className="text-slate-200 font-mono font-bold">
                {formatNaira(lastSubmittedEnquiry.estimatedBudgetNGN)}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400 block mb-1">Project Requirements:</span>
            <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {lastSubmittedEnquiry.description}
            </p>
          </div>

          {lastSubmittedEnquiry.referenceWebsite && (
            <div className="text-xs flex items-center gap-2 text-slate-400 pt-1">
              <span>Reference Link:</span>
              <a
                href={lastSubmittedEnquiry.referenceWebsite}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline font-mono"
              >
                {lastSubmittedEnquiry.referenceWebsite}
              </a>
            </div>
          )}
        </div>

        {/* Fast Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            size="lg"
            variant="primary"
            actionName="Confirmation View: Open WhatsApp Chat"
            onClick={handleWhatsAppForward}
            icon={<MessageSquare className="w-5 h-5 text-emerald-950" />}
          >
            Chat Now on WhatsApp
          </Button>

          <Button
            size="lg"
            variant="secondary"
            actionName="Confirmation View: Back to Homepage"
            onClick={() => navigateTo('home')}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Studio Home
          </Button>
        </div>

        <div className="text-xs text-slate-400 flex items-center justify-center gap-2 pt-4">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Typical response time: Under 24 hours · Monday to Saturday</span>
        </div>
      </div>
    </div>
  );
};
