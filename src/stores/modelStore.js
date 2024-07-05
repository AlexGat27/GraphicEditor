// store.js
import { defineStore } from 'pinia';
import { CompileModel } from '@/models/interfaces/compileModel';
import { ModelAttributes, ConditionAttribute, ActionAttribute } from '@/models/interfaces/modelAttributes';

export const useMainStore = defineStore('main', {
  state: () => ({
    currentModel: new CompileModel(''),
    modelAttributes: {},
    isAuthenticated: false
  }),
  actions: {
    setCurrentModel(value) {
      this.currentModel = new CompileModel(
        value.scenario,
        
      );
    },
    setModelAttributes(value){
      this.modelAttributes = new ModelAttributes(
        value.model_name,
        [
            new ConditionAttribute(value.conditions[0].name, value.conditions[0].times, value.conditions[0].modes, value.conditions[0].values),
            new ConditionAttribute(
                value.conditions[1].name, 
                value.conditions[1].times, 
                value.conditions[1].modes, 
                value.conditions[1].values
            ),
        ],
        new ActionAttribute(
          value.actions.types, 
          value.actions.durations, 
          value.actions.speeds,
          value.actions.intensities
        )
      )
    }
  },
});
