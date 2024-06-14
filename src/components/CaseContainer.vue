<template>
    <div class="containerItem">
      <div style="margin: 15px; margin-bottom: 10px; display: flex; justify-content: space-between;">
        <h3 style="margin:0;">Правило {{ containerID + 1 }}</h3>
        <button style="text-decoration: underline;" @click="removeContainer()">удалить правило</button>
      </div>
      <div class="container">
          <div class="cases">
            <ConditionCase  v-for="(conditionCase, index) in conditionCases" :key="index" :caseID="index" :containerID="containerID"/>
          </div>
          <div class="cases">
            <ActionCase v-for="(actionCase, index) in actionCases" :key="index" :caseID="index" :containerID="containerID"/>
          </div>
      </div>
      <div class="addButtons">
        <button @click="addCase('conditionAttributes')">Добавить условие</button>
        <button @click="addCase('actionAttributes')">Добавить действие</button>
      </div>
    </div>
  </template>
  
<script>
import ActionCase from './Cases/ActionCase.vue';
import ConditionCase from './Cases/ConditionCase.vue';
import {ActionCaseModel, ConditionCaseModel} from '../models/interfaces/compileModel';
import { useMainStore } from '@/store';
  
export default {
  components: {
    ActionCase,
    ConditionCase,
  },
  data() {
    return {
      store: null
    };
  },
  created(){
    this.store = useMainStore();
  },
  props:{
    containerID:{
      type: Number,
      required: true
    }
  },
  computed:{
    currentModel: {
      get(){
          return this.store.currentModel;
      },
      set(value){
          this.store.setCurrentModel(value);
      }
    },
    actionCases(){
      return this.currentModel.contours.find(contour => contour.selected).containers[this.containerID].actionCases;
    },
    conditionCases(){
      return this.currentModel.contours.find(contour => contour.selected).containers[this.containerID].conditionCases
    }
  },
  methods: {
    addCase(type){
      const selectedContour = this.currentModel.contours.find(contour => contour.selected);
      if (type === "actionAttributes" && selectedContour.containers[this.containerID].actionCases.length < 1) {
        selectedContour.containers[this.containerID].actionCases.push(new ActionCaseModel());
      } else if (type === "conditionAttributes" && selectedContour.containers[this.containerID].conditionCases.length < 3) {
        selectedContour.containers[this.containerID].conditionCases.push(new ConditionCaseModel());
      } else {
        console.error("Превышено количество");
      }
    },
    removeContainer(){
      const selectedContour = this.currentModel.contours.find(contour => contour.selected);
      selectedContour.containers.splice(this.containerID, 1);
    }
  }
};
</script>
  
<style scoped>
.containerItem{
  width: calc(100% - 4px);
  margin-bottom: 45px;
  padding-bottom: 20px;
  border-radius: 10px;
  border: 2px solid var(--contour-container);
  position: relative;
}
  .container{
    width: var(100% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    background-color: var(--background-case-container);
  }
  .cases{
    display: block;
    height: 100%;
    padding-right: 20px;
    width: 50%;
  }
  .cases:first-child{
    border-right: 1px solid var(--contour-elements); 
    margin-right: 20px;
  }
  .addButtons{
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: -15px;
    width: 100%;
    transform: translateY(50%);
    text-decoration: underline;
  }
  button{
    color: var(--contour-elements);
    border: none;           /* Убирает границу */
    background: none;       /* Убирает фон */
    color: inherit;         /* Устанавливает цвет текста, такой же как у родительского элемента */
    padding: 0;             /* Убирает внутренние отступы */
    font: inherit;          /* Устанавливает шрифт, такой же как у родительского элемента */
    cursor: pointer; 
  }
  .removeRuleBtn{

  }
</style>
  