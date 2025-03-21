import axios from "axios";
import { getToken, logout } from "./authService";
import jwtDecode from "jwt-decode";

const API_URL = "https://modulo-1-project.onrender.com"; // Reemplaza con tu backend

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para adjuntar el token a cada petición
api.interceptors.request.use((config) => {
  const token = getToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;

    // Verificar si el token ha expirado antes de hacer la petición
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      logout();
      return Promise.reject("Token expirado");
    }
  }
  
  return config;
}, (error) => Promise.reject(error));

// Interceptor para manejar errores 401 (token inválido o expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
      logout();
    }
    return Promise.reject(error);
  }
);

export default api;
