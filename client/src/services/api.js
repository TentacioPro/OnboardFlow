import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Points to your Node Server
});

// Add Request Interceptor to attach Token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (email, password) => API.post('/auth/login', { email, password });
export const fetchCases = () => API.get('/cases');
export const fetchCaseById = (id) => API.get(`/cases/${id}`);

export const uploadAndAnalyze = (caseId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return API.post(`/cases/${caseId}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};