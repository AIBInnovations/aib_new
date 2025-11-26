import React, { useState } from 'react';
import './FAQSection.css';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "WHAT SERVICES DOES AIB INNOVATIONS OFFER?",
      answer: "We specialize in AI-powered solutions, custom software development, web and mobile applications, cloud solutions, and digital transformation consulting. Our team leverages cutting-edge technologies including machine learning, natural language processing, and computer vision to deliver innovative solutions tailored to your business needs."
    },
    {
      question: "HOW LONG DOES A TYPICAL PROJECT TAKE?",
      answer: "Project timelines vary based on complexity and scope. A simple web application might take 4-8 weeks, while complex AI/ML solutions can take 3-6 months. We provide detailed project timelines during our initial consultation and maintain transparent communication throughout the development process to ensure timely delivery."
    },
    {
      question: "DO YOU PROVIDE POST-LAUNCH SUPPORT AND MAINTENANCE?",
      answer: "Yes, we offer comprehensive post-launch support including bug fixes, updates, performance monitoring, and feature enhancements. We provide flexible maintenance packages ranging from basic support to full-service contracts with 24/7 monitoring, ensuring your solution continues to perform optimally long after deployment."
    },
    {
      question: "WHAT INDUSTRIES DO YOU WORK WITH?",
      answer: "We work across diverse industries including healthcare, finance, e-commerce, education, manufacturing, and logistics. Our team has experience delivering solutions for startups, SMEs, and enterprise clients. We adapt our approach to meet the specific regulatory requirements and business challenges of each industry."
    },
    {
      question: "HOW DO YOU ENSURE DATA SECURITY AND PRIVACY?",
      answer: "Security is our top priority. We implement industry-standard encryption, secure authentication protocols, regular security audits, and compliance with GDPR, HIPAA, and other relevant regulations. Our development process includes security testing at every stage, and we provide detailed documentation of all security measures implemented."
    },
    {
      question: "WHAT IS YOUR DEVELOPMENT PROCESS?",
      answer: "We follow an agile methodology with regular sprints and client feedback loops. Our process includes discovery and planning, UI/UX design, development, rigorous testing, deployment, and ongoing support. We maintain transparent communication through regular updates, demos, and collaborative tools to ensure alignment with your vision."
    },
    {
      question: "CAN YOU INTEGRATE WITH EXISTING SYSTEMS?",
      answer: "Absolutely. We specialize in seamless integration with existing systems, databases, APIs, and third-party services. Whether you're using legacy systems or modern cloud platforms, our team has the expertise to ensure smooth data flow and interoperability while minimizing disruption to your current operations."
    },
    {
      question: "WHAT ARE YOUR PRICING MODELS?",
      answer: "We offer flexible pricing models including fixed-price projects, time and materials, and dedicated team arrangements. During our initial consultation, we'll discuss your budget and recommend the most cost-effective approach. We provide detailed proposals with transparent pricing and no hidden costs, ensuring you get maximum value for your investment."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">FREQUENTLY ASKED QUESTIONS</h2>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <div
                className="faq-question-wrapper"
                onClick={() => toggleFAQ(index)}
              >
                <span className="faq-number">01</span>
                <h3 className="faq-question">{faq.question}</h3>
                <button className="faq-toggle">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line
                      x1="5"
                      y1="12"
                      x2="19"
                      y2="12"
                      className="horizontal-line"
                    ></line>
                  </svg>
                </button>
              </div>

              <div className="faq-answer-wrapper">
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
