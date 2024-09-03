import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      fetchUserData(storedUserId);
    } else {
      setLoading(false); // No user ID found, stop loading
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);  // Set the full user data
      } else {
        console.error('Failed to fetch user data');
        setError('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('An error occurred while fetching user data');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
