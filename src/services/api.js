const DEFAULT_API_URL = 'https://inobyte-backend.onrender.com/api';
const API_BASE_URL = (process.env.REACT_APP_API_URL || DEFAULT_API_URL).replace(/\/$/, '');
const REQUEST_TIMEOUT_MS = 20000;

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
  const timeoutMs = options.timeoutMs || REQUEST_TIMEOUT_MS;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  const requestUrl = /^https?:\/\//i.test(path) ? path : `${API_BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  const fetchOptions = { ...options };
  delete fetchOptions.timeoutMs;

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(requestUrl, {
      ...fetchOptions,
      headers,
      signal: controller.signal
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Server took too long to respond. Please try again.');
    }

    throw new Error('Could not connect to the server. Please try again.');
  } finally {
    window.clearTimeout(timeoutId);
  }

  const text = await response.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch (error) {
    throw new Error('Server returned an invalid response');
  }

  if (!response.ok) {
    if (response.status === 401) {
      sessionStorage.removeItem('authToken');
      localStorage.removeItem('authToken');
      throw new Error(data.msg || data.message || 'Your session expired. Please sign in again.');
    }

    if (response.status >= 500) {
      throw new Error(data.msg || data.message || 'Server error. Please try again later.');
    }

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
  register: (payload) => postJson('/auth/register', payload, { token: null, timeoutMs: 60000 }),
  verifyOtp: (payload) => postJson('/auth/verify-otp', payload, { token: null }),
  resendOtp: (payload) => postJson('/auth/resend-otp', payload, { token: null, timeoutMs: 60000 }),
  login: (payload) => postJson('/auth/login', payload, { token: null }),
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
