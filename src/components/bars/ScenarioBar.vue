<template>
    <div class="scenarioBar">
      <div class="leftPart">
        <span style="margin: 0; margin-left: 10px; font-size: 20px; color: var(--yellow-text); font-weight: bold;">&equiv;</span>
        <h3 style="margin-left: 25px; margin-right: 25px; color: var(--yellow-text)">MotoCan</h3>
        <div>Сценарий</div>
      </div>
      <div class="rightPart">
        <button  @click="addContainer()">Добавить правило</button>
        <button >SaveScenario</button>
        <span style="margin: 0;margin-right: 20px; font-size: 20px; color: var(--yellow-text); 
        font-weight: bold; transform: translateY(-5px);">&hellip;</span>
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
        console.log(currentModel)
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
  justify-content: end;
  display: inherit;
  align-items: center;
}
.rightPart button {
  background-color: #d9d9d9; color: black; margin-right: 20px;
  border-radius: 5px; height: 30px;
  cursor: pointer;
}

</style>