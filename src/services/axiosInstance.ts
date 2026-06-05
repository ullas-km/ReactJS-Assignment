import axios from "axios";
import { API_URL } from "../config";

const api = axios.create({
  baseURL: API_URL,
});

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle expired token
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      globalThis.location.href = "/";
    }
    return Promise.reject(err);
  },
);

export default api;
