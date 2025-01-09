<template>
    <AppLayout>
        <div class="flex justify-end mb-6">
            <button
            @click.prevent="openForm()"
                class="flex items-center bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600">
                <i class="pi pi-user-plus mr-2"></i> Add User
            </button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="table-auto w-full text-left mb-6">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="px-4 py-2">#Id</th>
                        <th class="px-4 py-2">Name</th>
                        <th class="px-4 py-2">Email</th>
                        <th class="px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-50" v-for="user in users" :key="user._id">
                        <td class="px-4 py-2">{{ user._id }}</td>
                        <td class="px-4 py-2">{{ capitalizeFirstLetter(user.firstname) }}</td>
                        <td class="px-4 py-2">{{ user.email }}</td>
                        <td class="px-4 py-2 text-center">
                            <!-- Edit Button -->
                            <button class="text-blue-500 hover:text-blue-700" @click.prevent="openForm(user)" >
                                <i class="pi pi-pencil"></i>
                            </button>
                            <!-- Delete Button -->
                            <button class="text-red-500 hover:text-red-700 ml-4"
                            @click.prevent="onDelete(user._id)"
                            >
                                <i class="pi pi-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="showModal" class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-10">
            <div class="bg-white p-6 rounded-lg shadow-md w-11/12 md:w-3/4">
                <h2 class="text-2xl font-bold text-green-800 mb-6">{{ isEditMod ? 'Update user' : 'Add new user' }}</h2>
                <form @submit.prevent="onSubmit">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Job Title -->
                        <div class="mb-4">
                            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" placeholder="Enter Your Name" 
                                class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                v-model="formData.firstname"
                                required />
                        </div>

                        <!-- Email -->
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email"  placeholder="Enter Your Email"
                                class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                v-model="formData.email"
                                required />
                        </div>

                        <!-- Password -->
                        <div class="mb-4">
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" 
                                placeholder="Enter Password"
                                class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                v-model="formData.password"
                                />
                        </div>

                        <!-- Confirm Password -->
                        <div class="mb-4">
                            <label for="password-confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input type="password" id="password-confirmation" placeholder="Confirm Password"
                                
                                class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                 />
                        </div>

                    </div>
                     <!-- User Type (Select Dropdown) -->
                      
                     <div class="mb-4">
                            <label for="type" class="block text-sm font-medium text-gray-700">Role</label>
                            <select id="type" v-model="formData.role" class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required>
                                <option value="admin">Admin</option>
                                <option value="employer">Employer</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                    <!-- Submit Button -->
                    <button type="submit"
                        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">
                        {{ isEditMod ? 'Update' : 'Create' }}
                    </button>
                </form>

                <!-- Cancel Button -->
                <button @click.prevent="closeForm" class="mt-4 text-center w-full text-red-500 font-bold">
                    Cancel
                </button>
            </div>
        </div>
    </AppLayout>
</template>
<script>
import AppLayout from '@/components/layout/AppLayout.vue';
import axiosIntance from '@/utils/axiosInstance';
import { useAlertStore } from '@/stores/alertStore';
import { useConfirmationStore } from '@/stores/confirmStore';
export default {
    data(){
        return {
            users:[],
            showModal:false,
            isEditMod:false,
            formData:{
                id:null,
                firstname:'',
                email:'',
                password:'',
                role:''
            }
        }
    },
    components:{
        AppLayout,
    },
    methods:{
        async fetchUsers(){
            try{
              const  response = await axiosIntance.get('/user/all-users');
              console.log(response)
              this.users = response?.data
            }catch(error){
                console.log(error);
             useAlertStore().setAlertMessage(error?.response?.data?.message || 'Something went wrong' , 'error');
            }
        },
        capitalizeFirstLetter(name) {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + name.slice(1);
    },
    openForm(user = null){
        if(user){
            this.isEditMod = true;
            this.formData = {...user,password: ''}
        }else{
            this.isEditMod = false;
            this.formData = {
                id:null,
                firstname:'',
                password:'',
                role:''
            };
        }
        this.showModal = true;
    },
    closeForm(){
        this.showModal = false;
    },
    async onSubmit(){
        const alertStore = useAlertStore();
        let response;
        try{
            if(this.isEditMod){ 
            response = await axiosIntance.put(`/user/edituser/${this.formData.is}`);
            console.log(response);
            
        }else{
            response = await axiosIntance.post('/user/register',this.formData);
            alertStore.setAlertMessage(response?.data?.message || 'User added successfully','success');
        }
        this.closeForm();
        this.fetchUsers()
        }catch(error){
            console.log(error)
        }
    },
    onDelete(userId){
        const confirmStore = useConfirmationStore();
        const alertStore = useAlertStore();
        confirmStore.openConfirmModal("Are you sure you want to delete this user" , async () =>{
            try{
                console.log(userId);
                
            }catch(error){
                console.log(error);
            }
        })
    }
    },
    mounted(){
        this.fetchUsers();
    }
}
</script>