import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import WelcomeSection from '../components/WelcomeSection';
import ValuesSection from '../components/ValuesSection';
import Footer from '../components/Footer';
import Menu from './Menu';
import Services from './Services';
import Gallery from './Gallery';
import Contact from '../components/Contact';
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
import AdminDashboard from './AdminDashboard';
import StaffDashboard from './StaffDashboard';
import '../index.css';

function App() {
  // Define cartItems and setCartItems using useState
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Save cartItems to localStorage on change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Remove item from cart
  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  // Update quantity of items in the cart
  const updateCartItemQuantity = (id, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <Router>
        <div className="w-full min-h-screen bg-gray-900 text-white overflow-x-hidden">
          <AuthWrapper
            cartItems={cartItems}
            setCartItems={setCartItems} // Ensure setCartItems is passed here
            removeFromCart={removeFromCart}
            updateCartItemQuantity={updateCartItemQuantity}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

// AuthWrapper handles the conditional rendering of Navbar and Footer based on route
function AuthWrapper({ cartItems, setCartItems, removeFromCart, updateCartItemQuantity }) {
  const { loading } = useContext(AuthContext); // Removed 'user' since it's unused
  const location = useLocation(); // Get the current route

  // If loading is in progress, show a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // Determine if we are on the Admin or Staff dashboard
  const isDashboard = location.pathname.includes('/admin/dashboard') || location.pathname.includes('/staff/dashboard');

  return (
    <>
      {/* Show Navbar and Footer for all users, but hide them on AdminDashboard and StaffDashboard */}
      {!isDashboard && (
        <>
          <Navbar
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateCartItemQuantity={updateCartItemQuantity}
          />
        </>
      )}

      <Routes>
        {/* Customer Pages */}
        <Route path="/" element={
          <>
            <HeroSection />
            <WelcomeSection />
            <ValuesSection />
          </>
        }/>
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
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/cart" element={<RequireAuth><Cart cartItems={cartItems} removeFromCart={removeFromCart} updateCartItemQuantity={updateCartItemQuantity} setCartItems={setCartItems} /></RequireAuth>} />
        <Route path="/orders" element={<RequireAuth><MyOrders /></RequireAuth>} />
        <Route path="/messages" element={<RequireAuth><MessageCenter /></RequireAuth>} />
        <Route path="/payments" element={<RequireAuth><Payments /></RequireAuth>} />
        <Route path="/edit-profile" element={<RequireAuth><EditProfile /></RequireAuth>} />
        <Route path="/staff-orders" element={<RequireAuth><StaffOrders /></RequireAuth>} />

        {/* Admin and Staff Role-Based Protected Routes */}
        <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/staff-dashboard" element={<ProtectedRoute requiredRole="staff"><StaffDashboard /></ProtectedRoute>} />
      </Routes>

      {/* Show Footer for regular customers, admin, and staff, except on their respective dashboards */}
      {!isDashboard && <Footer />}
    </>
  );
}

// Role-based Protected Route Component
function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useContext(AuthContext);

  // Show loading indicator while user data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  // Redirect to login page if no user is logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to homepage if the user does not have the required role
  if (user.role !== requiredRole) {
    return <Navigate to="/" />;  // Redirect regular users trying to access admin/staff dashboards
  }

  // If the role matches, render the protected route
  return children;
}

// Basic protected route for logged-in users
function RequireAuth({ children }) {
  const { user } = useContext(AuthContext); // This usage of user is required here
  return user ? children : <Navigate to="/login" />;
}

// Define PropTypes for components
AuthWrapper.propTypes = {
  cartItems: PropTypes.array.isRequired,
  setCartItems: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateCartItemQuantity: PropTypes.func.isRequired,
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string.isRequired,
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
