import React from 'react';
import Sidebar from '../components/Sidebar';
import PropTypes from 'prop-types';

const DashboardLayout = ({ role, children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 fixed h-screen bg-gray-800">
        <Sidebar role={role} />
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 p-10">
        {children}
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  role: PropTypes.string.isRequired, // Admin or staff
  children: PropTypes.node.isRequired, // Content inside the layout
};

export default DashboardLayout;
