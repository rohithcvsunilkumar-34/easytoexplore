import { destinationsData, categoriesData, reviewsData } from '@/data/destinations';
import { Destination, Category, Review, Package, FilterState, BookingInquiry } from '@/types';

// Simulate network latency for realistic API abstraction
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDestinations(filters?: Partial<FilterState>): Promise<Destination[]> {
  await delay(100);
  let results = [...destinationsData];

  if (!filters) return results;

  if (filters.search && filters.search.trim() !== '') {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.subtitle.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.highlights.some((h) => h.toLowerCase().includes(q))
    );
  }

  if (filters.region && filters.region !== 'All') {
    results = results.filter((d) => d.region === filters.region);
  }

  if (filters.category && filters.category !== 'All') {
    results = results.filter((d) => d.category === filters.category);
  }

  if (filters.minPrice !== undefined && filters.minPrice > 0) {
    results = results.filter((d) => d.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
    results = results.filter((d) => d.price <= filters.maxPrice!);
  }

  if (filters.minRating !== undefined && filters.minRating > 0) {
    results = results.filter((d) => d.rating >= filters.minRating!);
  }

  if (filters.duration && filters.duration !== 'All') {
    if (filters.duration === 'Short (1-4 Days)') {
      results = results.filter((d) => d.durationDays <= 4);
    } else if (filters.duration === 'Medium (5-6 Days)') {
      results = results.filter((d) => d.durationDays >= 5 && d.durationDays <= 6);
    } else if (filters.duration === 'Long (7+ Days)') {
      results = results.filter((d) => d.durationDays >= 7);
    }
  }

  if (filters.sortBy) {
    if (filters.sortBy === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else {
      results.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
  }

  return results;
}

export async function getFeaturedDestinations(): Promise<Destination[]> {
  await delay(50);
  return destinationsData.filter((d) => d.featured);
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  await delay(50);
  const found = destinationsData.find((d) => d.slug.toLowerCase() === slug.toLowerCase());
  return found || null;
}

export async function getCategories(): Promise<Category[]> {
  await delay(50);
  return categoriesData;
}

export async function getAllPackages(): Promise<Package[]> {
  await delay(50);
  const packages: Package[] = [];
  destinationsData.forEach((d) => {
    packages.push(...d.packages);
  });
  return packages;
}

export async function getReviews(): Promise<Review[]> {
  await delay(50);
  return reviewsData;
}

export async function submitInquiry(inquiry: BookingInquiry): Promise<{ success: boolean; message: string }> {
  await delay(400);
  console.log('Inquiry submitted to server mock:', inquiry);
  return {
    success: true,
    message: `Thank you, ${inquiry.fullName}! Your booking inquiry for ${inquiry.destinationSlug || 'your trip'} has been received. Our travel expert will contact you within 2 hours.`,
  };
}
