'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, MapPin, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Destination } from '@/types';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface DestinationCardProps {
  destination: Destination;
  viewMode?: 'grid' | 'list';
}

export function DestinationCard({ destination, viewMode = 'grid' }: DestinationCardProps) {
  const { isWishlisted, toggleWishlist } = useApp();
  const wishlisted = isWishlisted(destination.slug);

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row group"
      >
        {/* Image Container */}
        <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden shrink-0">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent md:hidden" />

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(destination.slug)}
            className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg backdrop-blur-md transition-transform active:scale-90 ${
              wishlisted ? 'bg-rose-500 text-white' : 'bg-slate-900/60 hover:bg-slate-900 text-white'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
          </button>

          {/* Category Pill */}
          <div className="absolute top-4 left-4">
            <Badge variant="emerald">{destination.category}</Badge>
          </div>
        </div>

        {/* Details Container */}
        <div className="p-6 md:w-3/5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {destination.region}
              </span>
            </div>

            <Link href={`/destinations/${destination.slug}`}>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {destination.name}
              </h3>
            </Link>
            <p className="text-xs text-emerald-700 font-medium mb-3">{destination.subtitle}</p>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">{destination.description}</p>

            {/* Highlights */}
            <div className="space-y-1.5 mb-4">
              {destination.highlights.slice(0, 2).map((h, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> {destination.duration}
            </span>

            <div className="flex items-center gap-2">
              <Link href={`/destinations/${destination.slug}`}>
                <Button className="bg-slate-900 hover:bg-emerald-600 text-white font-semibold flex items-center gap-1" size="sm">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View Default
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group h-full"
    >
      {/* Image Banner */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Badge variant="emerald">{destination.category}</Badge>
          <button
            onClick={() => toggleWishlist(destination.slug)}
            className={`p-2 rounded-full shadow-lg backdrop-blur-md transition-transform active:scale-90 ${
              wishlisted ? 'bg-rose-50 text-white' : 'bg-slate-900/60 hover:bg-slate-900 text-white'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Overlay Details */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1">
            <MapPin className="w-3.5 h-3.5" /> {destination.region}
            <span className="text-slate-400">•</span>
            <Clock className="w-3.5 h-3.5" /> {destination.duration}
          </div>
          <Link href={`/destinations/${destination.slug}`}>
            <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors drop-shadow-sm">
              {destination.name}
            </h3>
          </Link>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 truncate">{destination.subtitle}</span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">{destination.description}</p>

          <div className="space-y-1">
            {destination.highlights.slice(0, 2).map((h, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-slate-400">{destination.duration}</span>

          <Link href={`/destinations/${destination.slug}`}>
            <Button size="sm" className="bg-slate-900 hover:bg-emerald-600 text-white font-semibold">
              Explore <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
