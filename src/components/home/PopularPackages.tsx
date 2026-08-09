'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Users, Hotel, CheckCircle2, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { Package } from '@/types';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

interface PopularPackagesProps {
  packages: Package[];
}

export function PopularPackages({ packages }: PopularPackagesProps) {
  const { openBookingDrawer } = useApp();

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-800">
              Curated Tour Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Best Selling All-Inclusive Itineraries
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Complete holiday packages with handpicked luxury stays, private sightseeing cabs, certified guides & meals included.
            </p>
          </div>

          <Link href="/packages">
            <Button variant="outline" size="md" className="hidden md:inline-flex border-slate-700 text-white hover:bg-slate-800 font-bold">
              View All Tour Packages <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.slice(0, 6).map((pkg) => (
            <div
              key={pkg.id}
              className="bg-slate-800/80 rounded-3xl border border-slate-700/80 p-6 flex flex-col justify-between space-y-6 hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-950/40 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Top Tags */}
                <div className="flex items-center justify-between">
                  <Badge variant="emerald">{pkg.destinationName}</Badge>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-300 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> {pkg.duration}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <Link href={`/destinations/${pkg.destinationSlug}`}>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {pkg.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{pkg.subtitle}</p>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/80 p-3 rounded-2xl border border-slate-700/60">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Hotel className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{pkg.hotelRating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{pkg.groupSize}</span>
                  </div>
                </div>

                {/* Included Amenities Badges */}
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Inclusions
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.inclusions.map((inc, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-[11px] font-medium border border-slate-700 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" /> {inc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    {pkg.discountPrice && (
                      <span className="text-xs text-slate-500 line-through">{formatCurrency(pkg.discountPrice)}</span>
                    )}
                    <span className="text-xl font-black text-emerald-400">{formatCurrency(pkg.price)}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">per person on twin sharing</span>
                </div>

                <Button
                  onClick={() => openBookingDrawer(pkg.destinationSlug, pkg.id)}
                  size="md"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                >
                  Quick Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
