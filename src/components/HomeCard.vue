<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card>
          <h2 class="text-2xl font-bold">For Developers</h2>
          <p class="mt-2 mb-4">
            Browse our Vue jobs and start your career today
          </p>
          <RouterLink to="/jobs" class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
            Browse Jobs
          </RouterLink>
        </Card>
        <Card bg="bg-green-100">
          <h2 class="text-2xl font-bold">For Employers</h2>
          <p class="mt-2 mb-4">
            List your job to find the perfect developer for the role
          </p>
          <button :disabled="!isLoggIn" @click.prevent="toggleForm"
            class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600">
            Add Job
          </button>
        </Card>
      </div>
    </div>
  </section>
  <!-- Job Creation Modal -->
  <div v-if="showJobModal" class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-10">
    <div class="bg-white p-6 rounded-lg shadow-md w-11/12 md:w-3/4">
      <h2 class="text-2xl font-bold text-green-800 mb-6">Create New Job</h2>
      <form >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Job Title -->
          <div class="mb-4">
            <label for="jobTitle" class="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              placeholder="Enter job title"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <!-- Salary -->
          <div class="mb-4">
            <label for="salary" class="block text-sm font-medium text-gray-700">Salary</label>
            <input
              type="text"
              id="salary"
              placeholder="Enter salary"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <!-- Job Type -->
          <div class="mb-4">
            <label for="jobType" class="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              id="jobType"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <!-- Location -->
          <div class="mb-4">
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              placeholder="Enter job location"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <!-- dis -->
        <div class="mb-4">
          <label for="jobDescription" class="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            id="jobDescription"
            v-model="jobDescription"
            placeholder="Enter job description"
            rows="4"
            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
        >
          Create Job
        </button>
      </form>

      <!-- Cancel Button -->
      <button @click.prevent="toggleForm()" class="mt-4 text-center w-full text-red-500 font-bold">
        Cancel
      </button>
    </div>
  </div>
</template>
<script>
import Card from '@/components/Card.vue';
import { RouterLink } from 'vue-router';
import LocalStorageService from '@/utilites/LocalStorageService.js';
export default {
  data() {
    return {
      isLoggIn: false,
      showJobModal: false
    }
  },
  components: {
    Card,
    RouterLink
  },
  methods: {
    isLoggedIn() {
      this.isLogIn = LocalStorageService.isLoggedIn();
    },
    toggleForm(){
      this.showJobModal = !this.showJobModal
      console.log(this.showJobModal);
    }
  },
  mounted() {
    this.isLoggedIn();
  }
}
</script>