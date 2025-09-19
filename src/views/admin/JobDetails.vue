<template>
  <AppLayout>
    <!-- Job Info -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-2xl font-bold mb-4">{{ jobData.jobTitle }}</h2>
      <p><strong>Type:</strong> {{ jobData.jobType || 'N/A' }}</p>
      <p><strong>Salary:</strong> {{ jobData.salary }}</p>
      <p><strong>Status:</strong>
        <span :class="jobData.status === 'open' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
          {{ jobData.status }}
        </span>
      </p>
      <p><strong>Approved:</strong> {{ jobData.isApproved ? "Approved" : "Pending" }}</p>
      <p><strong>Description:</strong> {{ jobData.jobDesc }}</p>
    </div>

    <!-- Applications Table -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h3 class="text-xl font-bold mb-4">Applications</h3>
      <table class="table-auto w-full text-left mb-4">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Applicant Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(app, index) in paginatedApplications" :key="app.id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ (currentPage - 1) * perPage + index + 1 }}</td>
            <td class="px-4 py-2">{{ app.name }}</td>
            <td class="px-4 py-2">{{ app.email }}</td>
            <td class="px-4 py-2">{{ app.status }}</td>
            <td class="px-4 py-2">
              <button class="text-green-500 hover:text-green-700 mr-4">
                <i class="pi pi-download text-lg"></i>
              </button>
              <button class="text-blue-500 hover:text-blue-700" @click="show = true">
                <i class="pi pi-pencil"></i>
              </button>
              <button class="text-red-500 hover:text-red-700 ml-4" @click="onDelete(0)">
                <i class="pi pi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>


      <Pagination :current-page="currentPage" :total-pages="totalPages" @update:page="currentPage = $event" />
    </div>
 
    <div v-if="show" class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-md w-11/12 md:w-1/3 relative">
        <!-- Close (X) Button -->
        <button @click="toggleForm" class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold">
          &times;
        </button>

        <h2 class="text-xl font-bold text-green-800 mb-4">
          Update Application Status
        </h2>

        <form @submit.prevent="submitStatus">
          <!-- Dropdown -->
          <div class="mb-4">
            <label for="status" class="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select id="status" v-model="status"
              class="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required>
              <option value="pending" selected disabled>Pending</option>
              <option value="rejected">Rejected</option>
              <option value="review">Review</option>
              <option value="accepted">Accepted</option>
              <option value="shortlisted">Shortlisted</option>
            </select>
          </div>

          <!-- Buttons in one row -->
          <div class="flex justify-end gap-3 mt-4">
            <button type="submit"
              class="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline">
              Submit
            </button>
            <button type="button" @click="toggleForm"
              class="bg-red-100 hover:bg-red-200 text-red-600 text-sm font-semibold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

  </AppLayout>
</template>

<script>
import AppLayout from '@/components/layout/AppLayout.vue'
import Pagination from '@/components/Pagination.vue'
import { useAlertStore } from '@/stores/alertStore'
import { useConfirmStore } from '@/stores/confirmStore'
import { useJobStore } from '@/stores/JobStore'
import axiosIntance from '@/utils/axiosInstance'
import { mapState } from 'pinia'
export default {
  components: { AppLayout, Pagination },
  data() {
    return {
      show: false,
      job: {},
      applications: [],
      currentPage: 1,
      perPage: 5
    }
  },
  mounted() {
    this.getJobApplications();
  },
  computed: {
    ...mapState(useJobStore, ['jobData']),
    totalPages() {
      return Math.ceil(this.applications.length / this.perPage) || 1
    },
    paginatedApplications() {
      const start = (this.currentPage - 1) * this.perPage
      return this.applications.slice(start, start + this.perPage)
    }
  },
  methods: {
    getJobApplications(){
        const jobId = this.$route.params.id
      axiosIntance.get(`/job/jobApplicants/${jobId}`)
      .then((res) => {
        this.applications = res.data.applicants
        
      })
      .catch((e) => {
        console.log(e);
      })
    },
    toggleForm() {
      this.show = !this.show;
    },
    onDelete(id) {
      const confirmStore = useConfirmStore();
      const alertStore = useAlertStore();
      confirmStore.openConfirmModal("Are you want to delete this application?", async () => {
        try {
          // const response = await axiosIntance.delete(`user/${userId}`);
          alertStore.setAlertMessage("User deleted successfully!", 'success');
          this.fetchUsers();
        } catch (error) {
          alertStore.setAlertMessage(error?.response?.data?.message || "Somthing went wrong", 'error');
        }
      })
    }
  }
}
</script>
