import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
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
import Profile from './Profile';
import Cart from './Cart';
import MyOrders from './MyOrders';
import MyReservations from './MyReservations';
import MessageCenter from './MessageCenter';
import Payments from './Payments';
import EditProfile from './EditProfile';
import StaffOrders from './StaffOrders';
import AuthProvider, { AuthContext } from '../AuthContext';
import '../index.css';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const updateCartItemQuantity = (id, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  return (
    <AuthProvider>
      <Router>
        <div className="w-full min-h-screen bg-gray-900 text-white overflow-x-hidden">
          <Navbar 
            cartItems={cartItems} 
            removeFromCart={removeFromCart}
            updateCartItemQuantity={updateCartItemQuantity}
          />
          <Routes>
            <Route path="/" element={
                <>
                  <HeroSection />
                  <WelcomeSection />
                  <ValuesSection />
                </>
              }
            />
            <Route path="/menu" element={<Menu cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reservations" element={<MyReservations />} />

            {/* Protected Routes */}
            <Route path="/profile" element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="/cart" element={
                <RequireAuth>
                  <Cart 
                    cartItems={cartItems} 
                    removeFromCart={removeFromCart} 
                    updateCartItemQuantity={updateCartItemQuantity} 
                    setCartItems={setCartItems}
                  />
                </RequireAuth>
              }
            />

            {/* New Routes for Profile Sections */}
            <Route path="/orders" element={<RequireAuth><MyOrders /></RequireAuth>} />
            <Route path="/messages" element={<RequireAuth><MessageCenter /></RequireAuth>} />
            <Route path="/payments" element={<RequireAuth><Payments /></RequireAuth>} />
            <Route path="/edit-profile" element={<RequireAuth><EditProfile /></RequireAuth>} />

            {/* New Route for Staff Orders */}
            <Route path="/staff-orders" element={<RequireAuth><StaffOrders /></RequireAuth>} />
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
