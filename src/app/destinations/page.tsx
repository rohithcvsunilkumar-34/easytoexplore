'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LayoutGrid, List, RotateCcw, FilterX } from 'lucide-react';
import { destinationsData } from '@/data/destinations';
import { useApp } from '@/context/AppContext';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { Button } from '@/components/ui/Button';

function DestinationsContent() {
  const searchParams = useSearchParams();
  const { filters, setFilters, resetFilters, wishlist } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popularity' | 'name-asc'>('popularity');

  const isWishlistOnly = searchParams.get('wishlist') === 'true';
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const regionParam = searchParams.get('region');

  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
    if (searchParam) {
      setFilters((prev) => ({ ...prev, search: searchParam }));
    }
    if (regionParam) {
      setFilters((prev) => ({ ...prev, region: regionParam }));
    }
  }, [categoryParam, searchParam, regionParam, setFilters]);

  // Filter & Sort Logic
  const filteredDestinations = useMemo(() => {
    let result = [...destinationsData];

    if (isWishlistOnly) {
      result = result.filter((d) => wishlist.includes(d.slug));
    }

    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.subtitle.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q) ||
          d.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    if (filters.region && filters.region !== 'All') {
      result = result.filter((d) => d.region === filters.region);
    }

    if (filters.category && filters.category !== 'All') {
      result = result.filter((d) => d.category === filters.category);
    }

    if (filters.duration && filters.duration !== 'All') {
      if (filters.duration === 'Short (1-4 Days)') {
        result = result.filter((d) => d.durationDays <= 4);
      } else if (filters.duration === 'Medium (5-6 Days)') {
        result = result.filter((d) => d.durationDays >= 5 && d.durationDays <= 6);
      } else if (filters.duration === 'Long (7+ Days)') {
        result = result.filter((d) => d.durationDays >= 7);
      }
    }

    // Sorting
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [filters, isWishlistOnly, wishlist, sortBy]);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800">
              {isWishlistOnly ? 'Your Saved Wishlist' : 'Explore All Destinations'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {isWishlistOnly ? 'Saved Travel Wishlist' : 'Discover Extraordinary Destinations'}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Browse our handpicked list of extraordinary holiday getaways.
            </p>
          </div>
        </div>

        {/* Toolbar & Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl font-bold border border-emerald-200">
              {filteredDestinations.length} Destinations Found
            </span>
            {isWishlistOnly && (
              <span className="text-xs text-slate-500 font-normal">
                (Showing your saved wishlist items)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span className="hidden sm:inline text-slate-500">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="popularity">Most Popular</option>
                <option value="name-asc">Name (A-Z)</option>
              </select>
            </div>

            {/* Grid vs List View Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-xs text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width Destination Cards Display */}
        <div className="w-full">
          {filteredDestinations.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'flex flex-col gap-6'
              }
            >
              {filteredDestinations.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            /* No Results Matching Filter */
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-4 max-w-md mx-auto my-12">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <FilterX className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No Destinations Found</h3>
              <p className="text-xs text-slate-600">
                {isWishlistOnly
                  ? 'You have not added any destinations to your wishlist yet. Browse destinations and click the heart icon!'
                  : 'We could not find any destinations matching your search parameters.'}
              </p>
              <Button onClick={resetFilters} variant="outline" size="md">
                <RotateCcw className="w-4 h-4" /> Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center py-20">Loading Destinations...</div>}>
      <DestinationsContent />
    </Suspense>
  );
}
