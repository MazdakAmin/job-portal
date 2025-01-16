<template>
     <nav class="bg-green-700 p-6 w-64 h-full">
        <div class="flex flex-col items-start mt-14 sm:mt-0">
            <div class="mb-6 sm:mx-6 ">
                <img class="w-24 h-24 rounded-full object-cover" :src="logo" alt="Vue Jobs" />
            </div>
            <div class="flex flex-col  sm:items-start sm:mx-6 space-y-4 w-full ">
           
                <RouterLink to="/dashboard"
                    class="text-white hover:bg-green-900 rounded-md px-3 py-2 w-full text-left flex items-center gap-2"
                    :class="isRouteActive('/dashboard')
                        ? 'bg-green-900'
                        : 'hover:bg-gray-900 hover:text-white'">
                    <li class="pi pi-gauge" style="font-size: 1.5rem"></li>
                    Dashboard
                </RouterLink>
                <RouterLink to="/"
                    class="text-white hover:bg-green-900 rounded-md px-3 py-2 w-full text-left flex items-center gap-2">
                    <li class="pi pi-gauge" style="font-size: 1.5rem"></li>
                    Home
                </RouterLink>
                <RouterLink to="/users" v-if="isAdmin"
                    class="text-white hover:bg-green-900 rounded-md px-3 py-2 w-full text-left flex items-center gap-2"
                    :class="isRouteActive('/users')
                        ? 'bg-green-900'
                        : 'hover:bg-gray-900 hover:text-white'">
                    <i class="pi pi-user" style="font-size: 1.5rem"></i>
                    Users
                </RouterLink>
                <RouterLink to="/panel-jobs" v-if="isNotUser"
                    class="text-white hover:bg-green-900 rounded-md px-3 py-2 w-full text-left flex items-center gap-2"
                    :class="isRouteActive('/panel-jobs')
                        ? 'bg-green-900'
                        : 'hover:bg-gray-900 hover:text-white'">
                    <li class="pi pi-gauge" style="font-size: 1.5rem"></li>
                    Jobs
                </RouterLink>
                <RouterLink to="/applications" v-if="isNotUser"
                    class="text-white hover:bg-green-900 rounded-md px-3 py-2 w-full text-left flex items-center gap-2"
                    :class="isRouteActive('/applications')
                        ? 'bg-green-900'
                        : 'hover:bg-gray-900 hover:text-white'">
                    <li class="pi pi-file-check" style="font-size: 1.5rem"></li>
                    Applications
                </RouterLink>
            </div>
        </div>
    </nav>
</template>
<script>
import { RouterLink } from 'vue-router';
import logo from '@/assets/img/logo.png';
import {isRouteActive} from '@/utils/routeUtils.js'
import { useAuthStore } from '@/stores/authStore';
export default {
    components: {
        RouterLink
    },
    data() {
        return {
            logo: logo
        }
    },
    methods:{
        isRouteActive
    },
    computed:{
        isAdmin(){
            const authStore = useAuthStore();
            return authStore.type === 'admin';
        },
        isNotUser (){
            const authStore = useAuthStore();
            return authStore.type !== 'user'
        }
    }
}
</script>