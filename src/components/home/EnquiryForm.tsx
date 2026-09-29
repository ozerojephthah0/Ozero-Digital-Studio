import React, { useState, useEffect } from 'react';
import {
  Send,
  MessageSquare,
  Sparkles,
  Calendar,
  DollarSign,
  Globe,
  Mail,
  User,
  Phone,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { formatNaira, createWhatsAppUrl, generateEnquiryWhatsAppMessage } from '../../utils/formatters';
import { Button } from '../common/Button';
import { logAction } from '../../utils/logger';

export const EnquiryForm: React.FC = () => {
  const {
    submitEnquiry,
    config,
    prefilledCategory,
    setPrefilledCategory,
    navigateTo
  } = useStudio();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneOrWhatsapp, setPhoneOrWhatsapp] = useState('');
  const [projectCategory, setProjectCategory] = useState(prefilledCategory || 'Business Website');
  const [description, setDescription] = useState('');
  const [estimatedBudgetNGN, setEstimatedBudgetNGN] = useState<number>(350000);
  const [preferredCompletionDate, setPreferredCompletionDate] = useState('');
  const [referenceWebsite, setReferenceWebsite] = useState('');

  // UI States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync prefilled category if updated by service or package selection
  useEffect(() => {
    if (prefilledCategory) {
      setProjectCategory(prefilledCategory);
    }
  }, [prefilledCategory]);

  const budgetOptions = [
    { label: '₦150,000 - ₦300,000', value: 250000 },
    { label: '₦300,000 - ₦600,000', value: 450000 },
    { label: '₦600,000 - ₦1,200,000', value: 850000 },
    { label: '₦1,200,000+', value: 1500000 }
  ];

  const categoryOptions = [
    'Business Website Development',
    'E-commerce Website Development',
    'Web Application Development',
    'Website Redesign & Mobile Fixes',
    'Bug Fixing & Website Maintenance',
    'Website Security Review',
    'Landing Page / Personal Portfolio',
    'Starter Package',
    'Business Package',
    'Custom Project'
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'Please enter your name';
    } else if (customerName.trim().length < 2) {
      newErrors.customerName = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!description.trim()) {
      newErrors.description = 'Please provide a brief description of your project';
    } else if (description.trim().length < 15) {
      newErrors.description = 'Please include a bit more detail (minimum 15 characters)';
    }

    if (estimatedBudgetNGN <= 0) {
      newErrors.estimatedBudgetNGN = 'Please select or enter an estimated budget';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    logAction('Submit Project Enquiry Attempt', { customerName, email, projectCategory });

    if (!validate()) {
      logAction('Enquiry Form Validation Failed', errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitEnquiry({
        customerName: customerName.trim(),
        email: email.trim(),
        phoneOrWhatsapp: phoneOrWhatsapp.trim() || undefined,
        projectCategory,
        description: description.trim(),
        estimatedBudgetNGN,
        preferredCompletionDate: preferredCompletionDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        referenceWebsite: referenceWebsite.trim() || undefined
      });

      // Clear form and navigate to confirmation view
      navigateTo('enquiry-success');
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ form: 'An error occurred submitting your request. Please reach out via WhatsApp or email directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppInstant = () => {
    logAction('Instant WhatsApp Inquiry Clicked', { customerName, projectCategory });
    const msg = generateEnquiryWhatsAppMessage(
      customerName || 'Potential Client',
      projectCategory,
      estimatedBudgetNGN,
      description || 'I would like to discuss my project requirements.'
    );
    window.open(createWhatsAppUrl(config.whatsappNumber, msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="enquiry-form-section" className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Direct Contact Options */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Project Inquiry & Consultation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
              Let's Discuss Your Next Project
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Fill out the inquiry form with your requirements, and Jephthah Ozero will review your project scope and respond with a formal quote within 24 hours.
            </p>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Prefer Instant Messaging?
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                You can message the studio directly on WhatsApp to chat in real-time about your timeline and requirements.
              </p>
              <button
                type="button"
                onClick={handleWhatsAppInstant}
                className="w-full py-3 px-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 hover:bg-emerald-900 text-emerald-300 transition-colors flex items-center justify-center gap-2 text-sm font-semibold shadow-lg shadow-emerald-950/40"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Message on WhatsApp ({config.whatsappDisplay})</span>
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>NDA & Confidentiality honored for all client concepts</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Itemized milestone pricing before work begins</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Direct collaboration with the engineer building your product</span>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Project Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {errors.form && (
                  <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errors.form}</span>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Your Full Name *</span>
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="e.g. Alex Adebayo"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${
                        errors.customerName ? 'border-rose-500' : 'border-slate-800'
                      }`}
                      required
                    />
                    {errors.customerName && (
                      <p className="text-[11px] text-rose-400">{errors.customerName}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-slate-800'
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone/WhatsApp & Preferred Completion Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Phone / WhatsApp (Optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={phoneOrWhatsapp}
                      onChange={e => setPhoneOrWhatsapp(e.target.value)}
                      placeholder="+234..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preferred Target Completion</span>
                    </label>
                    <input
                      type="date"
                      value={preferredCompletionDate}
                      onChange={e => setPreferredCompletionDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                {/* Project Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-200">
                    Project Category *
                  </label>
                  <select
                    value={projectCategory}
                    onChange={e => {
                      setProjectCategory(e.target.value);
                      setPrefilledCategory(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Estimated Budget in Naira */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Estimated Budget:</span>
                    </label>
                    <span className="text-sm font-mono font-bold text-cyan-400">
                      {formatNaira(estimatedBudgetNGN)}
                    </span>
                  </div>

                  {/* Budget Quick Selectors */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setEstimatedBudgetNGN(opt.value)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          estimatedBudgetNGN === opt.value
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <input
                    type="range"
                    min="100000"
                    max="3000000"
                    step="50000"
                    value={estimatedBudgetNGN}
                    onChange={e => setEstimatedBudgetNGN(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer pt-1"
                  />
                </div>

                {/* Project Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-200">
                    Project Requirements & Scope Description *
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Tell us what you're looking to build, any key features, specific inspirations, or existing challenges with your current website..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${
                      errors.description ? 'border-rose-500' : 'border-slate-800'
                    }`}
                    required
                  />
                  {errors.description && (
                    <p className="text-[11px] text-rose-400">{errors.description}</p>
                  )}
                </div>

                {/* Optional Reference Website */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Reference Website / Inspiration Link (Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={referenceWebsite}
                    onChange={e => setReferenceWebsite(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    variant="primary"
                    actionName="Submit Enquiry Form"
                    disabled={isSubmitting}
                    iconRight={<Send className="w-4 h-4" />}
                    className="w-full"
                  >
                    {isSubmitting ? 'Submitting Project Request...' : 'Submit Project Request'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
