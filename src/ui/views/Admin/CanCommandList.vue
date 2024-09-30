<template>
  <div class="canCommandList-view">
    <h1>Список CAN команд модели {{ model_name }}</h1>
    <div class="controls">
      <input type="text" v-model="searchNameQuery" placeholder="Поиск по имени..." />
      <input type="text" v-model="searchIdQuery" placeholder="Поиск по идентификатору..." />
      <button @click="showAddCanCommandPanel = true">Добавить команду</button>
    </div>

    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th style="width: 5%;">ID</th>
          <th>Название</th>
          <th>CAN_ID</th>
          <th v-for="byte in byteFields" :key="byte">{{ byte }}</th>
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
          <td class="interactiveColumn" @click.stop="confirmDelete(command.id)">Удалить</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div id="exitPage" @click="exitPage"></div>
    <div id="backButton" @click="goBack">←</div>
    <CreateCanCommand :action="'Добавить новую'" v-if="showAddCanCommandPanel" @close="showAddCanCommandPanel = false"
                      @create="addCommand" :model_id="model_id" />
    <ConfirmModal :message="'Точно хотите удалить команду?'" :isVisible="showConfirmModal" @confirm="deleteCommand" @cancel="showConfirmModal = false" />
  </div>
</template>

<script>
import { useCanCommandStore } from '@/stores/canCommandStore'; // Import the Pinia store
import ConfirmModal from '@/ui/components/alerts/ConfirmModal.vue';
import CreateCanCommand from '@/ui/components/forms/CreateCanCommand.vue';

export default {
  data() {
    return {
      model_name: '',
      model_id: null,
      editingCommandId: null,
      searchNameQuery: '',
      searchIdQuery: '',
      showAddCanCommandPanel: false,
      showConfirmModal: false,
    };
  },
  components: { CreateCanCommand, ConfirmModal },
  setup() {
    const canCommandStore = useCanCommandStore(); // Initialize the store
    return { canCommandStore };
  },
  async created() {
    this.model_id = parseInt(this.$route.query.model_id);
    this.model_name = this.$route.query.model_name;
    await this.canCommandStore.fetchCommands(this.model_id);
  },
  computed: {
    filteredCommands() {
      return this.canCommandStore.filteredCommands(this.searchNameQuery, this.searchIdQuery);
    },
    byteFields() {
      return ['byte_1', 'byte_2', 'byte_3', 'byte_4', 'byte_5', 'byte_6', 'byte_7', 'byte_8'];
    },
  },
  methods: {
    async deleteCommand() {
      await this.canCommandStore.deleteCommand(this.editingCommandId);
      this.editingCommandId = null;
      this.showConfirmModal = false;
    },
    async addCommand(value) {
      await this.canCommandStore.addCommand(value);
      this.showAddCanCommandPanel = false;
    },
    async saveCommand(command) {
      await this.canCommandStore.updateCommand(command);
      this.editingCommandId = null;
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
    },
  },
};
</script>
  
 <style scoped>
.canCommandList-view {
  width: calc(100% - 40px);
  padding: 0 20px 0 20px;
  height: 100%;
  text-align: center;
  min-width: 800px;
  overflow: hidden; /* Делаем переполнение скрытым, чтобы соответствовать `brandList-view` */
}
.canCommandList-view h1{
  margin-bottom: 30px;
  margin-top: 25px;
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
.table-container {
  max-height: 80%;
  overflow-y: auto;
  position: relative;
  scrollbar-width: none; /* Firefox */
}
.table-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
table {
  width: 100%;
  border-collapse: separate;
  border: 1px solid var(--contour-elements);
  border-spacing: 0; /* Remove spacing between borders */
}
thead {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 2; /* Ensure the header is above other content */
  background-color: var(--background-toolbox-contourbar); /* Ensure background color is set */
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

#backButton:hover, #exitPage:hover {
  background-color: var(--background-toolbox-contourbar);
}
.interactiveColumn {
  cursor: pointer;
}
.interactiveColumn:hover {
  background-color: var(--background-toolbox-contourbar);
}
@media(max-width: 1000px) {
  .canCommandList-view h1{
    margin-top: 100px;
  }
}
</style>
