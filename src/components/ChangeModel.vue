<template>
    <div class="block">
      <label>Выбор модели</label>
      <select v-model="currentModel" @change="updateModel">
        <option v-for="model in models" :value="model">{{ model.name }}</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data(){
      return {
        currentModel: {name: '', actions: [], conditions: [], events: [], params: []},
        models: null,
      }
    },
    created(){
      fetch('src/config/models.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.models = data;
        this.currentModel = data[0];
        this.updateModel();
      }).catch(er => console.error(er))
    },
    methods: {
      updateModel() {
        this.$emit('model', this.currentModel);
      }
    }
  }
  </script>
  
  <style>
    .block{
      width: 80%;
      height: 50px;
      margin: 5px;
      border: 1px solid black;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: space-center;
      justify-content: center;
      overflow: hidden;
      padding: 10px;
    }
    p{
      margin:0;
      text-align: center;
    }
  </style>