<template>
    <div class="scenarioBar">
      <div class="leftPart">
        <span style="margin: 0; margin-left: 10px; font-size: 20px; color: var(--yellow-text); font-weight: bold;">&equiv;</span>
        <h3 style="margin-left: 25px; margin-right: 25px; color: var(--yellow-text); font-size: 16px;" class="fira-sans-medium">MotoCan</h3>
        <div>Сценарий</div>
      </div>
      <div class="rightPart fira-sans-regular" style="font-size: 12px;">
        <button  @click="addContainer()">Добавить правило</button>
        <button @click="saveScenario()">SaveScenario</button>
        <span style="margin: 0;margin-right: 20px; font-size: 35px; color: var(--yellow-text); 
        font-weight: bold; transform: translateY(-10px);">&hellip;</span>
      </div>
    </div>
  </template>
  
<script>
import { ContainerModel } from '@/models/interfaces/compileModel';
import { useMainStore } from '@/store';
import { FileCreator } from '@/services/fileCreator';

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
      const potentialContour = currentModel.contours.find(contour => contour.selected && contour.name !== '');
      if (potentialContour && potentialContour.containers.length < 5){
        potentialContour.containers.push(new ContainerModel())
      }
      this.currentModel = currentModel;
      console.log(currentModel)
    },
    saveScenario(){
      let isNullValues = false;
      let compileModel = {countContainers: 0, ...this.currentModel}
      compileModel.contours.forEach(contour => {
        contour.containers.forEach(container => {
          container.conditionCases.forEach(attr => {
            if (attr.condition === '' || attr.value === '' || attr.countSignals === '' || 
            attr.delay.type === '' || attr.delay.value === ''){
              console.error("Не все поля условия заполнены");
              isNullValues = true;
              return;
            }
          })
          container.actionCases.forEach(attr => {
            if (attr.action === '' || attr.power === '' || (attr.action === 'Мигать' && (attr.interruption === '' || attr.workingPeriod === ''))){
              console.error("Не все поля действия заполнены");
              isNullValues = true;
              return;
            }
          })
          if (isNullValues) return;
        });
        compileModel.countContainers += contour.containers.length;
        if (isNullValues) return;
      });
      if (isNullValues) return;
      const fileCreator = new FileCreator('compile.txt')
      fileCreator.saveTxtFile(compileModel);
    }
  }
}
</script>
  
<style scoped>
.scenarioBar{
  height: 100%;
  width: 100%;
  min-width: 600px;
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