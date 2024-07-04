import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080/api/v1', // Замените на URL вашего API
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default {
  register(userData) {
    return api.post('/register', userData);
  },
  login(userdata){
    return api.post('/login', userdata, {withCredentials: true});
  },
  logout(){
    return api.get('/logout');
  },
  checkAuth(){
    return api.get('/check-auth', {withCredentials: true}).then(res => console.log(res));
  }
};
