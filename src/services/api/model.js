import api from "./apiInstance";

export default modelApi = {
    getModels(){
      return api.get('/models');
    },
    getModel(id){
      return api.get(`/models/${id}`);
    },

}