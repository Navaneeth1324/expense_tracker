import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await authAPI.getMe();
          setUser(res.data);
        } catch (err) {
          console.error('Failed to verify token:', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login(email, password);
      const { access_token } = res.data;
      localStorage.setItem('token', access_token);
      
      const userRes = await authAPI.getMe();
      setUser(userRes.data);
      toast.success('Welcome back!');
      return true;
    } catch (err) {
      const msg = err.response?.data?.detail || 'Login failed. Check your credentials.';
      toast.error(msg);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const res = await authAPI.register(userData);
      const { access_token } = res.data;
      localStorage.setItem('token', access_token);
      
      const userRes = await authAPI.getMe();
      setUser(userRes.data);
      toast.success('Account created successfully!');
      return true;
    } catch (err) {
      const msg = err.response?.data?.detail || 'Registration failed.';
      toast.error(msg);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
