<template>
    <div class="registration-container">
      <h2 class="fira-sans-medium">Регистрация</h2>
      <form @submit.prevent="register" class="registration-form">
        <input v-model="username" placeholder="Username" required class="registration-input">
        <input v-model="password" type="password" placeholder="Password" required class="registration-input">
        <button type="submit">Зарегистрироваться</button>
      </form>
      <button @click="goToRedactor">Вернуться в редактор</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async register() {
        // Ваш код для регистрации
      },
      goToRedactor() {
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  .registration-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
  
  .registration-form {
    width: 300px;
    padding: 20px;
    background-color: #f1f1f1;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  
  .registration-input {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: "Fira Sans", sans-serif;
  }
  
  button {
    width: 340px;
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 5px;
    color: var(--background-editorfield);
    cursor: pointer;
    font-size: 16px;
    font-family: "Fira Sans", sans-serif;
    margin-top: 15px;
  }
  
  .registration-form button {
    width: 100%;
    padding: 10px;
    background-color: var(--background-editorfield);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-family: "Fira Sans", sans-serif;
  }
  
  .registration-form button:hover {
    background-color: var(--selected-block);
  }
  
  h2 {
    text-align: center;
    color: white;
    margin-bottom: 20px;
  }
  
  @media(max-width: 420px) {
    .registration-form {
      width: 75%;
    }
    button{
        width: 90%;
    }
  }
  </style>
  