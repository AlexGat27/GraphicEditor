<template>
    <div>
      <div class="sidenav-overlay" @click="closeSidenav"></div>
      <div class="sidenav">
        <button v-if="!isAuthenticated" class="fira-sans-regular" @click="goToLogin">Login</button>
        <button v-if="!isAuthenticated" class="fira-sans-regular" @click="goToRegister">Register</button>
        <button v-if="isAuthenticated" class="fira-sans-regular" @click="">Мои сценарии</button>
        <button v-if="isAuthenticated" class="fira-sans-regular" @click="logout">Выход</button>
      </div>
  </div>
  </template>
  
  <script>
import api from '@/services/api';
import { useAuthStore } from '@/stores/authStore';

  export default {
    created() {
      this.authStore = useAuthStore();
    },
    computed:{
      isAuthenticated(){
        return this.authStore.isAuthenticated;
      }
    },
    methods: {
      closeSidenav() {
        this.$emit('close');
      },
      goToLogin() {
        this.$router.push('/login');
        this.closeSidenav();
      },
      goToRegister() {
        this.$router.push('/register');
        this.closeSidenav();
      },
      logout(){
        this.authStore.logout();
      }
    }
  }
  </script>
  
  <style scoped>
  .sidenav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1002;
    width: 250px;
    height: 100%;
    background-color: var(--background-toolbox-scenario);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 0 5px rgba(0,0,0,0.5);
  }
  .sidenav button {
    background-color: #d9d9d9;
    color: black;
    margin: 10px 0;
    border-radius: 5px;
    height: 40px;
    cursor: pointer;
    width: 150px;
    font-size: 14px;
  }
  @media (max-width: 420px){
    .sidenav{
      width: 100%;
    }
  }

  .sidenav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* полупрозрачный черный цвет */
    z-index: 1001; /* ниже z-index сайднава, чтобы сайднав был поверх затемнения */
  }
  </style>
  