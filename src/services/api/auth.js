import api from "./apiInstance";

export default authApi = {
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
    },
}