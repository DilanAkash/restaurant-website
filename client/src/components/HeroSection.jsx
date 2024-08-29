import React, { useState } from 'react';
import dishrotate from '../assets/dishrotate.png';
import heroBackground from '../assets/homeback.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const HeroSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <section
      className="relative w-full h-[85vh] bg-center bg-cover flex items-center text-white"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="container mx-auto px-8 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-center">
        <div className="text-left md:w-1/2 mt-40 md:mt-0"> {/* Adjusted margin top here */}
          <h1 className="text-2xl md:text-5xl font-extrabold text-white mt-2 leading-tight"> {/* Scaled down text size */}
            <span className="text-white">A</span><span className="text-yellow-500">ppetite Meets</span><br />
            <span className="text-white">B</span><span className="text-yellow-500">rilliance and</span><br />
            <span className="text-white">C</span><span className="text-yellow-500">reativity</span>
          </h1>
          <div className="mt-6 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 items-center">
            <input
              type="number"
              min="1"
              max="20"
              placeholder="2 people"
              className="w-full md:w-auto p-2 md:p-3 pl-4 pr-10 rounded-lg text-gray-800 shadow-lg focus:ring-2 focus:ring-yellow-500"
            />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full md:w-auto p-2 md:p-3 pl-4 pr-10 rounded-lg text-gray-800 shadow-lg focus:ring-2 focus:ring-yellow-500"
              dateFormat="MM/dd/yyyy"
              placeholderText="Select a date"
            />
            <input
              type="time"
              className="w-full md:w-auto p-2 md:p-3 pl-4 pr-10 rounded-lg text-gray-800 shadow-lg focus:ring-2 focus:ring-yellow-500"
            />
            <div className="relative w-full md:w-auto">
              <select
                className="w-full md:w-auto p-2 md:p-3 pl-4 pr-10 rounded-lg text-gray-800 shadow-lg focus:ring-2 focus:ring-yellow-500 appearance-none"
              >
                <option>Colombo ABC Restaurant</option>
                <option>Kandy ABC Restaurant</option>
                <option>Galle ABC Restaurant</option>
                <option>Jaffna ABC Restaurant</option>
                <option>Negombo ABC Restaurant</option>
              </select>
            </div>
          </div>
          <div className="mt-6 w-full">
            <button className="w-full md:w-auto bg-red-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-red-700 shadow-lg text-base md:text-lg">
              Reserve Now
            </button>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:ml-12">
          <img
            src={dishrotate}
            alt="Rotating Dish"
            className="w-[10rem] h-[10rem] md:w-[20rem] md:h-[20rem] lg:w-[26rem] lg:h-[26rem] rounded-full animate-spin-slow" /* Scaled down plate size */
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
