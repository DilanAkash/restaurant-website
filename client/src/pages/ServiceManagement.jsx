import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Fetch all services when the component loads
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setNewService((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setNewService((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Add a new service
  const addService = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('title', newService.title);
    formData.append('description', newService.description);
    formData.append('image', newService.image);

    try {
      const response = await axios.post('http://localhost:5000/api/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setServices((prevItems) => [...prevItems, response.data]);
      setNewService({ title: '', description: '', image: null });
      setImagePreview(null);
      setMessage('Service added successfully!');
    } catch (error) {
      console.error('Error adding service:', error);
      setErrorMessage('Error adding service. Please try again.');
    }
  };

  // Delete a service with confirmation
  const deleteService = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this service?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      setServices((prevItems) => prevItems.filter((item) => item._id !== id));
      setMessage('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error);
      setErrorMessage('Error deleting service. Please try again.');
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Service Management</h1>

        {/* Add New Service Form */}
        <form onSubmit={addService} className="mb-10 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl text-white font-semibold mb-4">Add New Service</h2>
          {message && <div className="bg-green-500 text-white p-4 rounded mb-4">{message}</div>}
          {errorMessage && <div className="bg-red-500 text-white p-4 rounded mb-4">{errorMessage}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white">Title</label>
              <input
                type="text"
                name="title"
                value={newService.title}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
                required
              />
            </div>

            <div>
              <label className="block text-white">Description</label>
              <textarea
                name="description"
                value={newService.description}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
                required
              />
            </div>

            <div>
              <label className="block text-white">Upload Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full p-2 rounded text-white bg-gray-900"
              />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover" />}
            </div>
          </div>

          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Add Service
          </button>
        </form>

        {/* List of Services */}
        <div>
          <h2 className="text-xl font-bold mb-6">Current Services</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <li key={service._id} className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p>{service.description}</p>
                {service.image && <img src={`http://localhost:5000${service.image}`} alt={service.title} className="mt-4 w-32 h-32 object-cover" />}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => deleteService(service._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServiceManagement;
