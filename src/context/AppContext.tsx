'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FilterState } from '@/types';

interface AppContextType {
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  isBookingOpen: boolean;
  selectedDestinationSlug?: string;
  selectedPackageId?: string;
  openBookingDrawer: (destinationSlug?: string, packageId?: string) => void;
  closeBookingDrawer: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
  hideToast: () => void;
}

const initialFilters: FilterState = {
  search: '',
  region: 'All',
  category: 'All',
  minPrice: 0,
  maxPrice: 40000,
  duration: 'All',
  minRating: 0,
  sortBy: 'popularity',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDestinationSlug, setSelectedDestinationSlug] = useState<string | undefined>(undefined);
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('easytoexplore_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) => {
      let updated: string[];
      if (prev.includes(slug)) {
        updated = prev.filter((item) => item !== slug);
        showToast('Removed from your wishlist');
      } else {
        updated = [...prev, slug];
        showToast('Added to your wishlist!');
      }
      try {
        localStorage.setItem('easytoexplore_wishlist', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const isWishlisted = (slug: string) => wishlist.includes(slug);

  const openBookingDrawer = (destinationSlug?: string, packageId?: string) => {
    setSelectedDestinationSlug(destinationSlug);
    setSelectedPackageId(packageId);
    setIsBookingOpen(true);
  };

  const closeBookingDrawer = () => {
    setIsBookingOpen(false);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  return (
    <AppContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        isBookingOpen,
        selectedDestinationSlug,
        selectedPackageId,
        openBookingDrawer,
        closeBookingDrawer,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        resetFilters,
        toastMessage,
        showToast,
        hideToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
