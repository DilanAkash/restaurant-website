import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id, // Make sure to pass the user ID
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Update the user in context
        setError('Profile updated successfully');
      } else {
        const data = await response.json();
        setError(data.message || 'Update failed. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleUpdate}>
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black px-3 py-3 rounded hover:bg-yellow-600 transition-colors"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
