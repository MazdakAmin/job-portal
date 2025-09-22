<template>
  <v-app>
    <!-- ===== Sidebar ===== -->
    <Sidbar v-model:isOpen="isSidebarOpen" />

    <!-- ===== Header ===== -->
    <v-app-bar app color="white" flat>
      <Header @toggle-sidebar="toggleSidebar" />
    </v-app-bar>

    <!-- ===== Main Content ===== -->
    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-4 pa-md-6 pa-xl-10">
        <AlertMessage />
        <ConfirmModal />
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidbar from "@/components/Sidbar.vue";
import Header from "@/components/Header.vue";
import AlertMessage from "@/components/AlertMessage.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

export default {
  components: { Sidbar, Header, AlertMessage, ConfirmModal },
  data() {
    return {
      isSidebarOpen: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>
