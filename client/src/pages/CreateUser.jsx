import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaEdit } from 'react-icons/fa';
import DashboardLayout from '../layouts/DashboardLayout';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
  });
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false); 
  const [users, setUsers] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filterRole, setFilterRole] = useState('');
  const [editMode, setEditMode] = useState(false); 
  const [editUserId, setEditUserId] = useState(null); 

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const formattedValue = formatPhoneNumber(value); 
      setUserData({ ...userData, [name]: formattedValue });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  // Phone number formatting function
  const formatPhoneNumber = (value) => {
    const onlyNums = value.replace(/[^0-9]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return `${onlyNums.slice(0, 3)} ${onlyNums.slice(3, 6)}`;
    return `${onlyNums.slice(0, 3)} ${onlyNums.slice(3, 6)} ${onlyNums.slice(6, 10)}`;
  };

  // Handle form submission for creating or updating a user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
  
    try {
      if (editMode) {
        // Edit user mode
        await axios.put(`http://localhost:5000/api/users/${editUserId}`, userData);
        setMessage('User updated successfully');
        setEditMode(false);
        setEditUserId(null);
      } else {
        // Create new user mode
        await axios.post('http://localhost:5000/api/users/register', userData);
        setMessage('User created successfully');
      }
  
      // Clear form fields
      setUserData({ name: '', email: '', phone: '', password: '', role: 'user' });
  
      // Refetch users after creating or editing a user
      const newUsers = await axios.get('http://localhost:5000/api/users/users');
      setUsers(newUsers.data);
    } catch (error) {
      setMessage('Error creating/updating user: ' + error.response?.data || error.message);
    }
  };
  

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Search and filter users based on searchTerm and filterRole
  const filteredUsers = users.filter((user) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (user.name.toLowerCase().includes(searchTermLower) ||
        user.email.toLowerCase().includes(searchTermLower) ||
        user.phone.includes(searchTermLower)) &&
      (filterRole === '' || user.role === filterRole)
    );
  });

  // Handle editing a user
  const handleEditUser = (user) => {
    setUserData({ name: user.name, email: user.email, phone: user.phone, role: user.role });
    setEditMode(true);
    setEditUserId(user._id);
  };

  return (
    <DashboardLayout role="admin"> 
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        {editMode ? 'Edit User' : 'Create New User'}
      </h1>

      {message && <p className="text-center text-green-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
        <div className="mb-4">
          <label className="block text-white">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="w-full p-2 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Phone (e.g., 071 852 9255)</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            className="w-full p-2 rounded text-black"
            pattern="0[0-9]{2} [0-9]{3} [0-9]{4}"
            maxLength="12"
            placeholder="071 852 9255"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-white">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            className="w-full p-2 rounded text-black"
            required
          />
          {/* Eye icon for password preview */}
          <span
            className="absolute right-3 top-10 cursor-pointer text-gray-400"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="mb-4">
          <label className="block text-white">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            className="w-full p-2 rounded text-black"
            required
          >
            <option value="user">User</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          {editMode ? 'Update User' : 'Create User'}
        </button>
      </form>

      {/* Search bar and filter dropdown */}
      <div className="max-w-md mx-auto mt-10 space-y-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded text-black"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="w-full p-2 rounded text-black"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* User list, grouped by role */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-white mb-6">Admin Accounts</h2>
        {filteredUsers
          .filter((user) => user.role === 'admin')
          .map((user) => (
            <div key={user._id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md mb-4">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <button
                onClick={() => handleEditUser(user)}
                className="mt-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
              >
                <FaEdit className="inline mr-2" /> Edit User
              </button>
            </div>
          ))}

        <h2 className="text-2xl font-bold text-white mt-10 mb-6">Staff Accounts</h2>
        {filteredUsers
          .filter((user) => user.role === 'staff')
          .map((user) => (
            <div key={user._id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md mb-4">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <button
                onClick={() => handleEditUser(user)}
                className="mt-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
              >
                <FaEdit className="inline mr-2" /> Edit User
              </button>
            </div>
          ))}

        <h2 className="text-2xl font-bold text-white mt-10 mb-6">User Accounts</h2>
        {filteredUsers
          .filter((user) => user.role === 'user')
          .map((user) => (
            <div key={user._id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md mb-4">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <button
                onClick={() => handleEditUser(user)}
                className="mt-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
              >
                <FaEdit className="inline mr-2" /> Edit User
              </button>
            </div>
          ))}
      </div>
    </div>
    </DashboardLayout>
  );
};

export default CreateUser;
