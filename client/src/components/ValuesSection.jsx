import React from 'react';
import authentic from '../assets/authentic.png';
import fresh from '../assets/fresh.png';
import hotPot from '../assets/hot-pot.png';
import menuVariety from '../assets/menu variety.png';
import backgroundImage from '../assets/tablewithp.jpg';

function ValuesSection() {
  return (
    <section
      className="py-16 bg-black text-white relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="relative text-center transition-transform transform hover:scale-105 p-6 rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-black bg-opacity-0 rounded-lg transition-all duration-300 hover:bg-opacity-50"></div>
            <img src={authentic} alt="Authentically Sri Lankan" className="relative mx-auto mb-4 w-20 h-20 transition-transform duration-300 hover:rotate-6" />
            <p className="relative mt-4 text-lg font-semibold">Authentically Sri Lankan</p>
          </div>
          <div className="relative text-center transition-transform transform hover:scale-105 p-6 rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-black bg-opacity-0 rounded-lg transition-all duration-300 hover:bg-opacity-50"></div>
            <img src={menuVariety} alt="Menu Variety" className="relative mx-auto mb-4 w-20 h-20 transition-transform duration-300 hover:rotate-6" />
            <p className="relative mt-4 text-lg font-semibold">Menu Variety</p>
          </div>
          <div className="relative text-center transition-transform transform hover:scale-105 p-6 rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-black bg-opacity-0 rounded-lg transition-all duration-300 hover:bg-opacity-50"></div>
            <img src={fresh} alt="100% Fresh Ingredients" className="relative mx-auto mb-4 w-20 h-20 transition-transform duration-300 hover:rotate-6" />
            <p className="relative mt-4 text-lg font-semibold">100% Fresh Ingredients</p>
          </div>
          <div className="relative text-center transition-transform transform hover:scale-105 p-6 rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-black bg-opacity-0 rounded-lg transition-all duration-300 hover:bg-opacity-50"></div>
            <img src={hotPot} alt="Ambiance" className="relative mx-auto mb-4 w-20 h-20 transition-transform duration-300 hover:rotate-6" />
            <p className="relative mt-4 text-lg font-semibold">Ambiance</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ValuesSection;
