<template>
    <div class="scenarioBar">
      <div class="leftPart">
        <div style="width: 15px; margin-left: 5px;"></div>
        <h3 style="margin-left: 25px; margin-right: 25px;">MotoCan</h3>
        <div>Сценарий</div>
      </div>
      <div class="rightPart">
        <button style="background-color: white; color: black;" @click="addContainer()">Добавить правило</button>
        <button style="background-color: white; color: black;">SaveScenario</button>
      </div>
    </div>
  </template>
  
<script>
import { ContainerModel } from '@/models/interfaces/compileModel';
import { useMainStore } from '@/store';

export default {
  created(){
    this.store = useMainStore();
  },
  computed:{
    currentModel: {
      get(){
        return this.store.currentModel;
      },
      set(value){
        this.store.setCurrentModel(value);
      }
    }
  },
  methods:{
    addContainer(){
      const currentModel = this.currentModel;
      if (currentModel.contours.find(contour => contour.selected && contour.name !== '')){
        currentModel.contours.find(contour => contour.selected && contour.name !== '').containers.push(new ContainerModel())
      }
      this.currentModel = currentModel;
    }
  }
}
</script>
  
<style scoped>
.scenarioBar{
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-toolbox-scenario);
}
.leftPart{
  width: 20%;
  display: inherit;
  align-items: center;
  position: relative;
}
.rightPart{
  width: 30%;
  justify-content: space-around;
  display: inherit;
  align-items: center;
}

</style>