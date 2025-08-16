// Configuration for different environments
const config = {
  // API URL based on environment
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://mangodesk-api.onrender.com'
    : 'http://localhost:5000'
};

export default config;
