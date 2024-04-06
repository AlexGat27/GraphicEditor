<template>
  <div class="editor" @drop="onDrop" @dragover.prevent>
    <component v-for="(block, index) in actionBlocks" 
    :key="index" @dragstart="onDragStart(block)" :is="getBlockComponent(block)" :condition="block.isActive"
    :position="block.position" :id="block.id" :style="{left: block.position.x + 'px', top: block.position.y +'px'}"/>
    <component v-for="(block, index) in conditionBlocks" 
    :key="index" @dragstart="onDragStart(block)" :is="getBlockComponent(block)" :id="block.id"
    @toggleCondition="toggleCondition($event, index)"
    @updateConnection="updateConnection($event, index)"
    :position="block.position" :style="{left: block.position.x + 'px', top: block.position.y +'px'}"/>
  </div>
</template>

<script>
import SendMessage from './ActionBlocks/SendMessage.vue';
import ButtonTrigger from './ConditionalBlocks/ButtonTrigger.vue';
import Connection from './Connection.vue';

export default {
  components: {
    SendMessage,
    ButtonTrigger,
    Connection
  },
  data() {
    return {
      actionBlocks: [],
      conditionBlocks: [],
    };
  },
  methods: {
    toggleCondition(event, index){
      this.conditionBlocks[index].connectionIDs.forEach(id => {
        if (this.actionBlocks[id] !== undefined)
          this.actionBlocks[id].isActive = event;
      });
    },
    updateConnection(event, index){
      this.conditionBlocks[index].connectionIDs = event;
    },
    onDragStart(block) {
      const editorBlocks = this.getBlockList(block);
      const data = JSON.stringify(editorBlocks[block.id]);
      event.dataTransfer.setData('application/json', data);
    },
    onDrop(event) {
      const dropBlockInfo = JSON.parse(event.dataTransfer.getData('application/json'));
      const editorRect = event.target.getBoundingClientRect();
      const pos = [editorRect.left, editorRect.top, editorRect.left + editorRect.width, editorRect.top + editorRect.height];
      if (!(event.clientX < pos[0] && event.clientY < pos[1] && event.clientX > pos[2] && event.clientY > pos[3])){
        const clientPos = {x: event.clientX, y: event.clientY};
        if (dropBlockInfo.id !== -1) {this.moveTargetBlock(dropBlockInfo, clientPos);}
        else{this.addNewBlock(dropBlockInfo, clientPos);}
      }
      console.log(this.actionBlocks)
    },
    addNewBlock(dropBlockInfo, clientPos){
      const editorBlocks = this.getBlockList(dropBlockInfo);
      const droppedBlock = {
        id: editorBlocks.length, 
        type: dropBlockInfo.type,
        position: {x: clientPos.x, y: clientPos.y},
        connectionIDs: []
      };
      editorBlocks.push(droppedBlock);
    },
    moveTargetBlock(dropBlockInfo, clientPos){
      const editorBlocks = this.getBlockList(dropBlockInfo);
      editorBlocks[dropBlockInfo.id].position = {x: clientPos.x, y: clientPos.y};
    },
    getBlockComponent(block) {
      if (block.type === 'send-message') {
        return SendMessage
      } else if (block.type === 'time-trigger') {
        return ButtonTrigger
      } else {
        return null; // Обработка других типов блоков, если нужно
      }
    },
    getBlockList(block) {
      if (block.type === 'send-message') {
        return this.actionBlocks
      } else if (block.type === 'time-trigger') {
        return this.conditionBlocks
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