<template>
  <NavBar />
  <Hero />
  <HomeCard />
  <JobListings :limit="3" />
  <section class='m-auto max-w-lg my-10 px-6'>
    <RouterLink to='/jobs' class='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'>
      View All Jobs
    </RouterLink>
  </section>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import Hero from '@/components/Hero.vue';
import HomeCard from '@/components/HomeCard.vue';
import JobListings from '@/components/JobListings.vue';
import { RouterLink } from 'vue-router';
export default {
  components: {
    NavBar,
    Hero,
    HomeCard,
    JobListings,
    RouterLink
  }
}
</script>