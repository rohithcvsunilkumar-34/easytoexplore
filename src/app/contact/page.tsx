'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the booking process work?',
      a: 'Select your preferred destination or package and click "Book Inquiry". Our local travel advisor will contact you within 2 hours with a customized day-by-day itinerary and exact cost breakdown.',
    },
    {
      q: 'Can I customize my itinerary (hotel tier, vegetarian food, extra days)?',
      a: 'Yes, 100%! All EasyToExplore packages are fully customizable. You can request 5-star resort upgrades, private houseboats, specific food preferences, or additional adventure sports.',
    },
    {
      q: 'What is the payment & cancellation policy?',
      a: 'We require a small 20% deposit to confirm hotel & vehicle permits. The remaining amount is payable upon arrival at the destination. Full refund for cancellations made up to 14 days before travel.',
    },
    {
      q: 'Are local guides and airport transfers included?',
      a: 'Yes, all our holiday packages include private AC vehicle transfers from arrival airport/railway station right up to departure, along with certified local guides for major attractions.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Thank you! Your message has been sent. We will respond within 2 hours.');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
          We’re Here to Help Plan Your Dream Trip
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          Have questions about Kashmir permits, Lakshadweep flight connections, or custom Rajasthan itineraries? Speak with our travel experts.
        </p>
      </div>

      {/* Main Grid: Form + Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-8 shadow-xl border border-slate-800">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Contact Information</h2>
              <p className="text-xs text-slate-400">Available 24/7 for urgent travel assistance and booking queries.</p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">24/7 Helpline</span>
                  <a href="tel:+919876543210" className="font-bold text-white hover:text-emerald-400 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Email Us</span>
                  <a href="mailto:hello@easytoexplore.com" className="font-bold text-white hover:text-emerald-400 transition-colors">
                    hello@easytoexplore.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Head Office</span>
                  <p className="font-medium text-slate-200 leading-relaxed text-xs">
                    EasyToExplore Travel Ltd., Connaught Place, New Delhi & Boulevard Road, Srinagar, J&K, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Send Us a Direct Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Rohith CV"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Message / Destination Query</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us where you want to travel, dates, and number of guests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full bg-emerald-600 text-white font-bold">
                <Send className="w-4 h-4" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-600" /> Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">Quick answers to common questions about traveling with EasyToExplore</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left font-bold text-slate-900 text-sm sm:text-base cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>
                {isOpen && <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">{faq.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
