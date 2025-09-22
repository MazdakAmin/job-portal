<template>
  <v-app-bar color="green-darken-2" dark flat>
    <!-- Sidebar Toggle -->
    <v-app-bar-nav-icon
      class="d-md-none"
      @click="$emit('toggle-sidebar')"
    ></v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <!-- User Menu -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-avatar v-bind="props" class="cursor-pointer">
          <v-img
            src="https://images.pexels.com/photos/29725797/pexels-photo-29725797/free-photo-of-festive-scrabble-tiles-for-merry-christmas.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Profile"
          ></v-img>
        </v-avatar>
      </template>

      <v-list>
        <v-list-item @click="editProfile">
          <v-list-item-title>Edit Profile</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import axiosInstance from "@/utils/axiosInstance";
import { useAuthStore } from "@/stores/authStore";
import { useAlertStore } from "@/stores/alertStore";

export default {
  methods: {
    editProfile() {
      this.$router.push("/edit-profile");
    },
    logout() {
      const authStore = useAuthStore();
      const alertStore = useAlertStore();

      axiosInstance
        .get("/logout")
        .then((res) => {
          if (res?.status === 404) {
            alertStore.setAlertMessage({
              message: res.data.message,
              type: "error",
            });
            return;
          }

          authStore.isLogin = false;
          sessionStorage.clear();

          alertStore.setAlertMessage({
            message: res.data.message,
            type: "success",
          });
          this.$router.push("/");
        })
        .catch((error) => {
          alertStore.setAlertMessage({
            message: error?.response?.data?.message || "Something went wrong",
            type: "error",
          });
        });
    },
  },
};
</script>
