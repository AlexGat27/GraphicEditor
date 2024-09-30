import { defineStore } from "pinia";
import { scenarioApi } from "@/services/api/index.js";
import { ScenarioResponse } from "@/models/responses.js";

export const useScenarioStore = defineStore('scenario', {
    state: () => ({
        scenarios: [],
        selectedScenarioId: null,
    }),
    actions: {
        fetchScenarios() {
            return new Promise(async (resolve, reject) => {
                try {
                    if (this.scenarios.length === 0) {
                        const response = await scenarioApi.getScenarios();
                        response.data.forEach(element => {
                            this.scenarios.push(new ScenarioResponse(element));
                        });
                    }
                    console.log(this.scenarios);
                    resolve(this.scenarios);  // Успешный результат
                } catch (error) {
                    console.error('Ошибка при загрузке сценариев:', error);
                    reject(error);  // Ошибка запроса
                }
            });
        },
        selectScenario(value) {
            this.selectedScenarioId = value;
        },
        deleteScenario() {
            return new Promise(async (resolve, reject) => {
                try {
                    await scenarioApi.deleteScenario(this.selectedScenarioId);
                    this.scenarios = this.scenarios.filter(scenario => scenario.id !== this.selectedScenarioId);
                    this.selectedScenarioId = null;
                    resolve();  // Успешное удаление
                } catch (error) {
                    console.error('Ошибка при удалении сценария:', error);
                    reject(error);  // Ошибка при удалении
                }
            });
        },
        addScenario(scenario) {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await scenarioApi.addScenario(scenario);
                    this.scenarios.push(new ScenarioResponse(response.data));
                    resolve(response.data);  // Сценарий успешно добавлен
                } catch (error) {
                    console.error('Ошибка при добавлении сценария:', error);
                    reject(error);  // Ошибка при добавлении
                }
            });
        },
        updateScenario(scenarioData) {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await scenarioApi.updateScenario(this.selectedScenarioId, scenarioData);
                    const updatedScenario = new ScenarioResponse(response.data);
                    this.scenarios = this.scenarios.filter(scenario => scenario.id !== updatedScenario.id);
                    this.scenarios.push(updatedScenario);
                    resolve();  // Сценарий успешно обновлен
                } catch (error) {
                    console.error('Ошибка при обновлении сценария:', error);
                    reject(error);  // Ошибка при обновлении
                }
            });
        },
    },
});
