<template>
     <nav class="bg-green-700 p-6 w-64 h-full">
        <div class="flex flex-col items-start mt-14 sm:mt-0">
            <div class="mb-6 sm:mx-6 ">
                <img class="w-24 h-24 rounded-full object-cover" :src="logo" alt="Vue Jobs" />
            </div>
            <div class="flex flex-col  sm:items-start sm:mx-6 space-y-4 w-full ">
           <NavLink to="/dashboard">
            <li class="pi pi-gauge" style="font-size: 1.5rem"></li>
                    Dashboard
           </NavLink>

                <RouterLink to="/"
                    class="text-white hover:bg-green-900 rounded-md px-3 py-2 w-full text-left flex items-center gap-2">
                    <li class="pi pi-gauge" style="font-size: 1.5rem"></li>
                    Home
                </RouterLink>
                <NavLink v-if="isAdmin" to="/users">
                    <i class="pi pi-user" style="font-size: 1.5rem"></i>
                    Users
           </NavLink>
           <NavLink v-if="isNotUser" to="/panel-jobs">
            <li class="pi pi-gauge" style="font-size: 1.5rem"></li>
            Jobs
           </NavLink>
           <NavLink v-if="isNotUser" to="/applications">
            <li class="pi pi-file-check" style="font-size: 1.5rem"></li>
                    Applications
           </NavLink>
            </div>
        </div>
    </nav>
</template>
<script>
import { RouterLink } from 'vue-router';
import logo from '@/assets/img/logo.png';
import { useAuthStore } from '@/stores/authStore';
import NavLink from '@/components/NavLink.vue';
export default {
    components: {
        RouterLink,
        NavLink
    },
    data() {
        return {
            logo: logo
        }
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