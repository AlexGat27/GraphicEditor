// store.js
import { defineStore } from 'pinia';
import { CompileModel, ConditionCaseModel, ContourModel, ContainerModel, ActionCaseModel } from '@/models/interfaces/compileModel';
import { ModelAttributes, ConditionAttribute, ActionAttribute } from '@/models/interfaces/modelAttributes';

export const useMainStore = defineStore('main', {
  state: () => ({
    currentModel: null,
    modelAttributes: {},
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
    setModelAttributes(value){
      const conditionAttributes = value.conditions.map(condition => 
        new ConditionAttribute(
          condition.condition, 
          condition.values, 
          condition.countSignals, 
          condition.delayTypes
        )
      );
      const actionAttributes = new ActionAttribute(
        value.actions.actions, 
        value.actions.interruptions, 
        value.actions.workingPeriod,
        value.actions.powers
      );
      this.modelAttributes = new ModelAttributes(value.name, conditionAttributes, actionAttributes);
    }
  },
});
