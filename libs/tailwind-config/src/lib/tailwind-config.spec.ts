import { tailwindConfig } from "./tailwind-config"

describe("tailwindConfig", () => {
  it("should work", () => {
    expect(tailwindConfig()).toEqual("tailwind-config")
  })
})
