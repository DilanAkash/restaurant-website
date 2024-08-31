import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes for validation
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
import Profile from './Profile'; // Make sure this component exists
import Cart from './Cart'; // Make sure this component exists
import AuthProvider, { AuthContext } from '../AuthContext'; // Correct import
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
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<Signup />} /> 

            {/* Protected Routes */}
            <Route 
              path="/profile" 
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <RequireAuth>
                  <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
                </RequireAuth>
              } 
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Protected Route Component
function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

// Prop type validation for RequireAuth component
RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
