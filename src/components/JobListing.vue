<template>
  <v-card class="h-100 d-flex flex-column pa-4 rounded-lg">
    <!-- Header -->
    <div class="mb-4">
      <div class="text-grey-darken-1">{{ job.type }}</div>
      <h3 class="text-h6 font-weight-bold">{{ job.jobTitle }}</h3>
    </div>

    <!-- Description -->
    <div class="mb-4 flex-grow-1">
      {{ turenCateDis }}
    </div>

    <!-- Salary + Time -->
    <div class="d-flex justify-space-between align-center mb-4">
      <h3 class="text-green font-weight-bold">{{ job.salary }}</h3>
      <small class="text-grey italic">{{ job.timeAgo }}</small>
    </div>

    <v-divider class="mb-4" />

    <!-- Bottom Actions -->
    <div class="d-flex justify-space-between align-center mt-auto">
      <div class="text-orange">
        <v-icon start color="orange">mdi-map-marker</v-icon>
        {{ job.location }}
      </div>

      <v-btn color="green" size="small" :to="`/job/${job._id}`">
        Read More
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
  props: {
    job: Object,
  },
  components: {
    RouterLink,
  },
  computed: {
    turenCateDis() {
      const dis = this.job.jobDesc;
      return dis ? dis.substring(0, 90) + '...' : 'information on site';
    },
  },
};
</script>
