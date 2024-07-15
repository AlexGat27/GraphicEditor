<template>
    <div class="overlay">
      <div class="create-panel">
        <h2 style="margin-top: 0; margin-bottom: 15px;">{{ action }} сценарий</h2>
        <form @submit.prevent="createScenario">
            <input type="text" v-model="name" required placeholder="Название"/>
            <select v-model="brand_id" required>
                <option disabled value="">Выберите марку</option>
                <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
            </select>
            <select v-model="model_id" required>
              <option disabled value="">Выберите модель</option>
              <option v-for="model in models" :key="model.id" :value="model.id">{{ model.name }}</option>
            </select>
            <button class="fira-sans-regular" type="submit">Сохранить</button>
            <button class="fira-sans-regular" type="button" @click="$emit('close')">Отменить</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import { modelApi } from '@/services/api';

  export default {
    props:{
      action: {
        type: String,
        required: true
      }
    },  
    data() {
      return {
        name: '',
        brand_id: null,
        model_id: null,
        brand_models: []
      };
    },
    mounted() {
      this.fetchModels();
    },
    computed:{
      brands() {
        // Используем reduce для создания нового массива брендов
        return this.brand_models.reduce((acc, item) => {
          // Проверяем, существует ли уже бренд в новом массиве
          if (!acc.some(brand => brand.id === item.brand_id)) {
            acc.push({
              id: item.brand_id,
              name: item.brand_name
            });
          }
          return acc;
        }, []);
      },
      models() {
        // Фильтруем модели на основе выбранного brand_id
        if (!this.brand_id) return [];
        return this.brand_models
          .filter(item => item.brand_id === this.brand_id)
          .map(item => ({
            id: item.model_id,
            name: item.model_name
          }));
      }
    },
    methods: {
        async fetchModels() {
            try {
                const response = await modelApi.getModels();
                this.brand_models = response.data;
            } catch (error) {
                console.error('Ошибка при загрузке списка моделей:', error);
            }
        },
      createScenario() {
        const newScenario = {
          name: this.name,
          brand_id: this.brand_id,
          model_id: this.model_id
        };
        this.$emit('create', newScenario);
        this.brand_id = null;
        this.model_id = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .create-panel {
    background: var(--background-editorfield);
    padding: 20px;
    border-radius: 5px;
  }
  form{
    display: flex;
    flex-direction: column;
  }
  input, select{
    border: 1px solid var(--contour-elements);
    height: 30px;
    margin:0;
    width: calc(100% - 20px);
    border-radius: 5px;
    cursor: pointer;
    background-color: inherit;
    color: var(--contour-elements);
    padding: 0 10px 0 10px;
    margin-bottom: 10px;
    overflow: hidden;
  }
  select{
    width: 100%;
  }
  button{
    background-color: #d9d9d9; color: black;
    border-radius: 5px; height: 30px;
    cursor: pointer; margin-bottom: 5px;
  }
  </style>
  