import React from 'react';
import Hero from '../components/sections/Hero';
import CurvedProjectGallery from '../components/sections/CurvedProjectGallery';
import HexagonSection from '../components/sections/HexagonSection';
import StatisticsSection from '../components/sections/StatisticsSection';
import ServicesSection from '../components/sections/ServicesSection';
import TeamSection from '../components/sections/TeamSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <CurvedProjectGallery />
      <HexagonSection />
      <StatisticsSection />
      <ServicesSection />
      <TeamSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
