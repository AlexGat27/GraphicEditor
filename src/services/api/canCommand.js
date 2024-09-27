import api from "./apiInstance";

const canCommandsApi = {
    getCanCommands(id){
        return api.get(`models/${id}/canCommands`)
    },
    createModel(body){
        return api.post(`canCommands`, body)
    },
    deleteModel(id){
        return api.delete(`canCommands/${id}`)
    },
    updateModel(id, body){
        return api.put(`canCommands/${id}`, body)
    }
}

export default canCommandsApi;