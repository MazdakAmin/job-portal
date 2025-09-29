<template>
  <NavBar />
  <AlertMessage />
  <Hero />
  <HomeCard />
  <JobListings :limit="3" />

  <!-- Centered CTA Button -->
  <v-container class="my-12">
  <v-row justify="center">
    <v-col cols="12" md="6" class="d-flex justify-center">
      <v-btn
        :to="{ path: '/jobs' }"
        color="black"
        size="x-large"
        elevation="4"
        class="rounded-xl text-white font-weight-bold d-flex align-center justify-center"
        style="text-decoration: none; min-height: 56px;"
      >
        VIEW ALL JOBS
      </v-btn>
    </v-col>
  </v-row>
</v-container>


</template>

<script>
import Hero from '@/components/Hero.vue';
import HomeCard from '@/components/HomeCard.vue';
import JobListings from '@/components/JobListings.vue';
import { RouterLink } from 'vue-router';
import AlertMessage from '@/components/AlertMessage.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    Hero,
    HomeCard,
    JobListings,
    RouterLink,
    AlertMessage,
    NavBar
  },
};
</script>
