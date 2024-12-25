<template>
    <NavBar />
    <JobListings />
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import JobListings from '@/components/JobListings.vue';
export default {
    components: {
        NavBar,
        JobListings
    }
}
</script>