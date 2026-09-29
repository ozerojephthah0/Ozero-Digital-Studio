import React from 'react';
import { StudioProvider, useStudio } from './context/StudioContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { AboutIntro } from './components/home/AboutIntro';
import { ServicesSection } from './components/home/ServicesSection';
import { PortfolioSection } from './components/home/PortfolioSection';
import { PricingSection } from './components/home/PricingSection';
import { EnquiryForm } from './components/home/EnquiryForm';
import { FAQSection } from './components/home/FAQSection';
import { ProjectCostEstimator } from './components/estimator/ProjectCostEstimator';
import { BlogSection } from './components/blog/BlogSection';
import { BlogPostView } from './components/blog/BlogPostView';
import { LegalPages } from './components/legal/LegalPages';
import { ClientPortalDashboard } from './components/portal/ClientPortalDashboard';
import { ConfirmationView } from './components/enquiry/ConfirmationView';
import { ProjectModal } from './components/portfolio/ProjectModal';
import { DemoSimulatorModal } from './components/portfolio/DemoSimulatorModal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AuthModal } from './components/common/AuthModal';
import { WelcomeView } from './components/auth/WelcomeView';
import { UserProfileModal } from './components/portal/UserProfileModal';
import { AIProjectAdvisorModal } from './components/ai/AIProjectAdvisorModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Sparkles, Bot, ShieldAlert, LogIn, Lock } from 'lucide-react';
import { createWhatsAppUrl } from './utils/formatters';

const AppContent: React.FC = () => {
  const {
    currentPage,
    config,
    currentUser,
    isAuthLoading,
    setIsAuthModalOpen,
    setAuthModalInitialMode,
    setIsAIAdvisorOpen,
    theme
  } = useStudio();

  const handleWhatsAppNotice = () => {
    const msg = 'Hello Jephthah! I saw your booking announcement on Ozero Digital Studio.';
    window.open(createWhatsAppUrl(config.whatsappNumber, msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 selection:bg-cyan-500 selection:text-slate-950 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Top Announcement Notice */}
      {config.announcementNotice && (
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-b border-slate-800 py-1.5 px-4 text-center text-xs text-slate-300 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{config.announcementNotice}</span>
          <button
            onClick={handleWhatsAppNotice}
            className="text-cyan-400 hover:underline font-semibold text-[11px] ml-1 cursor-pointer"
          >
            Chat Directly →
          </button>
        </div>
      )}

      {/* Primary Top Bar */}
      <Navbar />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero />
            <AboutIntro />
            <ServicesSection />
            <PortfolioSection />
            <PricingSection />
            <EnquiryForm />
            <FAQSection />
            <BlogSection />
          </>
        )}

        {currentPage === 'welcome' && <WelcomeView />}

        {currentPage === 'services' && (
          <div className="pt-6">
            <ServicesSection />
            <ProjectCostEstimator />
            <EnquiryForm />
          </div>
        )}

        {currentPage === 'estimator' && (
          <div className="pt-6">
            <ProjectCostEstimator />
            <EnquiryForm />
          </div>
        )}

        {currentPage === 'portfolio' && (
          <div className="pt-6">
            <PortfolioSection />
            <EnquiryForm />
          </div>
        )}

        {currentPage === 'about' && (
          <div className="pt-6">
            <AboutIntro />
            <ServicesSection />
            <EnquiryForm />
          </div>
        )}

        {currentPage === 'pricing' && (
          <div className="pt-6">
            <PricingSection />
            <ProjectCostEstimator />
            <FAQSection />
            <EnquiryForm />
          </div>
        )}

        {currentPage === 'blog' && (
          <div className="pt-6">
            <BlogSection />
          </div>
        )}

        {currentPage === 'blog-post' && (
          <div className="pt-6">
            <BlogPostView />
          </div>
        )}

        {currentPage === 'legal' && (
          <div className="pt-6">
            <LegalPages />
          </div>
        )}

        {currentPage === 'faq' && (
          <div className="pt-6">
            <FAQSection />
            <EnquiryForm />
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="pt-6">
            <EnquiryForm />
            <FAQSection />
          </div>
        )}

        {currentPage === 'enquiry-success' && <ConfirmationView />}

        {currentPage === 'portal' && (
          currentUser ? (
            <ClientPortalDashboard />
          ) : (
            <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
              <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4 shadow-2xl">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold font-display text-white">Client Portal Sign-In Required</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Please authenticate with your customer credentials to view active milestone progressions, design deliverables, and invoices.
                </p>
                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setAuthModalInitialMode('signin');
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Your Account</span>
                  </button>
                  <button
                    onClick={() => {
                      setAuthModalInitialMode('register');
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <span>Create New Client Account</span>
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {currentPage === 'admin' && (
          currentUser?.role === 'owner' ? (
            <AdminDashboard />
          ) : (
            <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
              <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4 shadow-2xl">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-950/70 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold font-display text-white">Owner Authorization Required</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You must be authenticated as Jephthah Ozero (studio owner) to access operational metrics, pricing controls, and client records.
                </p>
                <button
                  onClick={() => {
                    setAuthModalInitialMode('owner');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Authenticate as Studio Owner</span>
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Modals */}
      <AuthModal />
      <UserProfileModal />
      <AIProjectAdvisorModal />
      <ProjectModal />
      <DemoSimulatorModal />
      <AdminAuthModal />

      {/* Floating AI Scoping button */}
      <button
        onClick={() => setIsAIAdvisorOpen(true)}
        className="fixed bottom-6 right-6 z-30 p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold shadow-2xl shadow-cyan-500/40 border border-cyan-300/40 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title="Launch AI Scoping Advisor"
      >
        <Bot className="w-5 h-5 text-slate-950" />
        <span className="text-xs font-bold hidden sm:inline">AI Project Advisor</span>
      </button>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StudioProvider>
      <AppContent />
    </StudioProvider>
  );
}
