import React from 'react';
import { getFeaturedDestinations, getCategories, getAllPackages, getReviews } from '@/lib/api';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedDestinations } from '@/components/home/FeaturedDestinations';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { PopularPackages } from '@/components/home/PopularPackages';
import { CategorySection } from '@/components/home/CategorySection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CtaBanner } from '@/components/home/CtaBanner';

export default async function HomePage() {
  const [destinations, categories, packages, reviews] = await Promise.all([
    getFeaturedDestinations(),
    getCategories(),
    getAllPackages(),
    getReviews(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Carousel & Search Filter Widget */}
      <HeroSection />

      {/* Featured Iconic Destinations */}
      <FeaturedDestinations destinations={destinations} />

      {/* Why Choose Us 4-Column Value Grid */}
      <WhyChooseUs />

      {/* Popular Tour Packages */}
      <PopularPackages packages={packages} />

      {/* Travel Styles Categories */}
      <CategorySection categories={categories} />

      {/* Verified Reviews */}
      <TestimonialsSection reviews={reviews} />

      {/* Conversion CTA Banner */}
      <CtaBanner />
    </div>
  );
}
