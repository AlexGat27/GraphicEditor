<template>
  <div class="modelList-view">
    <h1>Список моделей марки {{ brand_name }}</h1>
    <div class="controls">
      <input type="text" v-model="searchQuery" placeholder="Поиск по имени..." />
      <button @click="showAddModelPanel = true">Добавить модель</button>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 5%;">ID</th>
          <th>Название</th>
          <th style="width: 27%;">Перейти в список CAN команд</th>
          <th style="width: 8%;"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="model in filteredModels" :key="model.id">
          <td>{{ model.id }}</td>
          <td @dblclick="startEditing(model.id)" :class="{ selected: isEditing(model.id) }">
            <input
              v-if="isEditing(model.id)"
              v-model="model.name"
              @blur="saveModel(model)"
              @keyup.enter="saveModel(model)"
            />
            <span v-else>{{ model.name }}</span>
          </td>
          <td @click="goToCanCommandsList(model.id, model.name)" class="interactiveColumn">Can команды</td>
          <td class="interactiveColumn" @click.stop="deleteModel(model.id)">Удалить</td>
        </tr>
      </tbody>
    </table>
    <div id="exitPage" @click="exitPage"></div>
    <CreateModel :action="'Добавить новую'" v-if="showAddModelPanel" @close="showAddModelPanel = false" 
      @create="addModel" :brand_id="brand_id"/>
  </div>
</template>

  
<script>
import CreateModel from '@/components/shared/CreateModel.vue';
import { ModelResponse } from '@/models/responses';
import { modelApi } from '@/services/api';

export default {
  data() {
    return {
      brand_name: '',
      brand_id: null,
      models: [],
      editingModelId: null,
      searchQuery: '',
      showAddModelPanel: false,
    };
  },
  components: {CreateModel},
  async created() {
    this.brand_id = parseInt(this.$route.query.brand_id);
    this.brand_name = this.$route.query.brand_name;
    await this.fetchModels();
  },
  computed:{
    filteredModels(){
      return this.models.filter(model => model.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  methods: {
    async fetchModels() {
      try {
        const response = await modelApi.getBrandModels(this.brand_id);
        this.models = response.data.map(element => new ModelResponse(element));
      } catch (error) {
        console.error('Ошибка при загрузке моделей:', error);
      }
    },
    async deleteModel(id) {
      try {
        await modelApi.deleteModel(id);
        this.models = this.models.filter((model) => model.id !== id);
      } catch (error) {
        console.error('Ошибка при удалении модели:', error);
      }
    },
    async addModel(value) {
      try {
        const response = await modelApi.createModel(value);
        const newModel = new ModelResponse(response.data.model);
        this.models.push(newModel);
        this.showAddModelPanel = false;
      } catch (error) {
        console.error('Ошибка при добавлении марки:', error);
      }
    },
    async saveModel(model) {
      try {
        const response = await modelApi.updateModel(model.id, { brand_id: this.brand_id, name: model.name });
        const updatedModel = new ModelResponse(response.data.model);
        const index = this.models.findIndex((b) => b.id === model.id);
        this.models.splice(index, 1, updatedModel);
        this.editingModelId = null;
      } catch (error) {
        console.error('Ошибка при обновлении марки:', error);
      }
    },
    startEditing(id) {
      this.editingModelId = id;
    },
    isEditing(id) {
      return this.editingModelId === id;
    },
    exitPage() {
      this.$router.push('/');
    },
    goToCanCommandsList(id, name) {
      this.$router.push({ name: 'CanCommandList', query: { model_id: `${id}`, model_name: `${name}` } });
    },
  },
};
</script>


  
  <style scoped>
  .modelList-view {
    width: 90%;
    height: 90%;
    text-align: center;
  }
  .controls {
    display: flex;
    justify-content: end;
    margin-bottom: 20px;
  }
  .controls input {
    width: 300px;
    padding: 5px;
    margin-right: 15px;
    cursor: pointer;
    background-color: inherit;
    color: var(--contour-elements);
    border: 1px solid var(--contour-elements);
    padding: 0 5px 0 5px;
    border-radius: 5px;
  }
  .controls button {
    background-color: #d9d9d9; color: black;
    border-radius: 5px; height: 30px;
    width: 150px;
    cursor: pointer;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--contour-elements);
  }
  th, td {
    border: 1px solid var(--contour-elements);
    text-align: center;
    padding: 10px;
    color: var(--contour-elements);
  }
  th {
    background-color: var(--background-toolbox-contourbar);
  }
  .selected {
    background-color: var(--background-toolbox-contourbar);
  }
  tr input{
    height: 100%;
    width: 100%;
    text-align: center;
    outline: none;
    border: none;
    background-color: inherit;
    color: var(--contour-elements);
  }
  #exitPage {
    position: absolute;
    top: 25px;
    right: 25px;
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: 1px solid var(--contour-elements); /* Цвет рамки */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
  }
  #exitPage::before,
  #exitPage::after {
    content: '';
    position: absolute;
    background-color: var(--contour-elements);
    width: 25px;
    height: 3px;
  }
  #exitPage::before {
    transform: rotate(45deg);
  }
  #exitPage::after {
    transform: rotate(-45deg);
  }
  .interactiveColumn{
    cursor: pointer;
  }
  .interactiveColumn:hover{
    background-color: var(--background-toolbox-contourbar);
  }
  </style>
  