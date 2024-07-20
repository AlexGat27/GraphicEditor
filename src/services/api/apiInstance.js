import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1', // Замените на URL вашего API
  headers: {
    'Content-Type': 'application/json'
  },
});

export default api;
