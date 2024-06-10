<template>
  <div style="width: 100%; height: 100%;">
    <div class="editorfield">
      <div class="counterItem">
        <div v-for="container in currentContour.containers" class="containerItem">
          <CaseContainer @containerData="updateDataContour($event, container)" :model="model" :blocks="container"/>
        </div>
        <div class="containerButtons">
          <button @click="addContainer()">&plus;</button>
          <button @click="currentContour.containers.pop()">&minus;</button>
        </div>
      </div>
    </div>
    <div class="contoursButtons">
      <button @click="switchContour(-1)" class="icon-btn arrow-back"></button>
      <button @click="addContour()">Создать контур</button>
      <p class="countContours">{{ currentContour.contourID + 1 }} / {{ contours.length }}</p>
      <button @click="popContour()">Удалить контур</button>
      <button @click="switchContour(1)" class="icon-btn arrow-forward"></button>
      <button @click="exportData()">Компиляция</button>
    </div>
  </div>
</template>

<script>
import CaseContainer from './CaseContainer.vue';
import { FileCreator } from '@/services/fileCreator';

export default {
  components: {
    CaseContainer
  },
  props:{
    model: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      // digitalPins: [4, 5, 6, 7, 8, 9, 10, 11],
      contours: [{contourID: 0, digitalPin: 0, containers: []}],
      currentContour: {contourID: 0, digitalPin: 0, containers: []},
      defaultContainer: {
        conditionAttributes: [{condition: '', value: '', inputSignal: '', spCanInterval: ''}],
        actionAttributes: [{action: '', interrupedTime: '', cyclePeriod: '', power: 0}],
      },
    };
  },
  computed:{
    filterDigitalPins(){
      return this.digitalPins.filter(
        pin => !this.contours.some(contour => contour.digitalPin === pin && contour.contourID !== this.currentContour.contourID)
      )
    }
  },
  created(){
    let newContainer = JSON.parse(JSON.stringify(this.defaultContainer))
    this.contours.containers = [newContainer];
    this.currentContour = this.contours[0];
  },
  watch: {
    model: {
      deep: true, // следить за изменениями вложенных свойств
      handler(newVal, oldVal) {
        console.log('Модель была изменена', newVal, oldVal);
        let newContainer = JSON.parse(JSON.stringify(this.defaultContainer))
        this.contours = [{contourID: 0, containers: []}],
        this.contours.containers = [newContainer];
        this.currentContour = this.contours[0];
      }
    }
  },
  methods: {
    updateDataContour(event, container){
      container = event;
    },
    exportData(){
      let modelData = {name: this.model.name, contours: JSON.parse(JSON.stringify(this.contours))};
      let countContainers = 0;
      let isNullValues = false;
      modelData.contours.forEach(contour => {
        // contour.digitalPin = parseInt(contour.digitalPin);
        contour.containers.forEach(container => {
          container.countConditions = container.conditionAttributes.length;
          container.conditionAttributes.forEach(attr => {
            if (attr.condition === '' || attr.value === '' || attr.inputSignal === '' || attr.spCanInterval === ''){
              console.error("Не все поля условия заполнены");
              isNullValues = true;
              return;
            }
            if (parseInt(attr.value)) attr.value = parseInt(attr.value)
            if (parseInt(attr.inputSignal)) attr.inputSignal = parseInt(attr.inputSignal)
          })
          container.actionAttributes.forEach(attr => {
            if (attr.action === '' || (attr.action === 'Мигание' && (attr.interrupedTime === '' || attr.cyclePeriod === ''))){
              console.error("Не все поля действия заполнены");
              isNullValues = true;
              return;
            }
            if (parseInt(attr.interrupedTime)) attr.interrupedTime = parseInt(attr.interrupedTime)
            if (parseInt(attr.cyclePeriod)) attr.cyclePeriod = parseInt(attr.cyclePeriod)
          })
          if (isNullValues) return;
          countContainers+=1;
        });
        if (isNullValues) return;
      });
      if (isNullValues) return;
      const fileCreator = new FileCreator('compile.txt')
      modelData.countContainers = countContainers;
      fileCreator.saveTxtFile(modelData);
    },
    addContainer(){
      let newContainer = JSON.parse(JSON.stringify(this.defaultContainer))
      this.currentContour.containers.push(newContainer)
    },
    switchContour(step){
      if (this.currentContour.contourID + step < this.contours.length && step > 0 || this.currentContour.contourID > 0 && step < 0){
        this.currentContour = this.contours[this.currentContour.contourID + step];
      }
    },
    addContour(){
      if (this.contours.length < 8) this.contours.push({contourID: this.contours.length,digitalPin: 0, containers: []})
    },
    popContour(){
      if (this.contours.length > 1){
        if (this.contours.length - 1 === this.currentContour.contourID) this.currentContour = this.contours[this.currentContour.contourID - 1];
        this.contours.pop();
      }
    }
  }
}
</script>

<style scoped>
.editorfield {
  border: 2px dashed #848484; /* Границы области редактирования */
  width: 100%;
  height: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.counterItem{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.containerItem{
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  min-height: 150px;
  max-height: 300px;
  width: 100%;
}
.containerButtons{
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: center;
}
.containerButtons button{
  font-size: 30px;
  text-align: center;
  padding: 0px;
  min-width: 50px;
  min-height: 50px;
  margin: 1%;
  border-radius: 50%;
  border: none;
  background-color: rgb(212, 212, 255);
}

.contoursButtons{
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 10%;
  width: 100%;
}
.contoursButtons button, .contoursButtons div{
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

.digitalPin{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 15%;
}
.digitalPin select{
  margin-top: 5%;
  width: 90%;
}
</style>