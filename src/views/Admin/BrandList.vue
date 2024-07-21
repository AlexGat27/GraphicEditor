<template>
    <div class="scenario-view">
      <h1>Список сценариев</h1>
      <ul>
        <li v-for="brand in brands" :key="brand.id" :class="{ selected: selectedBrand === brand.id }"
        @click="selectedBrand = brand.id" @dblclick="showUpdatePanel = true">
          <h3 style="margin: 5px; word-wrap: break-word;">{{ brand.name }}</h3>
          <div style="display: flex; width: 100%; justify-content: space-around; margin: 5px 0 5px 0;">
            <button @click="modelsPage">Модели</button>
            <div id="deleteBrand" class="closeIcon" @click.stop="deleteBrand(brand.id)"></div>
          </div>
          
        </li>
        <div class="circle" @click="showCreatePanel = true">+</div>
      </ul>  
      <CreateBrand :action="'Добавить новую'" v-if="showCreatePanel" @close="showCreatePanel = false" @create="addBrand"/>
      <CreateBrand :action="'Обновить'" v-if="showUpdatePanel" @close="showUpdatePanel = false" @create="updateBrand"/>
      <div id="exitPage" class="closeIcon" @click="exitPage"></div>
    </div>
  </template>
  
  <script>
import CreateBrand from '@/components/shared/CreateBrand.vue';
import { modelApi } from '@/services/api';
  export default {
    data() {
      return {
        brands: [],
        showCreatePanel: false,
        showUpdatePanel: false,
        selectedBrand: null
      };
    },
    async created(){
      await this.fetchBrands();
    },
    components: {CreateBrand},
    methods: {
      async fetchBrands() {
        try {
          const response = await modelApi.getBrands();
          console.log(response.data)
          this.brands = response.data;
        } catch (error) {
          console.error('Ошибка при загрузке марок:', error);
        }
      },
      async deleteBrand(id) {
        try {
          await modelApi.deleteBrands(id);
          this.brands = this.brands.filter(brand => brand.id !== id);
        } catch (error) {
          console.error('Ошибка при удалении сценария:', error);
        }
      },
      async addBrand(brand) {
        try {
          const response = await modelApi.createBrand(brand);
          this.brands.push(response.data);
          this.showCreatePanel = false;
        } catch (error) {
          console.error('Ошибка при добавлении сценария:', error);
        }
      },
      async updateBrand(brand){
        try {
          const response = await modelApi.updateBrand(this.selectedBrand, brand);
          const updatedBrand = response.data;
          this.brands = this.brands.filter(brand => brand.id !== updatedBrand.id);
          this.brands.push(updatedBrand);
          this.showUpdatePanel = false;
        } catch (error) {
          console.error('Ошибка при обновлении сценария:', error);
        }
      },
      exitPage(){
        this.$router.push('/');
      }
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
    max-width: 200px;
    width: auto;
    height: auto;
    border: 1px solid var(--contour-elements);
    text-align: center;
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
  li button{
    border: 1px solid var(--contour-elements);
    height: 25px;
    width: 70%;
    padding: 0 5px 0 5px;
    margin: 0;
    border-radius: 5px;
    cursor: pointer;
    background-color: inherit;
    color: var(--contour-elements);
    text-align: center;
  }
  .closeIcon {
    
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
  background-color: var(--contour-elements); /* Цвет палочек крестика */
}

.closeIcon::before {
  transform: rotate(45deg); /* Первая палочка крестика */
}
.closeIcon::after {
  transform: rotate(-45deg); /* Вторая палочка крестика */
}
#deleteBrand{
  width: 25px; /* Ширина квадрата */
  height: 25px; /* Высота квадрата */
}
#deleteBrand::before, #deleteBrand::after{
  width: 20px; /* Ширина палочек крестика */
  height: 1px; /* Высота палочек крестика */
}
#exitPage{
  position: absolute;
  top:25px; right: 25px;
  width: 50px; /* Ширина квадрата */
  height: 50px; /* Высота квадрата */
}
#exitPage::before, #exitPage::after{
  width: 25px; /* Ширина палочек крестика */
  height: 3px; /* Высота палочек крестика */
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