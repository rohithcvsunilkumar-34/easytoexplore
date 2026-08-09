export interface PopularSpot {
  id: string;
  name: string;
  description: string;
  image: string;
  duration: string;
  tag?: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  meal?: string;
  stay?: string;
  activities: string[];
}

export interface Package {
  id: string;
  destinationId: string;
  destinationName: string;
  destinationSlug: string;
  title: string;
  subtitle: string;
  duration: string; // e.g. "6 Days / 5 Nights"
  durationDays: number;
  price: number;
  discountPrice?: number;
  groupSize: string; // e.g. "2-8 People"
  hotelRating: string; // e.g. "4-Star & 5-Star Deluxe"
  inclusions: string[]; // e.g. ["Hotels", "Breakfast & Dinner", "Private Cab", "Sightseeing"]
  itinerary: DayItinerary[];
  featured?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  region: 'North India' | 'West India' | 'South India' | 'North East India' | 'Islands';
  price: number; // Starting price in INR
  duration: string; // e.g. "6 Days / 5 Nights"
  durationDays: number;
  rating: number; // e.g. 4.9
  reviewsCount: number;
  featured: boolean;
  category: 'Mountain' | 'Beach' | 'Heritage' | 'Adventure' | 'Luxury' | 'Nature';
  heroImage: string;
  gallery: string[];
  bestTimeToVisit: string;
  weatherTemp: string;
  highlights: string[];
  popularSpots: PopularSpot[];
  packages: Package[];
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorLocation: string;
  rating: number;
  date: string;
  text: string;
  destinationName: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  count: number;
  image: string;
  description: string;
}

export interface FilterState {
  search: string;
  region: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  duration: string;
  minRating: number;
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'rating';
}

export interface BookingInquiry {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  guests: number;
  destinationSlug?: string;
  packageId?: string;
  specialRequests?: string;
}
