import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (response.ok) {
        setSuccessMessage('Signup successful! Redirecting...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
    setName(value);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length > 3 && value.length <= 6) {
      value = `${value.slice(0, 3)} ${value.slice(3)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
    }
    setPhone(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mt-10"
        onSubmit={handleSignup}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center">Create Your Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          className="w-full p-4 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-500 transition-transform transform hover:scale-105"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-500 transition-transform transform hover:scale-105"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={handlePhoneChange}
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
        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-500 pr-10 transition-transform transform hover:scale-105"
            required
          />
          <FaEye
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer ${showConfirmPassword ? '' : 'hidden'}`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          <FaEyeSlash
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer ${showConfirmPassword ? 'hidden' : ''}`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black px-4 py-4 rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
