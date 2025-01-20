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
import { useAlertStore } from '@/stores/alertStore';
import axiosIntance from '@/utils/axiosInstance';
import AlertMessage from './AlertMessage.vue';
export default {
  data() {
    return {
      jobs: jobData,
      data : [],
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
        const response = await axiosIntance.get('/getAllJobs');
       this.data =  response?.data?.jobs;
      }catch(error){
        AlertMessage.setAlertMessage(error?.response?.data?.message || 'Somthing went wrong please try later','error');
      }
    }
  },
  mounted(){
    this.fetchJobs();
  }
}
</script>