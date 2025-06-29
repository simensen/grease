import { ref, computed, Ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export interface UserscriptSetting {
  key: string
  label: string
  type: 'boolean' | 'string' | 'number' | 'select'
  defaultValue: any
  description?: string
  options?: Array<{ value: any; label: string }>
  min?: number
  max?: number
  step?: number
}

export function useUserscriptSettings(
  scriptName: string,
  settingsDefinition: UserscriptSetting[]
) {
  const storageKey = `userscript-settings-${scriptName}`
  const [storedSettings, setStoredSettings] = useLocalStorage(storageKey, {})

  const settings = ref<Record<string, any>>({})

  // Initialize settings with defaults
  settingsDefinition.forEach(setting => {
    settings.value[setting.key] = storedSettings.value[setting.key] ?? setting.defaultValue
  })

  const getSetting = <T = any>(key: string): T => {
    return settings.value[key]
  }

  const setSetting = (key: string, value: any) => {
    settings.value[key] = value
    setStoredSettings({
      ...storedSettings.value,
      [key]: value
    })
  }

  const resetSettings = () => {
    settingsDefinition.forEach(setting => {
      settings.value[setting.key] = setting.defaultValue
    })
    setStoredSettings({})
  }

  const exportSettings = () => {
    return JSON.stringify(settings.value, null, 2)
  }

  const importSettings = (settingsJson: string) => {
    try {
      const imported = JSON.parse(settingsJson)
      Object.keys(imported).forEach(key => {
        const settingDef = settingsDefinition.find(s => s.key === key)
        if (settingDef) {
          setSetting(key, imported[key])
        }
      })
      return true
    } catch (error) {
      console.error('Failed to import settings:', error)
      return false
    }
  }

  return {
    settings: computed(() => settings.value),
    getSetting,
    setSetting,
    resetSettings,
    exportSettings,
    importSettings,
    settingsDefinition
  }
}