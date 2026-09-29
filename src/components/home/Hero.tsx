import React from 'react';
import { ArrowUpRight, Code2, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { Button } from '../common/Button';

export const Hero: React.FC = () => {
  const { navigateTo, config } = useStudio();

  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[350px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Proposition & CTA */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left">
            {/* Editorial Lead Text */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <span>{config.ownerName}</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span className="text-slate-300">Digital Studio</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span className="text-slate-400">Lagos & Global</span>
            </div>

            {/* Exact Headline as requested */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.15] text-balance break-words">
              Let's Turn Your Ideas Into{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Digital Experiences.
              </span>
            </h1>

            {/* Exact Subtitle as requested */}
            <p className="text-sm sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              I design and build modern websites and web applications for individuals, creators, and businesses.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Button
                size="lg"
                variant="primary"
                actionName="Hero CTA: Start a Project"
                onClick={() => navigateTo('contact', 'enquiry-form-section')}
                iconRight={<ArrowUpRight className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Start a Project
              </Button>
              <Button
                size="lg"
                variant="secondary"
                actionName="Hero CTA: Explore My Work"
                onClick={() => navigateTo('portfolio', 'portfolio-section')}
                icon={<Code2 className="w-5 h-5 text-cyan-400" />}
                className="w-full sm:w-auto"
              >
                Explore My Work
              </Button>
            </div>

            {/* Real Value Pillars (Natural typographic presentation) */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">High-Speed Performance</div>
                  <div className="text-xs text-slate-400">Optimized for fast mobile loading</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">Modern Code Architecture</div>
                  <div className="text-xs text-slate-400">React, TypeScript & clean structure</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">Security & Reliability</div>
                  <div className="text-xs text-slate-400">Hardened forms & input validation</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Studio Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 shadow-2xl bg-slate-900 group">
              <div className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/hero_developer_studio_1790706856452.jpg"
                  alt="Jephthah Ozero Digital Studio Workspace and Engineering Environment"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Scrim Overlay & Card Footer Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-cyan-300 font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>OZERO DIGITAL STUDIO</span>
                  </div>
                  <h2 className="text-base font-bold text-white font-display">
                    Tailored Web Engineering & Creative Execution
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span>Lagos, Nigeria</span>
                    <span aria-hidden="true">·</span>
                    <span>Direct Developer Access</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-medium">Available for Booking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle decorative accent card */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md max-w-[240px]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold">
                  JS/TS
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">100% Mobile Ready</div>
                  <div className="text-[11px] text-slate-400">Tested on phones & tablets</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
