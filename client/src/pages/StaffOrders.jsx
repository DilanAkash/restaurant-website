import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext'; // Assuming you have a context for auth
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

const StaffOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/all-orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/update-status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(prevOrders =>
          prevOrders.map(order => (order._id === orderId ? updatedOrder.order : order))
        );
        alert('Order status updated successfully');
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Check if user is a staff member
  if (user?.role !== 'staff') {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto py-16 px-4 mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">Staff Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-2xl text-gray-400">No orders found.</p>
      ) : (
        orders.map(order => (
          <div
            key={order._id}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold mb-4">Order ID: {order._id}</h2>
            <p className="text-lg mb-2">User: {order.user.name} ({order.user.email})</p>
            <p className="text-lg mb-2">Total: Rs. {order.total}</p>
            <p className="text-lg mb-2">Payment Method: {order.paymentMethod}</p>
            <p className="text-lg mb-4">Status: {order.status}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleUpdateOrderStatus(order._id, 'In Progress')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <FaSpinner className="mr-2" />
                Mark as In Progress
              </button>
              <button
                onClick={() => handleUpdateOrderStatus(order._id, 'Completed')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
              >
                <FaCheckCircle className="mr-2" />
                Mark as Completed
              </button>
              <button
                onClick={() => handleUpdateOrderStatus(order._id, 'Cancelled')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
              >
                <FaTimesCircle className="mr-2" />
                Cancel Order
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StaffOrders;
