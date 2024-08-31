import React from 'react';

const Profile = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <p className="text-lg mb-4">Welcome to your profile!</p>
        {/* You can add more profile-related information and features here */}
      </div>
    </div>
  );
};

export default Profile;
