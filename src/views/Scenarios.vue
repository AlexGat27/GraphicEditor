<template>
    <div class="scenario-view">
      <h1>Список сценариев</h1>
      <ul>
        <li v-for="scenario in scenarios" :key="scenario.id" @click="selectModel(scenario)"
        :class="{ selected: selectedScenario === scenario.id }" @dblclick="showUpdatePanel = true">
          <h3 style="margin: 5px;">{{ scenario.name }}</h3>
          <p style="margin: 5px;">{{ scenario.model_attributes.scenario }}</p>
          <div id="deleteScenario" class="closeIcon" @click.stop="deleteScenario(scenario.id)"></div>
        </li>
        <div class="circle" @click="showCreatePanel = true">+</div>
      </ul>  
      <CreateScenario :action="'Добавить новый'" v-if="showCreatePanel" @close="showCreatePanel = false" @create="addScenario"/>
      <CreateScenario :action="'Обновить'" v-if="showUpdatePanel" @close="showUpdatePanel = false" @create="updateScenario"/>
      <div id="exitPage" class="closeIcon" @click="exitPage"></div>
    </div>
  </template>
  
  <script>
import { scenarioApi } from '@/services/api';
import CreateScenario from '../components/shared/CreateScenario.vue'
import { useMainStore } from '@/stores/modelStore';
import { CompileModel } from '@/models/interfaces/compileModel';
  export default {
    data() {
      return {
        scenarios: [],
        showCreatePanel: false,
        showUpdatePanel: false,
        selectedScenario: null
      };
    },
    async created(){
      this.modelStore = useMainStore();
      if (this.modelStore.currentModel) this.selectedScenario = this.modelStore.currentModel.scenario_id;
      await this.fetchScenarios();
    },
    components: {CreateScenario},
    methods: {
      async fetchScenarios() {
        try {
          const response = await scenarioApi.getScenarios();
          this.scenarios = response.data;
          if (this.modelStore.currentModel) this.selectedScenario = this.modelStore.currentModel.scenario_id;
        } catch (error) {
          console.error('Ошибка при загрузке сценариев:', error);
        }
      },
      async deleteScenario(id) {
        try {
          await scenarioApi.deleteScenario(id);
          this.scenarios = this.scenarios.filter(scenario => scenario.id !== id);
        } catch (error) {
          console.error('Ошибка при удалении сценария:', error);
        }
      },
      async addScenario(scenario) {
        try {
          const response = await scenarioApi.addScenario(scenario);
          this.scenarios.push(response.data);
          this.showCreatePanel = false;
        } catch (error) {
          console.error('Ошибка при добавлении сценария:', error);
        }
      },
      async updateScenario(scenarioData){
        try {
          const response = await scenarioApi.updateScenario(this.selectedScenario, scenarioData);
          const updatedScenario = response.data;
          this.scenarios = this.scenarios.filter(scenario => scenario.id !== updatedScenario.id);
          this.scenarios.push(updatedScenario);
          this.showUpdatePanel = false;
        } catch (error) {
          console.error('Ошибка при обновлении сценария:', error);
        }
      },
      async selectModel(scenario){
        this.selectedScenario = scenario.id;
        this.modelStore.setModelAttributes(scenario.model_attributes);
        if (scenario.jsonData) this.modelStore.setCurrentModel(scenario.jsonData);
        else this.modelStore.setCurrentModel(new CompileModel(scenario.id, scenario.name));
      },
      exitPage(){
        this.$router.push('/');
      }
    },
  };
  </script>
  
<style scoped>
  .scenario-view{
    width: 90%; height: 90%; text-align: center;
  }
  ul{
    width: 100%;
    display: flex;
    align-items: center;
    list-style-type: none;
    padding: 0;
  }
  ul li{
    width: 150px;
    height: 100px;
    border: 1px solid var(--contour-elements);
    text-align: start;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    margin: 15px;
    cursor: pointer;
    z-index: 1002;
  }
  ul li.selected {
    border-color: white; /* Цвет рамки при подсветке */
  }
  .closeIcon {
    position: absolute;
    background-color: transparent;
    border: 1px solid var(--contour-elements); /* Цвет рамки */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    z-index: 1003;
  }

.closeIcon::before,
.closeIcon::after {
  content: '';
  position: absolute;
  background-color: var(--contour-elements); /* Цвет палочек крестика */
}

.closeIcon::before {
  transform: rotate(45deg); /* Первая палочка крестика */
}
.closeIcon::after {
  transform: rotate(-45deg); /* Вторая палочка крестика */
}
#deleteScenario{
  bottom:5px; right: 5px;
  width: 25px; /* Ширина квадрата */
  height: 25px; /* Высота квадрата */
}
#deleteScenario::before, #deleteScenario::after{
  width: 20px; /* Ширина палочек крестика */
  height: 1px; /* Высота палочек крестика */
}
#exitPage{
  top:25px; right: 25px;
  width: 50px; /* Ширина квадрата */
  height: 50px; /* Высота квадрата */
}
#exitPage::before, #exitPage::after{
  width: 25px; /* Ширина палочек крестика */
  height: 3px; /* Высота палочек крестика */
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid var(--contour-elements);
  color: var(--contour-elements);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  cursor: pointer;
  margin: 15px;
}
</style>