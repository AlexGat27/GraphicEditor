<template>
    <div class="overlay">
      <div class="create-panel">
        <h2 style="margin-top: 0; margin-bottom: 15px;">Добавить новую марку</h2>
        <form @submit.prevent="createBrand">
            <input type="text" v-model="name" required placeholder="Название"/>
            <button class="fira-sans-regular" type="submit">Сохранить</button>
            <button class="fira-sans-regular" type="button" @click="$emit('close')">Отменить</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    data() {
      return {
        name: '',
      };
    },
    methods: {
      createBrand() {
        const newBrand = {
          name: this.name,
        };
        this.$emit('create', newBrand);
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
    z-index: 10;
  }
  
  .create-panel {
    background: var(--background-editorfield);
    padding: 20px;
    border-radius: 5px;
    z-index: 11;
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
  