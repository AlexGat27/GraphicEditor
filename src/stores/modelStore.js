// store.js
import { defineStore } from 'pinia';
import { modelAttributes } from '../models/objects/modelsAttributes';
import { CompileModel } from '@/models/interfaces/compileModel';

export const useMainStore = defineStore('main', {
  state: () => ({
    currentModel: new CompileModel(''),
    modelAttributes: modelAttributes,
    isAuthenticated: false
  }),
  actions: {
    setCurrentModel(newModel) {
      this.currentModel = newModel;
    },
  },
});
