import React from 'react';
import authentic from '../assets/authentic.png';
import fresh from '../assets/fresh.png';
import hotPot from '../assets/hot-pot.png';
import menuVariety from '../assets/menu variety.png';
import backgroundImage from '../assets/tablewithp.jpg';

function ValuesSection() {
  return (
    <section
      className="py-16 bg-black text-white relative overflow-hidden z-10"  // Ensure z-index is lower than the navbar
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>  {/* Make sure overlay stays behind content */}
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Single Value Card */}
          <div className="relative group text-center transition-transform transform hover:scale-105 p-6 rounded-lg shadow-lg overflow-hidden">
            {/* Hover Background Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 rounded-lg transition-all duration-300 group-hover:bg-opacity-70 z-10"></div>
            {/* Icon */}
            <img src={authentic} alt="Authentically Sri Lankan" className="relative z-20 mx-auto mb-4 w-20 h-20 transition-transform duration-300 group-hover:rotate-12" />
            {/* Description */}
            <p className="relative z-20 mt-4 text-lg font-semibold">Authentically Sri Lankan</p>
          </div>

          <div className="relative group text-center transition-transform transform hover:scale-105 p-6 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-0 rounded-lg transition-all duration-300 group-hover:bg-opacity-70 z-10"></div>
            <img src={menuVariety} alt="Menu Variety" className="relative z-20 mx-auto mb-4 w-20 h-20 transition-transform duration-300 group-hover:rotate-12" />
            <p className="relative z-20 mt-4 text-lg font-semibold">Menu Variety</p>
          </div>

          <div className="relative group text-center transition-transform transform hover:scale-105 p-6 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-0 rounded-lg transition-all duration-300 group-hover:bg-opacity-70 z-10"></div>
            <img src={fresh} alt="100% Fresh Ingredients" className="relative z-20 mx-auto mb-4 w-20 h-20 transition-transform duration-300 group-hover:rotate-12" />
            <p className="relative z-20 mt-4 text-lg font-semibold">100% Fresh Ingredients</p>
          </div>

          <div className="relative group text-center transition-transform transform hover:scale-105 p-6 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-0 rounded-lg transition-all duration-300 group-hover:bg-opacity-70 z-10"></div>
            <img src={hotPot} alt="Ambiance" className="relative z-20 mx-auto mb-4 w-20 h-20 transition-transform duration-300 group-hover:rotate-12" />
            <p className="relative z-20 mt-4 text-lg font-semibold">Ambiance</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ValuesSection;
