// store.js
import { defineStore } from 'pinia';
import { CompileModel, ConditionCaseModel, ContourModel, ContainerModel, ActionCaseModel } from '@/models/compileModel';

export const useMainStore = defineStore('main', {
  state: () => ({
    currentModel: null,
    canCommands: [],
    selectedScenarioId: null
  }),
  actions: {
    setCurrentModel(value) {
      if (!value) return;
      const contours = value.contours.map(contourData => {
        const containers = contourData.containers.map(containerData => {
          const actionCases = containerData.actionCases.map(actionCaseData =>
            new ActionCaseModel(
              actionCaseData.action,
              actionCaseData.interruption,
              actionCaseData.workingPeriod,
              actionCaseData.power
            )
          );
    
          const conditionCases = containerData.conditionCases.map(conditionCaseData =>
            new ConditionCaseModel(
              conditionCaseData.condition,
              conditionCaseData.value,
              conditionCaseData.countSignals,
              conditionCaseData.delay
            )
          );
    
          return new ContainerModel(actionCases, conditionCases);
        });
    
        return new ContourModel(contourData.contourID, contourData.name, contourData.selected, containers);
      })
      this.currentModel = new CompileModel(value.scenario_id, value.scenario);
      this.currentModel.contours = contours;
    },
    setCanCommands(value){
      this.canCommands = value;
    },
    selectScenario(value){
      this.selectedScenarioId = value;
    }
  },
});
