<template>
    <div class="container">
        <div class="cases">
          <ConditionalBlock  v-for="(conditionCase, index) in conditionCases" :key="index" :caseID="index"/>
        </div>
        <div class="cases">
          <ActionBlock v-for="(actionCase, index) in actionCases" :key="index" :caseID="index"/>
        </div>
    </div>
  </template>
  
<script>
import ActionBlock from './Cases/ActionCase.vue';
import ConditionalBlock from './Cases/ConditionalCase.vue';
import {ActionCase, ConditionCase} from '../models/interfaces/compileModel';
import { useMainStore } from '@/store';
  
export default {
  components: {
    ActionBlock,
    ConditionalBlock,
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
      return currentModel.contours.find(contour => contour.selected).containers[this.containerID].actionCases;
    },
    conditionCases(){
      return currentModel.contours.find(contour => contour.selected).containers[this.containerID].conditionCases
    }
  },
  methods: {
    addCase(type){
      const currentModel = this.store.currentModel;
      const selectedContour = currentModel.contours.find(contour => contour.selected);
      if (type === "actionAttributes") {
        selectedContour.containers[this.containerID].actionCases.push(new ActionCase());
      } else if (type === "conditionAttributes") {
        selectedContour.containers[this.containerID].conditionCases.push(new ConditionCase());
      } else {
        console.error("Произошла ошибка в добавлении кейса");
      }
    },
    removeCase(type){
      const currentModel = this.store.currentModel;
      const selectedContour = currentModel.contours.find(contour => contour.selected);
      const actionCases = selectedContour.containers[this.containerID].actionCases;
      const conditionCases = selectedContour.containers[this.containerID].conditionCases;
      if (type === "actionAttributes" && actionCases.length > 1) {
        actionCases.pop();
      } else if (type === "conditionAttributes" && conditionCases.length > 1) {
        conditionCases.pop();
      } else {
        console.error("Произошла ошибка в удалении кейса");
      }
    }
  }
};
</script>
  
<style scoped>
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    overflow: scroll;
    background-color: var(--background-case-container);
  }
  .cases{
    display: block;
    height: 100%;
    max-height: 150px;
  }
  .сaseBtnBlock{
    width: 100%;
    height: 20%;
    display: flex;
  }
  .сaseBtn{
    width: 50%;
    height: 100%;
  }
</style>
  