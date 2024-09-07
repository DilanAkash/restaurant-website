import React, { useEffect, useState } from 'react';

const StaffDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/all-orders');
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching staff dashboard orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await fetch(`http://localhost:5000/api/orders/update-status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      // Update the local order state
      setOrders(orders.map(order => (order._id === orderId ? { ...order, status } : order)));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8">Staff Dashboard</h1>

      <div>
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        <ul>
          {orders.map(order => (
            <li key={order._id} className="mb-2">
              <div>
                <strong>Order ID:</strong> {order._id} | <strong>Status:</strong> {order.status}
              </div>
              <div>
                <button
                  onClick={() => updateOrderStatus(order._id, 'In Progress')}
                  className="mr-2 bg-yellow-500 px-4 py-2 rounded-lg"
                >
                  Mark as In Progress
                </button>
                <button
                  onClick={() => updateOrderStatus(order._id, 'Completed')}
                  className="bg-green-500 px-4 py-2 rounded-lg"
                >
                  Mark as Completed
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StaffDashboard;
