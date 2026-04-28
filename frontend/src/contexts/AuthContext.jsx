import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URL = "http://localhost:8000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login
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
      return {
        success: false,
        error: error.response?.data?.detail || "Erro no login"
      };
    }
  };

  // Register 
  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );

      setUser(data);

      return { success: true };

    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || "Erro no cadastro"
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);