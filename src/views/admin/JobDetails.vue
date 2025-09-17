<template>
  <AppLayout>
    <!-- Job Info -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-2xl font-bold mb-4">{{ job.jobTitle }}</h2>
      <p><strong>Type:</strong> {{ job.jobType || 'N/A' }}</p>
      <p><strong>Salary:</strong> {{ job.salary }}</p>
      <p><strong>Status:</strong> 
        <span :class="job.status === 'open' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
          {{ job.status }}
        </span>
      </p>
      <p><strong>Approved:</strong> {{ job.isApproved ? "Yes" : "Not" }}</p>
      <p><strong>Description:</strong> {{ job.jobDesc }}</p>
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
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(app, index) in paginatedApplications"
            :key="app.id"
            class="hover:bg-gray-50"
          >
            <td class="px-4 py-2">{{ (currentPage - 1) * perPage + index + 1 }}</td>
            <td class="px-4 py-2">{{ app.name }}</td>
            <td class="px-4 py-2">{{ app.email }}</td>
            <td class="px-4 py-2">{{ app.status }}</td>
          </tr>
        </tbody>
      </table>

      
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:page="currentPage = $event"
      />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/components/layout/AppLayout.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  components: { AppLayout, Pagination },
  data() {
    return {
      job: {
        id: 1,
        jobTitle: "Frontend Developer",
        jobType: "Full-time",
        salary: "$60,000",
        status: "open",
        isApproved: true,
        jobDesc: "We are looking for a skilled Vue.js developer with experience in Tailwind CSS."
      },
      applications: [
        { id: 1, name: "John Doe", email: "john@example.com", status: "Pending" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Reviewed" },
        { id: 3, name: "Ali Khan", email: "ali@example.com", status: "Shortlisted" },
        { id: 4, name: "Sara Malik", email: "sara@example.com", status: "Pending" },
        { id: 5, name: "Mike Ross", email: "mike@example.com", status: "Rejected" },
        { id: 6, name: "Rachel Green", email: "rachel@example.com", status: "Pending" }
      ],
      currentPage: 1,
      perPage: 5
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.applications.length / this.perPage) || 1
    },
    paginatedApplications() {
      const start = (this.currentPage - 1) * this.perPage
      return this.applications.slice(start, start + this.perPage)
    }
  }
}
</script>
