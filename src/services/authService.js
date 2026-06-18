import api from "./api";

const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });
      // Mengembalikan response data (biasanya berisi { token: "...", user: {...} })
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: async () => {
    try {
      // Tembak endpoint logout CI4 lu (jika ada logic blacklist token di backend)
      const response = await api.post("/auth/logout");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default authService;
