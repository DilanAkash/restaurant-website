import React from 'react';
import logo from '../assets/logo.png';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left px-4 md:px-8 lg:px-12">
        
        {/* Logo and Address Section */}
        <div className="flex flex-col items-center md:items-start space-y-4 lg:col-span-1 text-center md:text-left">
          <img
            src={logo}
            alt="ABC Restaurant Logo"
            className="h-20 transition-transform transform hover:scale-105"
          />
          <div className="text-center md:text-left">
            <p>Mahindha RD - Colombo</p>
            <p>123 Avenue 2nd Lane</p>
            <p>CO-16, Sri Lanka</p>
            <p>071 887 9954</p>
            <p>abc.com</p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col items-center md:items-center space-y-2 md:space-y-4">
          <h3 className="text-xl font-bold mb-4">QUICK LINKS</h3>
          <div className="flex flex-col space-y-2 mb-6">
            <a href="#home" className="hover:text-yellow-400 transition-colors">Home</a>
            <a href="#services" className="hover:text-yellow-400 transition-colors">Services</a>
            <a href="#gallery" className="hover:text-yellow-400 transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="hover:text-yellow-400 transition-transform transform hover:scale-110"
               aria-label="Follow us on Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="hover:text-yellow-400 transition-transform transform hover:scale-110"
               aria-label="Follow us on Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="hover:text-yellow-400 transition-transform transform hover:scale-110"
               aria-label="Follow us on Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Opening Hours Section */}
        <div className="space-y-2 md:space-y-4 text-center md:text-right">
          <h3 className="text-xl font-bold mb-4">OPENING HOURS</h3>
          <p>Monday - Thursday: 3:00 pm - 10:00 pm</p>
          <p>Aperitivo: 3:00 pm - 5:00 pm | Dinner: 5:00 pm - 10:00 pm</p>
          <p>Friday: 3:00 pm - 11:00 pm</p>
          <p>Aperitivo: 3:00 pm - 5:00 pm | Dinner: 5:00 pm - 11:00 pm</p>
          <p>Saturday - Sunday: 10:00 am - 11:00 pm</p>
          <p>Brunch: 10:00 am - 3:00 pm | Dinner: 5:00 pm - 10:00 pm</p>
        </div>
      </div>

      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p>&copy; 2024 ABC Restaurant, Sri Lanka</p>
      </div>
      
    </footer>
  );
};

export default Footer;
