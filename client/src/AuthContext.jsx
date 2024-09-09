import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context for authentication
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // State to hold user data
  const [loading, setLoading] = useState(true);  // State to manage loading
  const [error, setError] = useState(null);  // State to handle errors

  // Effect to check if a user is logged in by checking localStorage for userId and role
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserRole = localStorage.getItem('role');

    // If both userId and role exist in localStorage, fetch the user data
    if (storedUserId && storedUserRole) {
      console.log("Fetching user data...");
      fetchUserData(storedUserId, storedUserRole);
    } else {
      // If no user is logged in, stop loading and clear the state
      setUser(null);
      setLoading(false);
    }
  }, []);

  // Function to fetch user data from backend API
  const fetchUserData = async (userId, role) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        console.log("User data fetched:", userData);
        setUser({
          ...userData,
          role: role,  // Store role from localStorage or backend
        });
      } else {
        console.error('Failed to fetch user data');
        setError('Failed to fetch user data');
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('An error occurred while fetching user data');
      setUser(null);  // Clear user data in case of an error
    } finally {
      setLoading(false);  // Set loading to false
    }
  };

  // Function to log the user out, clearing user data and localStorage
  const logout = () => {
    setUser(null);  // Clear user state
    localStorage.removeItem('userId');  // Remove userId from localStorage
    localStorage.removeItem('role');    // Remove role from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes validation for AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
