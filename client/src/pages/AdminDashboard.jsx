import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';  // Use AuthContext to get user role
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  // If the user is not an admin, redirect to the home page
  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto py-16 px-4 mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
      {/* Admin-specific content here */}
    </div>
  );
};

export default AdminDashboard;
