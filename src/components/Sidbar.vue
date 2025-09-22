<!-- Sidebar.vue -->
<template>
  <v-navigation-drawer
    :model-value="isOpen"
    @update:model-value="$emit('update:isOpen', $event)"
    permanent
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in menuItems"
        :key="i"
        :title="item.title"
        :to="item.to"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      menuItems: [
        { title: "Dashboard", to: "/" },
        { title: "Jobs", to: "/jobs" },
        { title: "Settings", to: "/settings" }
      ]
    };
  }
};
</script>
