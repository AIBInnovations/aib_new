import './TechBasedSection.css';

const TechBasedSection = () => {
  return (
    <section className="tech-based-section">
      <div className="tech-based-image-container">
        <div className="tech-based-image"></div>
      </div>

      <div className="tech-based-text-overlay">
        <div className="tech-text tech-text-we-are">WE ARE</div>
        <div className="tech-text tech-text-tech">TECH</div>
        <div className="tech-text tech-text-based">BASED</div>
        <div className="tech-text tech-text-company">COMPANY</div>
      </div>

      <svg
        className="tech-based-curve tech-based-curve-top"
        preserveAspectRatio="none"
        viewBox="0 0 1000 340"
      >
        <path
          d="M 0,0 L 0,20 Q 500,340 1000,20 L 1000,0 Z"
          fill="#1a1a1a"
        />
      </svg>

      <svg
        className="tech-based-curve tech-based-curve-bottom"
        preserveAspectRatio="none"
        viewBox="0 0 1000 340"
      >
        <path
          d="M 0,340 L 0,320 Q 500,0 1000,320 L 1000,340 Z"
          fill="#1a1a1a"
        />
      </svg>
    </section>
  );
};

export default TechBasedSection;
