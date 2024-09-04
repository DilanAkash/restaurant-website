import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../AuthContext';

const Cart = ({ cartItems, setCartItems }) => {  // Removed 'updateCartItemQuantity'
  const { user } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState('Card Payment');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [cartVisible, setCartVisible] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, [setCartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const calculateTotal = () => {
      let total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
      if (paymentMethod === 'Cash On Delivery') {
        total += 650;
      }
      setTotalPrice(total);
    };

    calculateTotal();
  }, [cartItems, paymentMethod]);

  const handleQuantityChange = (id, delta) => {
    const newCartItems = cartItems.map(item => {
      if (item.id === id) {
        const updatedQuantity = item.quantity + delta;
        return { ...item, quantity: updatedQuantity >= 0 ? updatedQuantity : 0 };
      }
      return item;
    });
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('Please log in to place an order.');
      return;
    }

    setIsPlacingOrder(true);

    const orderDetails = {
      userId: user._id,
      items: cartItems,
      total: totalPrice,
      paymentMethod: paymentMethod,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        setCartItems([]);
        localStorage.removeItem('cartItems');
      } else {
        const errorData = await response.json();
        alert(`Failed to place the order: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className={`container mx-auto py-16 px-4 mt-20 ${!cartVisible && 'hidden'}`}>
      <div className="block md:hidden absolute top-2 right-2">
        <button
          onClick={() => setCartVisible(false)}
          className="bg-red-500 text-white p-2 rounded-full"
          aria-label="Close cart"
        >
          X
        </button>
      </div>
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
                  <button onClick={() => handleQuantityChange(item.id, -1)} className="px-2 bg-gray-600 text-white rounded-l-lg" aria-label="Decrease quantity">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)} className="px-2 bg-gray-600 text-white rounded-r-lg" aria-label="Increase quantity">+</button>
                </div>
                <p className="text-white font-semibold text-center md:text-right">Total: Rs. {item.price * item.quantity}</p>
                <button onClick={() => handleRemoveItem(item.id)} className="mt-2 md:mt-0 ml-0 md:ml-4 bg-red-500 text-white px-4 py-2 rounded-lg" aria-label={`Remove ${item.name} from cart`}>
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 w-full md:w-auto text-center md:text-left">
                <label className="text-white font-semibold">Payment Method: </label>
                <select value={paymentMethod} onChange={handlePaymentMethodChange} className="ml-0 md:ml-4 p-2 bg-gray-600 text-white rounded-lg" aria-label="Select payment method">
                  <option value="Card Payment">Card Payment</option>
                  <option value="Cash On Delivery">Cash on Delivery</option>
                </select>
              </div>
              <div className="text-center md:text-right">
                <h2 className="text-2xl font-bold text-yellow-500">Total Price: Rs. {totalPrice}</h2>
                {paymentMethod === 'Cash On Delivery' && <p className="text-red-500">*Rs. 650 added for Cash on Delivery</p>}
              </div>
            </div>
            <div className="mt-8 flex justify-center md:justify-end">
              <button
                onClick={handlePlaceOrder}
                className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors w-full md:w-auto"
                disabled={isPlacingOrder} // Disable button while placing order
                aria-label="Place order"
              >
                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Updated PropTypes validation
Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  setCartItems: PropTypes.func.isRequired,
};

export default Cart;
