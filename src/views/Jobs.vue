<template>
   <NavBar />
    <AlertMessage />
    <JobListings />
</template>
<script>

import JobListings from '@/components/JobListings.vue';
import AlertMessage from '@/components/AlertMessage.vue';
import NavBar from '@/components/NavBar.vue';
export default {
    components: {
        JobListings,
        AlertMessage,
        NavBar
    },

}
</script>