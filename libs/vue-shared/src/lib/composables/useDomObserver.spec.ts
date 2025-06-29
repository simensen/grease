import { useDomObserver } from './useDomObserver'
import { nextTick } from 'vue'
import { vi } from 'vitest'

describe('useDomObserver', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should find existing elements immediately', () => {
    const testDiv = document.createElement('div')
    testDiv.className = 'test-element'
    document.body.appendChild(testDiv)

    const mockCallback = vi.fn()
    useDomObserver('.test-element', mockCallback)

    expect(mockCallback).toHaveBeenCalledWith([testDiv])
  })

  it('should observe new elements being added', async () => {
    const mockCallback = vi.fn()
    useDomObserver('.dynamic-element', mockCallback)

    // Add element after observer is set up
    const testDiv = document.createElement('div')
    testDiv.className = 'dynamic-element'
    document.body.appendChild(testDiv)

    // Wait for mutation observer to trigger
    await new Promise(resolve => setTimeout(resolve, 10))

    expect(mockCallback).toHaveBeenCalledWith([testDiv])
  })

  it('should return utility functions', () => {
    const mockCallback = vi.fn()
    const { isObserving, startObserving, stopObserving, findElements } = 
      useDomObserver('.test', mockCallback)

    expect(typeof startObserving).toBe('function')
    expect(typeof stopObserving).toBe('function')
    expect(typeof findElements).toBe('function')
    expect(isObserving.value).toBe(true)
  })

  it('should stop observing when stopObserving is called', () => {
    const mockCallback = vi.fn()
    const { isObserving, stopObserving } = useDomObserver('.test', mockCallback)

    expect(isObserving.value).toBe(true)
    stopObserving()
    expect(isObserving.value).toBe(false)
  })

  it('should not observe with immediate=false', () => {
    const testDiv = document.createElement('div')
    testDiv.className = 'immediate-test'
    document.body.appendChild(testDiv)

    const mockCallback = vi.fn()
    useDomObserver('.immediate-test', mockCallback, { immediate: false })

    expect(mockCallback).not.toHaveBeenCalled()
  })

  it('should findElements manually', () => {
    const testDiv1 = document.createElement('div')
    testDiv1.className = 'find-test'
    const testDiv2 = document.createElement('div')
    testDiv2.className = 'find-test'
    document.body.appendChild(testDiv1)
    document.body.appendChild(testDiv2)

    const mockCallback = vi.fn()
    const { findElements } = useDomObserver('.find-test', mockCallback)

    const elements = findElements()
    expect(elements).toHaveLength(2)
    expect(elements).toContain(testDiv1)
    expect(elements).toContain(testDiv2)
  })
})
