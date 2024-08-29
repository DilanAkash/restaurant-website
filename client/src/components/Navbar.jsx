import React, { useState } from 'react';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profile.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-80 text-white shadow-lg z-10 backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo on the left */}
        <div className="flex-1 flex justify-start">
          <img src={logo} alt="ABC Restaurant Logo" className="h-10" />  {/* Adjusted size */}
        </div>

        {/* Mobile Menu Button on the right */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links for desktop */}
        <div className="hidden md:flex space-x-8 text-lg flex-1 justify-center">
          <a href="#home" className="hover:text-yellow-400">Home</a>
          <a href="#services" className="hover:text-yellow-400">Services</a>
          <a href="#gallery" className="hover:text-yellow-400">Gallery</a>
          <a href="#contact" className="hover:text-yellow-400">Contact</a>
          <a href="#offers" className="hover:text-yellow-400">Offers</a>
          <a href="#reservation" className="hover:text-yellow-400">Reservation</a>
        </div>

        {/* User Profile for desktop */}
        <div className="hidden md:flex items-center space-x-2">
          <img src={profileIcon} alt="Profile Icon" className="h-8 w-8 rounded-full" />  {/* Adjusted size */}
          <span className="text-sm">Dilan Akash</span>  {/* Adjusted text size */}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-90 text-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Home</a>
            <a href="#services" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Services</a>
            <a href="#gallery" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Gallery</a>
            <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Contact</a>
            <a href="#offers" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Offers</a>
            <a href="#reservation" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Reservation</a>
            <div className="border-t border-gray-700 mt-2 pt-2">
              <a href="#account" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                <img src={profileIcon} alt="Profile Icon" className="h-8 w-8 rounded-full inline-block mr-2" />
                Dilan Akash
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
