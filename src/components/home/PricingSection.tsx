import React from 'react';
import { Check, Clock, RefreshCw, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { formatNaira } from '../../utils/formatters';
import { Button } from '../common/Button';
import { PricingPackage } from '../../types';

export const PricingSection: React.FC = () => {
  const { packages, setPrefilledCategory, navigateTo } = useStudio();

  const handleSelectPackage = (pkg: PricingPackage) => {
    setPrefilledCategory(`${pkg.name} Package`);
    navigateTo('contact', 'enquiry-form-section');
  };

  return (
    <section id="pricing-section" className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Straightforward Pricing & Packages
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Transparent Investment in Your Digital Presence
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            No hidden fees, no fake countdown timers, and no inflated promises. Clear deliverables with dedicated developer communication.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map(pkg => {
            const isBusiness = pkg.name === 'Business';
            return (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isBusiness
                    ? 'bg-slate-900 border-2 border-cyan-500/60 shadow-xl shadow-cyan-950/40 glow-card'
                    : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-[11px] font-bold uppercase tracking-wider shadow-md">
                    Most Selected
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & target */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold font-display text-white">{pkg.name}</h3>
                      {pkg.badge && (
                        <span className="text-xs font-mono text-cyan-400 font-medium">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Price */}
                  <div className="py-2 border-y border-slate-800/80 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                        {formatNaira(pkg.priceNGN)}
                      </span>
                      {pkg.isStartingPrice && (
                        <span className="text-xs text-slate-400 font-normal">starting base</span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Ideal for: <span className="text-slate-300">{pkg.targetAudience}</span>
                    </div>
                  </div>

                  {/* Turnaround & Revisions info */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400">Timeline</div>
                        <div className="font-medium text-slate-200">{pkg.deliveryTimeline}</div>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400">Revisions</div>
                        <div className="font-medium text-slate-200">{pkg.revisions}</div>
                      </div>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Included In Package:
                    </div>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Select Package CTA */}
                <div className="pt-8 mt-6 border-t border-slate-800/80">
                  <Button
                    size="md"
                    variant={isBusiness ? 'primary' : 'outline'}
                    actionName={`Select Package: ${pkg.name}`}
                    onClick={() => handleSelectPackage(pkg)}
                    iconRight={<ArrowUpRight className="w-4 h-4" />}
                    className="w-full"
                  >
                    Select {pkg.name}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee and Payment terms notice */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>
              All projects include milestone review checkpoints, code repository handoff, and direct communication with Jephthah Ozero.
            </span>
          </div>
          <div className="shrink-0 text-slate-300 font-mono text-[11px]">
            50% Kickoff / 50% Final Deployment
          </div>
        </div>
      </div>
    </section>
  );
};
