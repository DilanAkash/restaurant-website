import React from 'react';
import Navbar from '../components/Navbar'; // Correct path from App.jsx to Navbar.jsx
import HeroSection from '../components/HeroSection'; // Correct path from App.jsx to HeroSection.jsx
import ValuesSection from '../components/ValuesSection'; // Correct path from App.jsx to ValuesSection.jsx
import Footer from '../components/Footer'; // Correct path from App.jsx to Footer.jsx
import SpecialOffersSection from '../components/SpecialOffersSection';

import '../index.css';


function App() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <SpecialOffersSection />
      <ValuesSection />
      <Footer />
      
    </div>
  );
}

export default App;
