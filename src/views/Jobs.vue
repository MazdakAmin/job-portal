<template>
    <NavBar />
    <AlertMessage />
    <JobListings />
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import JobListings from '@/components/JobListings.vue';
import AlertMessage from '@/components/AlertMessage.vue';
export default {
    components: {
        NavBar,
        JobListings,
        AlertMessage
    },

}
</script>