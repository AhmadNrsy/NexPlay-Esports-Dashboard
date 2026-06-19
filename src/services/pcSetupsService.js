import api from "./api";

const pcSetupsService = {
  getAllPcSetups: async () => {
    try {
      // FIX: Ubah pc-setups jadi pc_setups
      const response = await api.get("/pc_setups");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getPcSetupById: async (id) => {
    try {
      // FIX: Ubah pc-setups jadi pc_setups
      const response = await api.get(`/pc_setups/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  createPcSetup: async (data) => {
    try {
      // FIX: Ubah pc-setups jadi pc_setups
      const response = await api.post("/pc_setups", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  updatePcSetup: async (id, data) => {
    try {
      // FIX: Ubah pc-setups jadi pc_setups
      const response = await api.put(`/pc_setups/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  deletePcSetup: async (id) => {
    try {
      // FIX: Ubah pc-setups jadi pc_setups
      const response = await api.delete(`/pc_setups/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default pcSetupsService;