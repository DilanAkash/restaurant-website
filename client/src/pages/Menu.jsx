import React, { useState, useEffect } from 'react';
import parallaxImage from '../assets/menubg.jpeg';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('');
  const [menuItems, setMenuItems] = useState([]); // Use state to hold fetched menu items
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch menu items from the backend API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu/all'); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  // Categories to filter by
  const categories = [
    'All', 'Dinner', 'Rice', 'Fish', 'Drinks', 'Kottu', 'Soup', 
    'Prawns', 'Vegetables', 'Desserts', 'Crab', 'Mutton', 'Chicken'
  ];

  // Function to add item to cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      {/* Parallax Section */}
      <div
        className="relative bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${parallaxImage})`, height: '550px' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-5xl font-bold text-white">Our Menu</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 px-6">
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
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1); // Reset to first page on category change
              }}
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
          {currentItems.map((item) => (
            <div key={item._id} className="bg-gray-800 p-6 rounded-lg">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">{item.name}</h2>
              <p className="text-white">{item.description}</p>
              <p className="text-white font-semibold mt-2">Rs. {item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-2 rounded-lg font-semibold ${
                currentPage === index + 1 ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
