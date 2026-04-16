import './PortfolioHero.css';

const PortfolioHero = () => {
  return (
    <section className="portfolio-hero">
      <div className="portfolio-bg-lines">
        <div className="bg-line" style={{ left: '20%' }}></div>
        <div className="bg-line" style={{ left: '40%' }}></div>
        <div className="bg-line" style={{ left: '60%' }}></div>
        <div className="bg-line" style={{ left: '80%' }}></div>
      </div>

      <div className="portfolio-bg-squares">
        <div
          className="bg-square"
          style={{ left: '0%', backgroundImage: "url('/web/roccia.webp')" }}
        ></div>
        <div
          className="bg-square"
          style={{ left: '20%', backgroundImage: "url('/web/tita.webp')" }}
        ></div>
        <div
          className="bg-square"
          style={{ left: '40%', backgroundImage: "url('/shopify/MILOE.webp')" }}
        ></div>
        <div
          className="bg-square"
          style={{ left: '60%', backgroundImage: "url('/web/closet.webp')" }}
        ></div>
        <div
          className="bg-square"
          style={{ left: '80%', backgroundImage: "url('/web/evara.webp')" }}
        ></div>
      </div>

      <h1 className="portfolio-hero-title">OUR PORTFOLIO</h1>
    </section>
  );
};

export default PortfolioHero;
