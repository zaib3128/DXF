import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) || null; } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMe() {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const { data } = await API.get('/auth/me');
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } catch (err) {
        console.log('Unable to fetch user', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    loadMe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    setLoading(false);
    return data.user;
  };

  const register = async (name, email, password) => {
    setLoading(true);
    const { data } = await API.post('/auth/register', { name, email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    setLoading(false);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const upgrade = async () => {
    const { data } = await API.put('/auth/upgrade');
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, upgrade }}>
      {children}
    </AuthContext.Provider>
  );
};
