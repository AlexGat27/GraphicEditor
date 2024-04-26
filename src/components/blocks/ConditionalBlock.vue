<template>
  <div class="conditionCase">
    <SelectBlock :blockTitle="title1" :attributes="mapCondition" 
    @attribute="updateConditionParams('condition', $event)" :current="currentCondition.condition"/>
    <SelectBlock :blockTitle="title2" :attributes="filterCondition.value" 
    @attribute="updateConditionParams('value', $event)" :current="currentCondition.value"/>
    <SelectBlock :blockTitle="title3" :attributes="filterCondition.inputSignal" 
    @attribute="updateConditionParams('inputSignal', $event)" :current="currentCondition.inputSignal"/>
    <InputBlock :blockTitle="title4" @attribute="updateConditionParams('readingPeriod', $event)" :current="currentCondition.readingPeriod"/>
  </div>
</template>

<script>
import InputBlock from './InputBlock.vue';
import SelectBlock from './SelectBlock.vue'

export default {
  components: {SelectBlock, InputBlock},
  data(){
    return {
      title1: "Условие",
      title2: "Значение",
      title3: "Количество входящих сигналов",
      title4: "Период считывания (сек)",
    }
  },
  computed:{
    filterCondition(){
      if (this.conditionAttributes.find(cond => cond.condition == this.currentCondition.condition)){
        return this.conditionAttributes.find(cond => cond.condition == this.currentCondition.condition);
      }
      else {
        return {value: [], inputSignal: [], readingPeriod: []} 
      }
    },
    mapCondition(){
      return this.conditionAttributes.map(cond => cond.condition);
    },
    currentCondition(){
      return this.current
    }
  },
  props: {
    conditionAttributes:{
      type: Array,
      required: true
    },
    current: {
      type: Object,
      required: true,
    }
  },
  methods: {
    updateConditionParams(type, event){
      if (type == 'condition'){
        this.$emit("attribute", {condition: event, value: '', inputSignal: '', readingPeriod: 0})
      }else {
        this.currentCondition[type] = event;
        this.$emit("attribute", this.currentCondition);
      }
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
    background-color: rgb(222, 222, 222);
  }
</style>