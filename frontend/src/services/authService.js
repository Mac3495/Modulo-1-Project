import axios from "axios";

const API_URL = "https://modulo-1-project.onrender.com"; // Reemplaza con la URL real de tu backend

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Guardar token
    }

    return response.data; // Retornar los datos del usuario
  } catch (error) {
    throw error.response?.data?.message || "Error al iniciar sesión";
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {name, email, password });
    return response.data; // Retornar los datos del usuario
  } catch (error) {
    throw error.response?.data?.message || "Error al crear cuenta";
  }
};

export const logout = () => {
  localStorage.removeItem("token"); // Eliminar token
  window.location.reload(); // Recargar para limpiar estado
};

export const getToken = () => localStorage.getItem("token"); 