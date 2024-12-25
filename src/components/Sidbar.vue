<template>
    <aside
        class="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-green-700 text-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0"
        ref="target">
        <!-- SIDEBAR HEADER -->
        <div class="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
            <RouterLink to="/dashboard">
                <img :src="logo" alt="Logo" />
            </RouterLink>
        </div>
        <!-- SIDEBAR HEADER -->

        <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            <!-- Sidebar Menu -->
            <nav class="mt-5 py-4 px-4 lg:mt-9 lg:px-6">

                <div>
                    <ul class="mb-6 flex flex-col gap-1.5">
                        <RouterLink to="/"
                            class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                            Home</RouterLink>
                            <RouterLink to="/admin-jobs"
                            class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                            Users</RouterLink>
                            <RouterLink to="/admin-jobs"
                            class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                            Jobs</RouterLink>
                            <RouterLink to="/admin-jobs"
                            class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                            Applications</RouterLink>

                    </ul>
                </div>
            </nav>
        </div>
    </aside>
</template>
<script>
import { RouterLink } from 'vue-router';
import logo from '@/assets/img/logo.png';
export default {
    components: {
        RouterLink
    },
    data() {
        return {
            logo: logo
        }
    }
}
</script>