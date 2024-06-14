<template>
  <div>
    <div class="divider" v-if="caseID > 0"></div> <!-- Добавлен горизонтальный разделитель -->
    <div class="conditionCase">
      <DropdownBlock :blockTitle="title1" :attributes="mapCondition" 
      @attribute="updateConditionParams('condition', $event)" :current="currentCondition.condition"/>
      <DropdownBlock :blockTitle="title2" :attributes="filterCondition.values" 
      @attribute="updateConditionParams('value', $event)" :current="currentCondition.value"/>
      <DropdownBlock :blockTitle="title3" :attributes="filterCondition.countSignals" 
      @attribute="updateConditionParams('countSignals', $event)" :current="currentCondition.countSignals"/>
      <CompositeBlock :blockTitle="title4" :attributes="filterCondition.delayTypes"
      @attribute="updateConditionParams('delay', $event)" :current="currentCondition.delay"/>
      <div class="closeIcon" @click="removeCase()"></div>
    </div>
  </div>
</template>

<script>
import DropdownBlock from '../blocks/DropdownBlock.vue';
import CompositeBlock from '../blocks/CompositeBlock.vue';
import { useMainStore } from '@/store';
import { ConditionCaseModel } from '@/models/interfaces/compileModel';

export default {
  components: {DropdownBlock, CompositeBlock},
  data(){
    return {
      title1: "Условие",
      title2: "Значение",
      title3: "Кол-во входящих сигналов",
      title4: "Период считывания",
    }
  },
  created() {
    this.store = useMainStore(); // Используйте хранилище Pinia
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
    conditionAttributes(){
      return this.store.modelAttributes[0].conditionAttributes;
    },
    currentCondition(){
      return this.currentModel.contours.find(contour => contour.selected).containers[this.containerID].conditionCases[this.caseID];
    },
    filterCondition(){
      const conditionAttributes = this.conditionAttributes.find(cond => cond.condition == this.currentCondition.condition);
      return conditionAttributes || { values: [], countSignals: [], delayTypes: [] };
    },
    mapCondition(){
      return this.conditionAttributes.map(cond => cond.condition);
    },
  },
  props: {
    caseID:{
      type: Number,
      required: true
    },
    containerID:{
      type: Number,
      required: true
    }
  },
  methods: {
    updateConditionParams(type, event){
      const currentModel = this.currentModel;
      if (type == 'condition'){
        currentModel.contours.find(contour => contour.selected).containers[this.containerID].conditionCases[this.caseID] = new ConditionCaseModel(event);
      }else {
        currentModel.contours.find(contour => contour.selected).containers[this.containerID].conditionCases[this.caseID][type] = event;
      }
      this.currentModel = currentModel;
    },
    removeCase(){
      const conditionCases = this.currentModel.contours.find(contour => contour.selected).containers[this.containerID].conditionCases;
      if (conditionCases.length > 1){
        conditionCases.splice(this.caseID, 1)
      }
    }
  }
}
</script>
  
<style scoped>
  .divider {
    height: 0.5px; /* Высота разделителя */
    background-color: var(--contour-elements); /* Цвет разделителя */
    margin-top: 20px; /* Отступ сверху для разделителя */
    margin-bottom: 5px;
  }

  .conditionCase{
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    background-color: var(--background-cases);
  }

  .closeIcon {
    width: 30px; /* Ширина квадрата */
    height: 30px; /* Высота квадрата */
    background-color: transparent;
    border: 1px solid var(--contour-elements); /* Цвет рамки */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: translateY(10px);
    border-radius: 5px;
  }

.closeIcon::before,
.closeIcon::after {
  content: '';
  position: absolute;
  width: 20px; /* Ширина палочек крестика */
  height: 1px; /* Высота палочек крестика */
  background-color: var(--contour-elements); /* Цвет палочек крестика */
}

  .closeIcon::before {
    transform: rotate(45deg); /* Первая палочка крестика */
  }

  .closeIcon::after {
    transform: rotate(-45deg); /* Вторая палочка крестика */
  }
</style>