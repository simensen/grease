import { ref, watch, Ref } from 'vue'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: {
    serializer?: {
      read: (value: string) => T
      write: (value: T) => string
    }
  } = {}
): [Ref<T>, (value: T) => void] {
  const {
    serializer = {
      read: (v: string) => {
        try {
          return JSON.parse(v)
        } catch {
          return v as T
        }
      },
      write: (v: T) => JSON.stringify(v)
    }
  } = options

  const storedValue = localStorage.getItem(key)
  const initialValue = storedValue !== null 
    ? serializer.read(storedValue)
    : defaultValue

  const state = ref<T>(initialValue)

  const setValue = (value: T) => {
    try {
      state.value = value
      localStorage.setItem(key, serializer.write(value))
    } catch (error) {
      console.warn(`Failed to set localStorage key "${key}":`, error)
    }
  }

  // Watch for changes and update localStorage
  watch(
    state,
    (newValue) => {
      try {
        localStorage.setItem(key, serializer.write(newValue))
      } catch (error) {
        console.warn(`Failed to update localStorage key "${key}":`, error)
      }
    },
    { deep: true }
  )

  return [state, setValue]
}