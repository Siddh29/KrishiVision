import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configure standard interceptors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling logic can go here
    return Promise.reject(error);
  }
);
