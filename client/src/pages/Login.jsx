import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

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
        setUser(data.userId); // Store the user ID in the context
        navigate('/'); // Redirect to the homepage or a protected route
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black px-3 py-3 rounded hover:bg-yellow-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
