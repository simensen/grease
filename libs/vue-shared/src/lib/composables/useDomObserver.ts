import { ref, onMounted, onUnmounted, Ref, getCurrentInstance } from 'vue'

export function useDomObserver(
  selector: string,
  callback: (elements: Element[]) => void,
  options: {
    immediate?: boolean
    childList?: boolean
    subtree?: boolean
    attributes?: boolean
    attributeOldValue?: boolean
    characterData?: boolean
    characterDataOldValue?: boolean
  } = {}
) {
  const {
    immediate = true,
    childList = true,
    subtree = true,
    attributes = false,
    attributeOldValue = false,
    characterData = false,
    characterDataOldValue = false
  } = options

  const isObserving = ref(false)
  let observer: MutationObserver | null = null

  const findElements = () => {
    return Array.from(document.querySelectorAll(selector))
  }

  const handleMutation = () => {
    const elements = findElements()
    if (elements.length > 0) {
      callback(elements)
    }
  }

  const startObserving = () => {
    if (observer || isObserving.value) return

    observer = new MutationObserver(handleMutation)
    observer.observe(document.body, {
      childList,
      subtree,
      attributes,
      attributeOldValue,
      characterData,
      characterDataOldValue
    })
    
    isObserving.value = true

    // Check immediately if elements already exist
    if (immediate) {
      handleMutation()
    }
  }

  const stopObserving = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    isObserving.value = false
  }

  // Only use lifecycle hooks if we're inside a Vue component
  const instance = getCurrentInstance()
  if (instance) {
    onMounted(() => {
      startObserving()
    })

    onUnmounted(() => {
      stopObserving()
    })
  } else {
    // If not in a component, start observing immediately
    startObserving()
  }

  return {
    isObserving,
    startObserving,
    stopObserving,
    findElements
  }
}