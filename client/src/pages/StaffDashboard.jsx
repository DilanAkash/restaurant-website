import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffDashboard = () => {
  const [newMessages, setNewMessages] = useState(0);
  const [newOrders, setNewOrders] = useState(0);

  // Fetch new messages
  const fetchNewMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/messages');
      const pendingMessages = response.data.filter((msg) => msg.status === 'pending');
      setNewMessages(pendingMessages.length);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch new orders
  const fetchNewOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/all-orders');
      const pendingOrders = response.data.filter(
        (order) => order.status === 'Pending' || order.status === 'In Progress'
      );
      setNewOrders(pendingOrders.length);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchNewMessages();
    fetchNewOrders();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="content-area container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Staff Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">New Messages from Customers</h2>
            <p className="text-3xl font-bold">{newMessages}</p>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">New Orders</h2>
            <p className="text-3xl font-bold">{newOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
