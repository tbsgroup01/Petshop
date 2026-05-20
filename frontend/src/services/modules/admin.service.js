import api from '../api';

export const adminService = {
  forgotPassword: (payload) => api.post('/api/admin/forgot-password', payload),
  getDashboardStats: () => api.get('/api/admin/dashboard/stats'),

  getPendingListings: () => api.get('/api/admin/listings/pending'),
  getAllListings: () => api.get('/api/admin/listings'),
  approveListing: (id, payload = {}) => api.put(`/api/admin/listings/${id}/approve`, payload),
  rejectListing: (id, payload = {}) => api.put(`/api/admin/listings/${id}/reject`, payload),
  changeListingStatus: (id, payload) => api.put(`/api/admin/listings/${id}/status`, payload),
  toggleHomeVisibility: (id, payload = {}) => api.put(`/api/admin/listings/${id}/visibility`, payload),
  deleteListing: (id) => api.delete(`/api/admin/listings/${id}`),

  getAllUsers: () => api.get('/api/admin/users'),
  getVendorDetails: (id) => api.get(`/api/admin/vendors/${id}`),
  editUser: (id, payload) => api.put(`/api/admin/users/${id}/edit`, payload),
  toggleUserStatus: (id, payload = {}) => api.put(`/api/admin/users/${id}/toggle-status`, payload),

  getLogs: () => api.get('/api/admin/logs'),
};
