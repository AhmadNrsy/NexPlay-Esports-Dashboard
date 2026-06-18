import api from "./api";

const pcSetupsService = {
  getAllPcSetups: async () => {
    try {
      const response = await api.get("/pc-setups");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getPcSetupById: async (id) => {
    try {
      const response = await api.get(`/pc-setups/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  createPcSetup: async (data) => {
    try {
      const response = await api.post("/pc-setups", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  updatePcSetup: async (id, data) => {
    try {
      const response = await api.put(`/pc-setups/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  deletePcSetup: async (id) => {
    try {
      const response = await api.delete(`/pc-setups/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default pcSetupsService;
