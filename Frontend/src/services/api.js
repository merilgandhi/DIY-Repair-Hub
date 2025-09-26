import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: (token) => api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  }),
};

// Guide API
export const guideAPI = {
  getGuides: (filters = {}) => api.get('/guides', { params: filters }),
  getGuide: (id) => api.get(`/guides/${id}`),
  createGuide: (guideData, token) => api.post('/guides', guideData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateGuide: (id, guideData, token) => api.put(`/guides/${id}`, guideData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  deleteGuide: (id, token) => api.delete(`/guides/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  likeGuide: (id, token) => api.post(`/guides/${id}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  }),
};

// Upload API
export const uploadAPI = {
  uploadImage: (formData, token) => api.post('/upload/image', formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }),
  deleteImage: (publicId, token) => api.delete('/upload/image', {
    data: { publicId },
    headers: { Authorization: `Bearer ${token}` }
  }),
};

// AI API
export const aiAPI = {
  getAssistance: (data, token) => api.post('/ai/assist', data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  analyzeImage: (formData, token) => api.post('/ai/analyze-image', formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }),
};

export default api;