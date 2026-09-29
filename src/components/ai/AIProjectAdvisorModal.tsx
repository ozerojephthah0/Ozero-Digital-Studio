import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Layers,
  Clock,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  RefreshCw,
  Send,
  FileCode2
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatNaira } from '../../utils/formatters';
import { AIAdvisorResponse } from '../../types';
import { logAction } from '../../utils/logger';

export const AIProjectAdvisorModal: React.FC = () => {
  const {
    isAIAdvisorOpen,
    setIsAIAdvisorOpen,
    requestAIAdvice,
    setPrefilledCategory,
    navigateTo
  } = useStudio();

  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('Web Application Development');
  const [description, setDescription] = useState('');
  const [targetBudget, setTargetBudget] = useState<number>(500000);

  const [isLoading, setIsLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<AIAdvisorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isAIAdvisorOpen) return null;

  const handleGenerateBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please provide a brief description of your project concept.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await requestAIAdvice(
        projectTitle || projectCategory,
        projectCategory,
        description.trim(),
        targetBudget
      );
      setBlueprint(response);
      logAction('AI Advisor Generated Blueprint Successfully', { projectTitle, projectCategory });
    } catch (err: any) {
      setError(err.message || 'Failed to generate technical blueprint.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedWithScope = () => {
    setPrefilledCategory(projectCategory);
    setIsAIAdvisorOpen(false);
    navigateTo('contact', 'enquiry-form-section');
  };

  return (
    <Modal
      isOpen={isAIAdvisorOpen}
      onClose={() => setIsAIAdvisorOpen(false)}
      title="Ozero AI Project Scoping Advisor"
      subtitle="Instant technical architecture recommendations & milestone blueprint"
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Intro banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border border-cyan-500/30 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white font-semibold">Engineered Scoping Intelligence:</strong> Describe what you want to build. Our AI engine analyzes your requirements against modern software patterns to recommend the optimal tech stack, milestone duration, and realistic budget range.
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
            {error}
          </div>
        )}

        {/* Input Form */}
        {!blueprint ? (
          <form onSubmit={handleGenerateBlueprint} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Project Name / Idea</label>
                <input
                  type="text"
                  placeholder="e.g. Real Estate Client Portal or Music Streamer"
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 block">Category</label>
                <select
                  value={projectCategory}
                  onChange={e => setProjectCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="Business Website Development">Business Website Development</option>
                  <option value="E-commerce Website Development">E-commerce Website Development</option>
                  <option value="Web Application Development">Web Application Development</option>
                  <option value="Website Redesign & Mobile Fixes">Website Redesign & Mobile Fixes</option>
                  <option value="Bug Fixing & Website Maintenance">Bug Fixing & Maintenance</option>
                  <option value="Landing Page / Personal Portfolio">Landing Page / Portfolio</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Project Requirements & Core Vision *</label>
              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe key features, target audience, third-party services you need (e.g. Paystack, maps, live chat, audio player)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Target Budget Constraint:</span>
                <span className="font-mono text-cyan-400 font-bold">{formatNaira(targetBudget)}</span>
              </div>
              <input
                type="range"
                min="150000"
                max="2500000"
                step="50000"
                value={targetBudget}
                onChange={e => setTargetBudget(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              actionName="Generate AI Scoping Blueprint"
              disabled={isLoading}
              icon={isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-slate-950" />}
              className="w-full"
            >
              {isLoading ? 'Analyzing Architecture & Generating Blueprint...' : 'Generate Technical Scoping Blueprint'}
            </Button>
          </form>
        ) : (
          /* Blueprint Results View */
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <FileCode2 className="w-4 h-4" />
                <span>Executive Architectural Recommendation</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {blueprint.recommendation}
              </p>
            </div>

            {/* Estimated Budget & Timeline stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400">Estimated Turnaround</div>
                <div className="text-lg font-bold font-mono text-white mt-1">
                  ~{blueprint.estimatedTurnaroundWeeks} Weeks
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400">Estimated Range (NGN)</div>
                <div className="text-sm font-bold font-mono text-cyan-400 mt-1">
                  {formatNaira(blueprint.estimatedBudgetRangeNGN.min)} – {formatNaira(blueprint.estimatedBudgetRangeNGN.max)}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-slate-400">Security Standard</div>
                <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Production Hardened</span>
                </div>
              </div>
            </div>

            {/* Recommended Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Recommended Architectural Stack
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {blueprint.recommendedArchitecture.map((arch, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{arch}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Milestones */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Suggested Milestone Roadmap
              </h4>
              <div className="space-y-2">
                {blueprint.suggestedMilestones.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-white">{m.title}</div>
                      <div className="text-slate-400 mt-0.5">{m.focus}</div>
                    </div>
                    <span className="font-mono text-cyan-400 text-[11px] shrink-0">{m.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                size="sm"
                variant="secondary"
                actionName="Reset AI Scoping"
                onClick={() => setBlueprint(null)}
              >
                Re-evaluate Another Scope
              </Button>

              <Button
                size="md"
                variant="primary"
                actionName="Book Project With AI Scope"
                onClick={handleProceedWithScope}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Request Proposal With This Scope
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
