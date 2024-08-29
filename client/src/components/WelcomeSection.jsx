import React from 'react';
import backgroundImage from '../assets/coolsection.webp';
import menuImage from '../assets/menu-image.jpg';
import offersImage from '../assets/offer-image.jpg';
import { motion } from 'framer-motion';

const WelcomeSection = () => {
  return (
    <section className="p-8 bg-gray-900">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section with Text */}
        <motion.div
          className="relative bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${backgroundImage})`, minHeight: '300px' }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>
          <div className="relative p-8">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Welcome to ABC Restaurant
            </h2>
            <p className="text-white mb-4">
              Experience our mouthwatering dishes, bursting with flavor and aroma.
            </p>
            <p className="text-white mb-4">
              Our chefs use the finest ingredients to create a wide range of delicious dishes, perfect for any occasion. From traditional favorites to innovative creations, we have something for everyone. Discover our menu, enjoy exclusive offers, and immerse yourself in a culinary experience like no other.
            </p>
            <p className="text-white mb-4">
              Whether you are looking to celebrate a special occasion or simply enjoy a night out with friends and family, ABC Restaurant is the place to be. We look forward to welcoming you and making your dining experience unforgettable.
            </p>
          </div>
        </motion.div>

        {/* Right Section with Images and Buttons */}
        <div className="grid grid-rows-2 gap-4">
          {/* First Image with Button in Bottom-Right Corner */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <img
              src={offersImage}
              alt="Offers"
              className="rounded-lg shadow-lg object-cover h-48 w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
            <div className="absolute bottom-4 right-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.3)" }}
                className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
              >
                View Offers
              </motion.button>
            </div>
          </motion.div>

          {/* Second Image with Button in Bottom-Right Corner */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            <img
              src={menuImage}
              alt="Menu"
              className="rounded-lg shadow-lg object-cover h-48 w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
            <div className="absolute bottom-4 right-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.3)" }}
                className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300"
              >
                View Menu
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
