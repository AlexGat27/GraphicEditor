<template>
    <div class="container">
      <ConditionalBlock @attribute="updateAttribute('conditionAttributes', $event)" :current="blocks.conditionAttributes"
      :conditionAttributes="model.conditionAttributes"/>
      <ActionBlock @attribute="updateAttribute('actionAttributes', $event)" :current="blocks.actionAttributes"
      :actionAttributes="model.actionAttributes"/>
      <ParamsBlock @attribute="updateAttribute('paramAttributes', $event)" :current="blocks.paramAttributes"/>
    </div>
  </template>
  
<script>
import ActionBlock from './blocks/ActionBlock.vue';
import ConditionalBlock from './blocks/ConditionalBlock.vue';
import ParamsBlock from './blocks/ParamsBlock.vue';
  
export default {
  components: {
    ActionBlock,
    ConditionalBlock,
    ParamsBlock,
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
    updateAttribute(type, event){
      this.blocks[type] = event;
      this.$emit('containerData', this.blocks);
    },
  }
};
</script>
  
<style scoped>
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: scroll;
    border: 1px solid black;
  }
  button{
    width: 95%;
  }
</style>
  