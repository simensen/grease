<template>
  <div
    v-if="visible"
    ref="panelRef"
    class="grease-floating-panel"
    :style="panelStyle"
    @mousedown="startDrag"
  >
    <div class="grease-panel-header">
      <slot name="header">
        <h3 class="grease-panel-title">{{ title }}</h3>
      </slot>
      <button
        v-if="closable"
        class="grease-panel-close"
        type="button"
        @click="close"
      >
        ×
      </button>
    </div>
    <div class="grease-panel-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  title?: string
  visible?: boolean
  draggable?: boolean
  closable?: boolean
  initialX?: number
  initialY?: number
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Panel',
  visible: true,
  draggable: true,
  closable: true,
  initialX: 20,
  initialY: 20,
  zIndex: 10000
})

const emit = defineEmits<{
  close: []
  move: [x: number, y: number]
}>()

const panelRef = ref<HTMLElement>()
const position = ref({ x: props.initialX, y: props.initialY })
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

const panelStyle = computed(() => ({
  position: 'fixed',
  left: `${position.value.x}px`,
  top: `${position.value.y}px`,
  zIndex: props.zIndex,
  cursor: props.draggable ? 'move' : 'default'
}))

function startDrag(event: MouseEvent) {
  if (!props.draggable) return
  
  isDragging.value = true
  const rect = panelRef.value!.getBoundingClientRect()
  dragOffset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
  
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
  event.preventDefault()
}

function handleDrag(event: MouseEvent) {
  if (!isDragging.value) return
  
  position.value = {
    x: event.clientX - dragOffset.value.x,
    y: event.clientY - dragOffset.value.y
  }
  
  emit('move', position.value.x, position.value.y)
}

function stopDrag() {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function close() {
  emit('close')
}

onUnmounted(() => {
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped>
.grease-floating-panel {
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  max-width: 400px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
}

.grease-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  border-radius: 6px 6px 0 0;
}

.grease-panel-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.grease-panel-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grease-panel-close:hover {
  color: #000;
}

.grease-panel-content {
  padding: 12px;
}
</style>