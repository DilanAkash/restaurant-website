import React from 'react';
import PropTypes from 'prop-types';

const Cart = ({ cartItems, removeFromCart }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">Price: Rs. {item.price}</p>
                <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-lg font-semibold">Rs. {item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right">
            <p className="text-2xl font-bold">Total: Rs. {getTotalPrice()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Validate PropTypes
Cart.propTypes = {
  cartItems: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;
