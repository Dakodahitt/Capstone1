import React, { createContext, useState, useEffect, useContext } from 'react';
import { getToken, getUser, logout as logoutService } from '../services/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!getToken());
      setUser(getUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = () => {
    logoutService();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
