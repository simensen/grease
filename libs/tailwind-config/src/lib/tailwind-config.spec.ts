import { baseConfig, createTailwindConfig, presets, scopedClasses } from "./tailwind-config"

describe("tailwind-config", () => {
  it("should export baseConfig", () => {
    expect(baseConfig).toBeDefined()
    expect(baseConfig.theme).toBeDefined()
    expect(baseConfig.content).toBeDefined()
  })

  it("should create tailwind config", () => {
    const config = createTailwindConfig()
    expect(config).toBeDefined()
    expect(config.theme).toBeDefined()
  })

  it("should create config with overrides", () => {
    const config = createTailwindConfig({
      theme: {
        extend: {
          colors: {
            custom: '#123456'
          }
        }
      }
    })
    expect(config.theme?.extend?.colors).toBeDefined()
  })

  it("should export presets", () => {
    expect(presets.minimal).toBeDefined()
    expect(presets.modal).toBeDefined()
    expect(presets.stealth).toBeDefined()
  })

  it("should create scoped classes", () => {
    const scoped = scopedClasses('test')
    expect(scoped.prefix).toBe('test-')
    expect(scoped.important).toBe('#test')
  })
})
