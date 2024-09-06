import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import parallaxImage from '../assets/menubg.jpeg';
import CartNotification from '../components/CartNotification';

const Menu = ({ cartItems, setCartItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [notificationItem, setNotificationItem] = useState(null);
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  // Fetch both menu items and offers
  useEffect(() => {
    const fetchMenuItemsAndOffers = async () => {
      try {
        const [menuResponse, offersResponse] = await Promise.all([
          fetch('http://localhost:5000/api/menu/all'),
          fetch('http://localhost:5000/api/offers'),
        ]);

        if (!menuResponse.ok || !offersResponse.ok) {
          throw new Error('Failed to fetch menu items or offers');
        }

        const menuData = await menuResponse.json();
        const offersData = await offersResponse.json();

        const updatedMenuItems = menuData.map((item) => {
          const offer = offersData.find((offer) => offer.itemId === item._id);
          if (offer) {
            item.discountedPrice = item.price - (item.price * (offer.discountPercentage / 100));
          }
          return item;
        });

        setMenuItems(updatedMenuItems);
      } catch (error) {
        console.error('Error fetching menu items or offers:', error);
      }
    };

    fetchMenuItemsAndOffers();
  }, []);

  const categories = [
    'All', 'Dinner', 'Rice', 'Fish', 'Drinks', 'Kottu', 'Soup', 
    'Prawns', 'Vegetables', 'Desserts', 'Crab', 'Mutton', 'Chicken'
  ];

  const addToCart = (item) => {
    const itemExists = cartItems.find(cartItem => cartItem._id === item._id);

    if (itemExists) {
      setCartItems(cartItems.map(cartItem => 
        cartItem._id === item._id ? { ...itemExists, quantity: itemExists.quantity + 1 } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    setNotificationItem(item);
    setNotificationVisible(true);
  };

  const filteredItems = menuItems
    .filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low-high') return a.price - b.price;
      if (sortOption === 'price-high-low') return b.price - a.price;
      if (sortOption === 'new') return b.isNewItem - a.isNewItem;
      if (sortOption === 'popular') return b.isPopular - a.isPopular;
      if (sortOption === 'discounted') return a.discountedPrice ? 1 : -1; // Sorting by discounted items
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      <div
        className="relative bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${parallaxImage})`, height: '550px' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-5xl font-bold text-white">Our Menu</h1>
        </div>
      </div>

      <div className="py-16 px-6">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for a dish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="flex flex-wrap justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`m-2 px-4 py-2 rounded-lg font-semibold ${
                selectedCategory === category ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

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
            <option value="discounted">Discounted Items</option> {/* New option */}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((item) => (
            <div key={item._id} className="bg-gray-800 p-6 rounded-lg">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">{item.name}</h2>
              <p className="text-white">{item.description}</p>
              <p className="text-white font-semibold mt-2">
                {item.discountedPrice ? (
                  <>
                    <span className="line-through text-red-500 mr-2">Rs. {item.price}</span>
                    <span>Rs. {item.discountedPrice}</span>
                  </>
                ) : (
                  <>Rs. {item.price}</>
                )}
              </p>
              <button
                onClick={() => addToCart(item)}
                className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

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

Menu.propTypes = {
  cartItems: PropTypes.array.isRequired,
  setCartItems: PropTypes.func.isRequired,
};

export default Menu;
