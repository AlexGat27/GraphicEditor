<template>
  <div class="modelList-view">
    <h1>Список моделей марки {{ brand_name }}</h1>
    <div class="controls">
      <input type="text" v-model="searchQuery" placeholder="Поиск по имени..." />
      <button @click="showAddModelPanel = true">Добавить модель</button>
    </div>
    <div class="table-container">
      <table>
        <thead class="table-header">
        <tr>
          <th style="width: 5%;">ID</th>
          <th>Название</th>
          <th style="width: 27%;">Перейти в список CAN команд</th>
          <th style="width: 8%;"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="model in filteredModels" :key="model.id">
          <td style="width: 5%;">{{ model.id }}</td>
          <td @dblclick="startEditing(model.id)" :class="{ selected: isEditing(model.id) }">
            <input
                v-if="isEditing(model.id)"
                v-model="model.name"
                @blur="saveModel(model)"
                @keyup.enter="saveModel(model)"
            />
            <span v-else>{{ model.name }}</span>
          </td>
          <td style="width: 27%;" @click="goToCanCommandsList(model.id, model.name)" class="interactiveColumn">Can команды</td>
          <td style="width: 8%;" class="interactiveColumn" @click.stop="showConfirmModal = true; editingModelId = model.id">Удалить</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div id="exitPage" @click="exitPage"></div>
    <div id="backButton" @click="goBack">←</div>
    <CreateModel :action="'Добавить новую'" v-if="showAddModelPanel" @close="showAddModelPanel = false" @create="addModel" :brand_id="brand_id"/>
    <ConfirmModal :message="'Точно хотите удалить модель?'" :isVisible="showConfirmModal"
                  @confirm="deleteModel" @cancel="showConfirmModal = false" />
  </div>
</template>

<script>
import { useModelStore } from '@/stores/modelStore'; // Import the Pinia store
import ConfirmModal from '@/ui/components/alerts/ConfirmModal.vue';
import CreateModel from '@/ui/components/forms/CreateModel.vue';

export default {
  data() {
    return {
      brand_name: '',
      brand_id: null,
      editingModelId: null,
      searchQuery: '',
      showAddModelPanel: false,
      showConfirmModal: false,
      modelStore: null
    };
  },
  components: { CreateModel, ConfirmModal },
  async created() {
    this.brand_id = parseInt(this.$route.query.brand_id);
    this.brand_name = this.$route.query.brand_name;
    this.modelStore = useModelStore();
    await this.modelStore.fetchModels(this.brand_id);
  },
  computed: {
    filteredModels() {
      return this.modelStore.filteredModels(this.searchQuery);
    },
  },
  methods: {
    async deleteModel() {
      await this.modelStore.deleteModel(this.editingModelId);
      this.editingModelId = null;
      this.showConfirmModal = false;
    },
    async addModel(value) {
      await this.modelStore.addModel(value);
      this.showAddModelPanel = false;
    },
    async saveModel(model) {
      await this.modelStore.updateModel(model);
      this.editingModelId = null;
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
    goBack() {
      this.$router.go(-1);
    },
    goToCanCommandsList(id, name) {
      this.$router.push({ name: 'CanCommandList', query: { model_id: `${id}`, model_name: `${name}` } });
    },
  },
};
</script>


<style scoped>
.modelList-view {
  width: calc(100% - 40px);
  padding: 0 20px 0 20px;
  height: 100%;
  text-align: center;
  min-width: 480px;
  overflow: hidden; /* Делаем переполнение скрытым, чтобы соответствовать `brandList-view` */
}
.modelList-view h1{
  margin-top: 25px;
  margin-bottom: 30px;
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
  padding: 0 5px;
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
  overflow-y: auto; /* Используем auto, чтобы показать скролл при необходимости */
  position: relative;
  scrollbar-width: none; /* Firefox */
}

.table-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

table {
  width: 100%;
  border-collapse: separate; /* Ensure correct border spacing */
  border: 1px solid var(--contour-elements);
  border-spacing: 0; /* Remove spacing between borders */
}

thead.table-header { /* Класс .table-header уже применен в HTML */
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 2; /* Ensure the header is above other content */
  background-color: var(--background-toolbox-contourbar); /* Same as in `brandList-view` */
}

th, td {
  border: 1px solid var(--contour-elements);
  text-align: center;
  padding: 10px;
  color: var(--contour-elements);
}

th {
  background-color: var(--background-toolbox-contourbar); /* Same as in `brandList-view` */
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

#exitPage, #backButton {
  position: absolute;
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

#exitPage {
  top: 25px;
  right: 25px;
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
  top: 25px;
  left: 25px;
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

@media(max-width: 1000px) {
  .modelList-view h1{
    margin-top: 100px;
  }
}
</style>
