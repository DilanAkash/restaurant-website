import React, { useState, useContext, useEffect } from 'react';
import dishrotate from '../assets/dishrotate.png';
import heroBackground from '../assets/homeback.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaMapMarkerAlt } from 'react-icons/fa';  // Import icons

const HeroSection = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('Colombo ABC Restaurant');
  
  // Set the current time as default on page load
  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    setTime(currentTime);
  }, []);

  const handleReservation = () => {
    if (!user) {
      alert('Please log in to make a reservation');
      return;
    }

    fetch('http://localhost:5000/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user._id,
        date: selectedDate,
        time,
        numberOfGuests,
        location,
        status: 'pending',
      }),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Reservation successful!');
        navigate('/reservations'); // Redirect to "My Reservations" page
      })
      .catch((error) => {
        alert('Error making reservation. Please try again.');
        console.error('Error:', error);
      });
  };

  return (
    <section
      className="relative w-full h-[100vh] bg-center bg-cover flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="container mx-auto px-8 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-center">
        <div className="text-left md:w-1/2">
          <h1 className="text-2xl md:text-5xl font-extrabold text-white mt-2 leading-tight">
            <span className="text-white">A</span><span className="text-yellow-500">ppetite Meets</span><br />
            <span className="text-white">B</span><span className="text-yellow-500">rilliance and</span><br />
            <span className="text-white">C</span><span className="text-yellow-500">reativity</span>
          </h1>
          <div className="mt-6 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 items-center">
            
            {/* Number of Guests Field */}
            <div className="w-full md:w-auto">
              <label className="block text-sm font-bold text-white mb-1">Guests</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                  placeholder="2 people"
                  className="w-full md:w-[180px] p-2 md:p-3 pl-4 pr-14 rounded-lg text-gray-800 shadow-lg focus:ring-2 focus:ring-yellow-500"
                />
                <FaUsers className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Date Field */}
            <div className="w-full md:w-auto">
              <label className="block text-sm font-bold text-white mb-1">Select Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full md:w-[240px] p-2 md:p-3 pl-4 pr-10 rounded-lg text-gray-800 shadow-lg focus:ring-2 focus:ring-yellow-500"
                dateFormat="MM/dd/yyyy"
                placeholderText="Select a date"
              />
            </div>

            {/* Time Field */}
            <div className="w-full md:w-auto">
              <label className="block text-sm font-bold text-white mb-1">Select Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full md:w-[240px] p-2 md:p-3 pl-4 pr-10 rounded-lg text-gray-800 shadow-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Location Field */}
            <div className="relative w-full md:w-auto">
              <label className="block text-sm font-bold text-white mb-1">Select Location</label>
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full md:w-[240px] p-2 md:p-3 pl-4 pr-14 rounded-lg text-gray-800 shadow-lg focus:ring-2 focus:ring-yellow-500 appearance-none"
                >
                  <option>Colombo ABC Restaurant</option>
                  <option>Kandy ABC Restaurant</option>
                  <option>Galle ABC Restaurant</option>
                  <option>Jaffna ABC Restaurant</option>
                  <option>Negombo ABC Restaurant</option>
                </select>
                <FaMapMarkerAlt className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="mt-6 w-full">
            <button
              onClick={handleReservation}
              className="w-full md:w-auto bg-red-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-red-700 shadow-lg text-base md:text-lg transform transition-transform hover:scale-105 active:scale-95"
            >
              Reserve Now
            </button>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:ml-12">
          <img
            src={dishrotate}
            alt="Rotating Dish"
            className="w-[10rem] h-[10rem] md:w-[20rem] md:h-[20rem] lg:w-[26rem] lg:h-[26rem] rounded-full animate-spin-slow"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
