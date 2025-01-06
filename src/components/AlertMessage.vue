<template>
    <div v-if="alertMessage" :class="alertClass">
      {{ alertMessage }}
      <button @click="clearAlert" class="close-button">X</button>
    </div>
  </template>
  <script>
import { useAlertStore } from '@/stores/alertStore';
export default {
  computed: {
    alertMessage() {
      const alertStore = useAlertStore();
      return alertStore.alertMessage;
    },
    alertType() {
      const alertStore = useAlertStore();
      return alertStore.alertType; 
    },
    alertClass() {
      return this.alertType === 'error' ?  'error-alert' : 'success-alert';
    },
  },
  methods: {
    clearAlert() {
      const alertStore = useAlertStore();
      alertStore.clearAlertMessage();
    },
  },
  watch: {
    alertMessage(newMessage) {
      if (newMessage) {
        setTimeout(() => {
          this.clearAlert();
        }, 5000);
      }
    },
  },

};
</script>

  
<style scoped>
.success-alert {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50; 
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  font-weight: bold;
  text-align: center;
}

.error-alert {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #F44336; 
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  font-weight: bold;
  text-align: center;
}

.close-button {
  margin-left: 10px;
  background: transparent;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>