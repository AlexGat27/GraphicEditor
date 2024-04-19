<template>
    <div class="toolbox">
      <ActionBlock :containerID="-1" draggable="true" @dragstart="onDragstart($event, 'action')" :actions="model.actions || []"/>
      <ConditionalBlock :containerID="-1" draggable="true" @dragstart="onDragstart($event, 'condition')" :conditions="model.conditions || []"/>
      <EventBlock :containerID="-1" draggable="true" @dragstart="onDragstart($event, 'event')" :events="model.events || []"/>
      <ParamsBlock :containerID="-1" draggable="true" @dragstart="onDragstart($event, 'param')" :params="model.params || []"/>
      <ChangeModel @model="updateModel($event)" id="changeModel"/>
    </div>
</template>

<script>
import ActionBlock from './blocks/ActionBlock.vue';
import ConditionalBlock from './blocks/ConditionalBlock.vue';
import EventBlock from './blocks/EventBlock.vue';
import ParamsBlock from './blocks/ParamsBlock.vue';
import ChangeModel from './ChangeModel.vue';

export default {
  components: {
    ActionBlock,
    ConditionalBlock,
    ParamsBlock,
    EventBlock,
    ChangeModel
  },
  data(){
    return {
      model: {}
    }
  },
  methods: {
    onDragstart(event, type){
      const sendData = {
        type: type,
        attributes: this.model
      }
      event.dataTransfer.setData('model/attributes', JSON.stringify(sendData));
    },
    updateModel(event){
      this.model = event;
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
#changeModel{
  
}
</style>