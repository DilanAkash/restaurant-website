import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // State for "Keep me logged in"
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for the success message
  const navigate = useNavigate();
  const { setUser, user } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userId);
        setSuccessMessage('Login successful! Redirecting...');

        // Save the user ID to localStorage if "Keep me logged in" is checked
        if (keepLoggedIn) {
          localStorage.setItem('userId', data.userId);
        }

        setTimeout(() => {
          navigate('/'); // Redirect after a short delay
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  // Retrieve user from localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUser(storedUserId);
    }
  }, [setUser]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mt-10"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center">Welcome Back!</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-500 transition-transform transform hover:scale-105"
          required
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-500 pr-10 transition-transform transform hover:scale-105"
            required
          />
          <FaEye
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer ${showPassword ? '' : 'hidden'}`}
            onClick={() => setShowPassword(!showPassword)}
          />
          <FaEyeSlash
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer ${showPassword ? 'hidden' : ''}`}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="flex items-center mb-6 mt-4">
          <input
            type="checkbox"
            id="keepLoggedIn"
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="keepLoggedIn" className="text-sm">
            Keep me logged in
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black px-4 py-4 rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
