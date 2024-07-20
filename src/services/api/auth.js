import api from "./apiInstance";

const authApi = {
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
    checkAdmin(){
      return api.get('/check-admin');
    }
}

export default authApi;