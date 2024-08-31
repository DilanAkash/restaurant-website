import React from 'react';
import PropTypes from 'prop-types';

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-yellow-500">{item.name}</h2>
                <p className="text-white">Rs. {item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right">
            <h2 className="text-2xl font-bold text-white">
              Total: Rs. {cartItems.reduce((total, item) => total + item.price, 0)}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;
