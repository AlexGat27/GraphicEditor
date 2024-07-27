<template>
  <div class="brandList-view">
    <h1>Список марок</h1>
    <div class="controls">
      <input type="text" v-model="searchQuery" placeholder="Поиск по имени..." />
      <button @click="showAddBrandPanel = true">Добавить марку</button>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 5%;">ID</th>
          <th>Название</th>
          <th style="width: 27%;">Перейти в список моделей</th>
          <th style="width: 8%;"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="brand in filteredBrands" :key="brand.id">
          <td>{{ brand.id }}</td>
          <td @dblclick="startEditing(brand.id)" :class="{ selected: isEditing(brand.id) }">
            <input
              v-if="isEditing(brand.id)"
              v-model="brand.name"
              @blur="saveBrand(brand)"
              @keyup.enter="saveBrand(brand)"
            />
            <span v-else>{{ brand.name }}</span>
          </td>
          <td @click="goToModelsList(brand.id, brand.name)" class="interactiveColumn">Модели</td>
          <td class="interactiveColumn" @click.stop="deleteBrand(brand.id)">Удалить</td>
        </tr>
      </tbody>
    </table>
    <div id="exitPage" @click="exitPage"></div>
    <CreateBrand v-if="showAddBrandPanel" @close="showAddBrandPanel = false" @create="addBrand" />
  </div>
</template>

  
<script>
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
    };
  },
  components: {CreateBrand},
  async created() {
    await this.fetchBrands();
  },
  computed:{
    filteredBrands(){
      return this.brands.filter(brand => brand.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  methods: {
    async fetchBrands() {
      try {
        const response = await modelApi.getBrands();
        this.brands = response.data.map(element => new BrandResponse(element));
      } catch (error) {
        console.error('Ошибка при загрузке марок:', error);
      }
    },
    async deleteBrand(id) {
      try {
        await modelApi.deleteBrands(id);
        this.brands = this.brands.filter((brand) => brand.id !== id);
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
    goToModelsList(id, name) {
      this.$router.push({ name: 'ModelList', query: { brand_id: `${id}`, brand_name: `${name}` } });
    },
  },
};
</script>


  
  <style scoped>
  .brandList-view {
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
  