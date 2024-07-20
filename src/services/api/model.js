import api from "./apiInstance";

const modelApi = {
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

export default modelApi;