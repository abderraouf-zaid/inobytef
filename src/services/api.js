const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function getAuthToken() {
  return sessionStorage.getItem('authToken') || localStorage.getItem('authToken');
}

function buildQuery(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

async function apiRequest(path, options = {}) {
  const token = Object.prototype.hasOwnProperty.call(options, 'token') ? options.token : getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const text = await response.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch (error) {
    throw new Error('Server returned an invalid response');
  }

  if (!response.ok) {
    throw new Error(data.msg || data.message || data.error || 'Request failed');
  }

  return data;
}

function postJson(path, payload, options = {}) {
  return apiRequest(path, {
    ...options,
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export const authApi = {
  register: (payload) => postJson('/auth/register', payload),
  verifyOtp: (payload) => postJson('/auth/verify-otp', payload),
  resendOtp: (payload) => postJson('/auth/resend-otp', payload),
  login: (payload) => postJson('/auth/login', payload),
  dashboard: () => apiRequest('/auth/dashboard'),
  users: () => apiRequest('/auth/users'),
  userDetails: (apiKey) => apiRequest(`/auth/users/${encodeURIComponent(apiKey)}`)
};

export const websiteApi = {
  create: (payload) => postJson('/websites', payload),
  list: () => apiRequest('/websites'),
  verify: (websiteId) => postJson('/websites/verify', { websiteId })
};

export const dashboardApi = {
  get: (params) => apiRequest(`/dashboard${buildQuery(params)}`)
};

export const visualizationApi = {
  dashboard: (params) => apiRequest(`/visualization/dashboard${buildQuery(params)}`)
};

export const usersApi = {
  list: (params) => apiRequest(`/users${buildQuery(params)}`),
  details: (identifier) => apiRequest(`/users/${encodeURIComponent(identifier)}`)
};

export const scansApi = {
  run: (payload) => postJson('/scans', payload)
};

export const eventsApi = {
  track: (payload) => postJson('/events/track', payload, { token: null })
};

export { API_BASE_URL, apiRequest, buildQuery, getAuthToken };
