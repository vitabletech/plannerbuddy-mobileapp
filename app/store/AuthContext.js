import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL, JWT_KEY } from '../constants/constants';

export const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const handleLogin = async (email, password) => {
    try {
      const result = await axios.post(`${API_URL}auth/login`, { username: email, password });
      setToken(result.data.token);
      await SecureStore.setItemAsync(JWT_KEY, result.data.token);
      return result;
    } catch (error) {
      return { error: true, msg: 'Invalid credentials' };
    }
  };

  const handleRegister = async (fullName, email, password) => {
    try {
      const result = await axios.post(`${API_URL}users/add`, { fullName, email, password });
      return result;
    } catch (error) {
      return { error: true, msg: error.message };
    }
  };

  const handleLogout = async () => {
    setToken(null);
    await SecureStore.deleteItemAsync(JWT_KEY);
  };

  const value = useMemo(
    () => ({
      onLogin: handleLogin,
      onRegister: handleRegister,
      onLogout: handleLogout,
      token,
    }),
    [handleLogin, handleRegister, handleLogout, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // add PropTypes validation for children
};
