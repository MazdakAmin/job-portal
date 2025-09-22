<template>
  <v-app-bar color="green-darken-3" dark>
    <v-toolbar-title>
      <RouterLink to="/" class="text-white no-underline">
        <v-img
          src="@/assets/img/logo.png"
          alt="Vue Jobs"
          max-height="40"
          class="mr-2"
        />
        Vue Jobs
      </RouterLink>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/jobs">Jobs</v-btn>
    <v-btn v-if="isLogin" text to="/dashboard">Dashboard</v-btn>
    <v-btn v-if="!isLogin" text to="/login">Login</v-btn>
    <v-btn v-if="!isLogin" text to="/register">Register</v-btn>

    <v-btn
      v-if="isLogin && isUser"
      color="green-darken-1"
      class="ml-2"
      @click="toggelModal"
    >
      Become Employer
    </v-btn>
  </v-app-bar>
</template>

<script>
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

export default {
  components: { RouterLink },
  data: () => ({
    modalActive: false,
  }),
  methods: {
    toggelModal() {
      this.modalActive = !this.modalActive;
    },
  },
  computed: {
    isLogin() {
      return useAuthStore().isLogin;
    },
    isUser() {
      return useAuthStore().type === "user";
    },
  },
};
</script>



