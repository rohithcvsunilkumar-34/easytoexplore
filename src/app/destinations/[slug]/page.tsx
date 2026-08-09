import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, Clock, MapPin, CheckCircle2, Calendar, Thermometer, ShieldCheck, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { getDestinationBySlug, getDestinations } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ItineraryAccordion } from '@/components/destinations/ItineraryAccordion';
import { DetailBookingTrigger } from './DetailBookingTrigger';

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return { title: 'Destination Not Found | EasyToExplore' };

  return {
    title: `${destination.name} Tour Package & Itinerary | EasyToExplore`,
    description: destination.description,
    openGraph: {
      title: `${destination.name} - Paradise Travel Experience`,
      description: destination.subtitle,
      images: [destination.heroImage],
    },
  };
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const primaryPackage = destination.packages[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* 1. Hero Gallery Banner */}
      <div className="relative h-[65vh] min-h-[480px] bg-slate-950 text-white overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        <div className="absolute bottom-10 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-white space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="emerald" size="md">
              {destination.category}
            </Badge>
            <span className="text-xs font-semibold text-emerald-300 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700 backdrop-blur-md flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {destination.region}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{destination.rating}</span>
              <span className="text-slate-500 font-normal">({destination.reviewsCount} verified reviews)</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md">
            {destination.name}
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 font-medium max-w-3xl drop-shadow-sm">
            {destination.subtitle}
          </p>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Main Column (Overview, Highlights, Itinerary, Spots) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Fact Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> Duration
                </span>
                <span className="text-sm font-bold text-slate-900">{destination.duration}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Best Season
                </span>
                <span className="text-xs font-bold text-slate-900 truncate block" title={destination.bestTimeToVisit}>
                  {destination.bestTimeToVisit}
                </span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-emerald-600" /> Weather Range
                </span>
                <span className="text-xs font-bold text-slate-900">{destination.weatherTemp}</span>
              </div>
            </div>

            {/* About & Overview */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900">Destination Overview</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{destination.description}</p>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3">Key Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {destination.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Attractions Grid */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900">Top Attractions & Experiences</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {destination.popularSpots.map((spot) => (
                  <div key={spot.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden group">
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {spot.tag && (
                        <div className="absolute top-3 left-3">
                          <Badge variant="emerald">{spot.tag}</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="font-bold text-slate-900 text-base">{spot.name}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{spot.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-Day Itinerary Accordion */}
            {primaryPackage && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">Tour Itinerary breakdown</h2>
                    <p className="text-xs text-slate-500">{primaryPackage.title}</p>
                  </div>
                  <Badge variant="emerald">{primaryPackage.duration}</Badge>
                </div>

                <ItineraryAccordion itinerary={primaryPackage.itinerary} />
              </div>
            )}

            {/* Photo Gallery Grid */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900">Destination Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {destination.gallery.map((img, idx) => (
                  <div key={idx} className="h-32 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                    <img src={img} alt={`${destination.name} ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Column (Price Card & Inquiry Widget) */}
          <div className="lg:col-span-1">
            <DetailBookingTrigger destination={destination} />
          </div>
        </div>
      </div>
    </div>
  );
}
