/**
 * Utility functions for Vue userscripts
 */

/**
 * Creates a safe DOM element for mounting Vue apps in userscripts
 * @param id - The ID for the container element
 * @param className - Optional CSS class for the container
 * @returns HTMLElement that can be used as a Vue app mount point
 */
export function createUserscriptContainer(
  id: string,
  className?: string
): HTMLElement {
  // Remove existing container if it exists
  const existing = document.getElementById(id)
  if (existing) {
    existing.remove()
  }

  const container = document.createElement('div')
  container.id = id
  if (className) {
    container.className = className
  }
  
  // Add some basic styles to prevent conflicts with host page
  container.style.cssText = `
    all: initial;
    position: relative;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.4;
    color: #333;
    box-sizing: border-box;
  `

  document.body.appendChild(container)
  return container
}

/**
 * Waits for an element to be available in the DOM
 * @param selector - CSS selector for the element
 * @param timeout - Maximum time to wait in milliseconds (default: 10000)
 * @returns Promise that resolves with the element or rejects on timeout
 */
export function waitForElement(
  selector: string,
  timeout = 10000
): Promise<Element> {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector)
    if (element) {
      resolve(element)
      return
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector)
      if (element) {
        observer.disconnect()
        clearTimeout(timeoutId)
        resolve(element)
      }
    })

    const timeoutId = setTimeout(() => {
      observer.disconnect()
      reject(new Error(`Element ${selector} not found within ${timeout}ms`))
    }, timeout)

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  })
}
