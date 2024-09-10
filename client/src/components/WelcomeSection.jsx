import React from 'react';
import { Link } from 'react-router-dom';
import menuImage from '../assets/menu-image.jpg';
import offersImage from '../assets/offer-image.jpg';
import videoFile from '../assets/abc-restaurant-video.mp4';

const WelcomeSection = () => {
  return (
    <section className="welcome-section">
      <div className="welcome-container">
        
        {/* Video Background Left Section */}
        <div
          className="welcome-video-container"
          aria-label="Welcome video showcasing ABC Restaurant's ambiance"
        >
          <video
            src={videoFile}
            autoPlay
            loop
            muted
            playsInline
            className="welcome-video"
          />
          <div className="welcome-video-overlay">
            <div className="welcome-text-container">
              <h2 className="welcome-heading">
                Welcome to<br /> ABC Restaurant
              </h2>
              <p className="welcome-subheading">
                Experience our mouthwatering dishes, bursting with flavor and aroma.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="welcome-right-section">
          {/* Offers Section */}
          <div className="welcome-image-container group">
            <img
              src={offersImage}
              alt="Offers"
              className="welcome-image group-hover:brightness-110"
            />
            <div className="welcome-image-overlay group-hover:bg-opacity-40"></div>
            <div className="welcome-button-container">
              <Link to="/offers">
                <button
                  className="welcome-button bg-blue-600 hover:bg-blue-800"
                  aria-label="View current offers at ABC Restaurant"
                >
                  View Offers
                </button>
              </Link>
            </div>
          </div>

          {/* Menu Section */}
          <div className="welcome-image-container group">
            <img
              src={menuImage}
              alt="Menu"
              className="welcome-image group-hover:brightness-110"
            />
            <div className="welcome-image-overlay group-hover:bg-opacity-40"></div>
            <div className="welcome-button-container">
              <Link to="/menu">
                <button
                  className="welcome-button bg-green-600 hover:bg-green-800"
                  aria-label="View ABC Restaurant's menu"
                >
                  View Menu
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
