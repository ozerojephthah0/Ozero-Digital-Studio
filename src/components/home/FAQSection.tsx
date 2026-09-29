import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { INITIAL_FAQS } from '../../data/initialData';
import { useStudio } from '../../context/StudioContext';
import { Button } from '../common/Button';
import { logAction } from '../../utils/logger';

export const FAQSection: React.FC = () => {
  const { navigateTo } = useStudio();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    logAction('FAQ Item Toggled', { questionIndex: index, isOpen: isOpening });
  };

  return (
    <section id="faq-section" className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 pb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Everything You Need to Know
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Got questions about project turnaround, technologies, payments, or ongoing maintenance? Here are direct answers.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {INITIAL_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800/90 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold font-display text-white">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
          <div className="text-sm font-semibold text-white">
            Have a specific technical question or need an NDA?
          </div>
          <p className="text-xs text-slate-400">
            Send your inquiry directly to Jephthah Ozero and receive personalized guidance.
          </p>
          <Button
            size="sm"
            variant="outline"
            actionName="FAQ: Contact Studio"
            onClick={() => navigateTo('contact', 'enquiry-form-section')}
            icon={<MessageSquare className="w-3.5 h-3.5 text-cyan-400" />}
          >
            Ask a Question
          </Button>
        </div>
      </div>
    </section>
  );
};
