import axios from 'axios';

const api = axios.create({
  baseURL: 'api/v1', // Замените на URL вашего API
  headers: {
    'Content-Type': 'application/json'
  },
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
  },
  checkAuth(){
    return api.get('/check-auth');
  }
};
