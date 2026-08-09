'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, Utensils, Hotel, CheckCircle2 } from 'lucide-react';
import { DayItinerary } from '@/types';

interface ItineraryAccordionProps {
  itinerary: DayItinerary[];
}

export function ItineraryAccordion({ itinerary }: ItineraryAccordionProps) {
  // Open day 1 by default
  const [openDays, setOpenDays] = useState<number[]>([1]);

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  return (
    <div className="space-y-4">
      {itinerary.map((day) => {
        const isOpen = openDays.includes(day.day);
        return (
          <div
            key={day.day}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'border-emerald-500/80 bg-white shadow-md'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            {/* Header button */}
            <button
              onClick={() => toggleDay(day.day)}
              className="w-full p-5 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-sm flex items-center justify-center border border-emerald-200/60 shrink-0">
                  Day {day.day}
                </span>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base md:text-lg">{day.title}</h4>
                  {day.meal && (
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      <Utensils className="w-3 h-3 text-emerald-600" /> {day.meal}
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`p-2 rounded-full bg-slate-100 text-slate-600 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 bg-emerald-50 text-emerald-700' : ''
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Expandable Details */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-4"
                >
                  <p className="text-sm text-slate-600 leading-relaxed pt-2">{day.description}</p>

                  {/* Stay details */}
                  {day.stay && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                      <Hotel className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Overnight Accommodation: <strong className="text-slate-900">{day.stay}</strong></span>
                    </div>
                  )}

                  {/* Activity Pills */}
                  {day.activities && day.activities.length > 0 && (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Key Activities</span>
                      <div className="flex flex-wrap gap-2">
                        {day.activities.map((act, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
