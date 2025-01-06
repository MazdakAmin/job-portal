<template>
  <NavBar />
  <AlertMessage />
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-md w-11/12 sm:w-96">
        <h2 class="text-2xl font-bold text-green-800 mb-6">Login to Your Account</h2>
        
        <!-- Login Form -->
        <form @submit.prevent="onSubmit">
          <!-- Email Field -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" v-model="formData.email" id="email" name="email" placeholder="Enter your email"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
            <p class="text-red-600" v-if="errorMessage.email">{{ errorMessage.email }}</p>
          </div>
  
          <!-- Password Field -->
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" v-model="formData.password" id="password" name="password" placeholder="Enter your password"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
            <p class="text-red-600" v-if="errorMessage.password">{{ errorMessage.password }}</p>
          </div>
  
          <!-- Submit Button -->
          <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">
            Login
          </button>
        </form>
  
        <!-- Register Link -->
        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600">Don't have an account? <RouterLink to="/register" class="text-green-500 font-bold">Register here</RouterLink></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useAlertStore } from '@/stores/alertStore';
  import axiosInstance from '@/utils/axiosInstance';
  import NavBar from '@/components/NavBar.vue';
  import AlertMessage from '@/components/AlertMessage.vue';
  import { useAuthStore } from '@/stores/authStore';
  export default {
    data() {
      return {
        formData: {
          email: '',
          password: '',
        },
        errorMessage: {
          email: '',
          password: '',
        }
      };
    },
    components:{
      NavBar,
      AlertMessage
    },
    methods: {
      onSubmit() {
        this.errorMessage.email = '';
        this.errorMessage.password = '';
        let isValid = true;
  
        if (!this.formData.email) {
          this.errorMessage.email = 'Email is required.';
          isValid = false;
        } else if (!this.isValidEmail(this.formData.email)) {
          this.errorMessage.email = 'Please enter a valid email address.';
          isValid = false;
        }
        if (!this.formData.password) {
          this.errorMessage.password = 'Password is required.';
          isValid = false;
        }
  
        if (!isValid) return;
        const alertStore = useAlertStore();
        axiosInstance.post('/user/login', this.formData)
          .then((response) => {
            alertStore.setAlertMessage("You are logged in welcome!", 'success');
            const authStore = useAuthStore();
            authStore.login(response.data)
            console.log(response.data)
            this.$router.push('/');
          })
          .catch((error) => {
            alertStore.setAlertMessage(error.response.data.message, 'error');
          });
      },
      isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
      },
    }
  };
  </script>
  