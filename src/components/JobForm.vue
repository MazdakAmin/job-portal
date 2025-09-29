<template>
  <v-dialog v-model="internalModel" max-width="700px" persistent>
    <v-card class="rounded-lg">
      <!-- Header -->
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6 font-weight-bold text-green-darken-2">
          {{ mode === "edit" ? "Edit Job" : "Create New Job" }}
        </span>
        <v-btn icon="mdi-close" variant="text" color="red" @click="close" />
      </v-card-title>

      <v-divider />

      <!-- Form -->
      <v-card-text>
        <v-form ref="form" @submit.prevent="handleSubmit" lazy-validation>
          <v-row dense>
            <!-- Job Title -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="localFormData.jobTitle"
                label="Job Title"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-briefcase"
                required
              />
            </v-col>

            <!-- Salary -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="localFormData.salary"
                label="Salary"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-currency-usd"
                required
              />
            </v-col>

            <!-- Job Type -->
            <v-col cols="12" md="6">
              <v-select
                v-model="localFormData.jobType"
                :items="['Full-Time', 'Part-Time', 'Contract']"
                label="Job Type"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-briefcase-check"
                required
              />
            </v-col>

            <!-- Location -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="localFormData.location"
                label="Location"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-map-marker"
                required
              />
            </v-col>
          </v-row>

          <!-- Job Description -->
          <v-textarea
            v-model="localFormData.jobDesc"
            label="Job Description"
            variant="outlined"
            rows="4"
            auto-grow
            prepend-inner-icon="mdi-text"
            required
          />

          <!-- Status (only in edit mode) -->
          <v-select
            v-if="showStatus"
            v-model="localFormData.status"
            :items="['open', 'close']"
            label="Status"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-check-circle"
          />
        </v-form>
      </v-card-text>

      <v-divider />

      <!-- Actions -->
      <v-card-actions class="d-flex justify-end">
        <v-btn color="red" variant="text" @click="close">Cancel</v-btn>
        <v-btn
          color="green"
          variant="flat"
          prepend-icon="mdi-content-save"
          @click="handleSubmit"
        >
          {{ mode === "edit" ? "Update Job" : "Create Job" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "JobForm",
  props: {
    modelValue: { type: Boolean, required: true },
    formData: {
      type: Object,
      default: () => ({
        jobTitle: "",
        salary: "",
        jobType: "",
        location: "",
        jobDesc: "",
        status: "open",
      }),
    },
    mode: { type: String, default: "create" },
    showStatus: { type: Boolean, default: false },
  },
  emits: ["update:modelValue", "submit"],
  data() {
    return {
      localFormData: { ...this.formData },
    };
  },
  computed: {
    internalModel: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  watch: {
    formData: {
      handler(newVal) {
        this.localFormData = { ...newVal };
      },
      deep: true,
    },
  },
  methods: {
    close() {
      this.internalModel = false;
    },
    handleSubmit() {
      this.$emit("submit", this.localFormData);
      this.close();
    },
  },
};
</script>
