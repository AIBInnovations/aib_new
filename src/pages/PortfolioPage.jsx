import React from 'react';
import PortfolioHero from '../components/sections/PortfolioHero';
import ProjectGallery from '../components/sections/ProjectGallery';
import PortfolioProjectsGrid from '../components/sections/PortfolioProjectsGrid';
import CTASection from '../components/sections/CTASection';

const PortfolioPage = () => {
  return (
    <>
      <PortfolioHero />
      <ProjectGallery />
      <PortfolioProjectsGrid />
      <CTASection />
    </>
  );
};

export default PortfolioPage;
