import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import MainEditor from './views/MainEditor.vue';

const routes = [
  {
    path: '/',
    name: 'MainEditor',
    component: MainEditor
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
