import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { FaRegTimesCircle, FaMoneyBillWave, FaCalendarAlt, FaReceipt, FaShoppingBag } from 'react-icons/fa'; // Import icons

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:5000/api/orders/user/${user._id}`);
          if (response.ok) {
            const data = await response.json();
            setOrders(data);
          } else {
            console.error('Failed to fetch orders');
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(`http://localhost:5000/api/orders/cancel-order/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Order cancelled successfully!');
        setOrders(orders.filter(order => order._id !== orderId));
      } else {
        alert('Failed to cancel the order. Please try again.');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!user) {
    return <p className="text-center text-2xl">Please log in to view your orders.</p>;
  }

  return (
    <div className="container mx-auto py-16 px-4 mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-2xl text-gray-400">You have no orders.</p>
      ) : (
        orders.map(order => (
          <div
            key={order._id}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaReceipt className="mr-2 text-yellow-500" /> 
              Order ID: <span className="text-yellow-500 ml-2">{order._id}</span>
            </h2>
            <p className="text-lg mb-2 flex items-center">
              <FaMoneyBillWave className="mr-2 text-green-500" />
              Total: <span className="font-bold text-yellow-500 ml-2">Rs. {order.total}</span>
            </p>
            <p className="text-lg mb-2 flex items-center">
              <FaShoppingBag className="mr-2 text-blue-500" />
              Payment Method: <span className="font-bold text-yellow-500 ml-2 capitalize">{order.paymentMethod}</span>
            </p>
            <p className="text-lg mb-4 flex items-center">
              <FaCalendarAlt className="mr-2 text-orange-500" />
              Date: <span className="text-yellow-500 ml-2">{new Date(order.date).toLocaleString()}</span>
            </p>
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Items:</h3>
              {order.items.map((item, index) => (
                <p key={index} className="text-gray-300 mb-2">
                  {item.name} - Quantity: {item.quantity} - <span className="font-bold">Rs. {item.price}</span>
                </p>
              ))}
            </div>
            <button
              onClick={() => handleCancelOrder(order._id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <FaRegTimesCircle className="mr-2" />
              Cancel Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
