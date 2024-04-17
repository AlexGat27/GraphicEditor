<template>
  <div style="width: 100%; height: 100%;">
    <div class="editor">
      <div class="counterItem">
        <div v-for="n in currentContour.containers.length" class="containerItem">
          <BlockContainer :contourID="currentContour.contourID" :containerID="n" @containerData="updateDataContour($event, n - 1)"/>
        </div>
        <button @click="currentContour.containers.push({})">Добавить контейнер</button>
        <button @click="currentContour.containers.pop()">Удалить контейнер</button>
        <button @click="exportData()">Экспорт в json</button>
      </div>
    </div>
    <div class="contoursButtons">
      <button @click="switchContour(-1)" class="icon-btn arrow-back"></button>
      <button @click="addContour()">Создать контур</button>
      <p class="countContours">{{ currentContour.contourID + 1 }} / {{ contours.length }}</p>
      <button @click="popContour()">Удалить контур</button>
      <button @click="switchContour(1)" class="icon-btn arrow-forward"></button>
    </div>
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
      contours: [{contourID: 0, containers: []}],
      currentContour: null
    };
  },
  created(){
    this.currentContour = this.contours[0];
  },
  methods: {
    updateDataContour(event, index){
      this.currentContour.containers[index] = event;
    },
    exportData(){
      const jsonData = JSON.stringify(this.contours);
      const blob = new Blob([jsonData], { type: 'application/json' });
      saveAs(blob, 'export.json');
    },
    switchContour(step){
      if (this.currentContour.contourID + step < this.contours.length && step > 0 || this.currentContour.contourID > 0 && step < 0){
        this.currentContour = this.contours[this.currentContour.contourID + step];
      }
    },
    addContour(){
      this.contours.push({id: this.contours.length, containers: []})
    },
    popContour(){
      if (this.contours.length > 1){
        if (this.contours.length - 1 === this.currentContour.contourID) this.currentContour = this.contours[this.contours.length - 2];
        this.contours.pop();
      }
    }
  }
}
</script>

<style scoped>
.editor {
  border: 2px dashed #848484; /* Границы области редактирования */
  width: 100%;
  height: 85%;
  overflow: hidden;
  /* overflow-y: scroll; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3%;
  padding-bottom: 3%;
}
.counterItem{
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.containerItem{
  margin-bottom: 2%;
  margin-top: 2%;
  width: 95%;
  min-height: 20%;
  height: auto;
}
button{
  width: 90%;
  height: 30px;
  margin-top: 2%;
}

.contoursButtons{
  display: flex;
  justify-content: center;
  bottom: 10%;
  width: 100%;
}
.contoursButtons button{
  margin: 2%;
}
.contoursButtons p{
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-btn{
  width: 30px;
  height: 30px;
}
.arrow-back::after{
  content: '\2190';
}
.arrow-forward::after{
  content: '\2192';
}

</style>