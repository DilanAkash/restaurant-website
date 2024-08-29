import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="/" className="text-yellow-500 hover:text-yellow-700">Home</a>
          <a href="/services" className="text-yellow-500 hover:text-yellow-700">Services</a>
          <a href="/gallery" className="text-yellow-500 hover:text-yellow-700">Gallery</a>
          <a href="/contact" className="text-yellow-500 hover:text-yellow-700">Contact</a>
          <a href="/offers" className="text-yellow-500 hover:text-yellow-700">Offers</a>
        </div>
        <div className="mb-4">
          <p>Mahinda RD - Colombo</p>
          <p>123 avenue 2nd Lane, CO-16 Sri Lanka</p>
          <p>071 887 9954 | abc.com</p>
        </div>
        <p>&copy; 2024 ABC Restaurant, Sri Lanka</p>
      </div>
    </footer>
  );
}

export default Footer;
