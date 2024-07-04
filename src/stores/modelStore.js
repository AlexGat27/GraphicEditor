// store.js
import { defineStore } from 'pinia';
import defaultModel from '../models/objects/defaultModel';
import { modelAttributes } from '../models/objects/modelsAttributes';

export const useMainStore = defineStore('main', {
  state: () => ({
    currentModel: defaultModel,
    modelAttributes: modelAttributes,
    isAuthenticated: false
  }),
  actions: {
    setCurrentModel(newModel) {
      this.currentModel = newModel;
    },
  },
});
