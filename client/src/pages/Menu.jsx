import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import parallaxImage from '../assets/menubg.jpeg'; // Import the background image for the parallax effect
import CartNotification from '../components/CartNotification'; // Import the CartNotification component

// The Menu component handles displaying menu items and adding them to the cart
const Menu = ({ cartItems, setCartItems }) => {
  // State to handle search input
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to handle selected category for filtering
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // State to handle sorting option
  const [sortOption, setSortOption] = useState('');
  
  // State to hold the fetched menu items
  const [menuItems, setMenuItems] = useState([]);
  
  // State to handle pagination, start with the first page
  const [currentPage, setCurrentPage] = useState(1);
  
  // Define how many items to display per page
  const itemsPerPage = 9;
  
  // State for handling notification
  const [notificationItem, setNotificationItem] = useState(null);
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  // useEffect hook to fetch menu items when the component mounts
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu/all'); // Replace with your actual API URL
        
        // Check if the response is okay
        if (!response.ok) {
          throw new Error('Failed to fetch menu items'); // Throw an error if the request fails
        }
        
        // Parse the response data into JSON
        const data = await response.json();
        
        // Set the menuItems state with the fetched data
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error); // Log any errors that occur during fetching
      }
    };

    fetchMenuItems(); // Invoke the function to fetch menu items
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Categories for filtering menu items
  const categories = [
    'All', 'Dinner', 'Rice', 'Fish', 'Drinks', 'Kottu', 'Soup', 
    'Prawns', 'Vegetables', 'Desserts', 'Crab', 'Mutton', 'Chicken'
  ];

  // Function to add an item to the cart
  const addToCart = (item) => {
    // Check if the item already exists in the cart
    const itemExists = cartItems.find(cartItem => cartItem._id === item._id);
    
    // If it exists, increase the quantity
    if (itemExists) {
      setCartItems(cartItems.map(cartItem => 
        cartItem._id === item._id ? { ...itemExists, quantity: itemExists.quantity + 1 } : cartItem
      ));
    } else {
      // If it doesn't exist, add the item to the cart with a quantity of 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    // Trigger the notification
    setNotificationItem(item);
    setNotificationVisible(true);
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

  // Pagination logic to display the correct items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Function to handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      {/* Parallax Section for the menu header */}
      <div
        className="relative bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${parallaxImage})`, height: '550px' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-5xl font-bold text-white">Our Menu</h1>
        </div>
      </div>

      {/* Content Section where menu items and filters are displayed */}
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
                setCurrentPage(1); // Reset to the first page when the category changes
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

        {/* Menu Items Display */}
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

      {/* Cart Notification Popup */}
      {notificationItem && (
        <CartNotification 
          item={notificationItem} 
          visible={isNotificationVisible} 
          onClose={() => setNotificationVisible(false)} 
        />
      )}
    </div>
  );
};

// Add PropTypes validation for the cartItems and setCartItems props
Menu.propTypes = {
  cartItems: PropTypes.array.isRequired,
  setCartItems: PropTypes.func.isRequired,
};

export default Menu;
