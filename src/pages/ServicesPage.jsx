import React from 'react';
import ServicesHero from '../components/sections/ServicesHero';
import ServicesListSection from '../components/sections/ServicesListSection';
import ServicesCarousel from '../components/sections/ServicesCarousel';
import CTASection from '../components/sections/CTASection';

const ServicesPage = () => {
  return (
    <>
      <ServicesHero />
      <ServicesListSection />
      <ServicesCarousel />
      <CTASection />
    </>
  );
};

export default ServicesPage;
