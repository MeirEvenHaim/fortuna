import React from 'react';
import { Hero } from '../components/Hero';
import { WhatIsFortuna, GameLevElLevSection, TargetAudience, WhyItWorks, FounderSection, BottomCTA } from '../components/HomeSections';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <>
      <Hero />
      <WhatIsFortuna />
      <GameLevElLevSection />
      <TargetAudience />
      <WhyItWorks />
      <FounderSection />
      <BottomCTA />
      <Footer />
    </>
  );
}