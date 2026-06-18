import api from "./api";

const gamingRoomsService = {
  getAllRooms: async () => {
    try {
      const response = await api.get("/gaming-rooms");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getRoomById: async (id) => {
    try {
      const response = await api.get(`/gaming-rooms/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  createRoom: async (data) => {
    try {
      const response = await api.post("/gaming-rooms", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  updateRoom: async (id, data) => {
    try {
      const response = await api.put(`/gaming-rooms/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  deleteRoom: async (id) => {
    try {
      const response = await api.delete(`/gaming-rooms/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default gamingRoomsService;
