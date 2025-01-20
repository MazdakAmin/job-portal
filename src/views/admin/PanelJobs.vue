<template>
    <AppLayout>
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
</template>
<script>
import AppLayout from '@/components/layout/AppLayout.vue';
export default{
    components:{
        AppLayout
    },
}
</script>
