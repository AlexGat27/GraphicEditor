<template>
    <div class="container" @drop="onDrop" @dragover.prevent>
      <div class="blocktype">
        <EventBlock v-for="(block, index) in blocks.event" :key="index" :containerID="containerID" @attribute="updateAttribute(index, 'event', $event)"/>
        <button @click="removeBlock('event')" v-if="blocks.event.length > 0">Удалить</button>
      </div>
      <div class="blocktype">
        <ConditionalBlock v-for="(block, index) in blocks.condition":key="index" :containerID="containerID" @attribute="updateAttribute(index, 'condition', $event)"/>
        <button @click="removeBlock('condition')" v-if="blocks.condition.length > 0">Удалить</button>
      </div>
      <div class="blocktype">
        <ActionBlock v-for="(block, index) in blocks.action" :key="index" :containerID="containerID" @attribute="updateAttribute(index, 'action', $event)"/>
        <button @click="removeBlock('action')" v-if="blocks.action.length > 0">Удалить</button>
      </div>
      <div class="blocktype">
        <ParamsBlock v-for="(block, index) in blocks.param" :key="index" :containerID="containerID" @attribute="updateAttribute(index, 'param', $event)"/>
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
        blocks: {
          action: [],
          event: [],
          condition: [],
          param: []
        }
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
      }
    },
    methods: {
      onDrop(event) {
        // Увеличиваем количество блоков в зависимости от типа блока
        let type = event.dataTransfer.getData('text/plain')
        this.blocks[type].push('');
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
    /* flex-direction: column; */
    margin-top: 1%;
    margin-bottom: 1%;
  }
  button{
    width: 95%;
  }
</style>
  