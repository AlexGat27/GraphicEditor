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
            <td style="width: 8%;" class="interactiveColumn" @click.stop="showConfirmModal = true; editingBrandId = brand.id">Удалить</td>
          </tr>
        </tbody>
      </table>
</div>

    <div id="exitPage" @click="exitPage"></div>
    <div id="backButton" @click="goBack">←</div>
    <CreateBrand v-if="showAddBrandPanel" @close="showAddBrandPanel = false" @create="addBrand" />
    <ConfirmModal :message="'Точно хотите удалить марку?'" :isVisible="showConfirmModal"
        @confirm="deleteBrand" @cancel="showConfirmModal = false" />
  </div>
</template>

<script>
import ConfirmModal from '@/components/shared/ConfirmModal.vue';
import CreateBrand from '@/components/shared/CreateBrand.vue';
import { BrandResponse } from '@/models/responses';
import { modelApi } from '@/services/api';

export default {
  data() {
    return {
      brands: [],
      editingBrandId: null,
      searchQuery: '',
      showAddBrandPanel: false,
      showConfirmModal: false
    };
  },
  components: { CreateBrand, ConfirmModal },
  async created() {
    await this.fetchBrands();
  },
  computed: {
    filteredBrands() {
      return this.brands.filter((brand) => brand.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
  methods: {
    async fetchBrands() {
      try {
        const response = await modelApi.getBrands();
        this.brands = response.data.map((element) => new BrandResponse(element));
      } catch (error) {
        console.error('Ошибка при загрузке марок:', error);
      }
    },
    async deleteBrand() {
      try {
        await modelApi.deleteBrands(this.editingBrandId);
        this.brands = this.brands.filter((brand) => brand.id !== this.editingBrandId);
        this.editingBrandId = null;
        this.showConfirmModal = false;
      } catch (error) {
        console.error('Ошибка при удалении марки:', error);
      }
    },
    async addBrand(value) {
      try {
        const response = await modelApi.createBrand(value);
        const newBrand = new BrandResponse(response.data);
        this.brands.push(newBrand);
        this.showAddBrandPanel = false;
      } catch (error) {
        console.error('Ошибка при добавлении марки:', error);
      }
    },
    async saveBrand(brand) {
      try {
        const response = await modelApi.updateBrand(brand.id, { name: brand.name });
        const updatedBrand = new BrandResponse(response.data);
        const index = this.brands.findIndex((b) => b.id === brand.id);
        this.brands.splice(index, 1, updatedBrand);
        this.editingBrandId = null;
      } catch (error) {
        console.error('Ошибка при обновлении марки:', error);
      }
    },
    startEditing(id) {
      this.editingBrandId = id;
    },
    isEditing(id) {
      return this.editingBrandId === id;
    },
    exitPage() {
      this.$router.push('/');
    },
    goBack() {
      this.$router.go(-1);
    },
    goToModelsList(id, name) {
      this.$router.push({ name: 'ModelList', query: { brand_id: `${id}`, brand_name: `${name}` } });
    },
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
