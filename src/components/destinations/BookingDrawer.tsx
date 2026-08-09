'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Send, CheckCircle2, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { destinationsData } from '@/data/destinations';
import { submitInquiry } from '@/lib/api';

export function BookingDrawer() {
  const { isBookingOpen, closeBookingDrawer, selectedDestinationSlug, selectedPackageId, showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [destinationSlug, setDestinationSlug] = useState(selectedDestinationSlug || 'kashmir');
  const [packageId, setPackageId] = useState(selectedPackageId || '');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (selectedDestinationSlug) {
      setDestinationSlug(selectedDestinationSlug);
    }
    if (selectedPackageId) {
      setPackageId(selectedPackageId);
    }
  }, [selectedDestinationSlug, selectedPackageId]);

  const selectedDestination = destinationsData.find((d) => d.slug === destinationSlug) || destinationsData[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !preferredDate) {
      showToast('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitInquiry({
        fullName,
        email,
        phone,
        preferredDate,
        guests,
        destinationSlug,
        packageId,
        specialRequests,
      });

      if (res.success) {
        setIsSuccess(true);
        showToast(`Inquiry sent for ${selectedDestination.name}!`);
        setTimeout(() => {
          setIsSuccess(false);
          closeBookingDrawer();
          // Reset form
          setFullName('');
          setEmail('');
          setPhone('');
          setPreferredDate('');
          setSpecialRequests('');
        }, 2200);
      }
    } catch {
      showToast('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBookingDrawer}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200"
            >
              {/* Drawer Header */}
              <div className="p-6 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">EasyToExplore Concierge</span>
                  </div>
                  <button
                    onClick={closeBookingDrawer}
                    className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white mt-2">Quick Booking Inquiry</h2>
                <p className="text-xs text-slate-300 mt-1">Get customized itinerary details & lowest price quote within 2 hours.</p>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {isSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Inquiry Submitted!</h3>
                    <p className="text-sm text-slate-600 max-w-xs mx-auto">
                      Thank you <span className="font-semibold text-slate-900">{fullName}</span>. Our local travel advisor for{' '}
                      <span className="text-emerald-600 font-semibold">{selectedDestination.name}</span> will get in touch shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Destination Select */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                        Target Destination
                      </label>
                      <select
                        value={destinationSlug}
                        onChange={(e) => setDestinationSlug(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium"
                      >
                        {destinationsData.map((d) => (
                          <option key={d.id} value={d.slug}>
                            {d.name} ({d.duration}) - Starting {d.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rohith Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                      />
                    </div>

                    {/* Email & Phone grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          Phone / WhatsApp <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                        />
                      </div>
                    </div>

                    {/* Date & Guests grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          Preferred Travel Date <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                          No. of Travelers
                        </label>
                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                            className="px-3 py-2.5 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center text-sm font-semibold text-slate-900">{guests} Guests</span>
                          <button
                            type="button"
                            onClick={() => setGuests(guests + 1)}
                            className="px-3 py-2.5 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                        Custom Requirements / Notes
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Honeymoon setup, vegetarian meals, flight assistance..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                      />
                    </div>

                    {/* Security Guarantee */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3 text-xs text-emerald-800">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">100% Free & No Commitment</span>
                        <p className="text-emerald-700/90 mt-0.5">Instant response, best price match guarantee, and zero hidden charges.</p>
                      </div>
                    </div>

                    <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
                      <Send className="w-4 h-4" /> Send Free Inquiry
                    </Button>
                  </form>
                )}

                {/* Direct Call Assistance */}
                <div className="pt-4 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-500 mb-2">Prefer to speak right now?</p>
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-emerald-600 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-600" /> +91 98765 43210 (24/7 Helpline)
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
