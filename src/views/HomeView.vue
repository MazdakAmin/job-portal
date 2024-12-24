<template>
<NavBar />
<Hero />
<HomeCard />
<JobListings />
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import Hero from '@/components/Hero.vue';
import HomeCard from '@/components/HomeCard.vue';
import JobListings from '@/components/JobListings.vue';
export default{
  components:{
    NavBar,
    Hero,
    HomeCard,
    JobListings
  }
}
</script>