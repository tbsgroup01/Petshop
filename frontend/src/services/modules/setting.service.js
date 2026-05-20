import api, { toFormData } from '../api';

export const settingService = {
  addSetting: (payload) => api.post('/api/settings', toFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateSetting: (id, payload) => api.patch(`/api/settings/${id}`, toFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};
