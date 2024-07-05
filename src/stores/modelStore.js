// store.js
import { defineStore } from 'pinia';
import { CompileModel, ConditionCaseModel, ContourModel, ContainerModel, ActionCaseModel } from '@/models/interfaces/compileModel';
import { ModelAttributes, ConditionAttribute, ActionAttribute } from '@/models/interfaces/modelAttributes';

export const useMainStore = defineStore('main', {
  state: () => ({
    currentModel: new CompileModel(''),
    modelAttributes: {},
    isAuthenticated: false
  }),
  actions: {
    setCurrentModel(value) {
      console.log(value);
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
    
        return new ContourModel(contourData.contourID, contourData.name, containers);
      })
      this.currentModel = new CompileModel(value.scenario_id, value.scenario);
      this.currentModel.contours = contours;
    },
    setModelAttributes(value){
      console.log(value)
      const conditionAttributes = value.conditions.map(condition => 
        new ConditionAttribute(
          condition.name, 
          condition.times, 
          condition.modes, 
          condition.values
        )
      );
      const actionAttributes = new ActionAttribute(
        value.actions.types, 
        value.actions.durations, 
        value.actions.speeds,
        value.actions.intensities
      );
      this.modelAttributes = new ModelAttributes(value.model_name, conditionAttributes, actionAttributes)
    }
  },
});
