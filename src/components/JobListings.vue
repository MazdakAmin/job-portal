<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Iterate over jobs array -->
        <JobListing v-for="(job, index) in jobs.slice(0, limit || jobs.length)" :key="job.id || index" :job="job" />
      </div>
    </div>
  </section>
</template>
<script>
import jobData from '@/assets/jobs.json';
import JobListing from '@/components/JobListing.vue';
export default {
  data() {
    return {
      jobs: jobData
    }
  },
  props: {
    limit: Number,
  },
  components: {
    JobListing
  }
}
</script>