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
              <NavLink to="/">Home</NavLink>
              <NavLink to="/jobs">Jobs</NavLink>
              <NavLink v-if="isLogin" to="/dashboard">Dashboard</NavLink>
              <NavLink v-if="!isLogin" to="/login">Login</NavLink>
              <NavLink v-if="!isLogin" to="/register">Register</NavLink>
              <button
                class="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                @click="toggelModal"
                v-if="isLogin && isUser"
                :class="{'bg-green-900': modalActive}"
              >
                Become Employer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div v-if="modalActive" class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-10">
    <div class="bg-white p-6 rounded-lg shadow-md w-11/12 md:w-3/4">
      <h2 class="text-2xl font-bold text-green-800 mb-6">Register As Employer</h2>
      <form @submit.prevent="onSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Job Title -->
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              id="name"
              v-model="formData.companyName"
              placeholder="Enter Company Name"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <!-- Salary -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Company Email</label>
            <input
              type="email"
              id="email"
              v-model="formData.companyEmail"
              placeholder="Enter Email"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <!-- Location -->
          <!-- <div class="mb-4">
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              v-model="formData.location"
              id="location"
              placeholder="Enter job location"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div class="mb-4">
            <label for="number" class="block text-sm font-medium text-gray-700">Number</label>
            <input
              type="text"
              id="number"
              v-model="formData.number"
              placeholder="Enter Number"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div> -->
        </div>
        <!-- dis -->
        <div class="mb-4">
          <label for="info" class="block text-sm font-medium text-gray-700">Company info</label>
          <textarea
            id="info"
            placeholder="Enter company info"
            rows="4"
            v-model="formData.companyDesc"
            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>

      <!-- Cancel Button -->
      <button @click.prevent="toggelModal()" class="mt-4 text-center w-full text-red-500 font-bold">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/img/logo.png";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import axiosIntance from "@/utils/axiosInstance";
import { useAlertStore } from "@/stores/alertStore";
import NavLink from "@/components/NavLink.vue";
export default {
  data() {
    return {
      logo: logo,
      modalActive: false,
      formData:{
        companyName:'',
        companyEmail:'',
        companyDesc:'',
      },
      formError:{
        companyname:''
      }
    };
  },
  components: {
    RouterLink,
    NavLink
  },
  
  methods: {
    toggelModal(){
      this.modalActive = !this.modalActive;
    },
    async onSubmit()
    {
      const alertStore = useAlertStore();
      try{
        const response = await axiosIntance.post('/employer/create',this.formData);
        const authStore = useAuthStore();
        const type = 'employer'
        authStore.type = type ;
        sessionStorage.setItem('type' , type);
        alertStore.setAlertMessage(response?.data?.message || "Now you can add jobs too!",'success');
        this.toggelModal();
      }catch(error){
        console.log(error);
     alertStore.setAlertMessage(error?.response?.data?.message,'error')
        
      }
    }
  },
  computed:{
    isLogin(){
      const authStore = useAuthStore();
      return authStore.isLogin
    },
    isUser(){
      const authStore = useAuthStore();
      return authStore.type === 'user';
    }
  }
};
</script>
