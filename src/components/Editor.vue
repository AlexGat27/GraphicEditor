<template>
  <div class="editor" @drop="onDrop" @dragover.prevent>
    <component v-for="(block, index) in editorBlocks" 
    :key="index" @dragstart="onDragStart(index)" :is="getBlockComponent(block.type)"
    :position="block.position" :style="{left: block.position.x + 'px', top: block.position.y +'px'}"/>
  </div>
</template>

<script>
import SendMessage from './ActionBlocks/SendMessage.vue';
import TimeTrigger from './ConditionalBlocks/TimeTrigger.vue';

export default {
  components: {
    SendMessage,
    TimeTrigger
  },
  data() {
    return {
      editorBlocks: [],
    };
  },
  methods: {
    onDragStart(index) {
      const data = JSON.stringify(this.editorBlocks[index]);
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
        id: this.editorBlocks.length + 1, 
        type: dropBlockInfo.type,
        position: {x: event.clientX, y: event.clientY}
      };
      this.editorBlocks.push(droppedBlock);
    },
    moveTargetBlock(dropBlockInfo){
      this.editorBlocks.splice(dropBlockInfo.id - 1, 1);
      const droppedBlock = {
        id: dropBlockInfo.id, 
        type: dropBlockInfo.type,
        position: {x: event.clientX, y: event.clientY}
      };
      this.editorBlocks.splice(droppedBlock.id - 1, 0, droppedBlock);
    },
    getBlockComponent(type) {
      if (type === 'send-message') {
        return SendMessage;
      } else if (type === 'time-trigger') {
        return TimeTrigger;
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