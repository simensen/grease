import { useUserscriptSettings, UserscriptSetting } from './useUserscriptSettings'
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

describe('useUserscriptSettings', () => {
  const mockSettings: UserscriptSetting[] = [
    {
      key: 'enabled',
      label: 'Enable Script',
      type: 'boolean',
      defaultValue: true,
      description: 'Enable or disable the script'
    },
    {
      key: 'username',
      label: 'Username',
      type: 'string',
      defaultValue: 'anonymous',
      description: 'Your username'
    },
    {
      key: 'maxItems',
      label: 'Max Items',
      type: 'number',
      defaultValue: 10,
      min: 1,
      max: 100
    },
    {
      key: 'theme',
      label: 'Theme',
      type: 'select',
      defaultValue: 'light',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' }
      ]
    }
  ]

  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with default values', () => {
    const { settings } = useUserscriptSettings('test-script', mockSettings)
    
    expect(settings.value.enabled).toBe(true)
    expect(settings.value.username).toBe('anonymous')
    expect(settings.value.maxItems).toBe(10)
    expect(settings.value.theme).toBe('light')
  })

  it('should load existing settings from localStorage', () => {
    localStorage.setItem('userscript-settings-test-script', JSON.stringify({
      enabled: false,
      username: 'testuser'
    }))

    const { settings } = useUserscriptSettings('test-script', mockSettings)
    
    expect(settings.value.enabled).toBe(false)
    expect(settings.value.username).toBe('testuser')
    expect(settings.value.maxItems).toBe(10) // Should use default for missing values
  })

  it('should get individual settings', () => {
    const { getSetting } = useUserscriptSettings('test-script', mockSettings)
    
    expect(getSetting('enabled')).toBe(true)
    expect(getSetting<string>('username')).toBe('anonymous')
  })

  it('should set individual settings and persist to localStorage', () => {
    const { setSetting, getSetting } = useUserscriptSettings('test-script', mockSettings)
    
    setSetting('enabled', false)
    setSetting('username', 'newuser')
    
    expect(getSetting('enabled')).toBe(false)
    expect(getSetting('username')).toBe('newuser')
    
    const stored = JSON.parse(localStorage.getItem('userscript-settings-test-script')!)
    expect(stored.enabled).toBe(false)
    expect(stored.username).toBe('newuser')
  })

  it('should reset settings to defaults', () => {
    const { setSetting, resetSettings, settings } = useUserscriptSettings('test-script', mockSettings)
    
    setSetting('enabled', false)
    setSetting('username', 'changed')
    
    resetSettings()
    
    expect(settings.value.enabled).toBe(true)
    expect(settings.value.username).toBe('anonymous')
    expect(localStorage.getItem('userscript-settings-test-script')).toBe('{}')
  })

  it('should export settings as JSON', () => {
    const { setSetting, exportSettings } = useUserscriptSettings('test-script', mockSettings)
    
    setSetting('enabled', false)
    setSetting('username', 'testuser')
    
    const exported = exportSettings()
    const parsed = JSON.parse(exported)
    
    expect(parsed.enabled).toBe(false)
    expect(parsed.username).toBe('testuser')
    expect(parsed.maxItems).toBe(10)
    expect(parsed.theme).toBe('light')
  })

  it('should import settings from JSON', () => {
    const { importSettings, getSetting } = useUserscriptSettings('test-script', mockSettings)
    
    const importData = JSON.stringify({
      enabled: false,
      username: 'imported',
      maxItems: 25,
      invalidKey: 'should be ignored'
    })
    
    const result = importSettings(importData)
    
    expect(result).toBe(true)
    expect(getSetting('enabled')).toBe(false)
    expect(getSetting('username')).toBe('imported')
    expect(getSetting('maxItems')).toBe(25)
    expect(getSetting('theme')).toBe('light') // unchanged
  })

  it('should handle invalid JSON during import', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { importSettings } = useUserscriptSettings('test-script', mockSettings)
    
    const result = importSettings('invalid json{')
    
    expect(result).toBe(false)
    expect(consoleSpy).toHaveBeenCalledWith('Failed to import settings:', expect.any(Error))
    
    consoleSpy.mockRestore()
  })

  it('should provide settings definition', () => {
    const { settingsDefinition } = useUserscriptSettings('test-script', mockSettings)
    
    expect(settingsDefinition).toBe(mockSettings)
  })
})
