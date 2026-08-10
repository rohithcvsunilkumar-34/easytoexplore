'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Mail, Phone, MapPin, Send, Globe, Share2, MessageCircle, Tv, Shield, Award, Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Footer() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Thank you for subscribing to EasyToExplore travel deals!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Easy<span className="text-emerald-400">To</span>Explore
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Crafting extraordinary journey experiences across India’s most breathtaking destinations. Verified local experts, 100% price match guarantee, and 24/7 dedicated travel concierge.
            </p>

            {/* Value Badges */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                <Shield className="w-4 h-4 text-emerald-400" /> Safe & Certified
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                <Award className="w-4 h-4 text-amber-400" /> Best Price Guarantee
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinations" className="hover:text-emerald-400 transition-colors">
                  All Destinations
                </Link>
              </li>
              {/* <li>
                <Link href="/packages" className="hover:text-emerald-400 transition-colors">
                  Tour Packages
                </Link>
              </li> */}
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact & FAQs
                </Link>
              </li>
              <li>
                <Link href="/destinations?wishlist=true" className="hover:text-emerald-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations Tags */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Top Destinations</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Kashmir', slug: 'kashmir' },
                { name: 'Manali', slug: 'manali' },
                { name: 'Goa', slug: 'goa' },
                { name: 'Rajasthan', slug: 'rajasthan' },
                { name: 'Agra', slug: 'agra' },
                { name: 'Lakshadweep', slug: 'lakshadweep' },
                { name: 'Meghalaya', slug: 'meghalaya' },
                { name: 'Delhi', slug: 'delhi' },
              ].map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 border border-slate-800 transition-colors"
                >
                  {dest.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Subscribe for Deals</h3>
            <p className="text-xs text-slate-400">Receive secret discounts, seasonal offers, and curated travel guides directly to your inbox.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-lg flex items-center justify-center font-bold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-emerald-400 hover:bg-slate-800 transition-colors" title="Official Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-emerald-400 hover:bg-slate-800 transition-colors" title="Social Community">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-emerald-400 hover:bg-slate-800 transition-colors" title="WhatsApp Support">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-emerald-400 hover:bg-slate-800 transition-colors" title="Travel Vlogs">
                <Tv className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" /> New Delhi & Srinagar, India
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-400" /> +91 98765 43210
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-emerald-400" /> hello@easytoexplore.com
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} EasyToExplore Travel Ltd. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Travelers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
