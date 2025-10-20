import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

export const busApi = {
  // Get all buses
  async getAllBuses() {
    const response = await axios.get(`${API_URL}/api/ogloszenia`);
    return response.data;
  },

  // Get single bus
  async getBusById(id) {
    const response = await axios.get(`${API_URL}/api/ogloszenia/${id}`);
    return response.data;
  },

  // Create new bus
  async createBus(busData) {
    const response = await axios.post(`${API_URL}/api/ogloszenia`, busData);
    return response.data;
  },

  // Update bus
  async updateBus(id, busData) {
    const response = await axios.put(`${API_URL}/api/ogloszenia/${id}`, busData);
    return response.data;
  },

  // Delete bus
  async deleteBus(id) {
    const response = await axios.delete(`${API_URL}/api/ogloszenia/${id}`);
    return response.data;
  },

  // Upload image
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get stats
  async getStats() {
    const response = await axios.get(`${API_URL}/api/stats`);
    return response.data;
  },

  // Opinions API
  async getAllOpinions() {
    const response = await axios.get(`${API_URL}/api/opinie`);
    return response.data;
  },

  async getPublicOpinions() {
    const response = await axios.get(`${API_URL}/api/opinie/public`);
    return response.data;
  },

  async getOpinionById(id) {
    const response = await axios.get(`${API_URL}/api/opinie/${id}`);
    return response.data;
  },

  async createOpinion(opinionData) {
    const response = await axios.post(`${API_URL}/api/opinie`, opinionData);
    return response.data;
  },

  async updateOpinion(id, opinionData) {
    const response = await axios.put(`${API_URL}/api/opinie/${id}`, opinionData);
    return response.data;
  },

  async deleteOpinion(id) {
    const response = await axios.delete(`${API_URL}/api/opinie/${id}`);
    return response.data;
  },
};
