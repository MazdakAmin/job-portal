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
              <RouterLink to="/" :class="[
                'text-white',
                isRouteActive('/')
                  ? 'bg-green-900'
                  : 'hover:bg-gray-900 hover:text-white',
                'rounded-md',
                'px-3',
                'py-2',
              ]">
                Home
              </RouterLink>
              <RouterLink to="/jobs" :class="[
                'text-white',
                isRouteActive('/jobs')
                  ? 'bg-green-900'
                  : 'hover:bg-gray-900 hover:text-white',
                'rounded-md',
                'px-3',
                'py-2',
              ]">Jobs
              </RouterLink>
              <RouterLink
              v-if="isLogIn" 
              to="/dashboard"
               class="text-white hover:bg-green-900 hover:text-white rounded-md px-3 py-2">Dashboard</RouterLink>

               <button 
               v-if="!isLogIn"
               @click.prevent="toggelForm"
               class="text-white hover:bg-green-900 hover:text-white rounded-md px-3 py-2"
               >Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
    <div v-if="showLoginForm" class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-10">
      <div class="bg-white p-6 rounded-lg shadow-md w-11/12 md:w-1/3">
        <h2 class="text-2xl font-bold text-green-800 mb-6">Login to Your Account</h2>
        <!-- Login Form -->
        <form >
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
  
          <button
            type="submit"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
  
        <button @click.prevent="toggelForm" class="mt-4 text-center w-full text-red-500 font-bold">
          Cancel
        </button>
      </div>
    </div>
  
</template>
<script>
import logo from "@/assets/img/logo.png";
import { RouterLink, useRoute } from "vue-router";
import LocalStorageService from "@/utilites/LocalStorageService";
export default {
  data() {
    return {
      logo: logo,
      isLogIn:false,
      showLoginForm : false
    }
  },
  components: {
    RouterLink
  },
  methods: {
    isRouteActive(path) {
      const route = useRoute();
      return route.path == path;
    },
    isLoggedIn(){
      this.isLogIn = LocalStorageService.isLoggedIn();
    },
    toggelForm(){
      this.showLoginForm = !this.showLoginForm
    }
  },
  mounted() {
    this.isLoggedIn();
  }
}
</script>