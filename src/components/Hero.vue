<template>
  <v-container fluid class="bg-green-darken-2 py-16 mb-6">
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h3 text-md-h2 font-weight-bold text-white">
          {{ title }}
        </h1>
        <p class="text-subtitle-1 text-white mt-4">
          {{ subTitle }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Become a Vue Dev"
    },
    subTitle: {
      type: String,
      default: "Find the Vue job that fits your skills and needs"
    }
  }
}
</script>
