<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    color="green-darken-3"
    dark
  >
    <!-- Logo -->
    <div class="text-center py-6">
      <v-avatar size="96">
        <v-img :src="logo" alt="Vue Jobs" />
      </v-avatar>
    </div>

    <!-- Navigation Links -->
    <v-list nav density="compact">
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        to="/dashboard"
        link
      />
      <v-list-item
        prepend-icon="mdi-home"
        title="Home"
        to="/"
        link
      />
      <v-list-item
        v-if="isAdmin"
        prepend-icon="mdi-account"
        title="Users"
        to="/users"
        link
      />
      <v-list-item
        v-if="isNotUser"
        prepend-icon="mdi-briefcase"
        title="Jobs"
        to="/panel-jobs"
        link
      />
      <v-list-item
        v-if="isNotUser"
        prepend-icon="mdi-file-document-check"
        title="Applications"
        to="/applications"
        link
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import logo from "@/assets/img/logo.png"
import { useAuthStore } from "@/stores/authStore"

export default {
  props: {
    modelValue: Boolean,
  },
  emits: ["update:modelValue"],
  computed: {
    drawer: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      },
    },
    isAdmin() {
      const authStore = useAuthStore()
      return authStore.type === "admin"
    },
    isNotUser() {
      const authStore = useAuthStore()
      return authStore.type !== "user"
    },
  },
  data() {
    return {
      logo,
    }
  },
}
</script>
