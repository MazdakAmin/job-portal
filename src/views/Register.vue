<template>
  <AlertMessage />

  <v-container class="d-flex justify-center align-start" style="margin-top: 80px;">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6" elevation="6" rounded="lg">
          <v-card-title class="text-h5 font-weight-bold text-success mb-4">
            Create Your Account
          </v-card-title>

          <!-- Register Form -->
          <v-form @submit.prevent="onSubmit" ref="formRef">
            <!-- Name -->
            <v-text-field
              v-model="formData.firstname"
              label="Full Name"
              variant="outlined"
              :error-messages="errorMessage.firstname"
              required
            />

            <!-- Email -->
            <v-text-field
              v-model="formData.email"
              label="Email"
              type="email"
              variant="outlined"
              :error-messages="errorMessage.email"
              required
            />

            <!-- Password -->
            <v-text-field
              v-model="formData.password"
              label="Password"
              type="password"
              variant="outlined"
              :error-messages="errorMessage.password"
              required
            />

            <!-- Submit -->
            <v-btn
              type="submit"
              color="success"
              block
              class="mt-4"
            >
              Register
            </v-btn>
          </v-form>

          <!-- Login Link -->
          <div class="mt-4 text-center">
            <p class="text-body-2">
              Already have an account?
              <RouterLink to="/login" class="text-success font-weight-bold">
                Login here
              </RouterLink>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { useAlertStore } from '@/stores/alertStore'
import axiosInstance from '@/utils/axiosInstance'
import AlertMessage from '@/components/AlertMessage.vue'

export default {
  components: {
    AlertMessage,
  },
  data() {
    return {
      formData: {
        firstname: '',
        email: '',
        password: '',
      },
      errorMessage: {
        firstname: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    onSubmit() {
      this.errorMessage = { firstname: '', email: '', password: '' }
      let isValid = true

      if (!this.formData.firstname) {
        this.errorMessage.firstname = 'Name is required.'
        isValid = false
      }
      if (!this.formData.email) {
        this.errorMessage.email = 'Email is required.'
        isValid = false
      } else if (!this.isValidEmail(this.formData.email)) {
        this.errorMessage.email = 'Please enter a valid email address.'
        isValid = false
      }
      if (!this.formData.password) {
        this.errorMessage.password = 'Password is required.'
        isValid = false
      }

      if (!isValid) return

      const alertStore = useAlertStore()
      axiosInstance
        .post('/user/register', this.formData)
        .then(() => {
          alertStore.setAlertMessage(
            'Register successfully, now you can login',
            'success'
          )
          this.$router.push('/login')
        })
        .catch((error) => {
          alertStore.setAlertMessage(error.response.data.message, 'error')
        })
    },
    isValidEmail(email) {
      const emailRegex =
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      return emailRegex.test(email)
    },
  },
}
</script>
