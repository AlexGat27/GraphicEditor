import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import MainEditor from './views/MainEditor.vue';
import Scenarios from './views/Scenarios.vue';
import { useAuthStore } from './stores/authStore';

const routes = [
  {
    path: '/',
    name: 'MainEditor',
    component: MainEditor,
    meta: { requiresAuth: true }
  },
  {
    path: '/scenarios',
    name: 'Scenarios',
    component: Scenarios,
    meta: { requiresAuth: true }
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

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authStore = useAuthStore();
    await authStore.checkAuth();
    next()
  }else{
    next();
  }
});

export default router;
