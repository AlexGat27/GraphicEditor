<template>
    <div class="toolbox">
      <component v-for="(block, index) in blocks"
      :key="index" @dragstart="onDragStart(index)" :is="getBlockComponent(block.type)"
      :position="block.position" :id="block.id" class="listBlock"/>
    </div>
</template>

<script>
import SendMessage from './ActionBlocks/SendMessage.vue';
import ButtonTrigger from './ConditionalBlocks/ButtonTrigger.vue';


export default {
  components: {
    SendMessage,
    ButtonTrigger
  },
  data() {
    return {
      blocks: [
        { id: -1, type: "time-trigger", position: {x: 0, y: 0}},
        { id: -1, type: "send-message", position: {x: 0, y: 0}},
      ]
    };
  },
  methods: {
    onDragStart(index) {
      const data = JSON.stringify(this.blocks[index]);
      event.dataTransfer.setData('application/json', data);
    },
    getBlockComponent(type) {
      if (type === 'send-message') {
        return SendMessage;
      } else if (type === 'time-trigger') {
        return ButtonTrigger;
      } else {
        return null; // Обработка других типов блоков, если нужно
      }
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
.listBlock{
  position: relative;
  margin: 3%;
  transform: translate(0, 0);
}
</style>