import api from "./api";

const statisticsService = {
  getActiveBookings: async () => {
    try {
      const response = await api.get("/stats/active-bookings");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getAvailableRooms: async () => {
    try {
      const response = await api.get("/stats/available-rooms");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getRevenue: async () => {
    try {
      const response = await api.get("/stats/revenue");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getTotalBookings: async () => {
    try {
      const response = await api.get("/stats/total-bookings");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default statisticsService;
