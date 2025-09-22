<template>
   
    <AlertMessage />
    <JobListings />
</template>
<script>

import JobListings from '@/components/JobListings.vue';
import AlertMessage from '@/components/AlertMessage.vue';
export default {
    components: {
        JobListings,
        AlertMessage
    },

}
</script>