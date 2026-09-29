import React, { useState } from 'react';
import { MessageSquare, Mail, Github, Linkedin, ArrowUpRight, ShieldCheck, MapPin, Calendar, BookOpen, Bot } from 'lucide-react';
import { useStudio, PageView } from '../../context/StudioContext';
import { createWhatsAppUrl } from '../../utils/formatters';
import { ConsultationModal } from '../contact/ConsultationModal';
import { logAction } from '../../utils/logger';

export const Footer: React.FC = () => {
  const {
    config,
    navigateTo,
    setIsAuthModalOpen,
    setAuthModalInitialMode,
    setIsAIAdvisorOpen,
    setLegalTab
  } = useStudio();

  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const handleNav = (page: PageView, sectionId?: string) => {
    navigateTo(page, sectionId);
  };

  const handleWhatsAppDirect = () => {
    logAction('Footer WhatsApp Clicked');
    const msg = "Hello Jephthah! I'm interested in discussing a website or web application project with Ozero Digital Studio.";
    window.open(createWhatsAppUrl(config.whatsappNumber, msg), '_blank', 'noopener,noreferrer');
  };

  const handleOpenLegal = (tab: 'terms' | 'privacy' | 'sla') => {
    setLegalTab(tab);
    navigateTo('legal');
  };

  return (
    <>
      <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
            {/* Brand Col */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xl font-bold font-display tracking-tight text-white">
                Ozero Digital Studio
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Engineering high-performing web applications, digital storefronts, and mobile-friendly websites for individuals, creators, and growing businesses.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{config.location}</span>
              </div>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`mailto:${config.ownerEmail}`}
                  onClick={() => logAction('Footer Email Clicked', { email: config.ownerEmail })}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
                  title={`Send email to ${config.ownerEmail}`}
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                </a>
                <button
                  onClick={handleWhatsAppDirect}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
                  title={`Chat on WhatsApp (${config.whatsappDisplay})`}
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </button>
                <a
                  href={config.githubProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={config.linkedinProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Nav Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => handleNav('home')} className="hover:text-cyan-400 transition-colors">Home</button></li>
                <li><button onClick={() => handleNav('services', 'services-section')} className="hover:text-cyan-400 transition-colors">Services & Catalogue</button></li>
                <li><button onClick={() => handleNav('estimator')} className="hover:text-cyan-400 transition-colors text-cyan-300">Cost Estimator</button></li>
                <li><button onClick={() => handleNav('portfolio', 'portfolio-section')} className="hover:text-cyan-400 transition-colors">Featured Portfolio</button></li>
                <li><button onClick={() => handleNav('pricing', 'pricing-section')} className="hover:text-cyan-400 transition-colors">Pricing Packages</button></li>
                <li><button onClick={() => handleNav('blog')} className="hover:text-cyan-400 transition-colors">Tech Insights Blog</button></li>
              </ul>
            </div>

            {/* Agency Client Tools */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Client Workspace
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => {
                      setAuthModalInitialMode('signin');
                      setIsAuthModalOpen(true);
                    }}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Client Project Portal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsConsultModalOpen(true)}
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Book Consultation</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsAIAdvisorOpen(true)}
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    <span>AI Scoping Advisor</span>
                  </button>
                </li>
                <li><button onClick={() => handleOpenLegal('terms')} className="hover:text-cyan-400 transition-colors">Terms of Service</button></li>
                <li><button onClick={() => handleOpenLegal('privacy')} className="hover:text-cyan-400 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => handleOpenLegal('sla')} className="hover:text-cyan-400 transition-colors">SLA & Guarantee</button></li>
              </ul>
            </div>

            {/* Direct Contact & Paystack Notice */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Direct Contact
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-slate-500">Email:</div>
                  <a href={`mailto:${config.ownerEmail}`} className="text-cyan-400 font-mono text-xs block break-all">
                    {config.ownerEmail}
                  </a>
                </div>
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50 transition-colors flex items-center justify-between text-xs font-medium"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} Ozero Digital Studio. Owned and engineered by{' '}
              <span className="text-slate-300 font-medium">{config.ownerName}</span>.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => handleOpenLegal('terms')} className="hover:text-slate-300">Terms</button>
              <span>·</span>
              <button onClick={() => handleOpenLegal('privacy')} className="hover:text-slate-300">Privacy</button>
              <span>·</span>
              <button
                onClick={() => {
                  setAuthModalInitialMode('owner');
                  setIsAuthModalOpen(true);
                }}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-400"
              >
                <ShieldCheck className="w-3 h-3 text-cyan-500" />
                <span>Owner Login</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
      />
    </>
  );
};
