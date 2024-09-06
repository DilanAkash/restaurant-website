import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/services')  // Ensure this matches your backend route
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error fetching services:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-white mb-12">Our Services</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.length === 0 ? (
            <p className="text-center col-span-full text-white">No services available at the moment.</p>
          ) : (
            services.map((service) => (
              <div
                key={service._id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                {/* Service Image */}
                {service.image ? (
                  <img
                    src={`http://localhost:5000${service.image}`}  // Prefix with backend URL
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}

                {/* Service Title */}
                <h2 className="text-2xl font-bold text-yellow-500 mb-2">{service.title}</h2>

                {/* Service Description */}
                <p className="text-gray-400 mb-4">{service.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
