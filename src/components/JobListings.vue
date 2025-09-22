<template>
  <v-container class="py-10">
    <h2 class="text-h4 text-center text-green mb-6">Browse Jobs</h2>

    <v-row>
      <!-- Skeleton loader while fetching -->
      <v-col
        v-if="loading"
        v-for="n in 6"
        :key="'skeleton-' + n"
        cols="12"
        md="4"
      >
        <v-skeleton-loader type="card" class="h-100" />
      </v-col>

      <!-- Real job cards -->
      <v-col
        v-else
        v-for="(job, index) in jobs.slice(0, limit || jobs.length)"
        :key="job.id || index"
        cols="12"
        md="4"
      >
        <JobListing :job="job" />
      </v-col>
    </v-row>

    <v-alert v-if="!loading && jobs.length === 0" type="info" text>
      No jobs available right now.
    </v-alert>
  </v-container>
</template>

<script>
import JobListing from '@/components/JobListing.vue';
import { useAlertStore } from '@/stores/alertStore';
import axiosIntance from '@/utils/axiosInstance';
import { eventBus } from '@/utils/eventBus';

export default {
  data() {
    return {
      jobs: [],
      loading: true,
    };
  },
  props: {
    limit: Number,
  },
  components: {
    JobListing,
  },
  methods: {
    async fetchJobs() {
      const alertStore = useAlertStore();
      try {
        const response = await axiosIntance.get('/job/getAllJobs');
        this.jobs = response?.data?.jobs.map((job) => ({
          ...job,
          timeAgo: this.formatTimeAgo(job.createdAt),
        }));
      } catch (error) {
        alertStore.setAlertMessage(
          error?.response?.data?.message || 'Something went wrong, please try later',
          'error'
        );
      } finally {
        this.loading = false;
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
  mounted() {
    this.fetchJobs();
    eventBus.on('add-job', this.fetchJobs);
  },
  beforeUnmount() {
    eventBus.off('add-job', this.fetchJobs);
  },
};
</script>
