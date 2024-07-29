<template>
    <div class="scenarioBar">
      <div class="leftPart">
        <span @click="toggleSidebar">&equiv;</span>
        <h3 style="margin-left: 25px; margin-right: 25px; color: var(--yellow-text); font-size: 16px;" class="fira-sans-medium">MotoCan</h3>
        <div>{{currentModel ? currentModel.scenario : "Не выбран сценарий"}}</div>
      </div>
      <div class="rightPart fira-sans-regular" style="font-size: 12px;">
        <button :disabled="!isAuthenticated" class="fira-sans-regular" @click="addContainer()">Добавить правило</button>
        <button :disabled="!isAuthenticated" class="fira-sans-regular" @click="saveScenario()">Выгрузить сценарий</button>
        <span style="margin: 0;margin-right: 20px; font-size: 35px; color: var(--yellow-text); 
        font-weight: bold; transform: translateY(-10px);">&hellip;</span>
      </div>
    </div>
    <Sidenav v-if="isSidebarOpen" @close="toggleSidebar" />
  </template>
  
<script>
import { ContainerModel } from '@/models/compileModel';
import { useMainStore } from '@/stores/modelStore';
import Sidenav from '../shared/Sidenav.vue';
import { useAuthStore } from '@/stores/authStore';
import { scenarioApi } from '@/services/api';
import { ActionParams } from '@/models/attributeEnums';

export default {
  components: {
    Sidenav
  },
  data() {
    return {
      isSidebarOpen: false
    };
  },
  created(){
    this.store = useMainStore();
    this.authStore = useAuthStore();
  },
  computed:{
    currentModel: {
      get(){
        return this.store.currentModel;
      },
      set(value){
        this.store.setCurrentModel(value);
      }
    },
    isAuthenticated(){
      return this.authStore.isAuthenticated;
    },
  },
  methods:{
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    addContainer(){
      const currentModel = this.currentModel;
      const potentialContour = currentModel.contours.find(contour => contour.selected && contour.name !== '');
      if (potentialContour && potentialContour.containers.length < 5){
        potentialContour.containers.push(new ContainerModel())
      }
      this.currentModel = currentModel;
    },
    async saveScenario(){
      let isNullValues = false;
      const compileModel = this.store.getFormattedCurrentModel();
      compileModel.countContainers = 0;
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
            if (attr.action === ActionParams.EMPTY || attr.power === '' || (attr.action === ActionParams.BLINK && (attr.interruption === '' || attr.workingPeriod === ''))){
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
      const requestData = {jsonData: compileModel};
      const response = await scenarioApi.updateScenario(compileModel.scenario_id, requestData);
      console.log(response);
      console.log(this.currentModel);
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
.leftPart span{
  margin: 0; margin-left: 10px; font-size: 20px; color: var(--yellow-text); font-weight: bold; cursor: pointer;
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