<template>
  <AlertMessage />

  <v-container class="py-8">
    <v-row>
      <!-- Job Main Content -->
      <v-col cols="12" md="8">
        <v-skeleton-loader
          v-if="loading"
          type="article"
          class="mb-4"
        />

        <v-card v-else class="pa-6 rounded-lg elevation-2">
          <div class="text-grey mb-2">Full-Time</div>
          <h1 class="text-h4 font-weight-bold mb-4">Senior Vue Developer</h1>

          <div class="d-flex align-center mb-4">
            <v-icon color="orange" class="mr-2">mdi-map-marker</v-icon>
            <span class="text-orange">Boston, MA</span>
          </div>

          <v-divider class="my-4"></v-divider>

          <h3 class="text-green-darken-2 text-h6 font-weight-bold mb-3">
            Job Description
          </h3>
          <p class="mb-4">
            We are seeking a talented Front-End Developer to join our team in Boston, MA. 
            The ideal candidate will have strong skills in HTML, CSS, and JavaScript, with 
            experience working with modern JavaScript frameworks such as Vue or Angular.
          </p>

          <div class="d-flex justify-space-between align-center">
            <h3 class="text-green font-weight-bold">$50</h3>
            <small class="text-grey italic">3 days ago</small>
          </div>
        </v-card>
      </v-col>

      <!-- Sidebar -->
      <v-col cols="12" md="4">
        <!-- Company Info -->
        <v-card class="pa-6 rounded-lg elevation-2 mb-6">
          <h3 class="text-h6 font-weight-bold mb-4">Company Info</h3>
          <h2 class="text-h5">NewTek Solutions</h2>

          <p class="my-2">
            NewTek Solutions is a leading technology company specializing in
            web development and digital solutions. We pride ourselves on
            delivering high-quality products and services to our clients while
            fostering a collaborative and innovative work environment.
          </p>

          <v-divider class="my-4"></v-divider>

          <h3 class="text-subtitle-1">Contact Email:</h3>
          <p class="my-2 bg-green-lighten-4 pa-2 font-weight-bold rounded">
            contact@newteksolutions.com
          </p>

          <h3 class="text-subtitle-1">Contact Phone:</h3>
          <p class="my-2 bg-green-lighten-4 pa-2 font-weight-bold rounded">
            555-555-5555
          </p>
        </v-card>

        <!-- Manage Job -->
        <v-card class="pa-6 rounded-lg elevation-2">
          <h3 class="text-h6 font-weight-bold mb-4">Manage Job</h3>

          <p v-if="!isLogin" class="text-red mb-4">
            Please register to apply
          </p>

          <v-btn
            v-else
            color="green"
            block
            @click="showModal = true"
          >
            Apply
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Apply Modal -->
  <v-dialog v-model="showModal" max-width="500px">
    <v-card class="pa-6">
      <h2 class="text-h6 font-weight-bold text-green-darken-2 mb-4">
        Apply for Senior Vue Developer
      </h2>

      <v-form @submit.prevent="onApply">
        <v-file-input
          v-model="resume"
          accept=".pdf"
          label="Upload Resume (PDF)"
          prepend-icon="mdi-file-pdf-box"
          outlined
          dense
          class="mb-4"
        />

        <v-btn type="submit" color="green" block>
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

export default {
  data() {
    return {
      showModal: false,
      loading: true,
      resume: null
    };
  },
  components: {
    AlertMessage
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
    }, 1000); // simulate API delay
  }
};
</script>
