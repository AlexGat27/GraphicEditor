<template>
  <div class="brandList-view">
    <h1>Список марок</h1>
    <div class="controls">
      <input type="text" v-model="searchQuery" placeholder="Поиск по имени..." />
      <button @click="showAddBrandPanel = true">Добавить марку</button>
    </div>
    <div class="table-container">
      <table>
        <thead class="table-header">
        <tr>
          <th style="width: 5%;">ID</th>
          <th>Название</th>
          <th style="width: 27%;">Перейти в список моделей</th>
          <th style="width: 8%;"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="brand in filteredBrands" :key="brand.id">
          <td style="width: 5%;">{{ brand.id }}</td>
          <td @dblclick="startEditing(brand.id)" :class="{ selected: isEditing(brand.id) }">
            <input
                v-if="isEditing(brand.id)"
                v-model="brand.name"
                @blur="saveBrand(brand)"
                @keyup.enter="saveBrand(brand)"
            />
            <span v-else>{{ brand.name }}</span>
          </td>
          <td style="width: 27%;" @click="goToModelsList(brand.id, brand.name)" class="interactiveColumn">Модели</td>
          <td style="width: 8%;" class="interactiveColumn" @click.stop="showConfirmModal(brand.id)">Удалить</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Модальное окно для подтверждения удаления -->
    <ConfirmModal
        :message="'Точно хотите удалить марку?'"
        :isVisible="confirmModalVisible"
        @confirm="deleteBrand"
        @cancel="hideConfirmModal"
    />

    <!-- Панель создания новой марки -->
    <CreateBrand v-if="showAddBrandPanel" @close="showAddBrandPanel = false" @create="addBrand" />
  </div>
</template>

<script>
import { useBrandStore } from "@/stores/brandStore";
import ConfirmModal from "@/ui/components/alerts/ConfirmModal.vue";
import CreateBrand from "@/ui/components/forms/CreateBrand.vue";

export default {
  data() {
    return {
      searchQuery: '', // Поисковый запрос
      editingBrandId: null, // ID редактируемой марки
      showAddBrandPanel: false, // Флаг отображения панели добавления бренда
      confirmModalVisible: false, // Флаг отображения модального окна
      brandToDelete: null, // ID марки для удаления
    };
  },
  computed: {
    // Фильтрация брендов по поисковому запросу
    filteredBrands() {
      return this.brandStore.brands.filter(brand =>
          brand.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    // Открытие модального окна удаления
    showConfirmModal(brandId) {
      this.brandToDelete = brandId;
      this.confirmModalVisible = true;
    },
    // Закрытие модального окна удаления
    hideConfirmModal() {
      this.confirmModalVisible = false;
      this.brandToDelete = null;
    },
    // Удаление марки через then
    deleteBrand() {
      this.brandStore.deleteBrand(this.brandToDelete).then(() => {
        this.hideConfirmModal();
      })
    },
    // Добавление новой марки через then
    addBrand(brandData) {
      this.brandStore.addBrand(brandData).then(() => {
        this.showAddBrandPanel = false;
      })
    },
    // Сохранение изменений в названии бренда через then
    saveBrand(brand) {
      this.brandStore.updateBrand(brand).then(() => {
        this.editingBrandId = null;
      })
    },
    // Начало редактирования бренда
    startEditing(id) {
      this.editingBrandId = id;
    },
    // Проверка, редактируется ли бренд
    isEditing(id) {
      return this.editingBrandId === id;
    },
    // Переход к списку моделей бренда
    goToModelsList(id, name) {
      this.$router.push({name: "ModelList", query: {brand_id: id, brand_name: name}});
    },
  },
  created() {
    this.brandStore = useBrandStore();

    // Загрузка брендов через then
    this.brandStore.fetchBrands().then(() => {
      console.log("Марки успешно загружены");
    })
  },
  components: {
    ConfirmModal,
    CreateBrand,
  },
};
</script>

<style scoped>
.brandList-view {
  width: calc(100% - 40px);
  padding: 0 20px 0 20px;
  height: 100%;
  text-align: center;
  min-width: 480px;
  overflow: hidden;
}
.brandList-view h1{
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
  padding: 0 5px 0 5px;
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
  background-color: var(--background-toolbox-contourbar); /* Same as thead background */
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
@media(max-width: 420px) {
  .brandList-view h1{
    margin-top: 100px;
  }
}
</style>