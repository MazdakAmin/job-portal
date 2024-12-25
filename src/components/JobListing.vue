<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ job.type }}</div>
        <h3 class="text-xl font-bold">{{ job.title }}</h3>
      </div>
      <div class="mb-5">
        {{ turenCateDis }}
      </div>

      <h3 class="text-green-500 mb-2">{{ job.salary }}</h3>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
          <i class='pi pi-map-marker text-orange-700'></i>
          {{ job.location }}
        </div>

        <RouterLink to="/job"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm">
          Read More
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
import { RouterLink } from 'vue-router';
export default {
  props: {
    job: Object
  },
  components: {
    RouterLink
  },
  computed: {
    turenCateDis() {
      const dis = this.job.description;
      return dis.substring(0, 90) + '...';

    }
  }
}
</script>