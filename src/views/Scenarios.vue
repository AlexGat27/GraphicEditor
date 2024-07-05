<template>
    <div class="scenario-view">
      <h1>Список сценариев</h1>
      <ul>
        <li v-for="scenario in scenarios" :key="scenario.id" @click="selectModel(scenario)"
        :class="{ selected: selectedScenario === scenario.id }">
          <h3 style="margin: 5px;">{{ scenario.name }}</h3>
          <p style="margin: 5px;">{{ scenario.model_name }}</p>
          <div class="closeIcon" @click.stop="deleteScenario(scenario.id)"></div>
        </li>
        <div class="circle" @click="showCreatePanel = true">+</div>
      </ul>  
      <CreateScenario v-if="showCreatePanel" @close="showCreatePanel = false" @create="addScenario"/>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
import CreateScenario from '../components/shared/CreateScenario.vue'
import { useMainStore } from '@/stores/modelStore';
  export default {
    data() {
      return {
        scenarios: [],
        showCreatePanel: false,
        selectedScenario: null,
      };
    },
    async created(){
      this.modelStore = useMainStore();
      await this.fetchScenarios();
    },
    components: {CreateScenario},
    methods: {
      async fetchScenarios() {
        try {
          const response = await api.getScenarios();
          this.scenarios = response.data;
        } catch (error) {
          console.error('Ошибка при загрузке сценариев:', error);
        }
      },
      async deleteScenario(id) {
        try {
          await api.deleteScenario(id);
          this.scenarios = this.scenarios.filter(scenario => scenario.id !== id);
        } catch (error) {
          console.error('Ошибка при удалении сценария:', error);
        }
      },
      async addScenario(scenario) {
        try {
          const response = await api.addScenario(scenario);
          this.scenarios.push(response.data);
          this.showCreatePanel = false;
        } catch (error) {
          console.error('Ошибка при добавлении сценария:', error);
        }
      },
      async selectModel(scenario){
        this.selectedScenario = scenario.id;
        this.modelStore.setModelAttributes(scenario.model_attributes);
        if (scenario.jsonData) this.modelStore.setCurrentModel(scenario.jsonData);
      }
    },
    components: {
      CreateScenario,
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
    bottom:5px; right: 5px;
    width: 25px; /* Ширина квадрата */
    height: 25px; /* Высота квадрата */
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
  width: 20px; /* Ширина палочек крестика */
  height: 1px; /* Высота палочек крестика */
  background-color: var(--contour-elements); /* Цвет палочек крестика */
}

.closeIcon::before {
  transform: rotate(45deg); /* Первая палочка крестика */
}

.closeIcon::after {
  transform: rotate(-45deg); /* Вторая палочка крестика */
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