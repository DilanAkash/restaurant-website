import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch total registered users
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/users');
        setTotalUsers(response.data.filter(user => user.role === 'user').length); // Count only 'user' role
        setTotalStaff(response.data.filter(user => user.role === 'staff').length); // Count 'staff' role
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Fetch total reservations
    const fetchTotalReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations');
        setTotalReservations(response.data.length);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchTotalUsers();
    fetchTotalReservations();
    setLoading(false);
  }, []);

  if (loading) {
    return <p className="text-center text-white">Loading dashboard data...</p>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main Content */}
      <div className="ml-64 flex-1 p-10 bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Registered Users */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Registered Users</h2>
            <p className="text-4xl font-bold">{totalUsers}</p>
          </div>

          {/* Total Staff */}
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Staff Members</h2>
            <p className="text-4xl font-bold">{totalStaff}</p>
          </div>

          {/* Total Reservations */}
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Reservations</h2>
            <p className="text-4xl font-bold">{totalReservations}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
