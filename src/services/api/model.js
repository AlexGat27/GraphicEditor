import api from "./apiInstance";

const modelApi = {
    getBrandModels(id){
      return api.get(`brands/${id}/models`);
    },
    getModels(){
      return api.get('/models')
    },
    getModel(id){
      return api.get(`/models/${id}`);
    },
    deleteModel(id){
      return api.delete(`/models/${id}`);
    },
    createModel(body){
      return api.post('/models', body);
    },
    updateModel(id, body){
      return api.put(`/models/${id}`, body);
    },
    getBrands(){
      return api.get('/brands');
    },
    deleteBrand(id){
      return api.delete(`/brands/${id}`);
    },
    createBrand(body){
      return api.post(`/brands`, body);
    },
    updateBrand(id, body){
      return api.put(`/brands/${id}`, body);
    },
}

export default modelApi;