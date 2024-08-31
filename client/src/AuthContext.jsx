import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Prop type validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
