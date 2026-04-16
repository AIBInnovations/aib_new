import { useState, useRef } from 'react';
import './PortfolioProjectsGrid.css';

const PortfolioProjectsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('WEB PROJECTS');

  const categories = [
    'WEB PROJECTS',
    'SHOPIFY',
    'WORDPRESS',
    'AI & ML PROJECTS',
    'IOT PROJECTS',
    'SOFTWARE',
    'HARDWARE',
    'MOBILE DEV'
  ];

  const projects = [
    // WEB PROJECTS
    { id: 16, title: 'ROCCIA', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/roccia.webp', video: '/web/roccia.mp4', link: 'https://roccia-web.vercel.app/' },
    { id: 6, title: 'THIS IS THAT', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/tita.webp', video: '/web/tita.mp4', link: 'https://thisisthat.co.in/' },
    { id: 7, title: 'NINE HAWKS', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/ninehawks.webp', video: '/web/ninehawks.mp4', link: 'https://ninehauk.vercel.app/' },
    { id: 8, title: 'CLOSET', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/closet.webp', video: '/web/closet.mp4', link: 'https://closet-web-jade.vercel.app/' },
    { id: 1, title: 'JMC', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/jmc.webp', video: '/web/jmc.mp4', link: 'https://jmc-final.vercel.app/' },
    { id: 2, title: 'NESTIN WOODS', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/nestinwoods.webp', video: '/web/nestinwoods.mp4', link: 'https://nestinwoods.vercel.app/' },
    { id: 3, title: 'NM GROUP', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/nm group.webp', video: '/web/nm group.mp4', link: 'https://nmgroup-gold.vercel.app/' },
    { id: 4, title: 'STONE GALAXY', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/stone gallaxy.webp', video: '/web/stone galaxy.mp4', link: 'https://stone-galaxy.vercel.app/' },
    { id: 5, title: 'DIGEXA', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/beyond edge.webp', video: '/web/beyond edge.mp4', link: 'https://digexa-five.vercel.app/' },
    { id: 9, title: 'CLEANSE', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/cleanse.webp', video: '/web/cleanse.mp4', link: 'https://cleanse-frontend.vercel.app/' },
    { id: 10, title: 'JLU', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/jlu.webp', video: '/web/jlu.mp4', link: 'https://jlu-ruddy.vercel.app/' },
    { id: 11, title: 'GRADNEXT', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/GradNext.webp', video: '/web/gradenext.mp4', link: 'https://gradnext-sample.vercel.app/' },
    { id: 12, title: 'LMS STUDENT', subtitle: 'WEB APPLICATION', year: '2024', category: 'WEB PROJECTS', image: '/web/alnuaimi.webp', video: '/web/alnuaimi.mp4', link: 'https://lms-student-bw4r.vercel.app/auth/login' },
    { id: 13, title: 'EVARA', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/evara.webp', video: '/web/evara.mp4', link: 'https://evara-website.vercel.app/' },
    { id: 14, title: 'BALAJI SECURITY', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/BALAJI GROUP.webp', video: '/web/balaji group.mp4', link: 'https://balaji-security-services.vercel.app/' },
    { id: 17, title: 'PGME ESSENTIALS', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/pgme.webp', video: '/web/pgme.mp4', link: 'https://pgmeessentials.com/' },
    { id: 18, title: 'MOTIVATA', subtitle: 'WEB DESIGN', year: '2024', category: 'WEB PROJECTS', image: '/web/motiveta.webp', video: '/web/motiveta.mp4', link: 'https://motivata.in/' },

    // SHOPIFY
    { id: 19, title: "FAYON KIDS", subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/fayon.webp', video: '/shopify/fayon.mp4', link: 'https://www.fayonkids.com/' },
    { id: 20, title: 'THOMAS CRICK', subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/thomas.webp', video: '/shopify/thomas.mp4', link: 'https://www.thomascrick.in/' },
    { id: 21, title: "ALESONS", subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/alesons.webp', video: '/shopify/alesons.mp4', link: 'https://www.alesons.com/' },
    { id: 22, title: 'CRISTELLO', subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/Cristello®.webp', video: '/shopify/cristello.mp4', link: 'https://cristello.in/' },
    { id: 23, title: 'HERBAL TRIBE', subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/herbal tribe.webp', video: '/shopify/herbal tribe.mp4', link: 'https://herbaltribe.in/' },
    { id: 24, title: 'FUNGY FAB', subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/Fungyfab.webp', video: '/shopify/fungyfab.mp4', link: 'https://fungyfab.com/' },
    { id: 25, title: 'DPETALS', subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/DPetals.webp', video: '/shopify/depetalls.mp4', link: 'https://dpetals.com/' },
    { id: 26, title: 'MILOE', subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/MILOE.webp', video: '/shopify/miloe.mp4', link: 'https://miloe.in/' },
    { id: 27, title: 'WARMEX', subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/warmex.webp', video: '/shopify/warmex.mp4', link: 'https://warmexappliances.myshopify.com/' },
    { id: 28, title: 'HOUSE OF MIGO', subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/migo.webp', video: '/shopify/migo.mp4', link: 'https://www.thehouseofmigo.com/' },
    { id: 29, title: 'BIHARO', subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/BIHARO.webp', video: '/shopify/biharo.mp4', link: 'https://www.biharo.com/' },
    { id: 30, title: 'SHAHI VOYAGE', subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/shahi voyage.webp', video: '/shopify/shahi voyage.mp4', link: 'https://theshahivoyage.com/' },
    { id: 31, title: 'KUSHAGRA', subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/kushagra.webp', video: '/shopify/kushagra.mp4', link: 'https://main.kushagrakid.com/' },
    { id: 32, title: 'MASTER COLL', subtitle: 'SHOPIFY STORE', year: '2024', category: 'SHOPIFY', image: '/shopify/master coll.webp', video: '/shopify/master coll.mp4', link: '#' },

    // WORDPRESS
    { id: 33, title: 'ASCENT INDUSTRIES', subtitle: 'WORDPRESS', year: '2024', category: 'WORDPRESS', image: '/wordpress/AiM.webp', video: '/wordpress/aim.mp4', link: 'https://ascentindustries.in/' },
    { id: 34, title: 'VIPULANCHAL', subtitle: 'WORDPRESS', year: '2024', category: 'WORDPRESS', image: '/wordpress/vipudichal.webp', video: '/wordpress/vipulachal.mp4', link: 'https://vipulanchal.in/' },
    { id: 35, title: 'DREAM VISTA', subtitle: 'WORDPRESS', year: '2024', category: 'WORDPRESS', image: '/wordpress/DREAM VISTA.webp', video: '/wordpress/dream vista.mp4', link: 'https://dreamvistarealtors.com/' },
    { id: 36, title: 'DS OVERSEAS', subtitle: 'WORDPRESS', year: '2024', category: 'WORDPRESS', image: '/wordpress/DS OVERSEAS.webp', video: '/wordpress/ds overseas.mp4', link: 'https://lavender-narwhal-554808.hostingersite.com/' },

    // AI & ML PROJECTS
    { id: 37, title: 'AI CHATBOT', subtitle: 'ML MODEL', year: '2024', category: 'AI & ML PROJECTS', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=460&h=360&fit=crop', video: null, link: '#' },
    { id: 38, title: 'PREDICTIVE ANALYTICS', subtitle: 'DATA SCIENCE', year: '2024', category: 'AI & ML PROJECTS', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=460&h=360&fit=crop', video: null, link: '#' },

    // IOT PROJECTS
    { id: 39, title: 'SMART HOME', subtitle: 'IOT AUTOMATION', year: '2024', category: 'IOT PROJECTS', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=460&h=360&fit=crop', video: null, link: '#' },
    { id: 40, title: 'SENSOR NETWORK', subtitle: 'MONITORING SYSTEM', year: '2025', category: 'IOT PROJECTS', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=460&h=360&fit=crop', video: null, link: '#' },

    // HARDWARE
    { id: 41, title: 'PCB DESIGN', subtitle: 'CIRCUIT BOARD', year: '2024', category: 'HARDWARE', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=460&h=360&fit=crop', video: null, link: '#' },
    { id: 42, title: 'EMBEDDED SYSTEM', subtitle: 'MICROCONTROLLER', year: '2025', category: 'HARDWARE', image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=460&h=360&fit=crop', video: null, link: '#' },

    // SOFTWARE
    { id: 43, title: 'SOFTWARE PROJECT', subtitle: 'APPLICATION', year: '2024', category: 'SOFTWARE', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=460&h=360&fit=crop', video: null, link: '#' },
    { id: 44, title: 'WEB APPLICATION', subtitle: 'FULL STACK', year: '2025', category: 'SOFTWARE', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=460&h=360&fit=crop', video: null, link: '#' },

    // MOBILE DEV
    { id: 45, title: 'MOBILE APP', subtitle: 'MOBILE APPLICATION', year: '2024', category: 'MOBILE DEV', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=460&h=360&fit=crop', video: null, link: '#' },
    { id: 46, title: 'E-COMMERCE APP', subtitle: 'SHOPPING APP', year: '2025', category: 'MOBILE DEV', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=460&h=360&fit=crop', video: null, link: '#' },
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
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const videoRef = useRef(null);

  const startTime = project.title === 'CLOSET' ? 4.2 : 0;

  const handleMouseEnter = () => {
    if (videoRef.current && project.video) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && project.video) {
      videoRef.current.pause();
      videoRef.current.currentTime = startTime;
    }
  };

  const handleClick = () => {
    if (project.link && project.link !== '#') {
      window.open(project.link, '_blank');
    }
  };

  return (
    <div
      className="grid-project-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="project-media">
        <img src={project.image} alt={project.title} className="project-thumbnail" />
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            className="project-video"
            muted
            loop
            playsInline
            preload="none"
          />
        )}
      </div>
      <div className="project-info-grid">
        <h3>{project.title}</h3>
        <p>{project.subtitle}</p>
        <span>{project.year}</span>
      </div>
    </div>
  );
};

export default PortfolioProjectsGrid;
