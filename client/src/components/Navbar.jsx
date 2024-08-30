import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profile.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // to track the login status

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-80 text-white shadow-lg z-50 backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex-1 flex items-center">
          {/* Make the logo clickable and redirect to the home screen */}
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
          {['Home', 'Menu', 'Services', 'Gallery', 'Contact', 'Offers', 'Reservation'].map((item) => (
            <Link to={`/${item.toLowerCase()}`} key={item} className="hover:text-yellow-400">
              {item}
            </Link>
          ))}
        </div>

        {/* User Profile or Login/Signup */}
        <div className="hidden md:flex items-center space-x-2 md:pl-8">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <img src={profileIcon} alt="Profile Icon" className="h-8 w-8 rounded-full" />
              <span className="text-sm">Dilan Akash</span>
            </div>
          ) : (
            <div className="space-x-4">
              <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition-colors">Login</button>
              <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition-colors">Signup</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 text-white z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Home', 'Menu', 'Services', 'Gallery', 'Contact', 'Offers', 'Reservation'].map((item) => (
              <Link to={`/${item.toLowerCase()}`} key={item} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                {item}
              </Link>
            ))}
            <div className="border-t border-gray-700 mt-2 pt-2">
              {isLoggedIn ? (
                <Link to="/account" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 items-center">
                  <img src={profileIcon} alt="Profile Icon" className="h-8 w-8 rounded-full inline-block mr-2" />
                  Dilan Akash
                </Link>
              ) : (
                <div className="space-y-2">
                  <button className="w-full bg-yellow-500 text-black px-3 py-2 rounded hover:bg-yellow-600 transition-colors">Login</button>
                  <button className="w-full bg-yellow-500 text-black px-3 py-2 rounded hover:bg-yellow-600 transition-colors">Signup</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
