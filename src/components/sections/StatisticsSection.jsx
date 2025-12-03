import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StatisticsSection.css';

gsap.registerPlugin(ScrollTrigger);

const StatisticsSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const counterWrapper = counterRef.current;
    const counterItems = counterWrapper.querySelectorAll('.counter-item');

    // Left div animation
    gsap.fromTo(
      left,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Right div animation
    gsap.fromTo(
      right,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Pin the section and animate counter items
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=400%',
        pin: true,
        pinSpacing: true,
        scrub: 1,
      },
    });

    // Set initial state - all items start below and hidden
    gsap.set(counterItems, { y: 80, opacity: 0 });

    // Each item: comes in from bottom, then goes out to top with fade
    counterItems.forEach((item) => {
      // Come in from bottom
      tl.to(item, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      });

      // Go out to top with fade
      tl.to(item, {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: 'power2.in',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="statistics-section" ref={sectionRef}>
      <div className="statistics-container">
        <div className="statistics-left flex justify-center align-middle" ref={leftRef}>
          <h2 style={{
              fontFamily: 'Clash Display Variable',
              fontWeight: 600,
              fontSize: 'clamp(32px, 5vw + 1rem, 72px)',
              lineHeight: 1.25,
              letterSpacing: '0px'
            }}>
            Captivate your<br />
            audience's<br />
            senses, non-stop
          </h2>
        </div>
        <div className="statistics-right" ref={rightRef}>
          <div className='counter overflow-hidden h-40'>
            <div ref={counterRef} className='counter-wrapper relative h-full'>
              <div className='counter-item absolute inset-0 flex flex-col items-center justify-center text-center'>
                <p className='text-sm tracking-wider'>Lorem</p>
                <h1 className='text-7xl md:text-8xl font-bold italic'>50+</h1>
                <p className='text-sm tracking-wider'>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
              </div>
              <div className='counter-item absolute inset-0 flex flex-col items-center justify-center text-center'>
                <p className='text-sm tracking-wider'>Lorem</p>
                <h1 className='text-7xl md:text-8xl font-bold italic'>50+</h1>
                <p className='text-sm tracking-wider'>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
              </div>
              <div className='counter-item absolute inset-0 flex flex-col items-center justify-center text-center'>
                <p className='text-sm tracking-wider'>Lorem</p>
                <h1 className='text-7xl md:text-8xl font-bold italic'>50+</h1>
                <p className='text-sm tracking-wider'>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
              </div>
              <div className='counter-item absolute inset-0 flex flex-col items-center justify-center text-center'>
                <p className='text-sm tracking-wider'>Lorem</p>
                <h1 className='text-7xl md:text-8xl font-bold italic'>50+</h1>
                <p className='text-sm tracking-wider'>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
