// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:8080',
    timeout: 10000
  },
  production: {
    baseURL: process.env.REACT_APP_API_URL || 'https://four413-project-group-d-6.onrender.com',
    timeout: 10000
  }
};

// Use environment-specific configuration
const environment = process.env.NODE_ENV || 'development';
const config = API_CONFIG[environment];

// Export the base URL for use in components
export const API_BASE_URL = config.baseURL;

// Helper function to create full API URLs
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Common API endpoints
export const API_ENDPOINTS = {
  EVS: '/api/evs',
  USERS: '/api/users',
  REVIEWS: '/api/reviews',
  CART: '/api/cart',
  CHATBOT: '/api/chatbot'
};

export default config; 