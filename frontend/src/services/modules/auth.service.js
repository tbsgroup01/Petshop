import api from '../api';

export const authService = {
  register: (payload) => api.post('/api/auth/register', payload),
  login: (payload) => api.post('/api/auth/login', payload),
  getMe: () => api.get('/api/auth/me'),
  forgetAdmin: (payload) => api.post('/api/auth/forgetadmin', payload),
  updatePassword: (payload) => api.post('/api/auth/update-password', payload),
};
