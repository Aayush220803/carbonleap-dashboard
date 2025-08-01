import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

export const submitReadings = (readings) => apiClient.post('/readings/', readings);
export const getAnalytics = (params) => apiClient.get('/analytics/', { params });
export const getJobStatus = (taskId) => apiClient.get(`/jobs/${taskId}`);