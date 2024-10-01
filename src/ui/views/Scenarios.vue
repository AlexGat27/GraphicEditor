<template>
    <div class="scenario-view">
      <h1>Список сценариев</h1>
      <ul>
        <li v-for="scenario in scenarios" :key="scenario.id" @click="selectModel(scenario)"
        :class="{ selected: selectedScenario === scenario.id }" @dblclick="exitPage">
          <h3 style="margin: 5px;">{{ scenario.name }}</h3>
          <p style="margin: 5px;">{{ scenario.model.name }}</p>
          <div id="deleteScenario" class="btnIcon" @click.stop="showConfirmModal = true; selectedScenario = scenario.id"></div>
          <img id="editScenario" src="../../assets/icons/pencil.png" @click.stop="editScenario(scenario)" alt="Edit">
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
import CreateScenario from '../components/forms/CreateScenario.vue'
import { CompileModel } from '@/models/compileModel.js';
import ConfirmModal from '@/ui/components/alerts/ConfirmModal.vue';
import {useScenarioStore} from "@/stores/scenarioStore.js";
  export default {
    components: {CreateScenario, ConfirmModal},
    data() {
      return {
        showCreatePanel: false,
        showUpdatePanel: false,
        showConfirmModal: false,
        scenarioStore: null
      };
    },
    computed: {
      scenarios(){
        return this.scenarioStore.scenarios;
      },
      selectedScenario: {
        get(){
          return this.scenarioStore.selectedScenarioId;
        },
        set(value){
          this.scenarioStore.selectScenario(value);
        }
      }
    },
    async created(){
      this.scenarioStore = useScenarioStore();
      if (this.$modelService.getCurrentModel()) this.$modelService.setCurrentModel(null);
      this.fetchScenarios();
    },
    methods: {
      fetchScenarios() {
        this.scenarioStore.fetchScenarios().then(() =>{
          if (this.$modelService.getCurrentModel()) {
            this.scenarioStore.selectScenario(this.$modelService.getCurrentModel().scenario_id);
          }
        });
      },
      deleteScenario() {
        this.scenarioStore.deleteScenario().then(() => {
          this.scenarioStore.selectScenario(null);
          this.showConfirmModal = false;
        })
      },
      addScenario(scenario) {
        this.scenarioStore.addScenario(scenario).then(() => {
          this.showCreatePanel = false;
        })
      },
      async updateScenario(scenarioData){
        this.scenarioStore.updateScenario(scenarioData).then(() => {
          this.showUpdatePanel = false;
        });
      },
      selectModel(scenario){
        console.log(scenario)
        this.$modelService.setCanCommands(scenario.model.canCommands);
        this.scenarioStore.selectScenario(scenario.id);
        if (scenario.jsonData){
          this.$modelService.setCurrentModel(scenario.jsonData)
        }
        else {
          this.$modelService.setCurrentModel(new CompileModel(scenario.id, scenario.name))
        }
      },
      editScenario(scenario) {
        this.scenarioStore.selectScenario(scenario.id);
        this.showUpdatePanel = true;
      },
      exitPage(){
        this.$router.push({name: "MainEditor"});
      }
    },
  };
  </script>
  
  <style scoped>
  .scenario-view {
    width: calc(100% - 40px);
    padding: 0 20px 0 20px;
    height: 100%;
    text-align: center;
  }
  .scenario-view h1{
    margin-top: 25px;
  }
  .scenario-view ul {
    width: 100%;
    flex-wrap: wrap; /* Allow items to wrap onto the next line */
    display: flex;
    align-items: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
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
    z-index: 1;
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
    z-index: 2;
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
    z-index: 2;
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
  @media(max-width: 480px) {
    .scenario-view h1{
      margin-top: 100px;
    }
  }
  </style>
  