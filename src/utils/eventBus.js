// utils/eventBus.js
import { reactive } from 'vue';

export const eventBus = reactive({
  events: {},

  // Subscribe to an event
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },

  // Unsubscribe from an event
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  },

  // Emit an event
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
});
