<template>
  <NavBar />
  <AlertMessage />

  <v-container class="py-10">
    <v-row>
      <!-- Job Main Content -->
      <v-col cols="12" md="8">
        <v-skeleton-loader
          v-if="loading"
          type="article"
          class="mb-4"
        />

        <v-card
          v-else
          class="pa-6 rounded-xl elevation-3"
        >
          <!-- Job Header -->
          <div class="d-flex justify-space-between align-center mb-4">
            <div>
              <v-chip color="green-lighten-4" text-color="green-darken-2" class="mr-2">
                Full-Time
              </v-chip>
              <v-chip color="orange-lighten-4" text-color="orange-darken-2">
                Onsite
              </v-chip>
            </div>

            <!-- <v-avatar size="48">
              <img src="https://via.placeholder.com/100x100.png?text=N" alt="Company Logo" />
            </v-avatar> -->
          </div>

          <h1 class="text-h5 font-weight-bold mb-3">Senior Vue Developer</h1>

          <div class="d-flex align-center mb-3">
            <v-icon color="orange" class="mr-2">mdi-map-marker</v-icon>
            <span class="font-weight-medium text-orange">Boston, MA</span>
          </div>

          <v-divider class="my-4"></v-divider>

          <!-- Job Description -->
          <h3 class="text-green-darken-2 text-h6 font-weight-bold mb-2">
            Job Description
          </h3>
          <p class="text-body-2 mb-6">
            We are seeking a talented Front-End Developer to join our team in Boston, MA. 
            The ideal candidate will have strong skills in HTML, CSS, and JavaScript, with 
            experience working with modern frameworks such as Vue or Angular.
          </p>

          <!-- Salary + Time -->
          <div class="d-flex justify-space-between align-center">
            <v-chip color="green" text-color="white" class="font-weight-bold">
              $50/hr
            </v-chip>
            <small class="text-grey italic">3 days ago</small>
          </div>
        </v-card>
      </v-col>

      <!-- Sidebar -->
      <v-col cols="12" md="4">
        <!-- Company Info -->
        <v-card class="pa-6 rounded-xl elevation-3 mb-6">
          <h3 class="text-h6 font-weight-bold mb-4">Company Info</h3>
          <h2 class="text-h5 font-weight-medium">NewTek Solutions</h2>

          <p class="my-2 text-body-2">
            NewTek Solutions is a leading technology company specializing in
            web development and digital solutions. We pride ourselves on
            delivering high-quality products and fostering innovation.
          </p>

          <v-divider class="my-4"></v-divider>

          <v-list density="compact">
            <v-list-item>
              <template #prepend>
                <v-icon color="green">mdi-email</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">
                contact@newteksolutions.com
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon color="green">mdi-phone</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">
                555-555-5555
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>

        <!-- Manage Job -->
        <v-card class="pa-6 rounded-xl elevation-3">
          <h3 class="text-h6 font-weight-bold mb-4">Manage Job</h3>

          <p v-if="!isLogin" class="text-red mb-4">
            Please register to apply
          </p>

          <v-btn
            v-else
            color="green"
            size="large"
            block
            class="rounded-lg"
            @click="showModal = true"
          >
            Apply Now
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Apply Modal -->
  <v-dialog v-model="showModal" max-width="500px">
    <v-card class="pa-6 rounded-xl">
      <h2 class="text-h6 font-weight-bold text-green-darken-2 mb-4">
        Apply for Senior Vue Developer
      </h2>

      <v-form @submit.prevent="onApply">
        <v-file-input
          v-model="resume"
          accept=".pdf"
          label="Upload Resume (PDF)"
          prepend-icon="mdi-file-pdf-box"
          variant="outlined"
          density="comfortable"
          class="mb-4"
        />

        <v-btn type="submit" color="green" block class="rounded-lg">
          Submit Application
        </v-btn>
      </v-form>

      <v-btn
        text
        block
        color="red"
        class="mt-2"
        @click="showModal = false"
      >
        Cancel
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue';
import { useAuthStore } from '@/stores/authStore';
import NavBar from '@/components/NavBar.vue';

export default {
  data() {
    return {
      showModal: false,
      loading: true,
      resume: null
    };
  },
  components: {
    AlertMessage,
    NavBar
  },
  computed: {
    isLogin() {
      const authStore = useAuthStore();
      return authStore.isLogin;
    }
  },
  methods: {
    onApply() {
      if (!this.isLogin) {
        this.$router.push('/login');
        return;
      }
      console.log("Resume submitted:", this.resume);
      this.showModal = false;
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
};
</script>
