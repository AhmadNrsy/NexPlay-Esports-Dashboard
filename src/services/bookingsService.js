import api from "./api";

const bookingsService = {
  getAllBookings: async () => {
    try {
      const response = await api.get("/bookings");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getBookingById: async (id) => {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  createBooking: async (data) => {
    try {
      const response = await api.post("/bookings", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  updateBooking: async (id, data) => {
    try {
      const response = await api.put(`/bookings/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  deleteBooking: async (id) => {
    try {
      const response = await api.delete(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default bookingsService;
