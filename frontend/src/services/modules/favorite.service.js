import api from '../api';

export const favoriteService = {
  getFavoriteCount: (listingId) => api.get(`/api/favorites/count/${listingId}`),
  getFavorites: () => api.get('/api/favorites'),
  addFavorite: (listingId) => api.post(`/api/favorites/${listingId}`),
  removeFavorite: (listingId) => api.delete(`/api/favorites/${listingId}`),
  checkFavorite: (listingId) => api.get(`/api/favorites/check/${listingId}`),
  clearAllFavorites: () => api.delete('/api/favorites/clear/all'),
};
