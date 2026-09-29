import React from 'react';
import { ArrowLeft, Clock, Calendar, User, Tag, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { formatDate } from '../../utils/formatters';
import { Button } from '../common/Button';

export const BlogPostView: React.FC = () => {
  const { blogPosts, selectedBlogSlug, navigateTo, setPrefilledCategory } = useStudio();

  const post = blogPosts.find(p => p.slug === selectedBlogSlug) || blogPosts[0];

  if (!post) {
    return (
      <div className="py-24 text-center">
        <h2>Article not found</h2>
        <Button onClick={() => navigateTo('blog')}>Back to Insights</Button>
      </div>
    );
  }

  return (
    <article className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigateTo('blog')}
        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Articles</span>
      </button>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase">
          <span>{post.category}</span>
          <span className="text-slate-600">·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span className="text-slate-600">·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-400">
            JO
          </div>
          <div>
            <div className="font-bold text-white">{post.author}</div>
            <div className="text-slate-400">Owner & Lead Developer, Ozero Digital Studio</div>
          </div>
        </div>
      </div>

      {/* Feature Image */}
      {post.featuredImage && (
        <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Article Body */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-4">
        <Tag className="w-4 h-4 text-cyan-400 mr-1" />
        {post.tags.map(tag => (
          <span key={tag} className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            #{tag}
          </span>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-bold font-display text-white">Need this level of technical execution on your project?</h4>
          <p className="text-xs text-slate-400">Collaborate directly with Jephthah Ozero on modern web engineering and digital storefronts.</p>
        </div>
        <Button
          size="md"
          variant="primary"
          actionName="Blog CTA: Hire Jephthah"
          onClick={() => {
            setPrefilledCategory(post.category === 'E-Commerce' ? 'E-commerce Website Development' : 'Web Application Development');
            navigateTo('contact', 'enquiry-form-section');
          }}
          iconRight={<ArrowRight className="w-4 h-4" />}
          className="shrink-0"
        >
          Discuss Your Project
        </Button>
      </div>
    </article>
  );
};
