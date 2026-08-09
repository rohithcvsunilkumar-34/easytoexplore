import React from 'react';
import { Compass, ShieldCheck, Users, Map, Award, Heart } from 'lucide-react';
import { CtaBanner } from '@/components/home/CtaBanner';

export const metadata = {
  title: 'About Us | EasyToExplore',
  description: 'Learn about EasyToExplore — India’s leading premium travel concierge connecting travelers with authentic local experiences.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen space-y-16">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
          Our Journey & Story
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
          Unlocking the Extraordinary in Every Journey
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          EasyToExplore was built on a simple conviction: travel should be effortless, deeply authentic, and filled with unforgettable moments.
        </p>
      </div>

      {/* Story Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900">Empowering Local Experts & Crafting Safe Journeys</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From the serene houseboat waters of Srinagar’s Dal Lake to the living root bridges of Meghalaya and crystal coral reefs of Lakshadweep, we work directly with verified local guides and family-owned boutique stays.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              By removing middleman markups, we guarantee the best prices while empowering regional travel ecosystems across North, West, South, and North-East India.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600">25,000+</span>
                <span className="text-xs text-slate-500 block font-semibold">Travelers Served</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600">4.95 / 5</span>
                <span className="text-xs text-slate-500 block font-semibold">Average Rating</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600">100%</span>
                <span className="text-xs text-slate-500 block font-semibold">Price Guarantee</span>
              </div>
            </div>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
              alt="Our Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-300">Authentic Exploration</span>
              <h3 className="text-xl font-bold">Connecting travelers with local culture</h3>
            </div>
          </div>
        </div>
      </div>

      <CtaBanner />
    </div>
  );
}
