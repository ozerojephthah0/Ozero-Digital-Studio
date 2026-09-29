import React, { useState } from 'react';
import {
  Building2,
  ShoppingBag,
  Code2,
  Smartphone,
  Wrench,
  ShieldCheck,
  Sparkles,
  Check,
  ArrowRight,
  Clock,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { formatNaira } from '../../utils/formatters';
import { Button } from '../common/Button';
import { ServiceItem } from '../../types';

export const ServicesSection: React.FC = () => {
  const { services, setPrefilledCategory, navigateTo } = useStudio();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5 text-cyan-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-blue-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-indigo-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-teal-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  const handleRequestQuote = (service: ServiceItem) => {
    setPrefilledCategory(service.title);
    navigateTo('contact', 'enquiry-form-section');
  };

  const filteredServices = services.filter(s => {
    if (!s.isActive) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'websites') return ['business_website', 'ecommerce', 'landing_portfolio'].includes(s.category);
    if (activeFilter === 'apps') return ['web_application'].includes(s.category);
    if (activeFilter === 'maintenance') return ['redesign_mobile', 'bugfix_maintenance', 'security_review'].includes(s.category);
    return true;
  });

  return (
    <section id="services-section" className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800/80">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Tailored Digital Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Engineered for Real Business Growth
            </h2>
            <p className="text-base text-slate-300">
              Clear deliverables, modern technical architecture, and transparent starting prices. Every project is built from scratch without bloated templates.
            </p>
          </div>

          {/* Interactive filter tabs (Buttons allowed by constitution) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Services ({services.filter(s => s.isActive).length})
            </button>
            <button
              onClick={() => setActiveFilter('websites')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'websites'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Websites & Stores
            </button>
            <button
              onClick={() => setActiveFilter('apps')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'apps'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Web Applications
            </button>
            <button
              onClick={() => setActiveFilter('maintenance')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'maintenance'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Optimization & Support
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {filteredServices.map((service, index) => {
            const editorialIndex = String(index + 1).padStart(2, '0');
            return (
              <div
                key={service.id}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all duration-300 p-6 flex flex-col justify-between group glow-card-hover"
              >
                <div className="space-y-4">
                  {/* Top metadata row (clean unboxed text with separator) */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-cyan-400">{editorialIndex}</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{service.estimatedDelivery}</span>
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                      {getIcon(service.iconName)}
                    </div>
                    <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 italic">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Deliverables Included
                    </div>
                    <ul className="space-y-1.5">
                      {service.deliverables.slice(0, 4).map((deliv, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                      {service.deliverables.length > 4 && (
                        <li className="text-[11px] text-slate-400 pl-5">
                          + {service.deliverables.length - 4} more specialized milestones
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Bottom Pricing & Action Box */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-slate-400">Starting from</div>
                    <div className="text-base sm:text-lg font-bold font-mono text-white">
                      {formatNaira(service.startingPriceNGN)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    actionName={`Request Quote: ${service.title}`}
                    onClick={() => handleRequestQuote(service)}
                    iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Request Quote
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Scope Notice */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Need a custom combination or specialized technical integration?</span>
            </div>
            <p className="text-xs text-slate-400">
              We frequently architect custom solutions blending e-commerce, custom APIs, real-time audio, and specialized database logic.
            </p>
          </div>
          <Button
            size="md"
            variant="primary"
            actionName="Services Footer: Custom Inquiry"
            onClick={() => {
              setPrefilledCategory('Custom Web Application');
              navigateTo('contact', 'enquiry-form-section');
            }}
          >
            Discuss Custom Scope
          </Button>
        </div>
      </div>
    </section>
  );
};
