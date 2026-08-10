'use client';

import React from 'react';
import { Send, PhoneCall, ShieldCheck } from 'lucide-react';
import { Destination } from '@/types';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';

export function DetailBookingTrigger({ destination }: { destination: Destination }) {
  const { openBookingDrawer } = useApp();

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-800 text-center space-y-6">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          Ready to Explore {destination.name}?
        </h3>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Get in touch with our travel experts to get a personalized itinerary and custom quote for your dream trip.
        </p>
        
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => openBookingDrawer(destination.slug)}
            size="lg"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 shadow-lg shadow-emerald-600/30"
          >
            <Send className="w-4 h-4 mr-2" /> Plan Your Trip
          </Button>
          
          <a
            href="tel:+919876543210"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-200 hover:text-white font-bold transition-all text-sm"
          >
            <PhoneCall className="w-4 h-4 text-emerald-500" /> +91 98765 43210
          </a>
        </div>

        <div className="pt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Instant custom quote sent to your WhatsApp/Email within 2 hours.</span>
        </div>
      </div>
    </div>
  );
}
