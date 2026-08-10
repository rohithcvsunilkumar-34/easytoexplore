'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Search, Heart, Menu, X, ArrowRight, PhoneCall } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const pathname = usePathname();
  const { wishlist, openBookingDrawer, setSearchQuery } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations' },
    // { name: 'Tour Packages', href: '/packages' }, // Hidden for now, can be re-enabled later
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      setIsSearchOpen(false);
      window.location.href = `/destinations?search=${encodeURIComponent(searchInput)}`;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800 text-white py-3'
            : pathname === '/'
            ? 'bg-gradient-to-b from-slate-900/80 via-slate-900/30 to-transparent text-white py-5'
            : 'bg-slate-900 text-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-900 font-bold shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-slate-950 animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                Easy<span className="text-emerald-400">To</span>Explore
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-slate-300">Premium Travel Journeys</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 relative py-1 ${
                    isActive ? 'text-emerald-400 font-bold' : 'text-slate-200 hover:text-emerald-400'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors border border-slate-700/60"
              title="Search Destinations"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/destinations?wishlist=true"
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-rose-400 transition-colors border border-slate-700/60 relative"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Primary CTA */}
            <Button
              onClick={() => openBookingDrawer()}
              size="md"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
            >
              Plan Your Trip <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/destinations?wishlist=true"
              className="p-2 rounded-lg bg-slate-800 text-slate-200 relative"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Modal Bar (Expandable) */}
        {isSearchOpen && (
          <div className="bg-slate-900 border-t border-b border-slate-800 py-3 px-4 shadow-xl">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search Kashmir, Manali, Goa, Taj Mahal, Scuba Diving..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-slate-800 text-white placeholder-slate-400 px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-6 text-white md:hidden">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
              <Compass className="w-7 h-7 text-emerald-400" />
              <span className="text-xl font-bold">EasyToExplore</span>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-800 text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-6 text-lg font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 border-b border-slate-800/60 ${
                  pathname === link.href ? 'text-emerald-400 font-bold' : 'text-slate-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-800">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 text-sm text-slate-300 bg-slate-900 p-3.5 rounded-xl border border-slate-800"
            >
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-xs text-slate-400">24/7 Travel Helpline</p>
                <p className="font-semibold text-white">+91 98765 43210</p>
              </div>
            </a>
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBookingDrawer();
              }}
              size="lg"
              className="w-full bg-emerald-500 text-slate-950 font-bold"
            >
              Plan Your Trip
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
