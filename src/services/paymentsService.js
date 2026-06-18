import api from "./api";

const paymentsService = {
  getAllPayments: async () => {
    try {
      const response = await api.get("/payments");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getPaymentById: async (id) => {
    try {
      const response = await api.get(`/payments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  createPayment: async (data) => {
    try {
      const response = await api.post("/payments", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  updatePayment: async (id, data) => {
    try {
      const response = await api.put(`/payments/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  deletePayment: async (id) => {
    try {
      const response = await api.delete(`/payments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default paymentsService;
