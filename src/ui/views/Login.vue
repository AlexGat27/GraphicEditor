<template>
    <div class="login-container">
      <h2 class="fira-sans-medium">Авторизация</h2>
      <form @submit.prevent="login" class="login-form">
        <input v-model="username" placeholder="Username" required class="login-input">
        <input v-model="password" type="password" placeholder="Password" required class="login-input">
        <button type="submit">Вход</button>
        <span v-if="isAuthError" class="errorMsg fira-sans-regular">Ошибка авторизации</span>
      </form>
      <button @click="goToRegister">Регистрация</button>
    </div>
  </template>
  
  <script>
import { authApi } from '@/services/api/index.js';
import {useAuthStore} from "@/stores/authStore.js";

  export default {
    data() {
      return {
        username: '',
        password: '',
        isAuthError: false,
        authStore: null,
      };
    },
    created() {
      this.authStore = useAuthStore();
    },
    methods: {
      async login() {
        await this.$recaptchaLoaded();
        const recaptchaToken = await this.$recaptcha('login');
        this.isAuthError = await this.authStore.login(this.username, this.password, recaptchaToken);
        if (!this.isAuthError) {
          this.$router.push({name: 'MainEditor'});
        }
      },
      goToRegister(){
        this.$router.push({name: 'Register'});
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
  
  .login-form {
    width: 300px;
    padding: 20px;
    background-color: #f1f1f1;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  
  .login-input {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: "Fira Sans", sans-serif;
  }

  button{
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
  
  .login-form button {
    width: 100%;
    padding: 10px;
    background-color: var(--background-editorfield);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-family: "Fira Sans", sans-serif;
    margin-bottom: 5px;
  }
  
  .login-form button:hover {
    background-color: var(--selected-block);
  }
  
  h2 {
    text-align: center;
    color: white;
    margin-bottom: 20px;
  }

  .errorMsg{
    color: red;
    font-size: 12px;
  }

  @media(max-width: 420px){
    .login-form{
        width: 75%;
    }
    button{
        width: 90%;
    }
    
  }
  </style>
  