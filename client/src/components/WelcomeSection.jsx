import React from 'react';
import menuImage from '../assets/menu-image.jpg';
import offersImage from '../assets/offer-image.jpg';
import videoFile from '../assets/abc-restaurant-video.mp4'; // Update with your actual video file path

const WelcomeSection = () => {
  return (
    <section className="p-8 bg-gray-900">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section with Video */}
        <div
          className="relative bg-cover bg-center rounded-lg overflow-hidden"
          style={{ minHeight: '300px', backgroundAttachment: 'fixed' }} // Parallax effect
        >
          {/* Video covering the entire frame */}
          <video
            src={videoFile}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark backdrop for text visibility */}
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="relative p-8 w-full">
              <h2 className="text-5xl font-extrabold text-white mb-4 text-center">
                Welcome to<br /> ABC Restaurant
              </h2>
              <p className="text-white text-center">
                Experience our mouthwatering dishes, bursting with flavor and aroma.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section with Images and Buttons */}
        <div className="grid grid-rows-2 gap-4">
          {/* First Image with Button in Bottom-Right Corner */}
          <div className="relative overflow-hidden rounded-lg shadow-lg group">
            <img
              src={offersImage}
              alt="Offers"
              className="object-cover h-48 w-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg group-hover:bg-opacity-60 transition-all duration-300"></div>
            <div className="absolute bottom-4 right-4">
              <button
                className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-800 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                View Offers
              </button>
            </div>
          </div>

          {/* Second Image with Button in Bottom-Right Corner */}
          <div className="relative overflow-hidden rounded-lg shadow-lg group">
            <img
              src={menuImage}
              alt="Menu"
              className="object-cover h-48 w-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg group-hover:bg-opacity-60 transition-all duration-300"></div>
            <div className="absolute bottom-4 right-4">
              <button
                className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-green-800 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                View Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
