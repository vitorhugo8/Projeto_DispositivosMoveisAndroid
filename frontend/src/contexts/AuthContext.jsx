import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // FORÇANDO USUÁRIO LOGADO
  useEffect(() => {
    const fakeUser = {
      name: "Usuário Teste",
      email: "teste@email.com"
    };

    setUser(fakeUser);
    setLoading(false);
  }, []);

  const login = async () => ({ success: true });
  const register = async () => ({ success: true });
  const logout = async () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);