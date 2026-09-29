import React from 'react';
import {
  ShieldCheck,
  Lock,
  Sparkles,
  ArrowRight,
  UserPlus,
  LogIn,
  CheckCircle2,
  Code2,
  FileText,
  Shield,
  Layers,
  Zap,
  Globe
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { Button } from '../common/Button';
import { logAction } from '../../utils/logger';

export const WelcomeView: React.FC = () => {
  const {
    setIsAuthModalOpen,
    setAuthModalInitialMode,
    signInWithGoogle,
    navigateTo,
    config,
    currentUser,
    setLegalTab
  } = useStudio();

  const handleOpenSignIn = () => {
    logAction('Welcome Page: Sign In Clicked');
    setAuthModalInitialMode('signin');
    setIsAuthModalOpen(true);
  };

  const handleOpenRegister = () => {
    logAction('Welcome Page: Create Account Clicked');
    setAuthModalInitialMode('register');
    setIsAuthModalOpen(true);
  };

  const handleGoogleSignIn = async () => {
    logAction('Welcome Page: Google Sign-In Clicked');
    const res = await signInWithGoogle();
    if (res.success) {
      navigateTo('portal');
    }
  };

  const handleOpenTerms = () => {
    setLegalTab('terms');
    navigateTo('legal');
  };

  const handleOpenPrivacy = () => {
    setLegalTab('privacy');
    navigateTo('legal');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 my-auto">
        {/* Top Studio Brand Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Secure Client & Creator Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Welcome to <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Ozero Digital Studio</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            Engineered by <span className="text-white font-semibold">{config.ownerName}</span>. Access your bespoke project milestones, private design revisions, Paystack invoices, and encrypted project communications in one secure dashboard.
          </p>
        </div>

        {/* Main Authentication Card */}
        <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-sm">
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>Firebase 256-bit Encrypted Identity</span>
          </div>

          <div className="space-y-4 pt-2">
            {/* Primary Action 1: Sign In */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleOpenSignIn}
              actionName="Welcome Sign In"
              iconLeft={<LogIn className="w-4 h-4" />}
              iconRight={<ArrowRight className="w-4 h-4" />}
              className="w-full justify-center shadow-lg shadow-blue-500/20"
            >
              Sign In to Account
            </Button>

            {/* Primary Action 2: Create Account */}
            <Button
              variant="secondary"
              size="lg"
              onClick={handleOpenRegister}
              actionName="Welcome Create Account"
              iconLeft={<UserPlus className="w-4 h-4" />}
              className="w-full justify-center bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700"
            >
              Create New Account
            </Button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-3 text-slate-400 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-sm font-semibold text-slate-200 hover:text-white transition-all duration-200 shadow-sm group cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="group-hover:text-cyan-300 transition-colors">Continue with Google</span>
            </button>
          </div>

          {/* Quick Features List */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Real-time milestone tracking & deliverable approval</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Direct communication channel with Jephthah Ozero</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Paystack instant invoice settlement & receipt history</span>
            </div>
          </div>
        </div>

        {/* Legal Agreements Footer */}
        <div className="mt-8 text-center text-xs text-slate-400 space-x-3">
          <span>By signing in, you agree to our</span>
          <button
            type="button"
            onClick={handleOpenTerms}
            className="text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            Terms of Service
          </button>
          <span>and</span>
          <button
            type="button"
            onClick={handleOpenPrivacy}
            className="text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
};
