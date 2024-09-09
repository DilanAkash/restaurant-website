import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);

  // Fetch total registered users
  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setTotalUsers(response.data.length);
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

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalReservations();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="content-area container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Registered Users</h2>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Reservations</h2>
            <p className="text-3xl font-bold">{totalReservations}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
