<template>
  <div class="flex justify-center items-center space-x-2 mt-4">
    <!-- Prev -->
    <button
      class="px-3 py-1 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
    >
      Prev
    </button>

    
    <template v-for="page in pagesToShow" :key="page">
      <button
        v-if="page !== '...'"
        class="px-3 py-1 rounded-md"
        :class="{
          'bg-green-600 text-white': page === currentPage,
          'bg-gray-200 text-gray-700 hover:bg-gray-300': page !== currentPage
        }"
        @click="$emit('update:page', page)"
      >
        {{ page }}
      </button>
      <span v-else class="px-2">...</span>
    </template>

    <!-- Next -->
    <button
      class="px-3 py-1 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true }
  },
  computed: {
    pagesToShow() {
      const pages = []
      const maxVisible = 5

      if (this.totalPages <= maxVisible) {
        
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i)
        }
      } else {
        
        pages.push(1)

        if (this.currentPage > 3) {
          pages.push("...")
        }

        const start = Math.max(2, this.currentPage - 1)
        const end = Math.min(this.totalPages - 1, this.currentPage + 1)

        for (let i = start; i <= end; i++) {
          pages.push(i)
        }

        if (this.currentPage < this.totalPages - 2) {
          pages.push("...")
        }

        pages.push(this.totalPages)
      }

      return pages
    }
  }
}
</script>
