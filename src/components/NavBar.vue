<template>
  <nav class="bg-green-700 border-b border-green-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2">Vue Jobs</span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink to="/" :class="[ 'text-white', isRouteActive('/') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white', 'rounded-md', 'px-3', 'py-2']">
                Home
              </RouterLink>
              <RouterLink to="/jobs" :class="[ 'text-white', isRouteActive('/jobs') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white', 'rounded-md', 'px-3', 'py-2']">
                Jobs
              </RouterLink>
              <RouterLink v-if="isLogin" to="/dashboard" class="text-white hover:bg-green-900 hover:text-white rounded-md px-3 py-2">Dashboard</RouterLink>
              <RouterLink to="/login" :class="[ 'text-white', isRouteActive('/login') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white', 'rounded-md', 'px-3', 'py-2']" v-if="!isLogin">Login</RouterLink>
              <RouterLink to="/register" :class="[ 'text-white', isRouteActive('/register') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white', 'rounded-md', 'px-3', 'py-2']" v-if="!isLogin">Register</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import logo from "@/assets/img/logo.png";
import { RouterLink } from "vue-router";
import LocalStorageService from "@/utils/LocalStorageService";
import { isRouteActive } from "@/utils/routeUtils";
import { useAuthStore } from "@/stores/authStore";
export default {
  data() {
    return {
      logo: logo,
    };
  },
  components: {
    RouterLink
  },
  methods: {
    isLoggedIn() {
      this.isLogIn = LocalStorageService.isLoggedIn();
    },
    isRouteActive
  },
  mounted() {
    this.isLoggedIn();
  },
  computed:{
    isLogin(){
      const authStore = useAuthStore();
      return authStore.isLogin
    }
  }
};
</script>
