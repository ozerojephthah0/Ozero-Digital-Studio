import React, { useState } from 'react';
import { BookOpen, Clock, Tag, ArrowRight, User, Sparkles } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { formatDate } from '../../utils/formatters';
import { Button } from '../common/Button';
import { BlogPost } from '../../types';

export const BlogSection: React.FC = () => {
  const { blogPosts, setSelectedBlogSlug, navigateTo } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Engineering', 'E-Commerce', 'Security'];

  const filteredPosts = blogPosts.filter(post => {
    if (selectedCategory === 'all') return true;
    return post.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleReadPost = (post: BlogPost) => {
    setSelectedBlogSlug(post.slug);
    navigateTo('blog-post');
  };

  return (
    <section id="blog-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Engineering Insights & Articles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Modern Web Craft & Technical Architecture
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Actionable articles on building fast, scalable applications with React 19, TypeScript, Paystack, and defensive web security by Jephthah Ozero.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
        {filteredPosts.map(post => (
          <article
            key={post.id}
            className="rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden flex flex-col justify-between group glow-card-hover"
          >
            {/* Image Banner */}
            <div className="aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-slate-800 relative">
              {post.featuredImage ? (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-950 text-cyan-400">
                  <Sparkles className="w-8 h-8" />
                </div>
              )}
              <span className="absolute top-3 left-3 text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-slate-800 font-semibold">
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3
                  onClick={() => handleReadPost(post)}
                  className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
                >
                  {post.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 font-medium">
                  By {post.author}
                </div>
                <button
                  onClick={() => handleReadPost(post)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
