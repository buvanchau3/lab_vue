import { createRouter, createWebHistory } from 'vue-router';
import CategoryList from './components/CategoryList.vue';
import CategoryDetail from './components/CategoryDetail.vue';
import Login from './components/Login.vue';
import Products from './components/Products.vue';
import Register from './components/Register.vue';
import admin from './components/admin.vue';
import Homes from './components/Homes.vue';

const routes = [
  {
    path: '/',
    name: 'homes',
    component: Homes,

  },
  {
   path: '/admin',
   name: 'admin',
   component: admin
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryList,
  },
  {
    path: '/categories/:id',
    name: 'categoryDetail',
    component: CategoryDetail,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/products',
    name: 'products',
    component: Products,
  },
  {
    path: '/register',
    name: 'register',
    component: Register  
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
