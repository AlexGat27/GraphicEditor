import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080/api/v1', // Замените на URL вашего API
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  register(userData) {
    return api.post('/register', userData);
  },
  login(userdata){
    return api.post('/login', userdata);
  },
  logout(){
    return api.get('/logout');
  }
};
