<!-- JobForm.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-md w-11/12 md:w-3/4 relative">
      <!-- Close (X) Button -->
      <button
        @click="$emit('cancel')"
        class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
      >
        &times;
      </button>

      <h2 class="text-2xl font-bold text-green-800 mb-6">
        {{ mode === 'edit' ? 'Edit Job' : 'Create New Job' }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Job Title -->
          <div class="mb-4">
            <label for="jobTitle" class="block text-sm font-medium text-gray-700"
              >Job Title</label
            >
            <input
              type="text"
              id="jobTitle"
              placeholder="Enter job title"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              v-model="localFormData.jobTitle"
              required
            />
          </div>

          <!-- Salary -->
          <div class="mb-4">
            <label for="salary" class="block text-sm font-medium text-gray-700"
              >Salary</label
            >
            <input
              type="text"
              id="salary"
              placeholder="Enter salary"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              v-model="localFormData.salary"
              required
            />
          </div>

          <!-- Job Type -->
          <div class="mb-4">
            <label for="jobType" class="block text-sm font-medium text-gray-700"
              >Job Type</label
            >
            <select
              id="jobType"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              v-model="localFormData.jobType"
              required
            >
              <option value="">Select Job Type</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <!-- Location -->
          <div class="mb-4">
            <label for="location" class="block text-sm font-medium text-gray-700"
              >Location</label
            >
            <input
              type="text"
              id="location"
              placeholder="Enter job location"
              class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              v-model="localFormData.location"
              required
            />
          </div>
        </div>

        <!-- Job Description -->
        <div class="mb-4">
          <label
            for="jobDescription"
            class="block text-sm font-medium text-gray-700"
            >Job Description</label
          >
          <textarea
            id="jobDescription"
            v-model="localFormData.jobDesc"
            placeholder="Enter job description"
            rows="4"
            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          ></textarea>
        </div>

        <!-- Extra Input: Status (only if showStatus prop is true) -->
        <div v-if="showStatus" class="mb-4">
          <label for="status" class="block text-sm font-medium text-gray-700"
            >Status</label
          >
          
          <select
            id="status"
            v-model="localFormData.status"
            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="open">Open</option>
            <option value="close">Close</option>
          </select>

        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
        >
          {{ mode === 'edit' ? 'Update Job' : 'Create Job' }}
        </button>
      </form>

      <!-- Cancel Button -->
      <button
        @click="$emit('cancel')"
        class="mt-4 text-center w-full text-red-500 font-bold"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobModal',
  props: {
    show: { type: Boolean, required: true },
    formData: {
      type: Object,
      default: () => ({
        jobTitle: '',
        salary: '',
        jobType: '',
        location: '',
        jobDesc: '',
        status: 'open'
      })
    },
    mode: { type: String, default: 'create' }, // "create" or "edit"
    showStatus: { type: Boolean, default: false } // extra field toggle
  },
  emits: ['submit', 'cancel'],
  data() {
    return {
      localFormData: { ...this.formData }
    };
  },
  watch: {
    formData: {
      handler(newVal) {
        this.localFormData = { ...newVal };
      },
      deep: true
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.localFormData);
    }
  }
};
</script>
