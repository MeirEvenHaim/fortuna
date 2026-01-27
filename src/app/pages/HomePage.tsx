import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ProductCarousel } from '../components/ProductCarousel';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ProductCarousel />
      <Footer />
    </>
  );
}