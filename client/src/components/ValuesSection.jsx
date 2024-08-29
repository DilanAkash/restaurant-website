import React from 'react';
import authentic from '../assets/authentic.png';
import fresh from '../assets/fresh.png';
import hotPot from '../assets/hot-pot.png';
import menuVariety from '../assets/menu variety.png';

function ValuesSection() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <img src={authentic} alt="Authentically Sri Lankan" className="mx-auto mb-4" />
            <p>Authentically Sri Lankan</p>
          </div>
          <div className="text-center">
            <img src={menuVariety} alt="Menu Variety" className="mx-auto mb-4" />
            <p>Menu Variety</p>
          </div>
          <div className="text-center">
            <img src={fresh} alt="100% Fresh Ingredients" className="mx-auto mb-4" />
            <p>100% Fresh Ingredients</p>
          </div>
          <div className="text-center">
            <img src={hotPot} alt="Ambiance" className="mx-auto mb-4" />
            <p>Ambiance</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ValuesSection;
