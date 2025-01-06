<template>
    <!-- ===== Page Wrapper Start ===== -->
    <div class="flex h-screen overflow-hidden bg-gray-100">
      <!-- ===== Sidebar Start ===== -->
      
      <!-- ===== Sidebar End ===== -->
       <Sidbar />
      <!-- ===== Content Area Start ===== -->
      <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <!-- ===== Header Start ===== -->
    <Header />
        <!-- ===== Header End ===== -->
  
        <!-- ===== Main Content Start ===== -->
        <main>
          <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <AlertMessage />
            <slot></slot>
          </div>
        </main>
        <!-- ===== Main Content End ===== -->
      </div>
    </div>
    <!-- ===== Page Wrapper End ===== -->
  </template>
  <script>
  import Sidbar from '@/components/Sidbar.vue';
  import Header from '@/components/Header.vue';
  import AlertMessage from '../AlertMessage.vue';
  export default{
    components:{
        Sidbar,
        Header,
        AlertMessage
    }
  }
</script>