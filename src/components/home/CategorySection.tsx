'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mountain, Palmtree, Castle, Compass, Trees, Sparkles } from 'lucide-react';
import { Category } from '@/types';

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  const iconMap: Record<string, React.ElementType> = {
    Mountain,
    Palmtree,
    Castle,
    Compass,
    Trees,
    Sparkles,
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Travel Styles
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find Your Preferred Way to Travel
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Whether you crave high-altitude snow treks, relaxing beach sunsets, or royal palace heritage tours.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || Compass;
            return (
              <Link
                key={cat.id}
                href={`/destinations?category=${encodeURIComponent(cat.slug)}`}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-end p-6 border border-slate-200/60"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                <div className="relative z-10 space-y-2 text-white">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-emerald-300 border border-white/20">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/80 text-slate-950 font-bold backdrop-blur-md">
                      {cat.count}+ Tours
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{cat.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
