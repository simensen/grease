// Userscript-specific utility functions

/**
 * Wait for an element to appear in the DOM
 */
export function waitForElement(
  selector: string,
  timeout: number = 10000
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
        resolve(element)
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    setTimeout(() => {
      observer.disconnect()
      reject(new Error(`Element "${selector}" not found within ${timeout}ms`))
    }, timeout)
  })
}

/**
 * Wait for page to be fully loaded
 */
export function waitForPageLoad(): Promise<void> {
  return new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve()
    } else {
      window.addEventListener('load', () => resolve())
    }
  })
}

/**
 * Inject CSS styles into the page
 */
export function injectCSS(css: string): HTMLStyleElement {
  const style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)
  return style
}

/**
 * Create and append an element with specified attributes
 */
export function createElement<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  attributes: Partial<HTMLElementTagNameMap[T]> = {},
  parent?: Element
): HTMLElementTagNameMap[T] {
  const element = document.createElement(tag)
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'textContent') {
      element.textContent = value as string
    } else if (key === 'innerHTML') {
      element.innerHTML = value as string
    } else {
      (element as any)[key] = value
    }
  })
  
  if (parent) {
    parent.appendChild(element)
  }
  
  return element
}

/**
 * Get or set a value in localStorage with type safety
 */
export function storage<T>(key: string, defaultValue?: T): T | undefined
export function storage<T>(key: string, value: T): void
export function storage<T>(key: string, valueOrDefault?: T): T | undefined | void {
  if (arguments.length === 1 || (arguments.length === 2 && valueOrDefault === undefined)) {
    // Get mode
    const stored = localStorage.getItem(key)
    if (stored === null) {
      return valueOrDefault
    }
    try {
      return JSON.parse(stored)
    } catch {
      return stored as T
    }
  } else {
    // Set mode
    localStorage.setItem(key, JSON.stringify(valueOrDefault))
  }
}

/**
 * Add event listener with automatic cleanup
 */
export function addEventListenerWithCleanup<T extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  event: T,
  handler: (event: HTMLElementEventMap[T]) => void,
  options?: boolean | AddEventListenerOptions
): () => void {
  element.addEventListener(event, handler, options)
  return () => element.removeEventListener(event, handler, options)
}

/**
 * Check if current page matches URL pattern
 */
export function matchesUrl(pattern: string | RegExp): boolean {
  const url = window.location.href
  if (typeof pattern === 'string') {
    return url.includes(pattern)
  }
  return pattern.test(url)
}