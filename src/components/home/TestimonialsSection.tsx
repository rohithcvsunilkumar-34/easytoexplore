'use client';

import React from 'react';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';
import { Review } from '@/types';

interface TestimonialsSectionProps {
  reviews: Review[];
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Real Traveler Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by 25,000+ Happy Explorers
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Read verified customer experiences from couples, families, and solo travelers across India.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 flex flex-col justify-between space-y-4 hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 relative group"
            >
              <Quote className="w-8 h-8 text-emerald-200 absolute top-6 right-6" />

              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">&ldquo;{rev.text}&rdquo;</p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <img
                  src={rev.authorAvatar}
                  alt={rev.authorName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.authorName}</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span>{rev.authorLocation}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold">{rev.destinationName}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
