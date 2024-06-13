<template>
  <div class="conditionCase">
    <DropdownBlock :blockTitle="title1" :attributes="mapCondition" 
    @attribute="updateConditionParams('condition', $event)" :current="currentCondition.condition"/>
    <DropdownBlock :blockTitle="title2" :attributes="filterCondition.values" 
    @attribute="updateConditionParams('value', $event)" :current="currentCondition.value"/>
    <DropdownBlock :blockTitle="title3" :attributes="filterCondition.countSignals" 
    @attribute="updateConditionParams('countSignals', $event)" :current="currentCondition.countSignal"/>
    <!-- <CompositeBlock :blockTitle="title4" :attributes="filterCondition.delays"
    @attribute="updateConditionParams('spCanInterval', $event)" :current="currentCondition.spCanInterval"/> -->
  </div>
</template>

<script>
import DropdownBlock from '../blocks/DropdownBlock.vue';
// import CompositeBlock from '../blocks/CompositeBlock.vue';
import { useMainStore } from '@/store';
import { ConditionCase } from '@/models/interfaces/compileModel';

export default {
  components: {DropdownBlock},
  data(){
    return {
      title1: "Условие",
      title2: "Значение",
      title3: "Количество входящих сигналов",
      title4: "Период считывания (сек)",
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
      console.log(this.store.modelAttributes.conditionAttributes)
      return this.store.modelAttributes.conditionAttributes;
    },
    currentCondition(){
      return this.currentModel.contours.find(contour => contour.selected).containers[this.containerID].conditionCases[this.caseID];
    },
    filterCondition(){
      if (this.conditionAttributes.find(cond => cond.condition == this.currentCondition.condition)){
        return this.conditionAttributes.find(cond => cond.condition == this.currentCondition.condition);
      }
      else {
        return {values: [], countSignals: [], delays: {}} 
      }
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
      const currentCondition = currentModel.contours.find(contour => contour.selected).containers[this.containerID].conditionCases[this.caseID];
      if (type == 'condition'){
        currentCondition = new ConditionCase({condition: event});
      }else {
        currentCondition[type] = event;
      }
      this.currentModel = currentModel;
    },
  }
}
</script>
  
<style scoped>
  .conditionCase{
    display: flex;
    height: 80%;
    align-items: center;
    border-right: 2px dashed rgb(52, 52, 52);
    background-color: var(--background-cases);
  }
</style>