import axios from "axios";
import { getToken } from "./authService"; // Importar la función getToken

const API_URL = "https://modulo-1-project.onrender.com"; // URL del backend

// Función para crear una tarea
export const createTask = async (taskData) => {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error al crear tarea";
  }
};

// Función para obtener todas las tareas
export const getTasks = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error al obtener tareas";
  }
};

// Función para actualizar una tarea
export const updateTask = async (taskId, taskData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error al actualizar tarea";
  }
};

// Función para eliminar una tarea
export const deleteTask = async (taskId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error al eliminar tarea";
  }
};

// Función para obtener tareas filtradas por status, expireDate o search
export const getFilteredTasks = async (filters) => {
  try {
    const token = getToken();
    const { status, expireDate, search } = filters;
    const response = await axios.get(`${API_URL}/tasks`, {
      params: { status, expireDate, search },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error al filtrar tareas";
  }
};
