import React from 'react';
import { getAllPackages } from '@/lib/api';
import { PopularPackages } from '@/components/home/PopularPackages';
import { CtaBanner } from '@/components/home/CtaBanner';

export const metadata = {
  title: 'All Tour Packages | EasyToExplore',
  description: 'Explore all-inclusive holiday itineraries for Kashmir, Goa, Rajasthan, Lakshadweep, Manali, Meghalaya, Delhi & Agra.',
};

export default async function PackagesPage() {
  const packages = await getAllPackages();

  return (
    <div className="pt-24 min-h-screen bg-slate-900 text-white">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 text-center space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-4 py-1.5 rounded-full border border-emerald-800">
          All Tour Packages
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Curated All-Inclusive Holiday Packages
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          Handpicked luxury stays, private sightseeing transfers, local certified guides, and gourmet meals included.
        </p>
      </div>

      <PopularPackages packages={packages} />
      <CtaBanner />
    </div>
  );
}
