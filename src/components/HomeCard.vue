<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-6">
          <h2 class="text-h5 font-weight-bold">For Developers</h2>
          <p class="mt-2 mb-4">
            Browse our Vue jobs and start your career today
          </p>
          <v-btn color="black" class="text-white" to="/jobs">
            Browse Jobs
          </v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-6 bg-green-lighten-4">
          <h2 class="text-h5 font-weight-bold">For Employers</h2>
          <p class="mt-2 mb-4">
            List your job to find the perfect developer for the role
          </p>
          <v-btn
            color="green"
            class="text-white"
            @click="toggleForm"
            :disabled="isNotUser"
          >
            Add Job
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <JobForm
      :show="showJobModal"
      :formData="formData"
      @submit="addJob"
      @cancel="toggleForm"
    />
  </v-container>
</template>

<script>
import Card from '@/components/Card.vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import axiosIntance from '@/utils/axiosInstance';
import { useAlertStore } from '@/stores/alertStore';
import { eventBus } from '@/utils/eventBus';
import JobForm from './JobForm.vue';
export default {
  data() {
    return {
      showJobModal: false,
      formData :{
        jobTitle:'',
        jobType: '',
        salary:'',
        location:'',
        jobDesc:''
      }
    }
  },
  components: {
    Card,
    RouterLink,
    JobForm
  },
  methods: {
    toggleForm(){
      this.showJobModal = !this.showJobModal
    },
   addJob(formData) {
      const alertStore = useAlertStore();
      axiosIntance
        .post('/job/create', formData)
        .then((res) => {
          alertStore.setAlertMessage(
            res?.data?.message || 'Job created successfully!',
            'success'
          );
          this.toggleForm();
          eventBus.emit('add-job');
          // reset form
          this.formData = {
            jobTitle: '',
            jobType: '',
            salary: '',
            location: '',
            jobDesc: ''
          };
        })
        .catch((error) => {
          alertStore.setAlertMessage(
            error?.response?.data?.message || 'Something went wrong',
            'error'
          );
        });
    }
  },
  computed:{
    isNotUser (){
      const authStore = useAuthStore();
      return authStore.type === 'user';
    }
  }
}
</script>