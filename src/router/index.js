import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Dashboard from '@/views/Dashboard.vue';
import Jobs from '@/views/Jobs.vue';
import NotFound from '@/views/NotFound.vue';
import JobView from '@/views/JobView.vue';
import LocalStorageService from '@/utils/LocalStorageService';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: Jobs
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/job/:id',
      name: 'job',
      component: JobView
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (!LocalStorageService.isLoggedIn()) {
    if (to.name === 'home' || to.name === 'jobs' || to.name === 'job' || to.name === 'login' || to.name === 'register') {
      next();
    } else {
      next({ name: 'home' });
    }
  } else {
    next();
  }
})
export default router
