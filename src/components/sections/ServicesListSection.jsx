import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesListSection.css';

gsap.registerPlugin(ScrollTrigger);

const ServicesListSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    const section = sectionRef.current;

    if (!section || cards.length === 0) return;

    const totalCards = cards.length;
    // Dynamically calculate spacing so all card headers fit within the viewport
    // without their text overlapping the next card. Each card needs roughly
    // 11-12% of viewport height to show its header cleanly.
    const startPosition = 5;
    const maxLastPosition = 80;
    const cardSpacing = totalCards > 1
      ? Math.min(12, (maxLastPosition - startPosition) / (totalCards - 1))
      : 0;
    const lastCardTopPosition = startPosition + ((totalCards - 1) * cardSpacing);

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const topPosition = startPosition + (index * cardSpacing);

        // Set z-index so later cards stack on top of earlier ones
        gsap.set(card, { zIndex: index + 1 });

        ScrollTrigger.create({
          trigger: card,
          start: `top ${topPosition}%`,
          // Use the last card as the end trigger for all cards
          endTrigger: cards[totalCards - 1],
          // Unpin when last card reaches its stacked position
          end: `top ${lastCardTopPosition}%`,
          pin: true,
          pinSpacing: false,
        });
      });
    }, section);

    return () => {
      // Properly revert all GSAP animations and ScrollTriggers in this context
      try {
        if (ctx) {
          ctx.revert() // This will unpin and cleanup all animations
        }
        // Also manually kill any remaining ScrollTriggers for this section
        ScrollTrigger.getAll()?.forEach(trigger => {
          if (trigger.vars?.trigger && section?.contains(trigger.vars.trigger)) {
            trigger.kill(true) // Kill and revert
          }
        })
      } catch (e) {
        // Silently handle cleanup errors
      }
    };
  }, []);

  const services = [
    {
      number: '01',
      title: 'SOFTWARE DEVELOPMENT',
      tags: ['Custom Applications', 'APIs & Integrations', 'Scalable Architecture'],
      description: 'We engineer robust, production-ready software tailored to your operations. From enterprise platforms to internal tools, our teams deliver clean code, reliable performance, and long-term maintainability.',
      imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop'
    },
    {
      number: '02',
      title: 'HARDWARE',
      tags: ['Embedded Systems', 'IoT Devices', 'Rapid Prototyping'],
      description: 'From concept to manufacturing, we design and build purpose-driven hardware. Our engineers bridge firmware, electronics, and enclosure design to bring intelligent, connected devices to life.',
      imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&h=500&fit=crop'
    },
    {
      number: '03',
      title: 'CYBER SECURITY',
      tags: ['Threat Assessment', 'Penetration Testing', 'Compliance & Audit'],
      description: 'We protect your business from evolving digital threats. Through proactive audits, penetration testing, and monitoring, we harden your systems and keep your data, customers, and reputation safe.',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop'
    },
    {
      number: '04',
      title: 'CLOUD SERVICES',
      tags: ['AWS & Azure', 'DevOps & CI/CD', 'Migration & Scaling'],
      description: 'We architect, migrate, and manage cloud infrastructure that scales with your business. From AWS deployments to Kubernetes orchestration, we ensure high availability, efficiency, and cost control.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop'
    },
    {
      number: '05',
      title: 'AI & ML SERVICES',
      tags: ['Machine Learning', 'Natural Language Processing', 'Computer Vision'],
      description: 'We turn raw data into decisions. Our AI and ML solutions power predictive analytics, automation, and intelligent products — trained responsibly and deployed at production scale.',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop'
    },
    {
      number: '06',
      title: 'WEB DEVELOPMENT',
      tags: ['React & Next.js', 'Full-Stack Engineering', 'Performance Optimization'],
      description: 'We build fast, accessible, and visually refined web experiences. From marketing sites to complex SaaS platforms, our stack is modern, our code is clean, and our results are measurable.',
      imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop'
    },
    {
      number: '07',
      title: 'UI/UX DESIGN',
      tags: ['User Research', 'Interaction Design', 'Design Systems'],
      description: 'Great products start with great design. We craft intuitive, human-centered interfaces grounded in research, usability testing, and scalable design systems that align product, brand, and user.',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop'
    }
  ];

  return (
    <section className="services-list-section" ref={sectionRef}>
      <div className="services-list-container">
        {services.map((service, index) => (
          <div
            key={index}
            ref={el => cardRefs.current[index] = el}
            className="card"
          >
            <div className="service-header">
              <div className="service-number">{service.number}</div>
              <h2 className="service-title">{service.title}</h2>
            </div>

            <div className="service-content-wrapper">
              <div className="service-body">
                <div className="service-left">
                  <div className="service-tags">
                    {service.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="service-tag">{tag}</span>
                    ))}
                  </div>
                  <p className="service-description">{service.description}</p>
                </div>
                <div className="service-right">
                  <div className="service-image" style={{ backgroundImage: `url(${service.imageUrl})` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesListSection;
