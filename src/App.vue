<template>
  <v-app>
    <NavBar /> <!-- your navbar -->
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";

export default {
  components: { RouterView, NavBar },
};
</script>
