import React from 'react';
import {
  ExternalLink,
  Github,
  Play,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { logAction } from '../../utils/logger';

export const ProjectModal: React.FC = () => {
  const {
    selectedProject,
    setSelectedProject,
    setDemoModalProject,
    setPrefilledCategory,
    navigateTo
  } = useStudio();

  if (!selectedProject) return null;

  const handleLaunchDemo = () => {
    logAction('Launch Demo from Project Modal', { title: selectedProject.title });
    const proj = selectedProject;
    setSelectedProject(null);
    setDemoModalProject(proj);
  };

  const handleRequestSimilar = () => {
    logAction('Request Similar Project Clicked', { title: selectedProject.title });
    setPrefilledCategory(
      selectedProject.category === 'ecommerce'
        ? 'E-commerce Website Development'
        : 'Web Application Development'
    );
    setSelectedProject(null);
    navigateTo('contact', 'enquiry-form-section');
  };

  return (
    <Modal
      isOpen={!!selectedProject}
      onClose={() => setSelectedProject(null)}
      title={selectedProject.title}
      subtitle={selectedProject.tagline}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Project Image Banner */}
        <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[16/9] relative group">
          {selectedProject.imagePath && selectedProject.imagePath.endsWith('.jpg') ? (
            <img
              src={selectedProject.imagePath}
              alt={selectedProject.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 to-blue-950 text-center">
              <Sparkles className="w-12 h-12 text-cyan-400 mb-3" />
              <h4 className="text-xl font-bold font-display text-white">{selectedProject.title}</h4>
              <p className="text-sm text-slate-400 mt-1">{selectedProject.tagline}</p>
            </div>
          )}

          {/* Quick interactive action button overlaid */}
          <div className="absolute bottom-4 right-4">
            <Button
              size="sm"
              variant="primary"
              actionName={`Modal Launch Demo: ${selectedProject.title}`}
              onClick={handleLaunchDemo}
              icon={<Play className="w-4 h-4 text-slate-950" />}
            >
              Launch Interactive Demo
            </Button>
          </div>
        </div>

        {/* Status & Tech Info Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="flex items-center gap-3">
            {selectedProject.status === 'completed' ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Completed Production Project</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span>Prototype / Under Active Development</span>
              </span>
            )}
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">Released {selectedProject.year}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              actionName={`Run Demo Clicked: ${selectedProject.title}`}
              onClick={handleLaunchDemo}
              icon={<Play className="w-3.5 h-3.5 text-cyan-400" />}
            >
              Interactive Simulator
            </Button>
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => logAction('GitHub Repo Clicked', { url: selectedProject.githubUrl })}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                title="View Code Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Project Story & Architecture */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            Project Overview & Engineering Goals
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedProject.description}
          </p>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-1">
            <div className="font-semibold text-slate-200">Engineering Context:</div>
            <p>{selectedProject.story}</p>
          </div>
        </div>

        {/* Key Features & Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Key Features & Capabilities
            </h4>
            <ul className="space-y-2">
              {selectedProject.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Project Highlights
              </h5>
              <div className="space-y-1.5">
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Want to build a project with this technology stack?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              size="md"
              variant="secondary"
              actionName="Project Modal Close"
              onClick={() => setSelectedProject(null)}
            >
              Close
            </Button>
            <Button
              size="md"
              variant="primary"
              actionName="Project Modal: Request Similar"
              onClick={handleRequestSimilar}
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Request Similar Project
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
