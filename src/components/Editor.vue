<template>
  <div class="editor">
    <div v-for="n in dataContainers.length" class="containerItem"><BlockContainer :containerID="n" @containerData="updateDataContainers($event, n - 1)"/></div>
    <button @click="dataContainers.push({})">Добавить контейнер</button>
    <button @click="dataContainers.pop()">Удалить контейнер</button>
    <button @click="exportData()">Экспорт в json</button>
  </div>
</template>

<script>
import BlockContainer from './BlockContainer.vue';
import { saveAs } from 'file-saver';

export default {
  components: {
    BlockContainer
  },
  data() {
    return {
      dataContainers: []
    };
  },
  methods: {
    updateDataContainers(event, index){
      this.dataContainers[index] = event;
    },
    exportData(){
      const jsonData = JSON.stringify(this.dataContainers);
      const blob = new Blob([jsonData], { type: 'application/json' });
      saveAs(blob, 'export.json');
    }
  }
}
</script>

<style scoped>
.editor {
  border: 2px dashed #848484; /* Границы области редактирования */
  width: 80%;
  height: 90%;
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3%;
  padding-bottom: 3%;
}
.containerItem{
  margin-bottom: 2%;
  margin-top: 2%;
  width: 95%;
  min-height: 10%;
}
button{
  width: 90%;
  height: 30px;
  margin-top: 2%;
}
</style>