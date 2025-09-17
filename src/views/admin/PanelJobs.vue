<template>
    <AppLayout>

        <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Jobs</h2>
      <button 
        @click.prevent="showJobModal = true"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        + Add Job
      </button>
    </div>


    
        <div class="overflow-x-auto">
            <table class="table-auto w-full text-left mb-6">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="px-4 py-2">#Id</th>
                        <th class="px-4 py-2">Title</th>
                        <th class="px-4 py-2">Type</th>
                        <th class="px-4 py-2">Salary</th>
                        <th class="px-4 py-2">Status</th>
                        <th class="px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-2">id</td>
                        <td class="px-4 py-2">title</td>
                        <td class="px-4 py-2">type</td>
                        <td class="px-4 py-2">salary</td>
                        <td class="px-4 py-2">Status</td>
                        <td class="px-4 py-2 text-center">
                            <button class="text-blue-500 hover:text-blue-700">
                                <i class="pi pi-pencil"></i>
                            </button>
                            <button class="text-red-500 hover:text-red-700 ml-4" >
                                <i class="pi pi-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AppLayout>

      <JobForm
      :show="showJobModal"
      :formData="formData"
      @submit="addJob"
      @cancel="toggleForm"
    />
</template>
<script>
import AppLayout from '@/components/layout/AppLayout.vue';
import JobForm from '@/components/JobForm.vue';
import axiosIntance from '@/utils/axiosInstance';
import { useAlertStore } from '@/stores/alertStore';

export default{
    data(){
        return{
            showJobModal : false
            
        }
    },
    components:{
        AppLayout,
        JobForm
    },
    methods: {
        toggleForm(){
            this.showJobModal = !this.showJobModal;
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
        //   eventBus.emit('add-job'); 
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

}
</script>
