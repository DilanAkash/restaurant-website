import React, { useState } from 'react';

// Sample imports for images
import pittuImage from '../assets/pittu.jpeg';  // Replace with actual image paths
import friedRiceImage from '../assets/fried_rice.jpeg'; // Replace with actual image paths
// Add all other image imports here...

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('');

  // Full menu data with images, prices, and other details
  const menuItems = [
    // Dinner Menu
    { id: 52, category: 'Dinner', name: 'PITT U', description: 'Sri Lankan Favourite - 3 pieces of Red or White Pittu served Kirihodi, Lunumiris. Coconut Milk & chefs dedicated Vegetable Dish', price: 680, image: pittuImage, isNew: false, isPopular: true },
    { id: 53, category: 'Dinner', name: 'STRING HOPPERS', description: 'An All Rounder - 15 Nos Red or White String Hoppers served with Kiri Hodi, POI Sambol & Chefs dedicated Vegetable Dish', price: 650, image: friedRiceImage, isNew: false, isPopular: true },
    // Add all other items here with appropriate categories, names, descriptions, prices, and images
    
    // Example categories: 'Dinner', 'Rice', 'Fish', 'Drinks', 'Kottu', 'Soup', 'Prawns', 'Vegetables', 'Desserts', 'Drinks', 'Crab', 'Mutton', 'Chicken'
  ];

  const categories = [
    'All', 'Dinner', 'Rice', 'Fish', 'Drinks', 'Kottu', 'Soup', 
    'Prawns', 'Vegetables', 'Desserts', 'Crab', 'Mutton', 'Chicken'
  ];

  // Filter and sort menu items based on the selected category, search term, and sort option
  const filteredItems = menuItems
    .filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low-high') return a.price - b.price;
      if (sortOption === 'price-high-low') return b.price - a.price;
      if (sortOption === 'new') return b.isNew - a.isNew;
      if (sortOption === 'popular') return b.isPopular - a.isPopular;
      return 0;
    });

  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-center text-yellow-500 mb-8">Our Menu</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for a dish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`m-2 px-4 py-2 rounded-lg font-semibold ${
              selectedCategory === category ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex justify-end mb-8">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="">Sort by</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="new">New</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-gray-800 p-6 rounded-lg">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">{item.name}</h2>
            <p className="text-white">{item.description}</p>
            <p className="text-white font-semibold mt-2">{`Rs. ${item.price}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
