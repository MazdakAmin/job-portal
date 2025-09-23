<template>
  <div class="d-flex justify-center align-center mt-4">
    <!-- Prev -->
    <v-btn
      color="green-darken-2"
      variant="flat"
      size="small"
      class="mx-1"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
    >
      Prev
    </v-btn>

    <!-- Numbered Pages -->
    <template v-for="page in pagesToShow" :key="page">
      <v-btn
        v-if="page !== '...'"
        size="small"
        class="mx-1"
        :color="page === currentPage ? 'green-darken-2' : 'grey-lighten-2'"
        :variant="page === currentPage ? 'flat' : 'tonal'"
        @click="$emit('update:page', page)"
      >
        {{ page }}
      </v-btn>
      <span v-else class="mx-2">...</span>
    </template>

    <!-- Next -->
    <v-btn
      color="green-darken-2"
      variant="flat"
      size="small"
      class="mx-1"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
    >
      Next
    </v-btn>
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
