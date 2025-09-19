
import { defineStore } from 'pinia'

export const useJobStore = defineStore('job', {
  state: () => ({
    jobData: null
  }),
  actions: {
    setJob(job) {
      this.jobData = job
    }
  }
})
