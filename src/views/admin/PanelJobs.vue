<template>
  <AppLayout>
    <v-container fluid class="py-6">
      <!-- Header -->
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="d-flex align-center">
          <v-switch
            v-model="filterApproved"
            :label="filterApproved ? 'Approved Jobs' : 'All Jobs'"
            color="green"
            inset
            hide-details
            @change="getJobs"
          />
        </div>

        <v-btn color="green" @click="addJobClick">
          <v-icon start>mdi-plus</v-icon>
          Add Job
        </v-btn>
      </div>

      <!-- Table -->
      <v-card class="elevation-2 rounded-lg">
        <v-data-table
          :headers="headers"
          :items="jobs"
          :items-per-page="perPage"
          :page.sync="currentPage"
          :loading="loading"
          loading-text="Loading jobs..."
          class="elevation-1"
          item-value="_id"
        >
          <!-- Custom cells -->
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="item.status === 'open' ? 'green' : 'red'"
              text-color="white"
              size="small"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:item.isApproved="{ item }">
            <v-chip
              :color="item.isApproved ? 'green' : 'yellow'
              "
              text-color="black"
              size="small"
            >
              {{ item.isApproved ? 'Approved' : 'Pending' }}
            </v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn icon color="green" @click="goToJob(item)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn icon color="blue" @click="editJob(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="onDelete(item._id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>

      <!-- Modal -->
      <JobForm
        :show="showJobModal"
        :formData="formData"
        :mode="formMode"
        :showStatus="showStatus"
        @submit="handleFormSubmit"
        @cancel="toggleForm"
      />
    </v-container>
  </AppLayout>
</template>

<script>
import AppLayout from '@/components/layout/AppLayout.vue';
import JobForm from '@/components/JobForm.vue';
import axiosIntance from '@/utils/axiosInstance';
import { useAlertStore } from '@/stores/alertStore';
import { useConfirmStore } from '@/stores/confirmStore';
import { useJobStore } from '@/stores/JobStore';

export default {
  data() {
    return {
      showJobModal: false,
      formMode: 'create',
      showStatus: false,
      jobs: [],
      formData: {},
      filterApproved: false,
      currentPage: 1,
      perPage: 5,
      loading: false,
      headers: [
        { text: '#Id', value: '_id' },
        { text: 'Title', value: 'jobTitle' },
        { text: 'Type', value: 'jobType' },
        { text: 'Salary', value: 'salary' },
        { text: 'Status', value: 'status' },
        { text: 'Approved', value: 'isApproved' },
        { text: 'Applications', value: 'applications', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    };
  },
  components: {
    AppLayout,
    JobForm
  },
  methods: {
    getJobs() {
      this.loading = true;
      let params = {};
      if (this.filterApproved) {
        params.isApproved = true;
      }

      axiosIntance
        .get('/job/getEmpJobs', { params })
        .then((res) => {
          this.jobs = (res?.data?.jobs || []).map(job => ({
            ...job,
            applications: job.applicationsCount || 'N/A'
          }));
        })
        .catch((e) => console.log(e, 'Error fetching jobs'))
        .finally(() => {
          this.loading = false;
        });
    },
    toggleForm() {
      this.showJobModal = !this.showJobModal;
    },
    addJobClick() {
      this.showStatus = false;
      this.formMode = 'create';
      this.formData = {
        jobTitle: '',
        salary: '',
        jobType: '',
        location: '',
        jobDesc: '',
        status: 'open'
      };
      this.toggleForm();
    },
    editJob(job) {
      this.showStatus = true;
      this.formMode = 'edit';
      this.formData = { ...job };
      this.toggleForm();
    },
    handleFormSubmit(formData) {
      const alertStore = useAlertStore();

      if (this.formMode === 'create') {
        axiosIntance
          .post('/job/create', formData)
          .then((res) => {
            alertStore.setAlertMessage(res?.data?.message || 'Job created!', 'success');
            this.getJobs();
            this.toggleForm();
          })
          .catch((err) =>
            alertStore.setAlertMessage(err?.response?.data?.message || 'Error', 'error')
          );
      } else {
        axiosIntance
          .put(`/job/${formData._id}`, formData)
          .then((res) => {
            alertStore.setAlertMessage(res?.data?.message || 'Job updated!', 'success');
            this.getJobs();
            this.toggleForm();
          })
          .catch((err) =>
            alertStore.setAlertMessage(err?.response?.data?.message || 'Error', 'error')
          );
      }
    },
    onDelete(id) {
      const confirmStore = useConfirmStore();
      const alertStore = useAlertStore();
      confirmStore.openConfirmModal('You want to delete this job?', () => {
        axiosIntance
          .delete(`/job/${id}`)
          .then((res) => {
            alertStore.setAlertMessage(res?.data?.message || 'Job deleted successfully!');
            this.getJobs();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    goToJob(job) {
      const jobStore = useJobStore();
      jobStore.setJob(job);
      this.$router.push(`/dashboard/job/${job._id}`);
    }
  },
  mounted() {
    this.getJobs();
  }
};
</script>
