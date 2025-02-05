import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData: { email: string; password: string }) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

export const fetchTasks = async (token: string) => {
  return await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
