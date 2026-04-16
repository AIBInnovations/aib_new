import React from 'react';
import AboutHero from '../components/sections/AboutHero';
import ValuesSection from '../components/sections/ValuesSection';
import AboutTeamSection from '../components/sections/AboutTeamSection';
import TechBasedSection from '../components/sections/TechBasedSection';
import TimelineSection from '../components/sections/TimelineSection';

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <ValuesSection />
      <AboutTeamSection />
      <TechBasedSection />
      <TimelineSection />
    </>
  );
};

export default AboutPage;
