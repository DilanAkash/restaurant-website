import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import WelcomeSection from '../components/WelcomeSection';
import ValuesSection from '../components/ValuesSection';
import Footer from '../components/Footer';
import Menu from './Menu';
import Services from './Services';
import Gallery from './Gallery';
import Contact from './Contact';
import Offers from './Offers';
import Reservation from './Reservation';
import '../index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <WelcomeSection />
              <ValuesSection />
            </>
          } />
          <Route path="/menu" element={<Menu />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
