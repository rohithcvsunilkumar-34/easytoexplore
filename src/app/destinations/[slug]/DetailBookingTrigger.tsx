'use client';

import React from 'react';
import { Send, PhoneCall, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { Destination } from '@/types';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

export function DetailBookingTrigger({ destination }: { destination: Destination }) {
  const { openBookingDrawer, isWishlisted, toggleWishlist } = useApp();
  const wishlisted = isWishlisted(destination.slug);

  const primaryPackage = destination.packages[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xl space-y-6 sticky top-24">
      {/* Price Header */}
      <div className="pb-4 border-b border-slate-100 space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Starting From</span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900">{formatCurrency(destination.price)}</span>
          <span className="text-xs text-slate-500 font-semibold">/ per person</span>
        </div>
        <p className="text-xs text-emerald-600 font-bold">100% Price Match & Zero Hidden Fees</p>
      </div>

      {/* Package Summary */}
      {primaryPackage && (
        <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">Included Perks</span>
          <div className="space-y-2 text-xs text-slate-700 font-semibold">
            {primaryPackage.inclusions.map((inc, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => openBookingDrawer(destination.slug, primaryPackage?.id)}
          size="lg"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 shadow-lg shadow-emerald-600/30"
        >
          <Send className="w-4 h-4" /> Book Inquiry Now
        </Button>

        <button
          onClick={() => toggleWishlist(destination.slug)}
          className={`w-full py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            wishlisted
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
          {wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
        </button>
      </div>

      {/* Trust & Assistance */}
      <div className="space-y-3 pt-2 text-xs text-slate-500">
        <div className="flex items-start gap-2 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>Instant custom quote sent to your WhatsApp within 2 hours.</span>
        </div>

        <a
          href="tel:+919876543210"
          className="flex items-center justify-center gap-2 text-xs font-bold text-slate-800 hover:text-emerald-600 transition-colors pt-1"
        >
          <PhoneCall className="w-4 h-4 text-emerald-600" /> Need Help? Call +91 98765 43210
        </a>
      </div>
    </div>
  );
}
