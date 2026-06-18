import axios from "axios";

const api = axios.create({
  // FIX NYA DI SINI: Tambahin /api di ujungnya!
  baseURL: "https://nexplay-esports-ci4-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// (Bagian atas file api.js tetep sama)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // THE FIX: Cek apakah error 401 ini BUKAN dari proses login
      const isLoginRequest = error.config.url.includes("/login");

      if (!isLoginRequest) {
        // Kalo bukan dari login (misal dari dashboard), baru kita tendang!
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
