import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from localStorage when the component mounts
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUser(storedUserId);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId'); // Clear user ID from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Prop type validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
