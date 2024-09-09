import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';

const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch all gallery images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gallery');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };
    fetchImages();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setNewImage((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setNewImage((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Add new gallery image
  const addImage = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('title', newImage.title);
    formData.append('description', newImage.description);
    formData.append('image', newImage.image);

    try {
      const response = await axios.post('http://localhost:5000/api/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImages((prev) => [...prev, response.data]);
      setNewImage({
        title: '',
        description: '',
        image: null,
      });
      setImagePreview(null);
      setMessage('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Error uploading image. Please try again.');
    }
  };

  // Delete an image
  const deleteImage = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`);
      setImages((prev) => prev.filter((image) => image._id !== id));
      setMessage('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      setErrorMessage('Error deleting image. Please try again.');
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Gallery Management</h1>

        <form onSubmit={addImage} className="mb-10 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl text-white font-semibold mb-4">Add New Image</h2>
          {message && <div className="bg-green-500 text-white p-4 rounded mb-4">{message}</div>}
          {errorMessage && <div className="bg-red-500 text-white p-4 rounded mb-4">{errorMessage}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white">Title</label>
              <input
                type="text"
                name="title"
                value={newImage.title}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-white">Description</label>
              <input
                type="text"
                name="description"
                value={newImage.description}
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
            Add Image
          </button>
        </form>

        <div>
          <h2 className="text-xl font-bold mb-6">Current Gallery Images</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((image) => (
              <li key={image._id} className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                <p>{image.description}</p>
                {image.imagePath && <img src={`http://localhost:5000${image.imagePath}`} alt={image.title} className="mt-4 w-32 h-32 object-cover" />}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => deleteImage(image._id)}
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

export default GalleryManagement;
