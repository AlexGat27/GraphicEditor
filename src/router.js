import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import MainEditor from './views/MainEditor.vue';
import Scenarios from './views/Scenarios.vue';
import { useAuthStore } from './stores/authStore';
import UserList from './views/Admin/UserList.vue';
import BrandList from './views/Admin/BrandList.vue';
import ModelList from './views/Admin/ModelList.vue';
import CanCommandList from './views/Admin/CanCommandList.vue';

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
  },
  {
    path: '/admin/users',
    name: 'UserList',
    component: UserList,
    meta: {requiresAdmin: true}
  },
  {//
    path: '/admin/brands',
    name: 'BrandList',
    component: BrandList,
    meta: {requiresAdmin: true}
  },
  {
    path: '/admin/models',
    name: 'ModelList',
    component: ModelList,
    meta: {requiresAdmin: true}
  },
  {
    path: '/admin/canCommands',
    name: 'CanCommandList',
    component: CanCommandList,
    meta: {requiresAdmin: true}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  let redirect = false;
  
  const authStore = useAuthStore();
  await authStore.checkAuth();
  console.log(authStore.isAdmin)
  if ((to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) ||
      (to.matched.some(record => record.meta.requiresAdmin) && !authStore.isAdmin)) redirect = true;
  if (redirect) next( {name: 'Login'} )
  else next();
});

export default router;
