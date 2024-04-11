<template>
    <div class="toolbox">
      <ActionBlock :containerID="-1" draggable="true" @dragstart="onDragstart($event, 'action')"/>
      <ConditionalBlock :containerID="-1" draggable="true" @dragstart="onDragstart($event, 'condition')"/>
      <EventBlock :containerID="-1" draggable="true" @dragstart="onDragstart($event, 'event')"/>
      <ParamsBlock :containerID="-1" draggable="true" @dragstart="onDragstart($event, 'param')"/>
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
  methods: {
    onDragstart(event, type){
      event.dataTransfer.setData('text/plain', type);
    }
  }
}
</script>

<style scoped>
.toolbox {
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>