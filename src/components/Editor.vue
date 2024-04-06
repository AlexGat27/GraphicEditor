<template>
  <div class="editor" @drop="onDrop" @dragover.prevent>
    <!-- <SendMessage :condition="condition" :position="{x: 100, y: 150}" :style="{left: '100px', top: '300px'}"/>
    <TimeTrigger @toggleCondition="toggleCondition" :position="{x: 300, y: 300}" :style="{left: '100px', top: '300px'}"/> -->
    <component v-for="(block, index) in actionBlocks" 
    :key="index" @dragstart="onDragStart(block)" :is="getBlockComponent(block)" :condition="block.isActive"
    :position="block.position" :style="{left: block.position.x + 'px', top: block.position.y +'px'}"/>
    <component v-for="(block, index) in conditionBlocks" 
    :key="index" @dragstart="onDragStart(block)" :is="getBlockComponent(block)" @toggleCondition="toggleCondition"
    :position="block.position" :style="{left: block.position.x + 'px', top: block.position.y +'px'}"/>
  </div>
</template>

<script>
import SendMessage from './ActionBlocks/SendMessage.vue';
import TimeTrigger from './ConditionalBlocks/TimeTrigger.vue';
import Connection from './Connection.vue';

export default {
  components: {
    SendMessage,
    TimeTrigger,
    Connection
  },
  data() {
    return {
      actionBlocks: [],
      conditionBlocks: []
    };
  },
  methods: {
    toggleCondition(event){
      this.actionBlocks.forEach(block => {
        block.isActive = event;
      });
    },
    onDragStart(block) {
      var data;
      if (block.type === "send-message"){
        data = JSON.stringify(this.actionBlocks[block.id]);
      }else if (block.type === "time-trigger"){
        data = JSON.stringify(this.conditionBlocks[block.id]);
      }
      event.dataTransfer.setData('application/json', data);
    },
    onDrop(event) {
      const dropBlockInfo = JSON.parse(event.dataTransfer.getData('application/json'));
      const editorRect = event.target.getBoundingClientRect();
      const pos = [editorRect.left, editorRect.top, editorRect.left + editorRect.width, editorRect.top + editorRect.height];
      if (!(event.clientX < pos[0] && event.clientY < pos[1] && event.clientX > pos[2] && event.clientY > pos[3])){
        if (dropBlockInfo.id !== -1) {this.moveTargetBlock(dropBlockInfo);}
        else{this.addNewBlock(dropBlockInfo);}
      }
    },
    addNewBlock(dropBlockInfo){
      const droppedBlock = {
        id: dropBlockInfo.id + 1, 
        type: dropBlockInfo.type,
        position: {x: event.clientX, y: event.clientY}
      };
      if (dropBlockInfo.type === "send-message"){
        this.actionBlocks.push(droppedBlock);
      }else if (dropBlockInfo.type === "time-trigger"){
        this.conditionBlocks.push(droppedBlock);
      }
    },
    moveTargetBlock(dropBlockInfo){
      console.log(dropBlockInfo)
      if (dropBlockInfo.type === "send-message"){
        this.actionBlocks[dropBlockInfo.id].position = {x: event.clientX, y: event.clientY};
      }else if (dropBlockInfo.type === "time-trigger"){
        this.conditionBlocks[dropBlockInfo.id].position = {x: event.clientX, y: event.clientY};
      }
    },
    getBlockComponent(block) {
      if (block.type === 'send-message') {
        return SendMessage
      } else if (block.type === 'time-trigger') {
        return TimeTrigger
      } else {
        return null; // Обработка других типов блоков, если нужно
      }
    }
  }
}
</script>

<style scoped>
.editor {
  border: 2px dashed #848484; /* Границы области редактирования */
  width: 80%;
  height: 100%;
  overflow: hidden;
}
</style>