import api, { toFormData } from '../api';

export const listingService = {
  getHomeListings: (params = {}) => api.get('/api/listings/home', { params }),
  searchListings: (params = {}) => api.get('/api/listings/search', { params }),
  getListingById: (id) => api.get(`/api/listings/${id}`),
  getListingBySlug: (slug) => api.get(`/api/listings/slug/${slug}`),
  getMyListings: () => api.get('/api/listings/my/listings'),
  createListing: (payload) => api.post('/api/listings', toFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateListing: (id, payload) => api.put(`/api/listings/${id}`, toFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteListing: (id) => api.delete(`/api/listings/${id}`),
};
