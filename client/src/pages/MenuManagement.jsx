import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout'; // Import the new layout

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Dinner',
    description: '',
    price: '',
    image: null,
    isNewItem: false,
    isPopular: false,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu/all');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setNewItem((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setNewItem((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const addMenuItem = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('name', newItem.name);
    formData.append('category', newItem.category);
    formData.append('description', newItem.description);
    formData.append('price', newItem.price);
    formData.append('image', newItem.image);
    formData.append('isNewItem', newItem.isNewItem);
    formData.append('isPopular', newItem.isPopular);

    try {
      const response = await axios.post('http://localhost:5000/api/menu/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMenuItems((prevItems) => [...prevItems, response.data]);
      setNewItem({
        name: '',
        category: 'Dinner',
        description: '',
        price: '',
        image: null,
        isNewItem: false,
        isPopular: false,
      });
      setImagePreview(null);
      setMessage('Item added successfully!');
    } catch (error) {
      console.error('Error adding menu item:', error);
      setErrorMessage('Error adding menu item. Please try again.');
    }
  };

  const deleteMenuItem = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMenuItems((prevItems) => prevItems.filter((item) => item._id !== id));
      setMessage('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting menu item:', error);
      setErrorMessage('Error deleting menu item. Please try again.');
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Menu Management</h1>
        
        {/* Add new menu item form */}
        <form onSubmit={addMenuItem} className="mb-10 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl text-white font-semibold mb-4">Add New Menu Item</h2>
          {message && <div className="bg-green-500 text-white p-4 rounded mb-4">{message}</div>}
          {errorMessage && <div className="bg-red-500 text-white p-4 rounded mb-4">{errorMessage}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white">Name</label>
              <input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
                required
              />
            </div>
            
            <div>
              <label className="block text-white">Category</label>
              <select
                name="category"
                value={newItem.category}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
              >
                <option value="Dinner">Dinner</option>
                <option value="Rice">Rice</option>
                <option value="Fish">Fish</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white">Price</label>
              <input
                type="number"
                name="price"
                value={newItem.price}
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
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isNewItem"
                checked={newItem.isNewItem}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-white">New Item</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPopular"
                checked={newItem.isPopular}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-white">Popular</label>
            </div>
          </div>
          
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Add Item
          </button>
        </form>

        {/* Menu items list */}
        <div>
          <h2 className="text-xl font-bold mb-6">Current Menu Items</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <li key={item._id} className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p>Category: {item.category}</p>
                <p>Price: Rs. {item.price}</p>
                {item.image && <img src={item.image} alt={item.name} className="mt-4 w-32 h-32 object-cover" />}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => deleteMenuItem(item._id)}
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

export default MenuManagement;
