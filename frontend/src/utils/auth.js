const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const normalizeRole = (role) => String(role || 'user').toLowerCase();

export const getDashboardPath = (role) => {
  const normalizedRole = normalizeRole(role);

  if (normalizedRole === 'admin') return '/admin/dashboard';
  if (normalizedRole === 'vendor') return '/vendor/dashboard';
  return '/user/dashboard';
};

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getStoredToken() && getStoredUser());

export const saveAuthSession = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
