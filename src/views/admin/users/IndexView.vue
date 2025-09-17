<template>
    <AppLayout>
        <!-- Add User Button -->
        <div class="flex justify-end mb-6">
            <button
                class="flex items-center bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600"
                @click.prevent="openForm()">
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
                    <tr v-if="users.length > 0" v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                        <td class="px-4 py-2">{{ user.id }}</td>
                        <td class="px-4 py-2">{{ user.name }}</td>
                        <td class="px-4 py-2">{{ user.email }}</td>
                        <td class="px-4 py-2 text-center">
                            <!-- Edit Button -->
                            <button class="text-blue-500 hover:text-blue-700" @click.prevent="openForm(user)">
                                <i class="pi pi-pencil"></i>
                            </button>
                            <!-- Delete Button -->
                            <button class="text-red-500 hover:text-red-700 ml-4" @click.prevent="onDelete(user.id)">
                                <i class="pi pi-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="showModal"
            class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-10 modal-overlay">
            <div class="bg-white p-6 rounded-lg shadow-md w-11/12 md:w-3/4">
                <h2 class="text-2xl font-bold text-green-800 mb-6">{{ isEditMode ? 'Edit User' : 'Create New User' }}
                </h2>
                <form @submit.prevent="onSubmit" >
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Job Title -->
                        <div class="mb-4">
                            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" placeholder="Enter Your Name" v-model="formData.name"
                                class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            <p class="text-red-500 text-sm mt-1" v-if="errors.name">{{ errors.name }}</p>
                        </div>

                        <!-- Email -->
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" v-model="formData.email" placeholder="Enter Your Email"
                                class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            <p class="text-red-500 text-sm mt-1" v-if="errors.email">{{ errors.email }}</p>
                        </div>

                        <!-- end -->

                        <!-- Password -->
                        <div class="mb-4">
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" v-model="formData.password"
                                placeholder="Enter Password"
                                class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                :required="!isEditMode" />
                            <p class="text-red-500 text-sm mt-1" v-if="errors.password">{{ errors.password }}</p>
                        </div>

                        <!-- Confirm Password -->
                        <div class="mb-4">
                            <label for="password-confirmation" class="block text-sm font-medium text-gray-700">Confirm
                                Password</label>
                            <input type="password" id="password-confirmation" placeholder="Confirm Password"
                                v-model="formData.password_confirmation"
                                class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                :required="!isEditMode" />
                            <p class="text-red-500 text-sm mt-1" v-if="errors.password_confirmation">{{
                                errors.password_confirmation }}</p>
                        </div>


                    <!-- on user role -->
                     <!-- show resume feild -->

                     <div class="mb-4" v-if="formData.type == 'user'">
                        <label for="resume" class="block text-sm font-medium text-gray-700">User Resume</label>
                        <input 
                        type="file" 
                        name="" 
                        id="resume"
                        class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                     </div>

                    </div>
                    <!-- User Type (Select Dropdown) -->

                    <div class="mb-4">
                        <label for="type" class="block text-sm font-medium text-gray-700">Role</label>
                        <p class="text-red-500 text-sm mt-1" v-if="errors.type">{{ errors.type }}</p>
                        <select id="type" v-model="formData.type"
                            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                            <option value="employer">Employer</option>
                            <option value="user">User</option>
                        </select>
                    </div>


                    <!-- company inputs -->
                    <div v-if="formData.type == 'employer'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Company Name -->
                        <div class="mb-4">
                            <label for="company_name" class="block text-sm font-medium text-gray-700">Company
                                Name</label>
                            <input type="text" id="company_name" v-model="formData.company.name"
                                placeholder="Company Name"
                                class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                            <p class="text-red-500 text-sm mt-1" v-if="errors['company.name']">{{ errors['company.name']
                            }}</p>
                        </div>

                        <!-- Company Email -->
                        <div class="mb-4">
                            <label for="company_email" class="block text-sm font-medium text-gray-700">Company
                                Email</label>
                            <input type="email" id="company_email" v-model="formData.company.email"
                                placeholder="Company Email"
                                class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                            <p class="text-red-500 text-sm mt-1" v-if="errors['company.email']">{{
                                errors['company.email'] }}</p>
                        </div>

                        <!-- Company Number -->
                        <div class="mb-4">
                            <label for="company_number" class="block text-sm font-medium text-gray-700">Company Phone
                                Number</label>
                            <input type="text" id="company_number" v-model="formData.company.number"
                                placeholder="Phone Number"
                                class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                            <p class="text-red-500 text-sm mt-1" v-if="errors['company.number']">{{
                                errors['company.number'] }}</p>
                        </div>

                        <!-- Company Info (Full width) -->
                        <div class="mb-4 md:col-span-2">
                            <label for="company_info" class="block text-sm font-medium text-gray-700">Company
                                Info</label>
                            <textarea id="company_info" rows="3" v-model="formData.company.info"
                                placeholder="About the company"
                                class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
                            <p class="text-red-500 text-sm mt-1" v-if="errors['company.info']">{{ errors['company.info']
                            }}</p>
                        </div>
                    </div>


                    <!-- end company inputs -->
                    <!-- Submit Button -->
                    <button type="submit"
                        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">
                        {{ isEditMode ? 'Update User' : 'Create User' }}
                    </button>
                </form>

                <!-- Cancel Button -->
                <button @click.prevent="closeForm" class="mt-4 text-center w-full text-red-500 font-bold">
                    Cancel
                </button>
            </div>
        </div>
        <Pagination v-if="pagination.total > 0" :pagination="pagination" @page-changed="fetchUsers" />
    </AppLayout>
</template>


<script>
import AppLayout from '@/components/layout/AppLayout.vue';
import axiosInstance from '@/utils/axiosInstance';
import { useAlertStore } from '@/stores/alertStore';
import { useConfirmStore } from '@/stores/useConfirmStore';
import Pagination from '@/components/Pagination.vue';
import { useAuthStore } from '@/stores/authStore';
export default {
    components: {
        AppLayout,
        Pagination
    },
    data() {
        return {
            users: [],
            pagination: [],
            showModal: false,
            isEditMode: false,
            formData: {
                id: null,
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                type: '',
                company: {
                    name: '',
                    info: '',
                    email: '',
                    number: '',
                }
            },
            errors: {},
            currentPage: 1
        };
    },
    methods: {
        openForm(user = null) {
            if (user) {
                this.isEditMode = true;
                this.formData = {
                    ...user, password: '', password_confirmation: '', company: user.company ?? {
                        name: '',
                        email: '',
                        number: '',
                        info: ''
                    }
                };
            } else {
                this.isEditMode = false;
                this.formData = {
                    id: null,
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    type: '',
                    company: {
                        name: '',
                        info: '',
                        email: '',
                        number: ''
                    }

                };
            }
            this.showModal = true;
        },
        closeForm() {
            this.showModal = false;
        },
        async onSubmit() {
            const alertStore = useAlertStore();
            try {
                if (this.isEditMode) {
                    const response = await axiosInstance.put(`/admin/users/${this.formData.id}`, this.formData);
                    this.errors = {};
                    
                    const authStore = useAuthStore();
                    if (response.data.user?.type) {
                        authStore.type = response.data.user.type;
                        sessionStorage.setItem('type', response.data.user.type);
                    }
                    alertStore.setAlertMessage({
                        message: response.data.message,
                        type: 'success',
                    });
                } else {
                    const response = await axiosInstance.post('/admin/users', this.formData);
                    this.errors = {};
                    alertStore.setAlertMessage({
                        message: response.data.message,
                        type: 'success',
                    });
                }

                this.fetchUsers();
                this.closeForm();
            } catch (error) {
                if (error.status == 422) {
                    let errors = error?.response?.data?.errors;
                    this.errors = Object.fromEntries(
                        Object.entries(errors).map(([key, value]) => [key, value[0]])
                    )
                } else {
                    alertStore.setAlertMessage({
                        message: error?.response?.data?.message || 'An error occurred.',
                        type: 'error',
                    });
                }

            }
        },
        onDelete(id) {
            const confirmStore = useConfirmStore();
            const alertStore = useAlertStore();
            confirmStore.openConfirmModal('Are you sure you want to delete this user?', async () => {
                try {
                    const response = await axiosInstance.delete(`/admin/users/${id}`);
                    alertStore.setAlertMessage({
                        message: response.data.message,
                        type: 'success',
                    });
                    this.fetchUsers();
                } catch (error) {
                    alertStore.setAlertMessage({
                        message: error?.response?.data?.message || 'An error occurred.',
                        type: 'error',
                    });
                }
            });
        },
        fetchUsers(page = this.currentPage) {
            axiosInstance.get(`admin/users?page=${page}`).then((response) => {
                this.users = response.data.users;
                this.pagination = response.data.pagination;
                this.currentPage = page;
            }).catch((error) => {
                const alertStore = useAlertStore();
                alertStore.setAlertMessage(error?.response?.data?.message, 'error');
            })
        }

    },
    created() {
        this.fetchUsers();
    }
};
</script>
<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    overflow-y: auto;
}
</style>
