<template>
    <div class="block">
      <label>Выбор модели</label>
      <select v-model="currentModel" @change="$emit('model', currentModel)">
        <option v-for="model in models" :value="model">{{ model.name }}</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data(){
      return {
        currentModel: {name: '', conditionAttributes: [], actionAttributes: {}, paramAttributes: {}},
        models: null,
      }
    },
    created(){
      fetch('src/models/models.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.models = data;
        this.currentModel = data[0];
        this.$emit("model", this.currentModel);
      }).catch(er => console.error(er))
    },
    
  }
  </script>
  
  <style scoped>
    .block select{
      border: 1px solid white;
      border-radius: 10px;
      cursor: pointer;
      color: white;
    }
    .block{
      width: 80%;
      height: 50px;
      margin: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      background-color: none;
    }
    label{
      margin-bottom:5%;
      color: white;
    }
  </style>