<template>
    <div v-if="showModal" class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-10">
        <div class="bg-yellow-100 p-6 rounded-lg shadow-md w-11/12 md:w-1/3">
            <h2 class="text-xl font-bold text-green-800 mb-4">Are you sure?</h2>
            <p class="mb-4">{{ message }}</p>
            <div class="flex justify-end space-x-4">
                <button @click="cancel" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                    Cancel
                </button>
                <button @click="confirm" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useConfirmationStore } from '@/stores/confirmStore';

export default {
    data() {
        return {
            confirmStore: useConfirmationStore(),
        };
    },
    computed: {
        showModal() {
            return this.confirmStore.showModal;
        },
        message() {
            return this.confirmStore.message;
        },
    },
    methods: {
        cancel() {
            this.confirmStore.closeConfirmModal();
        },
        confirm() {
            this.confirmStore.confirm();
        },
    },
};
</script>
<style scoped>
.bg-yellow-100 {
    background-color: #fef3c7;
}

.text-yellow-800 {
    color: #b45309;
}
</style>