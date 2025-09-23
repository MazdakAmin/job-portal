<template>
  <v-app>
    <!-- ===== Sidebar ===== -->
    <Sidbar v-model="drawer" />

    <!-- ===== Header ===== -->
    <Header @toggle-sidebar="toggleSidebar" />

    <!-- ===== Main Content ===== -->
    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-4">
        <AlertMessage />
        <ConfirmModal />
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidbar from "../Sidbar.vue"
import Header from "@/components/Header.vue"
import AlertMessage from "@/components/AlertMessage.vue"
import ConfirmModal from "@/components/ConfirmModal.vue"

export default {
  components: { Sidbar, Header, AlertMessage, ConfirmModal },
  data() {
    return {
      drawer: true, // sidebar open/close
    }
  },
  methods: {
    toggleSidebar() {
      this.drawer = !this.drawer
    },
  },
}
</script>
