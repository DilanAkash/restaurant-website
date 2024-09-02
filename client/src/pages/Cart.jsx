import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Cart = ({ cartItems, setCartItems, removeFromCart, updateCartItemQuantity, placeOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default payment method is 'card'
  const [totalPrice, setTotalPrice] = useState(0);

  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, [setCartItems]);

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total price whenever cartItems or paymentMethod changes
  useEffect(() => {
    const calculateTotal = () => {
      let total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
      
      // Add Rs.650 fee if payment method is 'cash'
      if (paymentMethod === 'cash') {
        total += 650;
      }

      setTotalPrice(total);
    };

    calculateTotal();
  }, [cartItems, paymentMethod]);

  // Handle quantity change for a cart item
  const handleQuantityChange = (id, delta) => {
    updateCartItemQuantity(id, delta);
  };

  // Handle item removal
  const handleRemoveItem = (id) => {
    removeFromCart(id);
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    const orderDetails = {
      items: cartItems,
      total: totalPrice,
      paymentMethod: paymentMethod,
      date: new Date().toISOString(),
    };
    placeOrder(orderDetails);
  };

  return (
    <div className="container mx-auto py-16 px-4 mt-20"> {/* Increased margin-top for more space */}
      <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>
      
      <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
        {cartItems.length === 0 ? (
          <p className="text-white text-center text-2xl">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-24 flex justify-center md:justify-start">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                </div>
                <div className="flex-1 text-white text-center md:text-left">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p>Rs. {item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleQuantityChange(item.id, -1)} className="px-2 bg-gray-600 text-white rounded-l-lg">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)} className="px-2 bg-gray-600 text-white rounded-r-lg">+</button>
                </div>
                <p className="text-white font-semibold text-center md:text-right">Total: Rs. {item.price * item.quantity}</p>
                <button onClick={() => handleRemoveItem(item.id)} className="mt-2 md:mt-0 ml-0 md:ml-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 w-full md:w-auto text-center md:text-left">
                <label className="text-white font-semibold">Payment Method: </label>
                <select value={paymentMethod} onChange={handlePaymentMethodChange} className="ml-0 md:ml-4 p-2 bg-gray-600 text-white rounded-lg">
                  <option value="card">Card Payment</option>
                  <option value="cash">Cash on Delivery</option>
                </select>
              </div>
              <div className="text-center md:text-right">
                <h2 className="text-2xl font-bold text-yellow-500">Total Price: Rs. {totalPrice}</h2>
                {paymentMethod === 'cash' && <p className="text-red-500">*Rs. 650 added for Cash on Delivery</p>}
              </div>
            </div>
            <div className="mt-8 flex justify-center md:justify-end">
              <button
                onClick={handlePlaceOrder}
                className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors w-full md:w-auto"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Adding PropTypes validation
Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  setCartItems: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateCartItemQuantity: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired,
};

export default Cart;
