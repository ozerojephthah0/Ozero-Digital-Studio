import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Play,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { ProjectItem } from '../../types';
import { Button } from '../common/Button';

export const PortfolioSection: React.FC = () => {
  const { projects, setSelectedProject, setDemoModalProject, navigateTo } = useStudio();
  const [filter, setFilter] = useState<'all' | 'completed' | 'prototype'>('all');

  const filteredProjects = projects.filter(proj => {
    if (filter === 'all') return true;
    if (filter === 'completed') return proj.status === 'completed';
    if (filter === 'prototype') return proj.status === 'in_development' || proj.status === 'prototype';
    return true;
  });

  const getStatusBadge = (status: ProjectItem['status']) => {
    if (status === 'completed') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Completed Project</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>In Development / Prototype</span>
      </span>
    );
  };

  return (
    <section id="portfolio-section" className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800/80">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Selected Works & Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Real Software & Interactive Applications
            </h2>
            <p className="text-base text-slate-300">
              Explore web applications, e-commerce storefronts, and interactive developer tools crafted by Jephthah Ozero.
            </p>
          </div>

          {/* Interactive filter buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'completed'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Completed ({projects.filter(p => p.status === 'completed').length})
            </button>
            <button
              onClick={() => setFilter('prototype')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'prototype'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Prototypes ({projects.filter(p => p.status !== 'completed').length})
            </button>
          </div>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 overflow-hidden flex flex-col group glow-card-hover"
            >
              {/* Media Thumbnail Container with Image Fallback */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-slate-800/80">
                {project.imagePath ? (
                  <img
                    src={project.imagePath}
                    alt={`${project.title} Screenshot Preview`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gracefully
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 text-center">
                    <Sparkles className="w-8 h-8 text-cyan-400 mb-2" />
                    <span className="text-sm font-bold font-display text-white">{project.title}</span>
                    <span className="text-xs text-slate-400 mt-1">{project.tagline}</span>
                  </div>
                )}

                {/* Quick overlay actions on hover */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs p-4">
                  <Button
                    size="sm"
                    variant="primary"
                    actionName={`View Project Details: ${project.title}`}
                    onClick={() => setSelectedProject(project)}
                    icon={<Eye className="w-3.5 h-3.5" />}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    actionName={`Launch Simulator: ${project.title}`}
                    onClick={() => setDemoModalProject(project)}
                    icon={<Play className="w-3.5 h-3.5 text-cyan-400" />}
                  >
                    Interactive Demo
                  </Button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Status & Year Metadata (No pill sandwiches, clean unboxed text) */}
                  <div className="flex items-center justify-between">
                    {getStatusBadge(project.status)}
                    <span className="text-xs font-mono text-slate-400">{project.year}</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 italic">
                    {project.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[11px] text-slate-400 self-center pl-1">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Links */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setDemoModalProject(project)}
                    className="text-slate-300 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
                  >
                    <Play className="w-3 h-3 text-cyan-400" />
                    <span>Run Demo</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Start project banner based on portfolio inspection */}
        <div className="mt-16 text-center space-y-4 p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-xl font-bold font-display text-white">
            Have a project similar to these in mind?
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            From e-commerce stores like CartNova to complex interactive web apps, we build to your custom specification.
          </p>
          <div className="pt-2">
            <Button
              size="md"
              variant="primary"
              actionName="Portfolio Footer: Start Project"
              onClick={() => navigateTo('contact', 'enquiry-form-section')}
              iconRight={<ArrowUpRight className="w-4 h-4" />}
            >
              Start Your Project With Jephthah
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
