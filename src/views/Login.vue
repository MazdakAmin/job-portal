<template>
  <AlertMessage />

  <v-container fluid>
    <v-row justify="center" align="center" style="min-height: calc(100vh - 64px)">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6" elevation="4">
          <h2 class="text-h5 font-weight-bold text-green-darken-3 mb-6">
            Login to Your Account
          </h2>

          <!-- Login Form -->
          <v-form @submit.prevent="onSubmit">
            <!-- Email Field -->
            <v-text-field
              v-model="formData.email"
              label="Email"
              type="email"
              :error-messages="errorMessage.email"
              outlined
              required
              density="comfortable"
              prepend-inner-icon="mdi-email"
            ></v-text-field>

            <!-- Password Field -->
            <v-text-field
              v-model="formData.password"
              label="Password"
              type="password"
              :error-messages="errorMessage.password"
              outlined
              required
              density="comfortable"
              prepend-inner-icon="mdi-lock"
            ></v-text-field>

            <!-- Submit Button -->
            <v-btn
              type="submit"
              color="green-darken-2"
              size="large"
              class="mt-4"
            >
              Login
            </v-btn>
          </v-form>

          <!-- Register Link -->
          <div class="text-center mt-4">
            <p class="text-body-2 text-grey-darken-1">
              Don’t have an account?
              <RouterLink to="/register" class="text-green-darken-2 font-weight-bold">
                Register here
              </RouterLink>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { useAlertStore } from "@/stores/alertStore";
import axiosInstance from "@/utils/axiosInstance";
import AlertMessage from "@/components/AlertMessage.vue";
import { useAuthStore } from "@/stores/authStore";

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      errorMessage: {
        email: "",
        password: "",
      },
    };
  },
  components: {
    AlertMessage,
  },
  methods: {
    onSubmit() {
      this.errorMessage.email = "";
      this.errorMessage.password = "";
      let isValid = true;

      if (!this.formData.email) {
        this.errorMessage.email = "Email is required.";
        isValid = false;
      } else if (!this.isValidEmail(this.formData.email)) {
        this.errorMessage.email = "Please enter a valid email address.";
        isValid = false;
      }
      if (!this.formData.password) {
        this.errorMessage.password = "Password is required.";
        isValid = false;
      }

      if (!isValid) return;

      const alertStore = useAlertStore();
      axiosInstance
        .post("/user/login", this.formData)
        .then((response) => {
          alertStore.setAlertMessage("You are logged in, welcome!", "success");
          const authStore = useAuthStore();
          authStore.login(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          alertStore.setAlertMessage(error.response.data.message, "error");
        });
    },
    isValidEmail(email) {
      const emailRegex =
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(email);
    },
  },
};
</script>
