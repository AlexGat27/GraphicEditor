<template>
    <div class="container">
        <div class="cases">
          <ConditionalBlock  v-for="(block, index) in blocks.conditionAttributes" :key="index"
          @attribute="updateAttribute('conditionAttributes', index, $event)" 
          :current="block" :conditionAttributes="model.conditionAttributes"/>
          <div class="сaseBtnBlock">
            <button class="сaseBtn" @click="addCase('conditionAttributes')">Добавить условие</button>
            <button class="сaseBtn" @click="removeCase('conditionAttributes')">Удалить условие</button>
          </div>
        </div>
        <div class="cases">
          <ActionBlock v-for="(block, index) in blocks.actionAttributes" :key="index"
          @attribute="updateAttribute('actionAttributes', index, $event)" 
          :current="block" :actionAttributes="model.actionAttributes"/>
          <div class="сaseBtnBlock">
            <button class="сaseBtn" @click="addCase('actionAttributes')">Добавить действие</button>
            <button class="сaseBtn" @click="removeCase('actionAttributes')">Удалить действие</button>
          </div>
        </div>
    </div>
  </template>
  
<script>
import ActionBlock from './blocks/ActionBlock.vue';
import ConditionalBlock from './blocks/ConditionalBlock.vue';
  
export default {
  components: {
    ActionBlock,
    ConditionalBlock,
  },
  data(){
    return {
      startAttributes: {
        actionAttributes: {action: '', actionType: '', interrupedTime: '', cyclePeriod: '', power: 0},
        conditionAttributes: {condition: '', value: '', inputSignal: '', spCanInterval: ''}
      }
    }
  },
  props:{
    model:{
      type: Object,
      required: true
    },
    blocks:{
      type: Object,
      required: true
    }
  },
  methods: {
    updateAttribute(type,index, event){
      this.blocks[type][index] = event;
      this.$emit('containerData', this.blocks);
    },
    addCase(type){
      let attributes = JSON.parse(JSON.stringify(this.startAttributes[type]))
      this.blocks[type].push(attributes)
    },
    removeCase(type){
      if (this.blocks[type].length > 1)
        this.blocks[type].pop()
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
    border: 1px solid black;
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
  