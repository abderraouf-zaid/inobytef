const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
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

export const authApi = {
  register: (payload) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  verifyOtp: (payload) =>
    apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  resendOtp: (payload) =>
    apiRequest('/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  login: (payload) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
};

export { API_BASE_URL };
