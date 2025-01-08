<template>
  <header
    class="sticky top-0 z-999 flex w-full bg-green-700 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"
  >
    <div class="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
      <div class="flex items-center gap-2 sm:gap-4 lg:hidden">
        
      </div>
      <div class="hidden sm:block"></div>

      <div class="flex items-center gap-3 2xsm:gap-7">
        <div class="relative">
          <img
            src="https://images.pexels.com/photos/29725797/pexels-photo-29725797/free-photo-of-festive-scrabble-tiles-for-merry-christmas.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Profile"
            class="h-10 w-10 rounded-full  cursor-pointer"
            @click="toggleDropdown"
          />

          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
          >
            <button
              class="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              @click.prevent="logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import axiosInstance from '@/utils/axiosInstance';
import { useAuthStore } from "@/stores/authStore"; 
import { useAlertStore } from '@/stores/alertStore';
export default {
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    logout() {
  const authStore = useAuthStore(); 
  const alertStore = useAlertStore();
  axiosInstance.post('/user/logout')
    .then((res) => {
      authStore.logout();
      console.log(res)
      this.$router.push('/');
    })
    .catch((error) => {
      alertStore.setAlertMessage(error?.response?.data?.message || "Somthing went wrong" , 'error');
    });
},
  },
};
</script>

<style scoped>
</style>