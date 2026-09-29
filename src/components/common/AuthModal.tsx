import React, { useState, useEffect, useMemo } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  Building,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Check,
  X
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { Modal } from './Modal';
import { Button } from './Button';
import { logAction } from '../../utils/logger';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalInitialMode,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    sendPasswordReset,
    loginAsOwner,
    loginUser,
    navigateTo,
    config
  } = useStudio();

  const [mode, setMode] = useState<'signin' | 'register' | 'owner' | 'forgot'>(authModalInitialMode);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [ownerCode, setOwnerCode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setMode(authModalInitialMode);
    setError(null);
    setSuccessMsg(null);
    if (authModalInitialMode === 'owner') {
      setEmail(config.ownerEmail);
    }
  }, [authModalInitialMode, isAuthModalOpen, config.ownerEmail]);

  // Password Strength Calculator
  const passwordCriteria = useMemo(() => {
    return {
      length: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password)
    };
  }, [password]);

  const strengthScore = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (passwordCriteria.length) score += 25;
    if (passwordCriteria.hasUpper && passwordCriteria.hasLower) score += 25;
    if (passwordCriteria.hasNumber) score += 25;
    if (passwordCriteria.hasSpecial) score += 25;
    return score;
  }, [password, passwordCriteria]);

  if (!isAuthModalOpen) return null;

  // 1. Handle Sign In
  const handleCustomerSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim() || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      const result = await signInWithEmail(email, password, rememberMe);
      if (result.success) {
        logAction('AuthModal: Sign In Successful', { email });
        setIsAuthModalOpen(false);
        navigateTo('portal');
      } else {
        setError(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign-in.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Registration
  const handleCustomerRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!name.trim() || !email.trim() || !password) {
      setError('Full Name, Email address, and Password are required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please ensure both passwords are identical.');
      return;
    }

    if (!agreeTerms) {
      setError('You must accept the Terms of Service and Privacy Policy to create an account.');
      return;
    }

    setLoading(true);
    try {
      const result = await signUpWithEmail(
        name.trim(),
        email.trim(),
        password,
        company.trim() || undefined,
        phone.trim() || undefined
      );

      if (result.success) {
        logAction('AuthModal: Registration Successful', { email });
        setIsAuthModalOpen(false);
        navigateTo('portal');
      } else {
        setError(result.error || 'Registration could not be completed.');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Forgot Password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setError('Please provide your account email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await sendPasswordReset(email.trim());
      setSuccessMsg(res.message);
    } catch (err: any) {
      setError('Could not process password recovery. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res.success) {
        setIsAuthModalOpen(false);
        navigateTo('portal');
      } else {
        setError(res.error || 'Google sign-in was not completed.');
      }
    } catch (err: any) {
      setError('Google authentication encountered an error.');
    } finally {
      setLoading(false);
    }
  };

  // 5. Handle Owner Sign In
  const handleOwnerSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const success = loginAsOwner(email, ownerCode.trim());
    if (success) {
      logAction('AuthModal: Owner Logged In', { email });
      setIsAuthModalOpen(false);
      navigateTo('admin');
    } else {
      setError('Owner security verification failed. Please check your authorized passcode (0929 or ozero2026).');
    }
    setLoading(false);
  };

  // Demo client shortcut for testing
  const handleQuickDemoCustomer = (demoEmail: string) => {
    loginUser(demoEmail, 'customer');
    setIsAuthModalOpen(false);
    navigateTo('portal');
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
      title={
        mode === 'owner'
          ? 'Owner Security Gateway'
          : mode === 'register'
          ? 'Create Client Account'
          : mode === 'forgot'
          ? 'Reset Password'
          : 'Client Portal Sign In'
      }
      subtitle={
        mode === 'owner'
          ? 'Restricted administrative suite for Jephthah Ozero'
          : mode === 'forgot'
          ? 'Enter your registered email to receive secure recovery instructions'
          : 'Access active projects, approve milestones, view invoices & track revisions'
      }
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Navigation Tabs (except during forgot password) */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setMode('signin'); setError(null); setSuccessMsg(null); }}
              className={`py-2 rounded-lg transition-colors cursor-pointer ${
                mode === 'signin'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(null); setSuccessMsg(null); }}
              className={`py-2 rounded-lg transition-colors cursor-pointer ${
                mode === 'register'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('owner');
                setEmail(config.ownerEmail);
                setError(null);
                setSuccessMsg(null);
              }}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                mode === 'owner'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Owner</span>
            </button>
          </div>
        )}

        {/* Alerts & Messages */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{successMsg}</span>
          </div>
        )}

        {/* Google Sign-In Quick Provider (for signin / register) */}
        {(mode === 'signin' || mode === 'register') && (
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
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
              <span>Continue with Google</span>
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-slate-900 px-2 text-slate-500 font-medium">Or with email & password</span>
              </div>
            </div>
          </div>
        )}

        {/* 1. SIGN IN FORM */}
        {mode === 'signin' && (
          <form onSubmit={handleCustomerSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Password</span>
                </label>
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setError(null); }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember session checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-400 focus:ring-cyan-400 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs text-slate-400 cursor-pointer select-none">
                Remember this session on this device
              </label>
            </div>

            <Button
              type="submit"
              size="md"
              variant="primary"
              disabled={loading}
              actionName="Client Portal Sign In"
              iconRight={loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              className="w-full"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </Button>

            {/* Quick Demo Switcher */}
            <div className="pt-2 border-t border-slate-800/80 text-center space-y-1.5">
              <span className="text-[11px] text-slate-500 block">Instant Client Sandbox:</span>
              <button
                type="button"
                onClick={() => handleQuickDemoCustomer('alex@horizonpay.ng')}
                className="text-xs font-mono text-cyan-400 hover:underline px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Demo Client: alex@horizonpay.ng</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </form>
        )}

        {/* 2. REGISTRATION FORM */}
        {mode === 'register' && (
          <form onSubmit={handleCustomerRegister} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Alex Adebayo"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                placeholder="alex@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Company / Brand</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Horizon Pay"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Phone / WhatsApp</span>
                </label>
                <input
                  type="tel"
                  placeholder="+234..."
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            {/* Password with Strength Indicator */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Password *</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Strength Meter */}
              {password.length > 0 && (
                <div className="pt-1.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Password strength:</span>
                    <span
                      className={`font-semibold ${
                        strengthScore >= 75
                          ? 'text-emerald-400'
                          : strengthScore >= 50
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {strengthScore >= 75 ? 'Strong' : strengthScore >= 50 ? 'Fair' : 'Weak'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strengthScore >= 75
                          ? 'bg-emerald-500'
                          : strengthScore >= 50
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${strengthScore}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Confirm Password *</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms of Service Agreement Checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-950 text-cyan-400 focus:ring-cyan-400 cursor-pointer"
                required
              />
              <label htmlFor="agreeTerms" className="text-xs text-slate-400 cursor-pointer select-none leading-tight">
                I agree to the <span className="text-cyan-400 hover:underline">Terms of Service</span> and <span className="text-cyan-400 hover:underline">Privacy Policy</span>.
              </label>
            </div>

            <Button
              type="submit"
              size="md"
              variant="primary"
              disabled={loading}
              actionName="Customer Register Submit"
              iconRight={loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              className="w-full mt-2"
            >
              {loading ? 'Creating Account...' : 'Register & Enter Dashboard'}
            </Button>
          </form>
        )}

        {/* 3. FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Account Email Address</span>
              </label>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <Button
              type="submit"
              size="md"
              variant="primary"
              disabled={loading}
              actionName="Request Password Reset"
              iconRight={loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              className="w-full"
            >
              {loading ? 'Sending Recovery Link...' : 'Send Password Reset Link'}
            </Button>

            <button
              type="button"
              onClick={() => { setMode('signin'); setError(null); setSuccessMsg(null); }}
              className="w-full text-center text-xs text-slate-400 hover:text-slate-200 py-1 cursor-pointer"
            >
              ← Back to Sign In
            </button>
          </form>
        )}

        {/* 4. OWNER ACCESS FORM */}
        {mode === 'owner' && (
          <form onSubmit={handleOwnerSignIn} className="space-y-4">
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Restricted to Studio Founder: Jephthah Ozero</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Owner Authorized Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                <span>Owner MFA Security Passcode</span>
              </label>
              <input
                type="password"
                placeholder="Enter passcode"
                value={ownerCode}
                onChange={e => setOwnerCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <p className="text-[11px] text-slate-500">
                Authorized Code: <span className="text-cyan-400 font-mono">0929</span> or <span className="text-cyan-400 font-mono">ozero2026</span>
              </p>
            </div>

            <Button
              type="submit"
              size="md"
              variant="primary"
              actionName="Owner Authenticate Submit"
              iconRight={<ShieldCheck className="w-4 h-4" />}
              className="w-full"
            >
              Verify & Enter Owner Studio Suite
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
};
