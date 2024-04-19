<template>
    <div class="container" @drop="onDrop" @dragover.prevent>
      <div class="blocktype">
        <EventBlock v-for="(block, index) in blocks.event" :key="index" 
        :containerID="containerID" @attribute="updateAttribute(index, 'event', $event)"
        :events="model.events"/>
        <button @click="removeBlock('event')" v-if="blocks.event.length > 0">Удалить</button>
      </div>
      <div class="blocktype">
        <ConditionalBlock v-for="(block, index) in blocks.condition":key="index" 
        :containerID="containerID" @attribute="updateAttribute(index, 'condition', $event)"
        :conditions="model.conditions"/>
        <button @click="removeBlock('condition')" v-if="blocks.condition.length > 0">Удалить</button>
      </div>
      <div class="blocktype">
        <ActionBlock v-for="(block, index) in blocks.action" :key="index" 
        :containerID="containerID" @attribute="updateAttribute(index, 'action', $event)"
        :actions="model.actions"/>
        <button @click="removeBlock('action')" v-if="blocks.action.length > 0">Удалить</button>
      </div>
      <div class="blocktype">
        <ParamsBlock v-for="(block, index) in blocks.param" :key="index" 
        :containerID="containerID" @attribute="updateAttribute(index, 'param', $event)"
        :params="model.params"/>
        <button @click="removeBlock('param')" v-if="blocks.param.length > 0">Удалить</button>
      </div>
    </div>
  </template>
  
<script>
import ActionBlock from './blocks/ActionBlock.vue';
import ConditionalBlock from './blocks/ConditionalBlock.vue';
import EventBlock from './blocks/EventBlock.vue';
import ParamsBlock from './blocks/ParamsBlock.vue';
  
  export default {
    components: {
      ActionBlock,
      ConditionalBlock,
      ParamsBlock,
      EventBlock
    },
    data(){
      return {
        model: null
      }
    },
    props:{
      containerID: {
        type: Number,
        required: true
      },
      contourID:{
        type: Number,
        required: true
      },
      blocks:{
        type: Object,
        required: true
      }
    },
    created(){
      console.log(this.blocks)
    },
    methods: {
      onDrop(event) {
        // Увеличиваем количество блоков в зависимости от типа блока
        let parseData = JSON.parse(event.dataTransfer.getData('model/attributes'))
        this.model = parseData.attributes;
        console.log(this.model)
        this.blocks[parseData.type].push('');
      },
      removeBlock(type){
        this.blocks[type].pop();
      },
      updateAttribute(index, type, event){
        this.blocks[type][index] = event;
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
    border: 1px solid black;
  }
  .blocktype{
    width: 25%;
    height: 100%;
    display: block;
    text-align: center;
    margin-top: 1%;
    margin-bottom: 1%;
  }
  button{
    width: 95%;
  }
</style>
  