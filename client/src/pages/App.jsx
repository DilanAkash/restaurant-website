import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import WelcomeSection from '../components/WelcomeSection';
import ValuesSection from '../components/ValuesSection';
import Footer from '../components/Footer';
import '../index.css';

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <ValuesSection />
      <Footer />
    </div>
  );
}

export default App;
