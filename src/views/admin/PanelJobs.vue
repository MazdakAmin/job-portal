<template>
  <AppLayout>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Jobs</h2>
      <button @click.prevent="addJobClick" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        + Add Job
      </button>
    </div>
    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="table-auto w-full text-left mb-6">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-4 py-2">#Id</th>
            <th class="px-4 py-2">Title</th>
            <th class="px-4 py-2">Type</th>
            <th class="px-4 py-2">Salary</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Approved</th>
            <th class="px-4 py-2">Total application</th>
            <th class="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-50" v-for="job in paginatedJobs" :key="job._id">
            <td class="px-4 py-2">{{ job._id }}</td>
            <td class="px-4 py-2">{{ job.jobTitle }}</td>
            <td class="px-4 py-2">N/A</td>
            <td class="px-4 py-2">{{ job.salary }}</td>
            <td class="px-4 py-2" :class="{
              'text-green-700 font-semibold': job.status === 'open',
              'text-red-700 font-semibold': job.status !== 'open'
            }">
              {{ job.status }}
            </td>
            <td class="px-4 py-2" :class="{
              'text-green-700 font-semibold': job.isApproved,
              'text-red-700 font-semibold': !job.isApproved
            }">
              {{ job.isApproved ? 'Yes' : 'Not' }}
            </td>
            <td class="px-4 py-2">N/A</td>
            <td class="px-4 py-2">
              <button class="text-green-500 hover:text-green-700 mr-4"
                @click="$router.push(`/dashboard/job/${job._id}`)">
                <i class="pi pi-eye text-lg"></i>
              </button>
              <button class="text-blue-500 hover:text-blue-700" @click="editJob(job)">
                <i class="pi pi-pencil"></i>
              </button>
              <button class="text-red-500 hover:text-red-700 ml-4" @click="onDelete(job._id)">
                <i class="pi pi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Component -->
    <Pagination :current-page="currentPage" :total-pages="totalPages" @update:page="currentPage = $event" />

    <!-- Modal -->
    <JobForm :show="showJobModal" :formData="formData" :mode="formMode" :showStatus="showStatus" @submit="handleFormSubmit"
      @cancel="toggleForm" />
  </AppLayout>
</template>

<script>
import AppLayout from '@/components/layout/AppLayout.vue';
import JobForm from '@/components/JobForm.vue';
import Pagination from '@/components/Pagination.vue';
import axiosIntance from '@/utils/axiosInstance';
import { useAlertStore } from '@/stores/alertStore';
import { useConfirmStore } from '@/stores/confirmStore';

export default {
  data() {
    return {
      showJobModal: false,
      formMode:'create',
      showStatus : false,
      jobs: [],
      currentPage: 1,
      perPage: 5 //this for per page
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.jobs.length / this.perPage);
    },
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.jobs.slice(start, start + this.perPage);
    }
  },
  components: {
    AppLayout,
    JobForm,
    Pagination
  },
  methods: {
    getJobs() {
      axiosIntance
        .get('/job/getEmpJobs')
        .then((res) => {
          this.jobs = res?.data?.jobs;
        })
        .catch((e) => console.log(e, 'Error fetching jobs'));
    },
    toggleForm() {
      this.showJobModal = !this.showJobModal;
    },
    addJobClick() {
       this.showStatus = false;
      this.formMode = 'create';
     
      this.formData = {};
      this.toggleForm();
    },
    editJob(job) {
      this.showStatus = true
      this.formMode = 'edit';
      this.formData = { ...job };
      this.toggleForm();
    },
    handleFormSubmit(formData) {
      const alertStore = useAlertStore();

      if (this.formMode === 'create') {
        axiosIntance.post('/job/create', formData)
          .then(res => {
            alertStore.setAlertMessage(res?.data?.message || 'Job created!', 'success');
            this.getJobs();
            this.toggleForm();
          })
          .catch(err => alertStore.setAlertMessage(err?.response?.data?.message || 'Error', 'error'));
      } else {
        axiosIntance.put(`/job/update/${formData._id}`, formData)
          .then(res => {
            alertStore.setAlertMessage(res?.data?.message || 'Job updated!', 'success');
            this.getJobs();
            this.toggleForm();
          })
          .catch(err => alertStore.setAlertMessage(err?.response?.data?.message || 'Error', 'error'));
      }
    },
    onDelete(id) {
      const confirmStore = useConfirmStore();
      const alertStore = useAlertStore();
      confirmStore.openConfirmModal("You want to delete this job?", async () => {
        try {
          // const response = await axiosIntance.delete(`user/${userId}`);
          alertStore.setAlertMessage("User deleted successfully!", 'success');
          this.fetchUsers();
        } catch (error) {
          alertStore.setAlertMessage(error?.response?.data?.message || "Somthing went wrong",'error');
        }
      })
    }

  },
  mounted() {
    this.getJobs();
  }
};
</script>
