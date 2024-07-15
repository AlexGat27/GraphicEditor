import api from "./apiInstance";

export default userApi = {
    getUsers(){
      return api.get('/users');
    },
    updateUser(id, body){
        return api.put(`/users/${id}`, body);
    },
    deleteUser(id){
        return api.delete(`/users/${id}`);
    }
}