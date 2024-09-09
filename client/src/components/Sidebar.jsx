import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaClipboardList, FaConciergeBell, FaImage, FaTags, FaFileAlt, FaChartBar, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { AuthContext } from '../AuthContext'; 

const Sidebar = ({ role }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed flex flex-col justify-between">
      <div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">
            {role === 'admin' ? 'Admin Dashboard' : 'Staff Dashboard'}
          </h2>

          {/* Profile section with logout button */}
          <div className="flex flex-col items-start mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <FaUser className="text-2xl" />
              <span className="text-lg">{user?.name}</span> {/* Show user's name */}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>

          <ul>
            {role === 'admin' && (
              <>
                <li className="mb-4">
                  <Link to="/admin/menu" className="flex items-center hover:bg-gray-700 p-2 rounded">
                    <FaClipboardList className="mr-2" />
                    Menu Management
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/admin/services" className="flex items-center hover:bg-gray-700 p-2 rounded">
                    <FaConciergeBell className="mr-2" />
                    Service Management
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/admin/gallery" className="flex items-center hover:bg-gray-700 p-2 rounded">
                    <FaImage className="mr-2" />
                    Gallery Management
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/admin/offers" className="flex items-center hover:bg-gray-700 p-2 rounded">
                    <FaTags className="mr-2" />
                    Offers Management
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/admin/reservations" className="flex items-center hover:bg-gray-700 p-2 rounded">
                    <FaFileAlt className="mr-2" />
                    Reservations Management
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/admin/reports" className="flex items-center hover:bg-gray-700 p-2 rounded">
                    <FaChartBar className="mr-2" />
                    Report Generation
                  </Link>
                </li>
              </>
            )}

            {role === 'staff' && (
              <>
                <li className="mb-4">
                  <Link to="/staff/orders" className="flex items-center hover:bg-gray-700 p-2 rounded">
                    <FaClipboardList className="mr-2" />
                    Orders Management
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/staff/payments" className="flex items-center hover:bg-gray-700 p-2 rounded">
                    <FaTags className="mr-2" />
                    Payment Processing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/staff/queries" className="flex items-center hover:bg-gray-700 p-2 rounded">
                    <FaFileAlt className="mr-2" />
                    Query Responses
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/staff/reservations" className="flex items-center hover:bg-gray-700 p-2 rounded">
                    <FaConciergeBell className="mr-2" />
                    Reservations Dashboard
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// PropTypes eroor fix from this. 
Sidebar.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Sidebar;
