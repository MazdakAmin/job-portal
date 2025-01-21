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
import JobListing from '@/components/JobListing.vue';
import { useAlertStore } from '@/stores/alertStore';
import axiosIntance from '@/utils/axiosInstance';
import AlertMessage from './AlertMessage.vue';
import { eventBus } from '@/utils/eventBus';
export default {
  data() {
    return {
      jobs: [],
    }
  },
  props: {
    limit: Number,
  },
  components: {
    JobListing,
    AlertMessage
  },
  methods:{
   async fetchJobs(){
    const AlertMessage = useAlertStore();
      try{
        const response = await axiosIntance.get('/job/getAllJobs');
       this.jobs =  response?.data?.jobs.map(job => ({
        ...job,
        timeAgo : this.formatTimeAgo(job.createdAt)
       }))
      }catch(error){
        AlertMessage.setAlertMessage(error?.response?.data?.message || 'Somthing went wrong please try later','error');
      }
    },
    formatTimeAgo(dateString) {
      const now = new Date();
      const createdDate = new Date(dateString);
      const diffInSeconds = (now - createdDate) / 1000; 
      const diffInMinutes = diffInSeconds / 60; 
      const diffInHours = diffInMinutes / 60; 
      const diffInDays = diffInHours / 24; 

      if (diffInDays >= 1) {
        return `${Math.floor(diffInDays)} days ago`;
      } else if (diffInHours >= 1) {
        return `${Math.floor(diffInHours)} hours ago`;
      } else if (diffInMinutes >= 1) {
        return `${Math.floor(diffInMinutes)} minutes ago`;
      } else {
        return `Just now`; 
      }
    },
  },
  mounted(){
    this.fetchJobs();
    eventBus.on('add-job', this.fetchJobs);
  },
  beforeUnmount() {
    eventBus.off('job-added', this.fetchJobs());
  }
}
</script>