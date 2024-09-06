import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/services')  // Make sure this matches your backend route
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error fetching services:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Our Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.length === 0 ? (
            <p className="text-center col-span-full">No services available at the moment.</p>
          ) : (
            services.map((service) => (
              <div
                key={service._id}
                className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                {service.imagePath && <img src={service.imagePath} alt={service.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
                <h2 className="text-2xl font-bold text-gray-800">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
