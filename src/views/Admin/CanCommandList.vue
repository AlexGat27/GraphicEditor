<template>
    <div class="canCommandList-view">
      <h1>Список CAN команд модели {{ model_name }}</h1>
      <div class="controls">
        <input type="text" v-model="searchNameQuery" placeholder="Поиск по имени..." />
        <input type="text" v-model="searchIdQuery" placeholder="Поиск по идентификатору..." />
        <button @click="showAddCanCommandPanel = true">Добавить команду</button>
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
          <tr v-for="command in filteredCommands" :key="command.id">
            <td>{{ command.id }}</td>
            <td @dblclick="startEditing(command.id)" :class="{ selected: isEditing(command.id) }">
              <input v-if="isEditing(command.id)" v-model="command.name" @blur="saveCommand(command)" @keyup.enter="saveCommand(command)" />
              <span v-else>{{ command.name }}</span>
            </td>
            <td @dblclick="startEditing(command.id)" :class="{ selected: isEditing(command.id) }">
              <input v-if="isEditing(command.id)" v-model="command.command_id" @blur="saveCommand(command)" @keyup.enter="saveCommand(command)" />
              <span v-else>{{ command.command_id }}</span>
            </td>
            <td v-for="byte in byteFields" :key="byte" @dblclick="startEditing(command.id)" :class="{ selected: isEditing(command.id) }">
              <input v-if="isEditing(command.id)" v-model="command[byte]" @blur="saveCommand(command)" @keyup.enter="saveCommand(command)" />
              <span v-else>{{ command[byte] }}</span>
            </td>
            <td class="interactiveColumn" @click.stop="showConfirmModal = true; editingCommandId = command.id">Удалить</td>
          </tr>
        </tbody>
      </table>
      <div id="exitPage" @click="exitPage"></div>
      <div id="backButton" @click="goBack">←</div>
      <CreateCanCommand :action="'Добавить новую'" v-if="showAddCanCommandPanel" @close="showAddCanCommandPanel = false" @create="addCommand" :model_id="model_id" />
      <ConfirmModal :message="'Точно хотите удалить команду?'" :isVisible="showConfirmModal"
        @confirm="deleteCommand" @cancel="showConfirmModal = false" />
    </div>
  </template>
  
  <script>
  import ConfirmModal from '@/components/shared/ConfirmModal.vue';
import CreateCanCommand from '@/components/shared/CreateCanCommand.vue';
  import { CanCommandResponse } from '@/models/responses';
  import canCommandsApi from '@/services/api/canCommand';
  
  export default {
    data() {
      return {
        model_name: '',
        model_id: null,
        canCommands: [],
        editingCommandId: null,
        searchNameQuery: '',
        searchIdQuery: '',
        showAddCanCommandPanel: false,
        showConfirmModal: false
      };
    },
    components: { CreateCanCommand, ConfirmModal },
    async created() {
      this.model_id = parseInt(this.$route.query.model_id);
      this.model_name = this.$route.query.model_name;
      await this.fetchCommands();
    },
    computed: {
      filteredCommands() {
        return this.canCommands.filter(command => 
          command.name.toLowerCase().includes(this.searchNameQuery.toLowerCase()) && 
          command.command_id.toLowerCase().includes(this.searchIdQuery.toLowerCase())
        );
      },
      byteFields() {
        return ['byte_1', 'byte_2', 'byte_3', 'byte_4', 'byte_5', 'byte_6', 'byte_7', 'byte_8'];
      }
    },
    methods: {
      async fetchCommands() {
        try {
          const response = await canCommandsApi.getCanCommands(this.model_id);
          this.canCommands = response.data.map(element => new CanCommandResponse(element));
        } catch (error) {
          console.error('Ошибка при загрузке команд:', error);
        }
      },
      async deleteCommand() {
        try {
            await canCommandsApi.deleteModel(this.editingCommandId);
            this.canCommands = this.canCommands.filter(command => command.id !== this.editingCommandId);
            this.editingCommandId = null;
            this.showConfirmModal = false;
        } catch (error) {
            console.error('Ошибка при удалении команды:', error);
        }
      },
      async addCommand(value) {
        try {
          const response = await canCommandsApi.createModel(value);
          const newCommand = new CanCommandResponse(response.data);
          this.canCommands.push(newCommand);
          this.showAddCanCommandPanel = false;
        } catch (error) {
          console.error('Ошибка при добавлении команды:', error);
        }
      },
      async saveCommand(command) {
        try {
          const response = await canCommandsApi.updateModel(command.id, { ...command });
          const updatedCommand = new CanCommandResponse(response.data);
          const index = this.canCommands.findIndex(c => c.id === command.id);
          this.canCommands.splice(index, 1, updatedCommand);
          this.editingCommandId = null;
        } catch (error) {
          console.error('Ошибка при обновлении команды:', error);
        }
      },
      startEditing(id) {
        this.editingCommandId = id;
      },
      isEditing(id) {
        return this.editingCommandId === id;
      },
      goBack() {
            this.$router.go(-1);
        },
      exitPage() {
        this.$router.push('/');
      }
    }
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
    border-radius: 5px;
  }
  .controls button {
    background-color: #d9d9d9;
    color: black;
    border-radius: 5px;
    height: 30px;
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
  tr input {
    height: 100%;
    width: 100%;
    text-align: center;
    outline: none;
    border: none;
    background-color: inherit;
    color: var(--contour-elements);
    font-family: "Fira Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  #exitPage {
    position: absolute;
    top: 25px;
    right: 25px;
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: 1px solid var(--contour-elements);
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
  #backButton {
  position: absolute;
  top: 25px;
  left: 25px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: 1px solid var(--contour-elements); /* Цвет рамки */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  font-size: 28px;
}
#backButton:hover, #exitPage:hover {
  background-color: var(--background-toolbox-contourbar);
}
  .interactiveColumn {
    cursor: pointer;
  }
  .interactiveColumn:hover {
    background-color: var(--background-toolbox-contourbar);
  }
  </style>
  