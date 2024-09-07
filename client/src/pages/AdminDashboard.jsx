import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch users
        const userResponse = await fetch('http://localhost:5000/api/users');
        const usersData = await userResponse.json();
        setUsers(usersData);

        // Fetch orders
        const orderResponse = await fetch('http://localhost:5000/api/orders/all-orders');
        const ordersData = await orderResponse.json();
        setOrders(ordersData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <p>Loading admin data...</p>;
  }

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Section for Users */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id} className="mb-2">
              {user.name} ({user.email}) - Role: {user.role}
            </li>
          ))}
        </ul>
      </div>

      {/* Section for Orders */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        <ul>
          {orders.map(order => (
            <li key={order._id} className="mb-2">
              Order ID: {order._id} | Total: Rs. {order.total} | Status: {order.status}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate('/add-offer')} className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-lg">
        Add New Offer
      </button>
    </div>
  );
};

export default AdminDashboard;
