<template>
  <div class="grease-status-indicator" :class="[`status-${status}`, { pulsing }]">
    <div class="status-dot"></div>
    <span v-if="label" class="status-label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  status: 'active' | 'inactive' | 'error' | 'warning' | 'loading'
  label?: string
  pulsing?: boolean
}

withDefaults(defineProps<Props>(), {
  pulsing: false
})
</script>

<style scoped>
.grease-status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 12px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.status-active .status-dot {
  background-color: #28a745;
}

.status-inactive .status-dot {
  background-color: #6c757d;
}

.status-error .status-dot {
  background-color: #dc3545;
}

.status-warning .status-dot {
  background-color: #ffc107;
}

.status-loading .status-dot {
  background-color: #007bff;
}

.pulsing .status-dot {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.status-label {
  color: #333;
  font-weight: 500;
}
</style>