<template>
    <div class="canCommandList-view">
      <h1>Список CAN команд модели {{ model_name }}</h1>
      <div class="controls">
        <input type="text" v-model="searchNameQuery" placeholder="Поиск по имени..." />
        <input type="text" v-model="searchIdQuery" placeholder="Поиск по идентификатору..." />
        <button @click="showAddCanCommandPanel = true">Добавить модель</button>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 5%;">ID</th>
            <th>Название</th>
            <th>CAN_ID</th>
            <th>Byte 1</th>
            <th>Byte 2</th>
            <th>Byte 3</th>
            <th>Byte 4</th>
            <th>Byte 5</th>
            <th>Byte 6</th>
            <th>Byte 7</th>
            <th>Byte 8</th>
            <th style="width: 8%;"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="model in filteredModels" :key="model.id">
            <td>{{ model.id }}</td>
            <td @dblclick="startEditing(model.id)" :class="{ selected: isEditing(model.id) }">
              <input v-if="isEditing(model.id)" v-model="model.name" @blur="saveModel(model)" @keyup.enter="saveModel(model)"/>
              <span v-else>{{ model.name }}</span>
            </td>
            <td @dblclick="startEditing(model.id)" :class="{ selected: isEditing(model.id) }">
              <input v-if="isEditing(model.id)" v-model="model.command_id" @blur="saveModel(model)" @keyup.enter="saveModel(model)"/>
              <span v-else>{{ model.command_id }}</span>
            </td>
            <td @dblclick="startEditing(model.id)" :class="{ selected: isEditing(model.id) }">
              <input v-if="isEditing(model.id)" v-model="model.byte_1" @blur="saveModel(model)" @keyup.enter="saveModel(model)"/>
              <span v-else>{{ model.byte_1 }}</span>
            </td>
            <td @dblclick="startEditing(model.id)" :class="{ selected: isEditing(model.id) }">
              <input v-if="isEditing(model.id)" v-model="model.byte_2" @blur="saveModel(model)" @keyup.enter="saveModel(model)"/>
              <span v-else>{{ model.byte_2 }}</span>
            </td>
            <td @dblclick="startEditing(model.id)" :class="{ selected: isEditing(model.id) }">
              <input v-if="isEditing(model.id)" v-model="model.byte_3" @blur="saveModel(model)" @keyup.enter="saveModel(model)"/>
              <span v-else>{{ model.byte_3 }}</span>
            </td>
            <td @dblclick="startEditing(model.id)" :class="{ selected: isEditing(model.id) }">
              <input v-if="isEditing(model.id)" v-model="model.byte_4" @blur="saveModel(model)" @keyup.enter="saveModel(model)"/>
              <span v-else>{{ model.byte_4 }}</span>
            </td>
            <td @dblclick="startEditing(model.id)" :class="{ selected: isEditing(model.id) }">
              <input v-if="isEditing(model.id)" v-model="model.byte_5" @blur="saveModel(model)" @keyup.enter="saveModel(model)"/>
              <span v-else>{{ model.byte_5 }}</span>
            </td>
            <td @dblclick="startEditing(model.id)" :class="{ selected: isEditing(model.id) }">
              <input v-if="isEditing(model.id)" v-model="model.byte_6" @blur="saveModel(model)" @keyup.enter="saveModel(model)"/>
              <span v-else>{{ model.byte_6 }}</span>
            </td>
            <td @dblclick="startEditing(model.id)" :class="{ selected: isEditing(model.id) }">
              <input v-if="isEditing(model.id)" v-model="model.byte_7" @blur="saveModel(model)" @keyup.enter="saveModel(model)"/>
              <span v-else>{{ model.byte_7 }}</span>
            </td>
            <td @dblclick="startEditing(model.id)" :class="{ selected: isEditing(model.id) }">
              <input v-if="isEditing(model.id)" v-model="model.byte_8" @blur="saveModel(model)" @keyup.enter="saveModel(model)"/>
              <span v-else>{{ model.byte_8 }}</span>
            </td>
            <td class="interactiveColumn" @click.stop="deleteModel(model.id)">Удалить</td>
          </tr>
        </tbody>
      </table>
      <div id="exitPage" @click="exitPage"></div>
      <CreateCanCommand :action="'Добавить новую'" v-if="showAddCanCommandPanel" @close="showAddCanCommandPanel = false" 
        @create="addModel" :model_id="model_id"/>
    </div>
  </template>
  
    
  <script>
  import CreateCanCommand from '@/components/shared/CreateCanCommand.vue';
  import { CanCommandResponse, ModelResponse } from '@/models/responses';
import canCommandsApi from '@/services/api/canCommand';
  
  export default {
    data() {
      return {
        model_name: '',
        model_id: null,
        canCommands: [],
        editingModelId: null,
        searchNameQuery: '',
        searchIdQuery: '',
        showAddCanCommandPanel: false,
      };
    },
    components: {CreateCanCommand},
    async created() {
      this.model_id = parseInt(this.$route.query.model_id);
      this.model_name = this.$route.query.model_name;
      await this.fetchModels();
    },
    computed:{
      filteredModels(){
        return this.canCommands.filter(model => 
        model.name.toLowerCase().includes(this.searchNameQuery.toLowerCase()) && 
        model.command_id.toLowerCase().includes(this.searchIdQuery.toLowerCase())
    );
      }
    },
    methods: {
      async fetchModels() {
        try {
          const response = await canCommandsApi.getCanCommands(this.model_id);
          this.canCommands = response.data.map(element => new CanCommandResponse(element));
        } catch (error) {
          console.error('Ошибка при загрузке моделей:', error);
        }
      },
      async deleteModel(id) {
        try {
          await canCommandsApi.deleteModel(id);
          this.canCommands = this.canCommands.filter((model) => model.id !== id);
        } catch (error) {
          console.error('Ошибка при удалении модели:', error);
        }
      },
      async addModel(value) {
        try {
            console.log(value)
          const response = await canCommandsApi.createModel(value);
          const newModel = new CanCommandResponse(response.data);
          this.canCommands.push(newModel);
          this.showAddCanCommandPanel = false;
        } catch (error) {
          console.error('Ошибка при добавлении марки:', error);
        }
      },
      async saveModel(model) {
        try {
          const response = await canCommandsApi.updateModel(model.id, { ...model });
          const updatedModel = new CanCommandResponse(response.data);
          const index = this.canCommands.findIndex((b) => b.id === model.id);
          this.canCommands.splice(index, 1, updatedModel);
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
      goToModelsList(id, name) {
        this.$router.push({ name: 'ModelList', query: { model_id: `${id}`, model_name: `${name}` } });
      },
    },
  };
  </script>
  
  
    
    <style scoped>
    .canCommandList-view {
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
    