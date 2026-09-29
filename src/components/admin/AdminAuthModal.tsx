import React, { useState } from 'react';
import { ShieldCheck, Mail, KeyRound, AlertCircle, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { logAction } from '../../utils/logger';

export const AdminAuthModal: React.FC = () => {
  const {
    isAdminAuthModalOpen,
    setIsAdminAuthModalOpen,
    loginAsOwner,
    navigateTo,
    config
  } = useStudio();

  const [email, setEmail] = useState(config.ownerEmail);
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
  const [error, setError] = useState<string | null>(null);

  if (!isAdminAuthModalOpen) return null;

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    logAction('Admin Login Credentials Step', { email });

    const normalized = email.trim().toLowerCase();
    if (
      normalized === config.ownerEmail.toLowerCase() ||
      normalized === 'ozerojephthah0@gmail.com' ||
      normalized === 'admin@ozero.dev'
    ) {
      setStep('mfa');
    } else {
      setError('Unauthorized email address. Only the studio owner (Jephthah Ozero) is permitted.');
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    logAction('Admin MFA Verification Step', { codeEntered: '****' });

    const success = loginAsOwner(email, code.trim());
    if (success) {
      setIsAdminAuthModalOpen(false);
      setStep('credentials');
      setCode('');
      navigateTo('admin');
    } else {
      setError('Invalid verification code. Enter owner passcode (e.g. 0929 or ozero2026).');
    }
  };

  const handleClose = () => {
    setIsAdminAuthModalOpen(false);
    setStep('credentials');
    setError(null);
    setCode('');
  };

  return (
    <Modal
      isOpen={isAdminAuthModalOpen}
      onClose={handleClose}
      title="Owner Portal Authentication"
      subtitle="Restricted access for Jephthah Ozero (Studio Owner)"
      maxWidth="md"
    >
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Owner Security Gateway</div>
            <div className="text-[11px] text-slate-400">
              Manage incoming client enquiries, pricing matrices, and live portfolio settings.
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Owner Email Address</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <p className="text-[11px] text-slate-500">
                Default: <span className="text-slate-400 font-mono">ozerojephthah0@gmail.com</span>
              </p>
            </div>

            <Button
              type="submit"
              size="md"
              variant="primary"
              actionName="Submit Owner Email Step"
              iconRight={<ArrowRight className="w-4 h-4" />}
              className="w-full"
            >
              Continue to Verification Step
            </Button>
          </form>
        ) : (
          <form onSubmit={handleMfaSubmit} className="space-y-4">
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
              Verification challenge requested for <strong className="text-white">{email}</strong>.
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                <span>Owner Passcode / MFA Code</span>
              </label>
              <input
                type="password"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Enter 0929 or ozero2026"
                autoFocus
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <p className="text-[11px] text-slate-500">
                Demo Owner Code: <span className="text-cyan-400 font-mono">0929</span> or <span className="text-cyan-400 font-mono">ozero2026</span>
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="button"
                size="md"
                variant="secondary"
                actionName="Back to Email Step"
                onClick={() => setStep('credentials')}
                className="w-1/3"
              >
                Back
              </Button>
              <Button
                type="submit"
                size="md"
                variant="primary"
                actionName="Verify Owner Code"
                iconRight={<ShieldCheck className="w-4 h-4" />}
                className="w-2/3"
              >
                Authenticate
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
