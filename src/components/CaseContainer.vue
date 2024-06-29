<template>
  <div class="containerItem">
    <div style="margin: 15px; margin-bottom: 10px; display: flex; justify-content: space-between;">
      <h3 style="margin:0; font-size: 18px;" class="fira-sans-light">Правило {{ containerID + 1 }}</h3>
      <button class="delete-button" @click="showConfirmModal = true">удалить правило</button>
    </div>
    <div class="container">
      <div class="cases">
        <ConditionCase v-for="(conditionCase, index) in conditionCases" :key="index" :caseID="index" :containerID="containerID"/>
      </div>
      <div class="verticalLines"></div>
      <div class="cases">
        <ActionCase v-for="(actionCase, index) in actionCases" :key="index" :caseID="index" :containerID="containerID"/>
      </div>
    </div>
    <div class="addButtons">
      <button class="add-button" @click="addCase('conditionAttributes')">Добавить условие</button>
      <!-- <button class="add-button" @click="addCase('actionAttributes')">Добавить действие</button> -->
    </div>
    <ConfirmModal :message="'Точно хотите удалить правило?'" :isVisible="showConfirmModal" 
    @confirm="removeContainer" @cancel="showConfirmModal = false" />
  </div>
</template>

<script>
import ActionCase from './Cases/ActionCase.vue';
import ConditionCase from './Cases/ConditionCase.vue';
import ConfirmModal from './shared/ConfirmModal.vue';
import { ActionCaseModel, ConditionCaseModel } from '../models/interfaces/compileModel';
import { useMainStore } from '@/store';

export default {
  components: {
    ActionCase,
    ConditionCase,
    ConfirmModal
  },
  data() {
    return {
      store: null,
      showConfirmModal: false
    };
  },
  created(){
    this.store = useMainStore();
  },
  props: {
    containerID: {
      type: Number,
      required: true
    }
  },
  computed: {
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
      return this.currentModel.contours.find(contour => contour.selected).containers[this.containerID].conditionCases;
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
      this.showConfirmModal = false;
    }
  }
};
</script>

<style scoped>
.containerItem {
  width: calc(100% - 4px);
  margin-bottom: 45px;
  padding-bottom: 20px;
  border-radius: 10px;
  border: 2px solid var(--contour-container);
  position: relative;
}
.container {
  width: calc(100% - 30px);
  margin-left: 15px;
  margin-right: 15px;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background-color: var(--background-case-container);
  position: relative; /* Добавьте это для родительского контейнера */
}
.cases {
  display: block;
  height: 100%;
  padding-right: 20px;
  width: calc(50% - 2.5px);
}
.cases:nth-child(3) {
  padding-left: 25px;
  width: calc(50% - 20px)
}
.addButtons {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -15px;
  width: 50%;
  transform: translateY(50%);
  text-decoration: underline;
  text-decoration-skip-ink: none;
}
button {
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
}
.add-button {
  color: var(--contour-elements);
  font-size: 10px;
}
.delete-button {
  color: var(--contour-elements);
  text-decoration: underline;
  text-decoration-skip-ink: none;
  font-size: 10px;
}
.verticalLines {
  width: 5px;
  height: 100%; /* Высота на всю высоту родителя */
  border-right: 1px solid var(--contour-elements);
  border-left: 1px solid var(--contour-elements);
  position: absolute; /* Абсолютное позиционирование */
  top: 0; /* Верхний край */
  left: 50%; /* Позиционирование по центру */
  transform: translateX(-50%); /* Сдвиг на половину ширины для точного центрирования */
}
</style>
