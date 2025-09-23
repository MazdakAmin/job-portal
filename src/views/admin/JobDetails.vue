<template>
  <AppLayout>
    <v-container fluid class="py-6">
      <!-- Job Info -->
      <v-card class="mb-6 pa-6">
        <v-card-title class="text-h5 font-weight-bold">
          {{ jobData.jobTitle }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <strong>Type:</strong> {{ jobData.jobType || 'N/A' }}
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Salary:</strong> {{ jobData.salary }}
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Status:</strong>
              <v-chip
                :color="jobData.status === 'open' ? 'green' : 'red'"
                text-color="white"
                size="small"
              >
                {{ jobData.status }}
              </v-chip>
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Approved:</strong>
              <v-chip
                :color="jobData.isApproved ? 'green' : 'yellow'"
                text-color="black"
                size="small"
              >
                {{ jobData.isApproved ? 'Approved' : 'Pending' }}
              </v-chip>
            </v-col>
            <v-col cols="12">
              <strong>Description:</strong> {{ jobData.jobDesc }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Applications Table -->
      <v-card class="pa-6">
        <v-card-title class="text-h6 font-weight-bold mb-4">
          Applications
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="paginatedApplications"
          item-value="id"
          class="elevation-1"
          hide-default-footer
        >
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="item.status === 'accepted' ? 'green' : 
                      item.status === 'rejected' ? 'red' : 'yellow'"
              text-color="white"
              size="small"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:item.actions="{ item, index }">
            <v-btn icon color="green" variant="text">
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn icon color="blue" variant="text" @click="show = true">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red" variant="text" @click="onDelete(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>

        <!-- Pagination -->
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @update:page="currentPage = $event"
        />
      </v-card>

      <!-- Modal -->
      <v-dialog v-model="show" max-width="400px" persistent>
        <v-card>
          <v-card-title class="text-h6 font-weight-bold text-green">
            Update Application Status
          </v-card-title>

          <v-card-text>
            <v-select
              v-model="status"
              label="Status"
              :items="['pending', 'rejected', 'review', 'accepted', 'shortlisted']"
              variant="outlined"
              density="comfortable"
              hide-details
              required
            />
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn color="green" @click="submitStatus" variant="flat">
              Submit
            </v-btn>
            <v-btn color="red" @click="toggleForm" variant="outlined">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
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
      applications: [],
      currentPage: 1,
      perPage: 5,
      status: '',
      headers: [
        { title: '#', key: 'index', sortable: false },
        { title: 'Applicant Name', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Status', key: 'status' },
        { title: 'Action', key: 'actions', sortable: false }
      ]
    }
  },
  mounted() {
    this.getJobApplications()
  },
  computed: {
    ...mapState(useJobStore, ['jobData']),
    totalPages() {
      return Math.ceil(this.applications.length / this.perPage) || 1
    },
    paginatedApplications() {
      const start = (this.currentPage - 1) * this.perPage
      return this.applications.slice(start, start + this.perPage).map((app, i) => ({
        ...app,
        index: (this.currentPage - 1) * this.perPage + i + 1
      }))
    }
  },
  methods: {
    getJobApplications() {
      const jobId = this.$route.params.id
      axiosIntance.get(`/job/jobApplicants/${jobId}`)
        .then(res => {
          this.applications = res.data.applicants
        })
        .catch(e => console.log(e))
    },
    toggleForm() {
      this.show = !this.show
    },
    onDelete(id) {
      const confirmStore = useConfirmStore()
      const alertStore = useAlertStore()
      confirmStore.openConfirmModal("Do you want to delete this application?", async () => {
        try {
          alertStore.setAlertMessage("Application deleted successfully!", 'success')
          this.getJobApplications()
        } catch (error) {
          alertStore.setAlertMessage(error?.response?.data?.message || "Something went wrong", 'error')
        }
      })
    },
    submitStatus() {
      // API call here to update status
      this.toggleForm()
    }
  }
}
</script>
