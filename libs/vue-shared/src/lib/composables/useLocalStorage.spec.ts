import { useLocalStorage } from './useLocalStorage'
import { vi } from 'vitest'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return default value when no stored value exists', () => {
    const [state] = useLocalStorage('test-key', 'default-value')
    expect(state.value).toBe('default-value')
  })

  it('should return stored value when it exists', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'))
    const [state] = useLocalStorage('test-key', 'default-value')
    expect(state.value).toBe('stored-value')
  })

  it('should update localStorage when value changes', () => {
    const [state, setValue] = useLocalStorage('test-key', 'initial')
    
    setValue('new-value')
    expect(state.value).toBe('new-value')
    expect(localStorage.getItem('test-key')).toBe('"new-value"')
  })

  it('should handle objects correctly', () => {
    const defaultObj = { name: 'test', count: 0 }
    const [state, setValue] = useLocalStorage('test-obj', defaultObj)
    
    const newObj = { name: 'updated', count: 5 }
    setValue(newObj)
    
    expect(state.value).toEqual(newObj)
    expect(JSON.parse(localStorage.getItem('test-obj')!)).toEqual(newObj)
  })

  it('should handle custom serializer', () => {
    const customSerializer = {
      read: (value: string) => parseInt(value, 10),
      write: (value: number) => value.toString()
    }
    
    const [state, setValue] = useLocalStorage('test-number', 0, {
      serializer: customSerializer
    })
    
    setValue(42)
    expect(state.value).toBe(42)
    expect(localStorage.getItem('test-number')).toBe('42')
  })

  it('should handle localStorage errors gracefully', () => {
    const originalSetItem = localStorage.setItem
    localStorage.setItem = () => {
      throw new Error('Storage quota exceeded')
    }
    
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    
    const [, setValue] = useLocalStorage('test-key', 'default')
    setValue('new-value')
    
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to set localStorage key "test-key":',
      expect.any(Error)
    )
    
    localStorage.setItem = originalSetItem
    consoleSpy.mockRestore()
  })
})
