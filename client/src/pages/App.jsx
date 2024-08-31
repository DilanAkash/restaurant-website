import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Login from './Login';
import Signup from './Signup';
import AuthProvider from '../AuthContext'; 
import '../index.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="w-full min-h-screen bg-gray-900 text-white overflow-x-hidden">
          <Navbar cartItems={cartItems} removeFromCart={removeFromCart} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <WelcomeSection />
                  <ValuesSection />
                </>
              }
            />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/login" element={<Login />} /> {/* Add Login Route */}
            <Route path="/signup" element={<Signup />} /> {/* Add Signup Route */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
