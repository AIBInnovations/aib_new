import React from 'react';
import ContactHero from '../components/sections/ContactHero';
import ContactForm from '../components/sections/ContactForm';
import MapSection from '../components/sections/MapSection';
import FAQSection from '../components/sections/FAQSection';

const ContactPage = () => {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <MapSection />
      <FAQSection />
    </>
  );
};

export default ContactPage;
