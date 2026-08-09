'use client';

import React from 'react';
import { Sparkles, Send, PhoneCall, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';

export function CtaBanner() {
  const { openBookingDrawer } = useApp();

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Dynamic Background Image overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2000&q=80"
          alt="Kashmir Paradise"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-slate-900/90 to-emerald-950/80 rounded-3xl p-8 sm:p-14 border border-emerald-500/30 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Tailor-Made Holiday Packages</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Ready for Your Next Extraordinary Adventure?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect with our local travel experts today for a free custom itinerary quote, best price guarantee, and 24/7 on-ground assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <Button
              onClick={() => openBookingDrawer()}
              size="lg"
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 text-base shadow-xl shadow-emerald-500/25"
            >
              <Send className="w-5 h-5" /> Request Custom Itinerary
            </Button>
            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto px-6 py-4 rounded-xl border border-slate-700 hover:border-emerald-400 text-slate-200 hover:text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition-colors bg-slate-900/60"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" /> +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
