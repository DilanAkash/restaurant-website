import React, { useState, useEffect } from 'react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Placeholder: Fetch orders from the backend API and update the state
    // fetch('http://localhost:5000/api/orders', { method: 'GET' })
    //   .then(response => response.json())
    //   .then(data => setOrders(data))
    //   .catch(error => console.error('Error fetching orders:', error));

    // For now, we'll use a mock data
    setOrders([
      { id: 1, item: 'Pizza', status: 'Delivered' },
      { id: 2, item: 'Burger', status: 'Pending' },
    ]);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        <ul>
          {orders.map(order => (
            <li key={order.id} className="mb-2">
              <div className="flex justify-between">
                <span>{order.item}</span>
                <span className={`text-${order.status === 'Delivered' ? 'green' : 'yellow'}-500`}>
                  {order.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyOrders;
