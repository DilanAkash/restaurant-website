import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../AuthContext';
import CreditCard from '../components/CreditCard';

const Cart = ({ cartItems, setCartItems }) => {
  const { user } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState('Card Payment');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [cartVisible] = useState(true);
  const [address, setAddress] = useState(''); // For Cash on Delivery
  const [promoCode, setPromoCode] = useState(''); // Promo Code state
  const [discount, setDiscount] = useState(0); // Discount value state
  const [isApplyingPromo, setIsApplyingPromo] = useState(false); // Loading state for promo
  const [serviceFee, setServiceFee] = useState(0); // Service Fee
  const [tax, setTax] = useState(0); // Tax

  const DELIVERY_CHARGE = 650;
  const TAX_RATE = 0.10; // 10% tax
  const SERVICE_FEE_RATE = 0.05; // 5% service fee

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

      // Apply discount
      total -= (total * discount) / 100;

      // Add service fee and tax
      const serviceFeeAmount = total * SERVICE_FEE_RATE;
      const taxAmount = total * TAX_RATE;

      setServiceFee(serviceFeeAmount);
      setTax(taxAmount);

      // Add delivery charge if Cash on Delivery
      if (paymentMethod === 'Cash On Delivery') {
        total += DELIVERY_CHARGE;
      }

      total += serviceFeeAmount + taxAmount;

      setTotalPrice(total);
    };

    calculateTotal();
  }, [cartItems, paymentMethod, discount]);

  const handleQuantityChange = (id, delta) => {
    const newCartItems = cartItems.map(item => {
      if (item.id === id) {
        const updatedQuantity = item.quantity + delta;
        return { ...item, quantity: updatedQuantity >= 1 ? updatedQuantity : 1 };
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

    if (paymentMethod === 'Cash On Delivery' && address.trim() === '') {
      alert('Please enter a delivery address.');
      return;
    }

    setIsPlacingOrder(true);

    const orderDetails = {
      userId: user._id,
      items: cartItems,
      total: totalPrice,
      paymentMethod: paymentMethod,
      address: paymentMethod === 'Cash On Delivery' ? address : null,
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

  const handleApplyPromoCode = async () => {
    if (promoCode.trim() === '') {
      alert('Please enter a valid promo code.');
      return;
    }

    setIsApplyingPromo(true);

    try {
      const response = await fetch('http://localhost:5000/api/offers/apply-promo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promoCode }),
      });

      if (response.ok) {
        const data = await response.json();
        setDiscount(data.discount);
        alert(`Promo code applied! You get a ${data.discount}% discount.`);
      } else {
        const errorData = await response.json();
        alert(`Failed to apply promo code: ${errorData.message}`);
        setDiscount(0); // Reset discount if invalid
      }
    } catch (error) {
      console.error('Error applying promo code:', error);
      alert('An error occurred while applying the promo code. Please try again.');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  return (
    <div className={`cart-container container mx-auto py-16 px-4 mt-20 ${!cartVisible && 'hidden'}`}>
      <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
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
                  <button onClick={() => handleQuantityChange(item.id, -1)} className="px-2 bg-gray-600 text-black rounded-l-lg" aria-label="Decrease quantity">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)} className="px-2 bg-gray-600 text-black rounded-r-lg" aria-label="Increase quantity">+</button>
                </div>
                <p className="text-white font-semibold text-center md:text-right">Total: Rs. {item.price * item.quantity}</p>
                <button onClick={() => handleRemoveItem(item.id)} className="mt-2 md:mt-0 ml-0 md:ml-4 bg-red-500 text-black px-4 py-2 rounded-lg" aria-label={`Remove ${item.name} from cart`}>
                  Remove
                </button>
              </div>
            ))}

            {/* Promo Code Section */}
            <div className="mt-8">
              <label className="text-white font-semibold">Promo Code: </label>
              <div className="promo-code flex mt-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 p-2 bg-gray-600 text-white rounded-l-lg"
                  placeholder="Enter promo code"
                />
                <button
                  onClick={handleApplyPromoCode}
                  className="bg-yellow-500 text-black px-6 py-2 rounded-r-lg hover:bg-yellow-600 transition-colors"
                  disabled={isApplyingPromo}
                  aria-label="Apply promo code">
                  {isApplyingPromo ? 'Applying...' : 'Apply'}
                </button>
              </div>
            </div>

            {/* Payment Method and Address */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 w-full md:w-auto text-left md:text-left">
                <label className="text-white font-semibold">Payment Method: </label>
                <select value={paymentMethod} onChange={handlePaymentMethodChange} className="ml-0 md:ml-4 p-2 bg-gray-600 text-white rounded-lg" aria-label="Select payment method">
                  <option value="Card Payment">Card Payment</option>
                  <option value="Cash On Delivery">Cash on Delivery</option>
                </select>
              </div>
            </div>
            
            {/* Render Address Input if Cash on Delivery is selected */}
            {paymentMethod === 'Cash On Delivery' && (
              <div className="mt-8">
                <label className="text-white font-semibold mb-2 block">Delivery Address: </label>
                <textarea
                  className="w-full p-4 bg-gray-600 text-white rounded-lg"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                  rows="5" // Added to make the box taller
                />
              </div>
            )}                                  

            {/* Display additional charges */}
            <div className="mt-8 text-white text-right md:text-right">
              <div className="service-tax-total">
                <p>Service Fee: Rs. {serviceFee.toFixed(2)}</p>
                <p>Tax (10%): Rs. {tax.toFixed(2)}</p>
                {paymentMethod === 'Cash On Delivery' && <p className="text-red-500">*Rs. 650 added for Cash on Delivery</p>}
              </div>
              <div className="total-price">
                Total Price: Rs. {totalPrice.toFixed(2)}
              </div>
            </div>

            {/* Render CreditCard Component if Card Payment is selected */}
            {paymentMethod === 'Card Payment' && (
              <div className="mt-8">
                <CreditCard /> {/* Display the credit card form */}
              </div>
            )}

            <div className="mt-8 flex justify-center md:justify-end">
              <button
                onClick={handlePlaceOrder}
                className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors w-full md:w-auto"
                disabled={isPlacingOrder}
                aria-label="Place order">
                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

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
