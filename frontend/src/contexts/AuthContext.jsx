import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API = import.meta.env.VITE_BACKEND_URL;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // MUDANÇA TEMPORÁRIA AQUI 
const checkAuth = async () => {
  setUser({ name: "Usuário Teste" }); // força login
  setLoading(false);
};

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(data);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    }
  };

  const register = async (email, password, name) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/register`,
        { email, password, name },
        { withCredentials: true }
      );
      setUser(data);
      return { success: true };
    } catch {
      return { success: false, error: 'Erro ao registrar' };
    }
  };

  const logout = async () => {
    await axios.post(`${API_URL}/api/auth/logout`, {}, {
      withCredentials: true
    });
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};