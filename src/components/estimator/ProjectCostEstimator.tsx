import React, { useState } from 'react';
import {
  Calculator,
  Check,
  Plus,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Layers,
  Smartphone,
  CreditCard,
  Lock,
  Globe
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { formatNaira } from '../../utils/formatters';
import { Button } from '../common/Button';
import { logAction } from '../../utils/logger';

interface FeatureOption {
  id: string;
  name: string;
  description: string;
  priceNGN: number;
  days: number;
  category: 'core' | 'features' | 'integration' | 'security';
}

export const ProjectCostEstimator: React.FC = () => {
  const { setPrefilledCategory, navigateTo } = useStudio();

  // Selected Scope Options
  const [projectType, setProjectType] = useState<'landing' | 'business' | 'ecommerce' | 'webapp'>('business');
  const [pageCount, setPageCount] = useState<number>(5);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'mobile_responsive',
    'contact_routing',
    'seo_essentials'
  ]);

  const basePrices = {
    landing: { price: 140000, days: 5, label: 'Landing Page / Portfolio' },
    business: { price: 250000, days: 10, label: 'Business Website' },
    ecommerce: { price: 450000, days: 18, label: 'E-Commerce Storefront' },
    webapp: { price: 650000, days: 28, label: 'Custom Web Application' }
  };

  const featureAddons: FeatureOption[] = [
    {
      id: 'mobile_responsive',
      name: 'Mobile-First Touch Optimization',
      description: 'Tested across modern Android smartphones and tablets',
      priceNGN: 35000,
      days: 2,
      category: 'core'
    },
    {
      id: 'contact_routing',
      name: 'Lead Capture & WhatsApp Sync',
      description: 'Automated email routing and instant WhatsApp chat trigger',
      priceNGN: 25000,
      days: 1,
      category: 'core'
    },
    {
      id: 'paystack_payments',
      name: 'Paystack Payment Gateway',
      description: 'Accept card, bank transfer, and USSD in Nigerian Naira',
      priceNGN: 85000,
      days: 3,
      category: 'integration'
    },
    {
      id: 'user_auth',
      name: 'Customer Authentication & Profiles',
      description: 'Secure sign-in, private dashboards, and role permissions',
      priceNGN: 95000,
      days: 4,
      category: 'features'
    },
    {
      id: 'seo_essentials',
      name: 'Advanced SEO & Schema JSON-LD',
      description: 'Structured data, OpenGraph cards, and Core Web Vitals audit',
      priceNGN: 45000,
      days: 2,
      category: 'security'
    },
    {
      id: 'security_audit',
      name: 'Enterprise Security Hardening',
      description: 'CSP headers, rate limiting, and defensive input sanitization',
      priceNGN: 60000,
      days: 3,
      category: 'security'
    },
    {
      id: 'realtime_sync',
      name: 'Realtime Data Sync / Audio Synth',
      description: 'Interactive canvas, Web Audio API, or live data stream',
      priceNGN: 110000,
      days: 5,
      category: 'features'
    }
  ];

  const toggleFeature = (id: string) => {
    logAction('Estimator Toggle Feature', { featureId: id });
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Calculation
  const base = basePrices[projectType];
  const pagesAdditionalCost = Math.max(0, pageCount - 3) * 20000;
  const addonCost = featureAddons
    .filter(f => selectedFeatures.includes(f.id))
    .reduce((sum, f) => sum + f.priceNGN, 0);
  const totalEstimatedNGN = base.price + pagesAdditionalCost + addonCost;

  const totalDays = base.days + featureAddons
    .filter(f => selectedFeatures.includes(f.id))
    .reduce((sum, f) => sum + f.days, 0);

  const handleBookWithScope = () => {
    logAction('Estimator: Book with Calculated Scope', { totalEstimatedNGN, projectType });
    setPrefilledCategory(`${base.label} (Estimated: ${formatNaira(totalEstimatedNGN)})`);
    navigateTo('contact', 'enquiry-form-section');
  };

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 pb-12 max-w-3xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center justify-center gap-1.5">
          <Calculator className="w-4 h-4" />
          <span>Interactive Cost Estimator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
          Configure Your Custom Scope & Estimate
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Select your desired project type, page count, and architectural features for an instant, transparent itemized quote in Nigerian Naira.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Configuration Controls */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Base Project Type */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold font-display text-white">1. Select Base Architecture</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(basePrices) as Array<keyof typeof basePrices>).map(key => {
                const item = basePrices[key];
                const isSelected = projectType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      logAction('Estimator Project Type Selected', { type: key });
                      setProjectType(key);
                    }}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-slate-950 border-cyan-400 ring-2 ring-cyan-400/20'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-white">{item.label}</span>
                      <span className="font-mono text-xs text-cyan-400 font-bold">{formatNaira(item.price)}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Base Turnaround: ~{item.days} Business Days
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Number of Pages Slider */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold font-display text-white">2. Approximate Page & Screen Count</h3>
              <span className="font-mono text-cyan-400 font-bold text-base">{pageCount} Custom Screens / Pages</span>
            </div>
            <p className="text-xs text-slate-400">Includes responsive design for mobile, tablet, and desktop views.</p>
            <input
              type="range"
              min="1"
              max="20"
              value={pageCount}
              onChange={e => setPageCount(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer pt-2"
            />
          </div>

          {/* 3. Feature Add-ons */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold font-display text-white">3. Features & Technical Capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featureAddons.map(feat => {
                const isChecked = selectedFeatures.includes(feat.id);
                return (
                  <div
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isChecked
                        ? 'bg-slate-950 border-cyan-400/80 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white">{feat.name}</div>
                      <p className="text-[11px] text-slate-400 leading-snug">{feat.description}</p>
                      <div className="text-[11px] font-mono text-cyan-300 font-semibold pt-1">
                        +{formatNaira(feat.priceNGN)}
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Summary Sticky Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Itemized Scope Summary
              </span>
              <h3 className="text-xl font-bold font-display text-white">{base.label}</h3>
            </div>

            {/* Breakdown lines */}
            <div className="space-y-2 text-xs divide-y divide-slate-800 pt-2">
              <div className="flex justify-between py-1.5 text-slate-300">
                <span>Base Platform Architecture:</span>
                <span className="font-mono text-white">{formatNaira(base.price)}</span>
              </div>

              {pagesAdditionalCost > 0 && (
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span>Additional Screens ({pageCount - 3}):</span>
                  <span className="font-mono text-white">{formatNaira(pagesAdditionalCost)}</span>
                </div>
              )}

              {addonCost > 0 && (
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span>Selected Addons ({selectedFeatures.length}):</span>
                  <span className="font-mono text-white">{formatNaira(addonCost)}</span>
                </div>
              )}

              <div className="flex justify-between py-2 text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Estimated Turnaround:</span>
                </span>
                <span className="font-mono text-cyan-300">~{totalDays} Business Days</span>
              </div>
            </div>

            {/* Total Price */}
            <div className="pt-3 border-t border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Total Estimated Investment:</div>
              <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
                {formatNaira(totalEstimatedNGN)}
              </div>
            </div>

            <Button
              size="lg"
              variant="primary"
              actionName="Estimator: Book Scope"
              onClick={handleBookWithScope}
              iconRight={<ArrowRight className="w-4 h-4" />}
              className="w-full"
            >
              Start Project With This Scope
            </Button>

            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Includes milestone reviews & 30 days support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
