<template>
    <div class="modelList-view">
      <h1>Список моделей марки {{ brand_name }}</h1>
      <ul>
        <li v-for="model in models" :key="model.id" :class="{ selected: selectedModel === model.id }"
        @click="selectedModel = model.id" @dblclick="showUpdatePanel = true">
          <h3 style="margin: 5px; word-wrap: break-word;">{{ model.name }}</h3>
          <div style="display: flex; width: 100%; justify-content: end; margin-top: 10px;">
            <div id="deleteModel" class="closeIcon" @click.stop="deleteModel(model.id)"></div>
          </div>
          
        </li>
        <div class="circle" @click="showCreatePanel = true">+</div>
      </ul>  
      <CreateModel :action="'Добавить новую'" v-if="showCreatePanel" @close="showCreatePanel = false" 
      @create="addModel" :brand_id="brand_id" :modelAttributes="defaultAttributes"/>
      <CreateModel :action="'Обновить'" v-if="showUpdatePanel" @close="showUpdatePanel = false" 
      @create="updateModel" :brand_id="brand_id" :modelAttributes="currentAttributes"/>
      <div id="exitPage" class="closeIcon" @click="exitPage"></div>
    </div>
  </template>
  
  <script>
import CreateModel from '@/components/shared/CreateModel.vue';
import { ModelAttributes, ConditionAttribute, ActionAttribute } from '@/models/modelAttributes';
import { modelApi } from '@/services/api';
  export default {
    data() {
      return {
        brand_name: '',
        brand_id: null,
        models: [],
        showCreatePanel: false,
        showUpdatePanel: false,
        selectedModel: null
      };
    },
    async created(){
        this.brand_id = parseInt(this.$route.query.brand_id);
        this.brand_name = this.$route.query.brand_name;
        await this.fetchModels(this.brand_id);
    },
    components: {CreateModel},
    computed:{
      currentAttributes(){
        const attributes = this.models.find(model => this.selectedModel === model.id).data;
        return new ModelAttributes(attributes.scenario, attributes.conditionAttributes, attributes.actionAttributes);
      },
      defaultAttributes(){
        return new ModelAttributes('', [new ConditionAttribute()], new ActionAttribute());
      }
    },
    methods: {
      async fetchModels(brand_id) {
        try {
          const response = await modelApi.getBrandModels(brand_id);
          console.log(response.data)
          this.models = response.data;
        } catch (error) {
          console.error('Ошибка при загрузке моделей:', error);
        }
      },
      async deleteModel(id) {
        try {
          await modelApi.deleteModel(id);
          this.models = this.models.filter(model => model.id !== id);
        } catch (error) {
          console.error('Ошибка при удалении сценария:', error);
        }
      },
      async addModel(model) {
        try {
          const response = await modelApi.createModel(model);
          console.log(response);
          this.models.push(response.data.model);
          this.showCreatePanel = false;
        } catch (error) {
          console.error('Ошибка при добавлении сценария:', error);
        }
      },
      async updateModel(model){
        try {
          const response = await modelApi.updateModel(this.selectedModel, model);
          const updatedModel = response.data;
          this.models = this.models.filter(model => model.id !== updatedModel.id);
          this.models.push(updatedModel);
          this.showUpdatePanel = false;
        } catch (error) {
          console.error('Ошибка при обновлении сценария:', error);
        }
      },
      exitPage(){
        this.$router.push('/admin/brands');
      }
    },
  };
  </script>
  
<style scoped>
  .modelList-view{
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
    padding: 10px;
    cursor: pointer;
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
#deleteModel{
  width: 25px; /* Ширина квадрата */
  height: 25px; /* Высота квадрата */
}
#deleteModel::before, #deleteModel::after{
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