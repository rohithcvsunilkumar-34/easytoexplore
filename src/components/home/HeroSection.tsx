'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Award, ShieldCheck, Users, Star } from 'lucide-react';
import { SearchFilterBar } from './SearchFilterBar';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';

export function HeroSection() {
  const { openBookingDrawer } = useApp();

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2000&q=80',
      title: 'Paradise on Earth in Kashmir',
      subtitle: 'Tranquil houseboats on Dal Lake, snow peaks in Gulmarg & Lidder Valley',
      location: 'Kashmir Valley',
    },
    {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
      title: 'Exotic Turquoise Lagoons',
      subtitle: 'Unspoiled coral reefs & sea turtle snorkeling sanctuaries in Lakshadweep',
      location: 'Lakshadweep Islands',
    },
    {
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2000&q=80',
      title: 'Royal Rajasthan Fortresses',
      subtitle: 'Opulent pink palaces, romantic lake castles & Thar desert starlit safari',
      location: 'Rajasthan Circuit',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md border border-white/20 transition-all hidden md:flex"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md border border-white/20 transition-all hidden md:flex"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-white/50'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Main Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white w-full space-y-8">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>India’s Most Trusted Travel Experience Provider</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          key={`headline-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white drop-shadow-lg">
            Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Extraordinary</span>
          </h1>
          <p className="text-lg sm:text-2xl text-slate-200 font-medium max-w-2xl mx-auto drop-shadow-md">
            {slides[currentSlide].subtitle}
          </p>
        </motion.div>

        {/* Floating Stats Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-slate-200 pt-2"
        >
          <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>4.9/5 Customer Rating</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>25,000+ Happy Travelers</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>100% Price Match Guarantee</span>
          </div>
        </motion.div>

        {/* Embedded Interactive Search Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-4 max-w-5xl mx-auto text-left"
        >
          <SearchFilterBar />
        </motion.div>
      </div>
    </section>
  );
}
