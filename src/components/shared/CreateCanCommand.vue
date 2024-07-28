<template>
    <div class="overlay">
      <div class="create-panel">
        <h2 style="margin-top: 0; margin-bottom: 15px;">Добавить новую команду</h2>
        <form @submit.prevent="createModel">
            <input type="text" v-model="name" required placeholder="Название"/>
            <input type="text" v-model="command_id" required placeholder="Идентификатор"/>
            <button class="fira-sans-regular" type="submit">Сохранить</button>
            <button class="fira-sans-regular" type="button" @click="$emit('close')">Отменить</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    props:{
      model_id: {
        required: true,
        type: Number
      }
    },
    data() {
      return {
        name: '',
        command_id: ''
      };
    },
    methods: {
      createModel() {
        const newModel = {
            model_id: this.model_id,
            name: this.name,
            command_id: this.command_id,
            byte_1: 0,
            byte_2: 0,
            byte_3: 0,
            byte_4: 0,
            byte_5: 0,
            byte_6: 0,
            byte_7: 0,
            byte_8: 0,
        };
        this.$emit('create', newModel);
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
  