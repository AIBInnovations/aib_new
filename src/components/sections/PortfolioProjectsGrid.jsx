import { useState } from 'react';
import './PortfolioProjectsGrid.css';

const PortfolioProjectsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('SOFTWARE');

  const categories = [
    'AI & ML PROJECTS',
    'IOT PROJECTS',
    'SOFTWARE',
    'HARDWARE',
    'MOBILE DEV'
  ];

  const projects = [
    // SOFTWARE
    { id: 1, title: "ALESON'S", subtitle: 'WEBSITE', year: '2024', category: 'SOFTWARE', image: 'https://via.placeholder.com/460x360/FFA07A/FFA07A' },
    { id: 2, title: 'TOONZKART', subtitle: 'WEB APPLICATION', year: '2025', category: 'SOFTWARE', image: 'https://via.placeholder.com/460x360/D2B48C/D2B48C' },
    { id: 3, title: "ALESON'S", subtitle: 'WEBSITE', year: '2024', category: 'SOFTWARE', image: 'https://via.placeholder.com/460x360/FFA07A/FFA07A' },
    { id: 4, title: 'TOONZKART', subtitle: 'WEB APPLICATION', year: '2025', category: 'SOFTWARE', image: 'https://via.placeholder.com/460x360/D2B48C/D2B48C' },
    { id: 5, title: "ALESON'S", subtitle: 'WEBSITE', year: '2024', category: 'SOFTWARE', image: 'https://via.placeholder.com/460x360/FFA07A/FFA07A' },
    { id: 6, title: 'TOONZKART', subtitle: 'WEB APPLICATION', year: '2025', category: 'SOFTWARE', image: 'https://via.placeholder.com/460x360/D2B48C/D2B48C' },

    // AI & ML PROJECTS
    { id: 7, title: 'AI CHATBOT', subtitle: 'ML MODEL', year: '2024', category: 'AI & ML PROJECTS', image: 'https://via.placeholder.com/460x360/87CEEB/87CEEB' },
    { id: 8, title: 'PREDICTIVE ANALYTICS', subtitle: 'DATA SCIENCE', year: '2024', category: 'AI & ML PROJECTS', image: 'https://via.placeholder.com/460x360/98FB98/98FB98' },
    { id: 9, title: 'COMPUTER VISION', subtitle: 'IMAGE RECOGNITION', year: '2025', category: 'AI & ML PROJECTS', image: 'https://via.placeholder.com/460x360/DDA0DD/DDA0DD' },
    { id: 10, title: 'NLP SYSTEM', subtitle: 'NATURAL LANGUAGE', year: '2024', category: 'AI & ML PROJECTS', image: 'https://via.placeholder.com/460x360/F0E68C/F0E68C' },
    { id: 11, title: 'AI CHATBOT', subtitle: 'ML MODEL', year: '2024', category: 'AI & ML PROJECTS', image: 'https://via.placeholder.com/460x360/87CEEB/87CEEB' },
    { id: 12, title: 'PREDICTIVE ANALYTICS', subtitle: 'DATA SCIENCE', year: '2024', category: 'AI & ML PROJECTS', image: 'https://via.placeholder.com/460x360/98FB98/98FB98' },

    // IOT PROJECTS
    { id: 13, title: 'SMART HOME', subtitle: 'IOT AUTOMATION', year: '2024', category: 'IOT PROJECTS', image: 'https://via.placeholder.com/460x360/FFB6C1/FFB6C1' },
    { id: 14, title: 'SENSOR NETWORK', subtitle: 'MONITORING SYSTEM', year: '2025', category: 'IOT PROJECTS', image: 'https://via.placeholder.com/460x360/ADD8E6/ADD8E6' },
    { id: 15, title: 'SMART AGRICULTURE', subtitle: 'IOT SOLUTION', year: '2024', category: 'IOT PROJECTS', image: 'https://via.placeholder.com/460x360/90EE90/90EE90' },
    { id: 16, title: 'INDUSTRIAL IOT', subtitle: 'FACTORY AUTOMATION', year: '2025', category: 'IOT PROJECTS', image: 'https://via.placeholder.com/460x360/F4A460/F4A460' },
    { id: 17, title: 'SMART HOME', subtitle: 'IOT AUTOMATION', year: '2024', category: 'IOT PROJECTS', image: 'https://via.placeholder.com/460x360/FFB6C1/FFB6C1' },
    { id: 18, title: 'SENSOR NETWORK', subtitle: 'MONITORING SYSTEM', year: '2025', category: 'IOT PROJECTS', image: 'https://via.placeholder.com/460x360/ADD8E6/ADD8E6' },

    // HARDWARE
    { id: 19, title: 'PCB DESIGN', subtitle: 'CIRCUIT BOARD', year: '2024', category: 'HARDWARE', image: 'https://via.placeholder.com/460x360/B0C4DE/B0C4DE' },
    { id: 20, title: 'EMBEDDED SYSTEM', subtitle: 'MICROCONTROLLER', year: '2025', category: 'HARDWARE', image: 'https://via.placeholder.com/460x360/DEB887/DEB887' },
    { id: 21, title: 'ROBOTICS', subtitle: 'MECHANICAL DESIGN', year: '2024', category: 'HARDWARE', image: 'https://via.placeholder.com/460x360/D8BFD8/D8BFD8' },
    { id: 22, title: 'SENSOR MODULE', subtitle: 'HARDWARE PROTOTYPE', year: '2025', category: 'HARDWARE', image: 'https://via.placeholder.com/460x360/F5DEB3/F5DEB3' },
    { id: 23, title: 'PCB DESIGN', subtitle: 'CIRCUIT BOARD', year: '2024', category: 'HARDWARE', image: 'https://via.placeholder.com/460x360/B0C4DE/B0C4DE' },
    { id: 24, title: 'EMBEDDED SYSTEM', subtitle: 'MICROCONTROLLER', year: '2025', category: 'HARDWARE', image: 'https://via.placeholder.com/460x360/DEB887/DEB887' },

    // MOBILE DEV
    { id: 25, title: 'SOCIAL APP', subtitle: 'MOBILE APPLICATION', year: '2024', category: 'MOBILE DEV', image: 'https://via.placeholder.com/460x360/FFE4B5/FFE4B5' },
    { id: 26, title: 'E-COMMERCE', subtitle: 'SHOPPING APP', year: '2025', category: 'MOBILE DEV', image: 'https://via.placeholder.com/460x360/E0BBE4/E0BBE4' },
    { id: 27, title: 'FITNESS TRACKER', subtitle: 'HEALTH APP', year: '2024', category: 'MOBILE DEV', image: 'https://via.placeholder.com/460x360/FFDAB9/FFDAB9' },
    { id: 28, title: 'FOOD DELIVERY', subtitle: 'MOBILE PLATFORM', year: '2025', category: 'MOBILE DEV', image: 'https://via.placeholder.com/460x360/C6E2FF/C6E2FF' },
    { id: 29, title: 'SOCIAL APP', subtitle: 'MOBILE APPLICATION', year: '2024', category: 'MOBILE DEV', image: 'https://via.placeholder.com/460x360/FFE4B5/FFE4B5' },
    { id: 30, title: 'E-COMMERCE', subtitle: 'SHOPPING APP', year: '2025', category: 'MOBILE DEV', image: 'https://via.placeholder.com/460x360/E0BBE4/E0BBE4' },
  ];

  const filteredProjects = projects.filter(project => project.category === selectedCategory);

  return (
    <section className="portfolio-projects-grid-section">
      {/* Marquee Tabs */}
      <div className="categories-marquee">
        <div className="marquee-track">
          {[...categories, ...categories, ...categories].map((category, index) => (
            <button
              key={index}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid-container">
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="grid-project-card">
              <div className="project-image" style={{ backgroundImage: `url(${project.image})` }}></div>
              <div className="project-info-grid">
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
                <span>{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioProjectsGrid;
