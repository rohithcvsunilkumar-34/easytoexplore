'use client';

import React from 'react';
import { Filter, Search, RotateCcw, SlidersHorizontal, MapPin, DollarSign, Calendar, Star, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

export function FilterSidebar() {
  const { filters, setFilters, resetFilters } = useApp();

  const regions = ['All', 'North India', 'West India', 'South India', 'North East India', 'Islands'];
  const categories = ['All', 'Mountain', 'Beach', 'Heritage', 'Adventure', 'Luxury', 'Nature'];
  const durations = ['All', 'Short (1-4 Days)', 'Medium (5-6 Days)', 'Long (7+ Days)'];

  return (
    <aside className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6 sticky top-24">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
          <h2 className="font-bold text-slate-900 text-base">Filter Destinations</h2>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-500 hover:text-emerald-600 font-semibold flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Real-time Search Input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Search Keywords</label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="e.g. Kashmir, Snow, Scuba..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Region Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Region
        </label>
        <div className="flex flex-wrap gap-1.5">
          {regions.map((reg) => {
            const isSelected = filters.region === reg;
            return (
              <button
                key={reg}
                onClick={() => setFilters((prev) => ({ ...prev, region: reg }))}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {reg}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Travel Style
        </label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Max Budget</label>
          <span className="text-sm font-extrabold text-emerald-600">{formatCurrency(filters.maxPrice)}</span>
        </div>
        <input
          type="range"
          min="8000"
          max="40000"
          step="1000"
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-emerald-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-1">
          <span>₹8,000</span>
          <span>₹40,000+</span>
        </div>
      </div>

      {/* Duration Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Trip Duration
        </label>
        <div className="space-y-1.5">
          {durations.map((dur) => (
            <label key={dur} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="duration"
                checked={filters.duration === dur}
                onChange={() => setFilters((prev) => ({ ...prev, duration: dur }))}
                className="accent-emerald-600"
              />
              <span>{dur}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-500" /> Rating Threshold
        </label>
        <select
          value={filters.minRating}
          onChange={(e) => setFilters((prev) => ({ ...prev, minRating: Number(e.target.value) }))}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value={0}>All Ratings</option>
          <option value={4.5}>4.5 Stars & Above</option>
          <option value={4.8}>4.8 Stars & Above (Top Rated)</option>
          <option value={4.9}>4.9+ Stars (Highest Customer Choice)</option>
        </select>
      </div>
    </aside>
  );
}
