import api from "./apiInstance";

export default modelApi = {
    getModels(){
      return api.get('/models');
    },
    getModel(id){
      return api.get(`/models/${id}`);
    },
    createModel(body){
      return api.post('/models', body);
    },
    updateModel(id, body){
      return api.put(`/models/${id}`, body);
    }
}