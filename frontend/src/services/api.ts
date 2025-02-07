import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Authentication APIs
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

// Task APIs
export const fetchTasks = async (token: string | null) => {
  return await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchTaskById = async (taskId: string, token: string) => {
  return await axios.get(`${API_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = async (
  taskData: { title: string; description: string; completed?: boolean },
  token: string | null
) => {
  return await axios.post(`${API_URL}/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = async (
  taskId: string,
  taskData: { title: string; description: string; completed: boolean },
  token: string | null
) => {
  return await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteUserTask = async (taskId: string, token: string | null) => {
  return await axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const toggleTaskCompletion = async (taskId: string, token: string | null) => {
  return await axios.put(
    `${API_URL}/tasks/${taskId}/toggle`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
