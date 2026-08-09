'use client';

import React from 'react';
import { Compass, ShieldCheck, Headset, Sparkles, Map, HeartHandshake } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: Map,
      title: 'Expert Local Guides',
      description: 'Handpicked local storytellers and mountain guides born & raised in the region for authentic cultural immersion.',
      badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      icon: ShieldCheck,
      title: 'Best Price Guarantee',
      description: 'Direct resort, houseboat, and cab partner pricing. Zero hidden commissions or booking fees guaranteed.',
      badgeColor: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      icon: Headset,
      title: '24/7 Dedicated Support',
      description: 'Personal travel concierge assigned to your trip, available on WhatsApp & Phone round-the-clock.',
      badgeColor: 'bg-sky-50 text-sky-600 border-sky-200',
    },
    {
      icon: HeartHandshake,
      title: 'Customized Itineraries',
      description: 'Tailor every detail of your vacation — from luxury houseboats & scuba diving to vegetarian culinary plans.',
      badgeColor: 'bg-rose-50 text-rose-600 border-rose-200',
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Why EasyToExplore
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Crafting Unforgettable Memories with Seamless Excellence
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We handle every detail from airport greeting to departure, ensuring your vacation is relaxed, safe, and truly extraordinary.
          </p>
        </div>

        {/* 4 Column Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group space-y-4"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xs group-hover:scale-110 transition-transform ${item.badgeColor}`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
