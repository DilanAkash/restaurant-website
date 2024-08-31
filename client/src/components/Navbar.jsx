import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profile.png';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../AuthContext'; // Import AuthContext

const Navbar = ({ cartItems, removeFromCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Access user and logout from context
  const navigate = useNavigate(); // To handle redirection

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-80 text-white shadow-lg z-50 backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex-1 flex items-center">
          <Link to="/">
            <img src={logo} alt="ABC Restaurant Logo" className="h-10 cursor-pointer" />
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg flex-1 justify-center md:pr-8">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>
          {['Menu', 'Services', 'Gallery', 'Contact', 'Offers', 'Reservation'].map((item) => (
            <Link to={`/${item.toLowerCase()}`} key={item} className="hover:text-yellow-400">
              {item}
            </Link>
          ))}
        </div>

        {/* User Profile or Login/Signup and Cart */}
        <div className="hidden md:flex items-center space-x-2 md:pl-8">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Link to="/cart">
                  <FaShoppingCart size={24} className="cursor-pointer" />
                </Link>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <Link to="/profile">
                <img src={profileIcon} alt="Profile Icon" className="h-8 w-8 rounded-full" />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login">
                <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition-colors">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 text-white z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
              Home
            </Link>
            {['Menu', 'Services', 'Gallery', 'Contact', 'Offers', 'Reservation'].map((item) => (
              <Link to={`/${item.toLowerCase()}`} key={item} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                {item}
              </Link>
            ))}
            <div className="border-t border-gray-700 mt-2 pt-2">
              {user ? (
                <>
                  <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 items-center">
                    <img src={profileIcon} alt="Profile Icon" className="h-8 w-8 rounded-full inline-block mr-2" />
                    {user.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link to="/login">
                    <button className="w-full bg-yellow-500 text-black px-3 py-2 rounded hover:bg-yellow-600 transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="w-full bg-yellow-500 text-black px-3 py-2 rounded hover:bg-yellow-600 transition-colors">
                      Signup
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Validate PropTypes
Navbar.propTypes = {
  cartItems: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Navbar;
