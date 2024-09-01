import React, { useContext } from 'react'; // Removed useState import
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Hey, {user?.name || "User"}!</h2>

        <div className="space-y-4">
          <Link 
            to="/orders" 
            className="block bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-center"
          >
            My Orders
          </Link>
          <Link 
            to="/reservations" 
            className="block bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-center"
          >
            My Reservations
          </Link>
          <Link 
            to="/messages" 
            className="block bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-center"
          >
            Message Center
          </Link>
          <Link 
            to="/payments" 
            className="block bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-center"
          >
            Payments
          </Link>
          <Link 
            to="/edit-profile" 
            className="block bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-center"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
