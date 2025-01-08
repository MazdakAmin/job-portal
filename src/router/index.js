import { createRouter, createWebHistory } from 'vue-router';

// Views
import HomeView from '@/views/HomeView.vue';
import Dashboard from '@/views/Dashboard.vue';
import Jobs from '@/views/Jobs.vue';
import NotFound from '@/views/NotFound.vue';
import JobView from '@/views/JobView.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import UserView from '@/views/admin/UserView.vue';

//stores 
import { useAuthStore } from '@/stores/authStore';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: Jobs,
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound,
  },
  {
    path: '/job/:id',
    name: 'job',
    component: JobView,
  },
  {
    path: '/users',
    name: 'users',
    component: UserView,
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore;
  const { isLogin, type } = authStore;
  const publicRoutes = ['home', 'jobs', 'job', 'login', 'register'];
console.log(type)
  if (!isLogin && !publicRoutes.includes(to.name)) {
    return next({ name: 'home' });
  }

  if (type === 'user' && ['panel-jobs', 'users'].includes(to.name)) {
    return next({ name: 'home' });
  }

  if (to.meta.requiresAdmin && type !== 'admin') {
    return next({ name: 'home' });
  }

  next();
});

export default router;
