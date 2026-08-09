'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Compass, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { destinationsData } from '@/data/destinations';
import { Button } from '@/components/ui/Button';

export function SearchFilterBar() {
  const router = useRouter();
  const { setFilters } = useApp();

  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [maxBudget, setMaxBudget] = useState('40000');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      search: selectedDestination,
      category: selectedCategory || 'All',
      duration: selectedDuration || 'All',
      maxPrice: Number(maxBudget),
    }));

    const queryParams = new URLSearchParams();
    if (selectedDestination) queryParams.set('search', selectedDestination);
    if (selectedCategory && selectedCategory !== 'All') queryParams.set('category', selectedCategory);
    if (selectedDuration && selectedDuration !== 'All') queryParams.set('duration', selectedDuration);
    if (maxBudget) queryParams.set('maxPrice', maxBudget);

    router.push(`/destinations?${queryParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 text-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
    >
      {/* 1. Destination Dropdown */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Destination
        </label>
        <select
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        >
          <option value="">Any Location in India</option>
          {destinationsData.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name} ({d.region})
            </option>
          ))}
        </select>
      </div>

      {/* 2. Travel Style Category */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-emerald-600" /> Travel Style
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        >
          <option value="">All Travel Styles</option>
          <option value="Mountain">Mountain & Snow</option>
          <option value="Beach">Tropical Beaches</option>
          <option value="Heritage">Royal Heritage</option>
          <option value="Adventure">Adventure Sports</option>
          <option value="Luxury">Luxury & Wellness</option>
          <option value="Nature">Unspoiled Nature</option>
        </select>
      </div>

      {/* 3. Duration Selector */}
      <div>
        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Duration
        </label>
        <select
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        >
          <option value="">Any Duration</option>
          <option value="Short (1-4 Days)">Short (1-4 Days)</option>
          <option value="Medium (5-6 Days)">Medium (5-6 Days)</option>
          <option value="Long (7+ Days)">Long (7+ Days)</option>
        </select>
      </div>

      {/* 4. Search Submit CTA */}
      <div>
        <Button
          type="submit"
          size="lg"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/30 active:scale-95"
        >
          <Search className="w-4 h-4" /> Find Packages
        </Button>
      </div>
    </form>
  );
}
