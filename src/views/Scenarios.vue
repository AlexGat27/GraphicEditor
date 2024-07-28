<template>
    <div class="scenario-view">
      <h1>Список сценариев</h1>
      <ul>
        <li v-for="scenario in scenarios" :key="scenario.id" @click="selectModel(scenario)"
        :class="{ selected: selectedScenario === scenario.id }" @dblclick="exitPage">
          <h3 style="margin: 5px;">{{ scenario.name }}</h3>
          <p style="margin: 5px;">{{ scenario.model.name }}</p>
          <div id="deleteScenario" class="btnIcon" @click.stop="showConfirmModal = true; selectedScenario = scenario.id"></div>
          <img id="editScenario" src="@/assets/icons/pencil.png" @click.stop="editScenario(scenario)" alt="Edit">
        </li>
        <div class="circle" @click="showCreatePanel = true">+</div>
        
      </ul>  
      <CreateScenario :action="'Добавить новый'" v-if="showCreatePanel" @close="showCreatePanel = false" @create="addScenario"/>
      <CreateScenario :action="'Обновить'" v-if="showUpdatePanel" @close="showUpdatePanel = false" @create="updateScenario"/>
      <ConfirmModal :message="'Точно хотите удалить сценарий?'" :isVisible="showConfirmModal"
        @confirm="deleteScenario" @cancel="showConfirmModal = false" />
      <div id="exitPage" class="btnIcon" @click="exitPage"></div>
    </div>
  </template>
  
  <script>
import { scenarioApi } from '@/services/api';
import CreateScenario from '../components/shared/CreateScenario.vue'
import { useMainStore } from '@/stores/modelStore';
import { CompileModel } from '@/models/compileModel';
import { ScenarioResponse } from '@/models/responses';
import ConfirmModal from '@/components/shared/ConfirmModal.vue';
  export default {
    data() {
      return {
        scenarios: [],
        showCreatePanel: false,
        showUpdatePanel: false,
        showConfirmModal: false,
        selectedScenario: null
      };
    },
    async created(){
      this.modelStore = useMainStore();
      if (this.modelStore.currentModel) this.selectedScenario = this.modelStore.currentModel.scenario_id;
      await this.fetchScenarios();
    },
    components: {CreateScenario, ConfirmModal},
    methods: {
      async fetchScenarios() {
        try {
          const response = await scenarioApi.getScenarios();
          response.data.forEach(element => {
            this.scenarios.push(new ScenarioResponse(element))
          });
          console.log(this.scenarios)
          if (this.modelStore.currentModel) this.selectedScenario = this.modelStore.currentModel.scenario_id;
        } catch (error) {
          console.error('Ошибка при загрузке сценариев:', error);
        }
      },
      async deleteScenario() {
        try {
          await scenarioApi.deleteScenario(this.selectedScenario);
          this.scenarios = this.scenarios.filter(scenario => scenario.id !== this.selectedScenario);
          this.selectedScenario = null;
          this.showConfirmModal = false;
        } catch (error) {
          console.error('Ошибка при удалении сценария:', error);
        }
      },
      async addScenario(scenario) {
        try {
          const response = await scenarioApi.addScenario(scenario);
          this.scenarios.push(new ScenarioResponse(response.data));
          this.showCreatePanel = false;
        } catch (error) {
          console.error('Ошибка при добавлении сценария:', error);
        }
      },
      async updateScenario(scenarioData){
        try {
          const response = await scenarioApi.updateScenario(this.selectedScenario, scenarioData);
          console.log(response.data)
          const updatedScenario = new ScenarioResponse(response.data);
          this.scenarios = this.scenarios.filter(scenario => scenario.id !== updatedScenario.id);
          this.scenarios.push(updatedScenario);
          this.showUpdatePanel = false;
        } catch (error) {
          console.error('Ошибка при обновлении сценария:', error);
        }
      },
      async selectModel(scenario){
        console.log(scenario)
        this.selectedScenario = scenario.id;
        this.modelStore.setCanCommands(scenario.model.canCommands);
        if (scenario.jsonData) this.modelStore.setCurrentModel(scenario.jsonData);
        else this.modelStore.setCurrentModel(new CompileModel(scenario.id, scenario.name));
      },
      editScenario(scenario) {
        this.selectedScenario = scenario.id;
        this.showUpdatePanel = true;
      },
      exitPage(){
        this.$router.push('/');
      }
    },
  };
  </script>
  
  <style scoped>
  .scenario-view {
    width: 90%; 
    height: 90%; 
    text-align: center;
  }
  ul {
    width: 100%;
    display: flex;
    align-items: center;
    list-style-type: none;
    padding: 0;
  }
  ul li {
    max-width: 250px;
    min-width: 100px;
    max-height: 200px;
    min-height: 100px;
    border: 1px solid var(--contour-elements);
    text-align: start;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    margin: 15px;
    padding: 10px;
    padding-right: 40px;
    cursor: pointer;
    z-index: 1002;
  }
  ul li.selected {
    border-color: white; /* Цвет рамки при подсветке */
  }
  .btnIcon {
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
  
  .btnIcon::before,
  .btnIcon::after {
    content: '';
    position: absolute;
    background-color: var(--contour-elements); /* Цвет палочек крестика */
  }
  
  .btnIcon::before {
    transform: rotate(45deg); /* Первая палочка крестика */
  }
  .btnIcon::after {
    transform: rotate(-45deg); /* Вторая палочка крестика */
  }
  #deleteScenario {
    bottom: 5px; 
    right: 5px;
    width: 25px; /* Ширина квадрата */
    height: 25px; /* Высота квадрата */
  }
  #deleteScenario::before, #deleteScenario::after {
    width: 20px; /* Ширина палочек крестика */
    height: 1px; /* Высота палочек крестика */
  }
  #exitPage {
    top: 25px; 
    right: 25px;
    width: 50px; /* Ширина квадрата */
    height: 50px; /* Высота квадрата */
  }
  #exitPage::before, #exitPage::after {
    width: 25px; /* Ширина палочек крестика */
    height: 3px; /* Высота палочек крестика */
  }
  #editScenario {
    position: absolute;
    top: 5px; 
    right: 5px;
    width: 25px; 
    height: 25px;
    border: 1px solid var(--contour-elements);
    cursor: pointer;
    border-radius: 5px;
    z-index: 1003;
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
  