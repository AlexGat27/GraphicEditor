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
  },
  getModels(){
    return api.get('/models');
  },
  getModel(id){
    return api.get(`/models/${id}`);
  },
  getScenarios(){
    return api.get('/scenarios');
  },
  deleteScenario(scenario_id){
    return api.delete(`/scenarios/${scenario_id}`);
  },
  addScenario(scenario_data){
    return api.post('/scenarios', scenario_data);
  },
  updateScenario(id, data){
    return api.put(`/scenarios/${id}`, data);
  }
};
