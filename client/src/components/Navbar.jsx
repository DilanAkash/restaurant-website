import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profile.png';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../AuthContext'; 

const Navbar = ({ cartItems, removeFromCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); 
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
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg flex-1 justify-center md:pr-8">
          <Link 
            to="/" 
            className={`hover:text-yellow-400 ${location.pathname === '/' ? 'text-yellow-400' : ''}`}
          >
            Home
          </Link>
          {['Menu', 'Services', 'Gallery', 'Contact', 'Offers', 'Reservation'].map((item) => (
            <Link 
              to={`/${item.toLowerCase()}`} 
              key={item} 
              className={`hover:text-yellow-400 ${location.pathname === `/${item.toLowerCase()}` ? 'text-yellow-400' : ''}`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* User Profile or Login/Signup and Cart */}
        <div className="hidden md:flex items-center space-x-2 md:pl-8">
          {user ? (
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                <FaShoppingCart size={24} className="cursor-pointer" onClick={toggleCart} aria-label="Cart" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <Link to="/profile" className="flex items-center space-x-2">
                <img src={profileIcon} alt="Profile Icon" className="h-8 w-8 rounded-full" />
                <span>{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>

              {/* Cart Popup */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-50">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-bold mb-4">Cart</h3>
                    {cartItems.length === 0 ? (
                      <p>Your cart is empty.</p>
                    ) : (
                      cartItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between mb-2">
                          <span>{item.name}</span>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-4 bg-gray-900 text-right">
                    <Link to="/cart">
                      <button onClick={toggleCart} className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                        Go to Cart
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login">
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 text-white z-50 transition-all duration-300 ease-in-out">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 ${location.pathname === '/' ? 'bg-gray-700' : ''}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            {['Menu', 'Services', 'Gallery', 'Contact', 'Offers', 'Reservation'].map((item) => (
              <Link 
                to={`/${item.toLowerCase()}`} 
                key={item} 
                className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 ${location.pathname === `/${item.toLowerCase()}` ? 'bg-gray-700' : ''}`}
                onClick={toggleMenu}
              >
                {item}
              </Link>
            ))}
            <div className="border-t border-gray-700 mt-2 pt-4 flex flex-col items-center">
              {user ? (
                <>
                  <Link to="/profile" className="flex items-center space-x-2 mb-4" onClick={toggleMenu}>
                    <img src={profileIcon} alt="Profile Icon" className="h-8 w-8 rounded-full inline-block" />
                    <span>{user.name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="w-10/12 bg-red-500 text-white px-5 py-3 text-lg rounded-lg hover:bg-red-600 transition-colors text-center"
                  >
                    Logout
                  </button>
                  {/* Cart in Mobile Menu */}
                  <div className="relative mt-4">
                    <FaShoppingCart size={24} className="cursor-pointer" onClick={toggleCart} aria-label="Cart" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                  {isCartOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-gray-800 rounded-lg shadow-lg z-50">
                      <div className="p-4 text-white">
                        <h3 className="text-lg font-bold mb-4">Cart</h3>
                        {cartItems.length === 0 ? (
                          <p>Your cart is empty.</p>
                        ) : (
                          cartItems.map((item, index) => (
                            <div key={index} className="flex items-center justify-between mb-2">
                              <span>{item.name}</span>
                              <button
                                onClick={() => removeFromCart(index)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                aria-label={`Remove ${item.name} from cart`}
                              >
                                Remove
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="p-4 bg-gray-900 text-right">
                        <Link to="/cart">
                          <button onClick={toggleCart} className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                            Go to Cart
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full flex flex-col items-center space-y-4">
                  <Link to="/login" onClick={toggleMenu}>
                    <button className="w-full bg-yellow-500 text-black px-5 py-3 text-lg rounded-lg hover:bg-yellow-600 transition-colors text-center">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" onClick={toggleMenu}>
                    <button className="w-full bg-yellow-500 text-black px-5 py-3 text-lg rounded-lg hover:bg-yellow-600 transition-colors text-center">
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
