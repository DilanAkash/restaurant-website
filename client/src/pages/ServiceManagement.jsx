import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleAddService = async () => {
    try {
      await axios.post('/api/services', newService);
      fetchServices();
      setNewService({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`/api/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="ml-64 p-6">
      <h1 className="text-3xl font-bold mb-6">Service Management</h1>

      <div className="mb-6">
        <h2 className="text-2xl mb-4">Add New Service</h2>
        <input
          type="text"
          placeholder="Title"
          value={newService.title}
          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          className="p-2 border mb-2"
        />
        <textarea
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          className="p-2 border mb-2"
        />
        <button onClick={handleAddService} className="p-2 bg-blue-500 text-white">Add Service</button>
      </div>

      <div>
        <h2 className="text-2xl mb-4">Current Services</h2>
        <ul>
          {services.map((service) => (
            <li key={service._id} className="mb-4">
              <div className="p-4 border bg-gray-200">
                <h3 className="text-lg font-bold">{service.title}</h3>
                <p>{service.description}</p>
                <button onClick={() => handleDeleteService(service._id)} className="p-2 bg-red-500 text-white mt-2">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceManagement;
