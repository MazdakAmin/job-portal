<template>
    <!-- ===== Page Wrapper Start ===== -->
    <div class="flex h-screen overflow-hidden bg-gray-100" >
      <!-- ===== Sidebar Start ===== -->
      
      <!-- ===== Sidebar End ===== -->
       <Sidbar  :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-green-700 text-white transition-transform',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0',
      ]" />
       
      <!-- ===== Content Area Start ===== -->
      <div class="relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden md:ml-64">
        <!-- ===== Header Start ===== -->
    <Header @toggle-sidebar="toggleSidebar" />
        <!-- ===== Header End ===== -->
  
        <!-- ===== Main Content Start ===== -->
        <main>
          <div class="flex-1 bg-gray-50 p-4 md:p-6 2xl:p-10">
            <AlertMessage />
            <ConfirmModal />
            <slot></slot>
          </div>
        </main>
        <!-- ===== Main Content End ===== -->
      </div>
    </div>
    <!-- ===== Page Wrapper End ===== -->
  </template>
<script>
import Sidbar from "@/components/Sidbar.vue";
import Header from "@/components/Header.vue";
import AlertMessage from "@/components/AlertMessage.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

export default {
  components: {
    Sidbar,
    Header,
    AlertMessage,
    ConfirmModal,
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>