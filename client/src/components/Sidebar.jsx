import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import { FaClipboardList, FaConciergeBell, FaImage, FaTags, FaFileAlt, FaChartBar } from 'react-icons/fa';

const Sidebar = ({ role }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">
          {role === 'admin' ? 'Admin Dashboard' : 'Staff Dashboard'}
        </h2>
        <ul>
          {role === 'admin' && (
            <>
              <li className="mb-4">
                <Link to="/admin/menu" className="flex items-center">
                  <FaClipboardList className="mr-2" />
                  Menu Management
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/admin/services" className="flex items-center">
                  <FaConciergeBell className="mr-2" />
                  Service Management
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/admin/gallery" className="flex items-center">
                  <FaImage className="mr-2" />
                  Gallery Management
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/admin/offers" className="flex items-center">
                  <FaTags className="mr-2" />
                  Offers Management
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/admin/reservations" className="flex items-center">
                  <FaFileAlt className="mr-2" />
                  Reservations Management
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/admin/reports" className="flex items-center">
                  <FaChartBar className="mr-2" />
                  Report Generation
                </Link>
              </li>
            </>
          )}

          {role === 'staff' && (
            <>
              <li className="mb-4">
                <Link to="/staff/orders" className="flex items-center">
                  <FaClipboardList className="mr-2" />
                  Orders Management
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/staff/payments" className="flex items-center">
                  <FaTags className="mr-2" />
                  Payment Processing
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/staff/queries" className="flex items-center">
                  <FaFileAlt className="mr-2" />
                  Query Responses
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/staff/reservations" className="flex items-center">
                  <FaConciergeBell className="mr-2" />
                  Reservations Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

// PropTypes validation for 'role' prop
Sidebar.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Sidebar;
