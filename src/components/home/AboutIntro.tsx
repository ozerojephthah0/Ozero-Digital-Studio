import React from 'react';
import { Terminal, Laptop, Code2, Layers, Cpu, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { Button } from '../common/Button';

export const AboutIntro: React.FC = () => {
  const { config, navigateTo } = useStudio();

  const skills = [
    { name: 'Frontend Architecture', tools: 'React, TypeScript, Next.js, Tailwind CSS' },
    { name: 'Full-Stack & Backend', tools: 'Node.js, Express, REST APIs, Firebase/Firestore' },
    { name: 'Interactive Web Tools', tools: 'Web Audio API, Canvas 2D, State Machines' },
    { name: 'Optimization & Security', tools: 'Core Web Vitals, Mobile UX, Input Sanitization' }
  ];

  return (
    <section id="about-section" className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left profile summary & quick facts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              The Creator Behind The Studio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Meet Jephthah Ozero
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              I am a web developer and application creator driven by the art of building software that looks clean, runs fast, and helps businesses thrive in the digital age.
            </p>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Jephthah Ozero</div>
                  <div className="text-xs text-slate-400">Owner & Lead Developer</div>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
                "Whether you need an e-commerce storefront, a full-fledged custom web application, or a fast redesign for an existing website, I work directly with you from initial idea to deployment."
              </div>

              <div className="flex flex-col gap-2 pt-2 text-xs text-slate-400">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span>Location</span>
                  <span className="text-slate-200 font-medium">{config.location}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span>Primary Stack</span>
                  <span className="text-slate-200 font-medium">React · TypeScript · Node</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Communication</span>
                  <span className="text-cyan-400 font-mono">Direct & Transparent</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  actionName="About Section: Contact Jephthah"
                  onClick={() => navigateTo('contact', 'enquiry-form-section')}
                  iconRight={<ArrowUpRight className="w-3.5 h-3.5" />}
                  className="w-full"
                >
                  Get In Touch Directly
                </Button>
              </div>
            </div>
          </div>

          {/* Right developer philosophy & skills breakdown */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                How I Approach Every Web Project
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Too many websites suffer from bloated code, broken mobile layouts, and slow loading speeds that cost businesses real customers. My philosophy is rooted in performance, accessibility, and high visual craft:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                  <Laptop className="w-4 h-4" />
                  <span>Mobile-First Engineering</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Over 70% of Nigerian and global web visitors browse via mobile. Every interface is built and tested for smooth touch interactions on smartphones first.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                  <Code2 className="w-4 h-4" />
                  <span>Type-Safe, Clean Code</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Strict TypeScript patterns and modular component architecture guarantee that your website is bug-free, easy to expand, and durable over time.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                  <Cpu className="w-4 h-4" />
                  <span>Speed & Lighthouse Scores</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zero bulky scripts. Every asset is minified, styled efficiently with Tailwind CSS, and optimized for instant first contentful paint.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transparent Delivery</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clear timelines, realistic quotes, milestone review links, and dedicated post-launch support with no surprise fees.
                </p>
              </div>
            </div>

            {/* Core Technical Domains */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Core Technical Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                    <div className="text-xs font-semibold text-slate-200">{skill.name}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{skill.tools}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
