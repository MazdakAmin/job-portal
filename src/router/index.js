import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Dashboard from '@/views/Dashboard.vue';
import Jobs from '@/views/Jobs.vue';
import NotFound from '@/views/NotFound.vue';
import JobView from '@/views/JobView.vue';
import LocalStorageService from '@/utilites/LocalStorageService';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
    if (to.name === 'home' || to.name === 'jobs' || to.name === 'job') {
      next();
    } else {
      next({ name: 'home' });
    }
  } else {
    next();
  }
})
export default router
