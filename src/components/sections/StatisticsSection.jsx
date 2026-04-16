import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StatisticsSection.css';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_TOP = 'CAPTIVATE · ENGAGE · AMPLIFY · CONVERT · INSPIRE · ';
const MARQUEE_MID = 'BRANDS · PRODUCTS · EXPERIENCES · GROWTH · IMPACT · ';
const MARQUEE_BOT = 'DESIGN · BUILD · SHIP · SCALE · REPEAT · ';

const StatisticsSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const counterRef = useRef(null);
  const marqueeTopRef = useRef(null);
  const marqueeMidRef = useRef(null);
  const marqueeBotRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const counterWrapper = counterRef.current;

    if (!section || !left || !right || !counterWrapper) return;

    const counterItems = counterWrapper.querySelectorAll('.counter-item');
    if (!counterItems.length) return;

    const leftAnim = gsap.fromTo(
      left,
      { x: -100, opacity: 0 },
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

    const rightAnim = gsap.fromTo(
      right,
      { x: 100, opacity: 0 },
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

    gsap.set(counterItems, { y: 80, opacity: 0 });

    counterItems.forEach((item) => {
      tl.to(item, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' });
      tl.to(item, { y: -80, opacity: 0, duration: 1, ease: 'power2.in' });
    });

    // Scroll-driven marquee — tied to the SAME pinned range as the counter timeline.
    const marqueeAnims = [];
    const makeMarquee = (el, fromX, toX) => {
      if (!el) return null;
      return gsap.fromTo(
        el,
        { xPercent: fromX },
        {
          xPercent: toX,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=400%',
            scrub: 1,
          },
        }
      );
    };

    // Smaller travel = slower perceived speed.
    // Middle row starts further to the left so it has runway before going off-screen.
    marqueeAnims.push(makeMarquee(marqueeTopRef.current,   0, -10));  // left
    marqueeAnims.push(makeMarquee(marqueeMidRef.current, -18,  -4));  // right-ish, but starts left
    marqueeAnims.push(makeMarquee(marqueeBotRef.current,   0, -14));  // left, slight parallax

    return () => {
      try {
        if (leftAnim?.scrollTrigger) leftAnim.scrollTrigger.kill(true);
        if (leftAnim) leftAnim.kill();
        if (rightAnim?.scrollTrigger) rightAnim.scrollTrigger.kill(true);
        if (rightAnim) rightAnim.kill();
        if (tl?.scrollTrigger) tl.scrollTrigger.kill(true);
        if (tl) tl.kill();
        marqueeAnims.forEach((a) => {
          if (a?.scrollTrigger) a.scrollTrigger.kill(true);
          if (a) a.kill();
        });
      } catch (e) {
        /* no-op */
      }
    };
  }, []);

  const repeat = (text, times = 6) => text.repeat(times);

  return (
    <section className="statistics-section" ref={sectionRef}>
      {/* Background marquee text (scroll-driven) */}
      <div className="stats-marquee-bg" aria-hidden="true">
        <div className="stats-marquee">
          <div className="stats-marquee-track" ref={marqueeTopRef}>
            <span>{repeat(MARQUEE_TOP)}</span>
            <span>{repeat(MARQUEE_TOP)}</span>
          </div>
        </div>

        <div className="stats-marquee stats-marquee-right">
          <div className="stats-marquee-track" ref={marqueeMidRef}>
            <span>{repeat(MARQUEE_MID)}</span>
            <span>{repeat(MARQUEE_MID)}</span>
          </div>
        </div>

        <div className="stats-marquee">
          <div className="stats-marquee-track" ref={marqueeBotRef}>
            <span>{repeat(MARQUEE_BOT)}</span>
            <span>{repeat(MARQUEE_BOT)}</span>
          </div>
        </div>
      </div>

      {/* Decorative corner tag */}
      <div className="stats-corner-tag">
        <span className="stats-corner-dot" />
        By The Numbers
      </div>

      <div className="statistics-container">
        <div className="statistics-left" ref={leftRef}>
          <span className="stats-eyebrow">What we deliver</span>
          <h2 className="stats-heading">
            Captivate your<br />
            audience's<br />
            senses, <em>non-stop</em>
          </h2>
          <p className="stats-subtext">
            From strategy to ship — we craft digital experiences that perform,
            scale, and turn first-time visitors into repeat customers.
          </p>
        </div>

        <div className="statistics-right" ref={rightRef}>
          <div className="counter-panel">
            <div className="counter overflow-hidden h-40">
              <div ref={counterRef} className="counter-wrapper relative h-full">
                <div className="counter-item absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="counter-label">Trusted By</p>
                  <h1 className="counter-number">50<span className="counter-plus">+</span></h1>
                  <p className="counter-caption">Brands Across Industries</p>
                </div>
                <div className="counter-item absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="counter-label">Delivered</p>
                  <h1 className="counter-number">80<span className="counter-plus">+</span></h1>
                  <p className="counter-caption">Projects Successfully Launched</p>
                </div>
                <div className="counter-item absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="counter-label">Serving</p>
                  <h1 className="counter-number">10<span className="counter-plus">+</span></h1>
                  <p className="counter-caption">Industries Worldwide</p>
                </div>
                <div className="counter-item absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="counter-label">Growing</p>
                  <h1 className="counter-number">3<span className="counter-plus">x</span></h1>
                  <p className="counter-caption">Client Revenue On Average</p>
                </div>
              </div>
            </div>

            {/* Progress dots */}
            <div className="counter-progress">
              <span /><span /><span /><span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
