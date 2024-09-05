import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profile.png';
import { FaBars, FaTimes, FaShoppingCart, FaChevronRight, FaTrashAlt, FaMinus, FaPlus } from 'react-icons/fa';
import { AuthContext } from '../AuthContext';

const Navbar = ({ cartItems, removeFromCart, updateCartItemQuantity, isItemAdded = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

// Open cart automatically when an item is added
useEffect(() => {
  if (isItemAdded) {
    setIsCartOpen(true);  // Automatically open cart if an item is added
  }
}, [isItemAdded]);

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
            <img src={logo} alt="ABC Restaurant Logo" className="h-8 cursor-pointer" />
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-sm flex-1 justify-center md:pr-6">
          <Link
            to="/"
            className={`hover:text-yellow-400 ${location.pathname === '/' ? 'text-yellow-400' : ''}`}
          >
            Home
          </Link>
          {['Menu', 'Services', 'Gallery', 'Contact', 'Offers'].map((item) => (
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
        <div className="hidden md:flex items-center space-x-2 md:pl-6">
          {user ? (
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                <FaShoppingCart size={20} className="cursor-pointer" onClick={toggleCart} aria-label="Cart" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <Link to="/profile" className="flex items-center space-x-2">
                <img src={profileIcon} alt="Profile Icon" className="h-6 w-6 rounded-full" />
                <span className="text-sm">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>

              {/* Cart Drawer */}
              <div
                className={`fixed top-16 right-4 h-auto w-56 bg-gray-800 bg-opacity-95 text-white shadow-lg rounded-lg z-50 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
              >
                <div className="flex justify-between items-center p-3">
                  <h3 className="text-sm font-bold">Your Cart</h3>
                  <button onClick={toggleCart} className="text-white focus:outline-none">
                    <FaChevronRight size={18} />
                  </button>
                </div>
                <div className="px-3 pb-3">
                  {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
                    cartItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between mb-2 text-xs">
                        <span>{item.name}</span>
                        <div className="flex items-center">
                          <button onClick={() => updateCartItemQuantity(item.id, -1)} className="text-white bg-gray-600 p-1 rounded-l-lg hover:bg-gray-700">
                            <FaMinus />
                          </button>
                          <span className="px-1">{item.quantity}</span>
                          <button onClick={() => updateCartItemQuantity(item.id, 1)} className="text-white bg-gray-600 p-1 rounded-r-lg hover:bg-gray-700">
                            <FaPlus />
                          </button>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="ml-1 text-red-500 hover:text-red-700 transition-colors"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {cartItems.length > 0 && (
                  <div className="p-3">
                    <Link to="/cart">
                      <button
                        onClick={toggleCart}
                        className="w-full bg-yellow-500 text-black px-3 py-1 rounded-lg text-xs hover:bg-yellow-600 transition-colors"
                      >
                        Go to Cart
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <button className="bg-yellow-500 text-black px-3 py-1 text-xs rounded-lg hover:bg-yellow-600 transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-yellow-500 text-black px-3 py-1 text-xs rounded-lg hover:bg-yellow-600 transition-colors">
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
            {['Menu', 'Services', 'Gallery', 'Contact', 'Offers'].map((item) => (
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
                              <div className="flex items-center">
                                <button onClick={() => updateCartItemQuantity(item.id, -1)} className="text-white bg-gray-600 p-1 rounded-l-lg hover:bg-gray-700">
                                  <FaMinus />
                                </button>
                                <span className="px-2">{item.quantity}</span>
                                <button onClick={() => updateCartItemQuantity(item.id, 1)} className="text-white bg-gray-600 p-1 rounded-r-lg hover:bg-gray-700">
                                  <FaPlus />
                                </button>
                                <button
                                  onClick={() => removeFromCart(index)}
                                  className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                                  aria-label={`Remove ${item.name} from cart`}
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
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
  updateCartItemQuantity: PropTypes.func, // Make it optional
  isItemAdded: PropTypes.bool, // Already optional
};

export default Navbar;
