import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/ui/views/Login.vue';
import Register from '@/ui/views/Register.vue';
import MainEditor from '@/ui/views/MainEditor.vue';
import Scenarios from '@/ui/views/Scenarios.vue';
import { useAuthStore } from './stores/authStore';
import UserList from '@/ui/views/Admin/UserList.vue';
import BrandList from '@/ui/views/Admin/BrandList.vue';
import ModelList from '@/ui/views/Admin/ModelList.vue';
import CanCommandList from '@/ui/views/Admin/CanCommandList.vue';

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
