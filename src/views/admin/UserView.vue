<template>
    <AppLayout>
        <div class="flex justify-end mb-6">
            <button
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
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-2">Id</td>
                        <td class="px-4 py-2">Name</td>
                        <td class="px-4 py-2">Email</td>
                        <td class="px-4 py-2 text-center">
                            <!-- Edit Button -->
                            <button class="text-blue-500 hover:text-blue-700" >
                                <i class="pi pi-pencil"></i>
                            </button>
                            <!-- Delete Button -->
                            <button class="text-red-500 hover:text-red-700 ml-4">
                                <i class="pi pi-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AppLayout>
</template>
<script>
import AppLayout from '@/components/layout/AppLayout.vue';

export default {
    components:{
        AppLayout,
    }
}
</script>