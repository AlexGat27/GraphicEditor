import api from "./apiInstance";

const scenarioApi = {
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
    },
    downloadScenario(id){
      return api.get(`/scenarios/${id}/download`);
    }
}

export default scenarioApi;