import { createContext, useState, useContext, useEffect } from "react";
import { getToken, login as loginService, signup as signupService,logout as logoutService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    setToken(getToken()); // Cargar token al iniciar la app
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginService(email, password);
      setToken(data.token);
      return 'success';
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const signup = async (name, email, password) => {
    try {
      await signupService(name, email, password);
      return 'success';
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const logout = () => {
    logoutService();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
