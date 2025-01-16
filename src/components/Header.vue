<template>
  <header
    class="sticky top-0 z-50 flex w-full bg-green-700 text-white shadow-md dark:bg-boxdark dark:drop-shadow-none"
  >
    <div class="flex w-full items-center justify-between py-4 px-4 md:px-6 2xl:px-11">
      <div class="flex items-center">
        <button
          class="text-white focus:outline-none md:hidden mr-4"
          @click="$emit('toggle-sidebar')"
        >
        
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div class="relative flex items-center gap-3">
        <img
          src="https://images.pexels.com/photos/29725797/pexels-photo-29725797/free-photo-of-festive-scrabble-tiles-for-merry-christmas.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt="Profile"
          class="h-10 w-10 rounded-full cursor-pointer"
          @click="toggleDropdown"
        />
        <div
          v-if="isDropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg py-2"
          :style="{ top: '100%' }" 
        >
          <button
            @click="logout"
            class="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import axiosInstance from "@/utils/axiosInstance";
import { useAuthStore } from "@/stores/authStore";
import { useAlertStore } from "@/stores/alertStore";

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
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    logout() {
      const authStore = useAuthStore();
      const alertStore = useAlertStore();
      axiosInstance
        .post("/logout")
        .then((res) => {
          authStore.isLogIn = false;
          sessionStorage.removeItem("access-token");
          sessionStorage.removeItem('type')
          sessionStorage.clear();
          alertStore.setAlertMessage({
            message: res.data.message,
            type: "success",
          });
          this.$router.push("/");
        })
        .catch((error) => {
          alertStore.setAlertMessage({
            message: error.response.data.message,
            type: "error",
          });
        });
    },
    handleClickOutside(event) {
      const dropdown = this.$el.querySelector(".relative");
      if (dropdown && !dropdown.contains(event.target)) {
        this.closeDropdown();
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
</style>