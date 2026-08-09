'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Destination } from '@/types';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { Button } from '@/components/ui/Button';

interface FeaturedDestinationsProps {
  destinations: Destination[];
}

export function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Mountain', 'Beach', 'Heritage', 'Adventure', 'Luxury', 'Nature'];

  const filteredDestinations =
    selectedCategory === 'All'
      ? destinations
      : destinations.filter((d) => d.category === selectedCategory);

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Handpicked Destinations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Iconic India Getaways
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              From snow-laden Kashmiri mountains to royal Rajasthan palaces & turquoise island lagoons in Lakshadweep.
            </p>
          </div>

          <Link href="/destinations">
            <Button variant="outline" size="md" className="hidden md:inline-flex border-slate-300 font-bold">
              View All Destinations <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Destinations' : cat}
            </button>
          ))}
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} viewMode="grid" />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center md:hidden pt-4">
          <Link href="/destinations">
            <Button size="lg" className="w-full">
              Explore All Destinations <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
