<template>
    <div class="overlay">
      <div class="create-panel">
        <h2 style="margin-top: 0; margin-bottom: 15px;">Создать новый сценарий</h2>
        <form @submit.prevent="createScenario">
            <input type="text" v-model="name" required placeholder="Название"/>
            <select v-model="model" required>
                <option disabled value="">Выберите модель</option>
                <option v-for="model in models" :key="model.id" :value="model.name">{{ model.name }}</option>
            </select>
            <button class="fira-sans-regular" type="submit">Сохранить</button>
            <button class="fira-sans-regular" type="button" @click="$emit('close')">Отменить</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import api from '@/services/api';

  export default {
    data() {
      return {
        name: '',
        model: '',
        models: []
      };
    },
    mounted() {
        this.fetchModels();
    },
    methods: {
        async fetchModels() {
            try {
                const response = await api.getModels();
                this.models = response.data;
            } catch (error) {
                console.error('Ошибка при загрузке списка моделей:', error);
            }
        },
      createScenario() {
        const newScenario = {
          name: this.name,
          model_name: this.model,
        };
        this.$emit('create', newScenario);
        this.name = '';
        this.model = '';
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
  