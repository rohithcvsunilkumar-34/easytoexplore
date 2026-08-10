import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, MapPin, CheckCircle2, Calendar, Thermometer, ArrowLeft } from 'lucide-react';
import { getDestinationBySlug, getDestinations } from '@/lib/api';
import { Badge } from '@/components/ui/Badge';
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
    title: `${destination.name} Travel Guide | EasyToExplore`,
    description: destination.description,
    openGraph: {
      title: `${destination.name} - Explore Paradise`,
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

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* 1. Hero Cover Banner */}
      <div className="relative h-[60vh] min-h-[400px] bg-slate-950 text-white overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Back navigation button */}
        <div className="absolute top-28 left-4 sm:left-8 z-20">
          <Link 
            href="/destinations" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-full border border-slate-700/60 shadow-lg transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Destinations
          </Link>
        </div>

        <div className="absolute bottom-10 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 z-10 text-white space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="emerald" size="md">
              {destination.category}
            </Badge>
            <span className="text-xs font-semibold text-emerald-300 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700 backdrop-blur-md flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {destination.region}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md">
            {destination.name}
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 font-medium max-w-3xl drop-shadow-sm">
            {destination.subtitle}
          </p>
        </div>
      </div>

      {/* 2. Main Content Grid (Centered Single Column) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-12 relative z-10">
        
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
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">About {destination.name}</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{destination.description}</p>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4">Key Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.highlights.map((h, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Attractions & Experiences */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900">Visiting Places & Experiences</h2>
            <p className="text-xs sm:text-sm text-slate-500">Don&apos;t miss these top sights and activities in {destination.name}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {destination.popularSpots.map((spot) => (
              <div key={spot.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden group flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
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
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">{spot.name}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{spot.description}</p>
                  </div>
                  {spot.duration && (
                    <div className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" /> Suggested: {spot.duration}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Destination Photo Gallery */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900">Photo Gallery</h2>
            <p className="text-xs sm:text-sm text-slate-500">Visual glimpses from {destination.name}</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {destination.gallery.map((img, idx) => (
              <div key={idx} className="h-32 sm:h-40 rounded-2xl overflow-hidden border border-slate-200 shadow-xs group relative">
                <img 
                  src={img} 
                  alt={`${destination.name} Gallery ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-350" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-200" />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Enquiry / Quote CTA Card */}
        <div className="pt-4">
          <DetailBookingTrigger destination={destination} />
        </div>

      </div>
    </div>
  );
}
