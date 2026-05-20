import api, { toFormData } from '../api';

export const homeSliderService = {
  getHomeSliders: () => api.get('/api/home-slider'),
  getHomeSliderById: (id) => api.get(`/api/home-slider/${id}`),
  addHomeSlider: (payload) => api.post('/api/home-slider', toFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateHomeSlider: (id, payload) => api.put(`/api/home-slider/${id}`, toFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteHomeSlider: (id) => api.delete(`/api/home-slider/${id}`),
};
