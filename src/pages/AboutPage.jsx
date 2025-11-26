import React from 'react';
import AboutHero from '../components/sections/AboutHero';
import ValuesSection from '../components/sections/ValuesSection';
import TeamSection from '../components/sections/TeamSection';
import TechBasedSection from '../components/sections/TechBasedSection';
import TimelineSection from '../components/sections/TimelineSection';

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <ValuesSection />
      <TeamSection />
      <TechBasedSection />
      <TimelineSection />
    </>
  );
};

export default AboutPage;
