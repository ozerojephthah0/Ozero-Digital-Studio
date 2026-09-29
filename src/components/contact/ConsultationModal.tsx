import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { createWhatsAppUrl } from '../../utils/formatters';
import { logAction } from '../../utils/logger';

export const ConsultationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { submitConsultation, config } = useStudio();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Website Strategy & Architecture');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    await submitConsultation({
      name: name.trim(),
      email: email.trim(),
      phoneOrWhatsapp: phone.trim() || '+234...',
      topic,
      preferredTime: preferredTime || 'This Week (Flexible)',
      notes: notes.trim()
    });

    logAction('Consultation Scheduled', { name, topic, preferredTime });
    setSubmitted(true);
  };

  const handleWhatsAppInstant = () => {
    const msg = `Hello Jephthah! My name is ${name || 'Potential Client'}. I would like to schedule a discovery consultation regarding "${topic}".`;
    window.open(createWhatsAppUrl(config.whatsappNumber, msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book a Discovery Consultation"
      subtitle="1-on-1 technical scoping discussion with Jephthah Ozero"
      maxWidth="md"
    >
      <div className="space-y-6">
        {submitted ? (
          <div className="p-8 text-center space-y-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold font-display text-white">Consultation Request Received!</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jephthah Ozero will reach out via WhatsApp or email to confirm your time slot within 24 hours.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button size="sm" variant="primary" onClick={handleWhatsAppInstant} icon={<MessageSquare className="w-4 h-4 text-emerald-950" />}>
                Chat Instantly on WhatsApp
              </Button>
              <Button size="sm" variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Your Name *</label>
              <input
                type="text"
                placeholder="e.g. Samuel Okonkwo"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Email *</label>
                <input
                  type="email"
                  placeholder="samuel@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">WhatsApp Phone</label>
                <input
                  type="tel"
                  placeholder="+234..."
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Consultation Topic</label>
              <select
                value={topic}
                onChange={e => setTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              >
                <option value="New Web Application Scoping">New Web Application Scoping</option>
                <option value="E-commerce Architecture & Paystack">E-commerce Architecture & Paystack</option>
                <option value="Website Redesign & Mobile Speed Optimization">Website Redesign & Mobile Speed Optimization</option>
                <option value="Security Audit & Hardening Review">Security Audit & Hardening Review</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Preferred Schedule Time</label>
              <input
                type="text"
                placeholder="e.g. Wednesday 2:00 PM or Thursday Morning"
                value={preferredTime}
                onChange={e => setPreferredTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Brief Project Notes</label>
              <textarea
                rows={3}
                placeholder="Key goals or questions for the consultation..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
            </div>

            <Button size="md" variant="primary" type="submit" actionName="Submit Consultation" className="w-full mt-2">
              Book Discovery Session
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
};
