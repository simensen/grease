import { createUserscriptContainer, waitForElement } from "./vue-shared"

describe("vue-shared utilities", () => {
  afterEach(() => {
    // Clean up any created containers
    document.querySelectorAll('[id^="test-container"]').forEach(el => el.remove())
  })

  describe("createUserscriptContainer", () => {
    it("should create a container element with specified id", () => {
      const container = createUserscriptContainer("test-container-1")
      
      expect(container).toBeInstanceOf(HTMLElement)
      expect(container.id).toBe("test-container-1")
      expect(document.getElementById("test-container-1")).toBe(container)
    })

    it("should add className when provided", () => {
      const container = createUserscriptContainer("test-container-2", "my-class")
      
      expect(container.className).toBe("my-class")
    })

    it("should replace existing container with same id", () => {
      const first = createUserscriptContainer("test-container-3")
      const second = createUserscriptContainer("test-container-3")
      
      expect(document.getElementById("test-container-3")).toBe(second)
      expect(document.getElementById("test-container-3")).not.toBe(first)
      expect(document.querySelectorAll("#test-container-3")).toHaveLength(1)
    })

    it("should apply default styles", () => {
      const container = createUserscriptContainer("test-container-4")
      
      // Check that the inline style is applied
      expect(container.style.position).toBe("relative")
      expect(container.style.zIndex).toBe("999999")
    })
  })

  describe("waitForElement", () => {
    it("should resolve immediately if element exists", async () => {
      const testDiv = document.createElement("div")
      testDiv.id = "existing-element"
      document.body.appendChild(testDiv)

      const result = await waitForElement("#existing-element")
      expect(result).toBe(testDiv)

      testDiv.remove()
    })

    it("should wait for element to be added", async () => {
      const promise = waitForElement("#delayed-element")
      
      // Add element after a short delay
      setTimeout(() => {
        const testDiv = document.createElement("div")
        testDiv.id = "delayed-element"
        document.body.appendChild(testDiv)
      }, 50)

      const result = await promise
      expect(result.id).toBe("delayed-element")
      
      result.remove()
    })

    it("should reject after timeout", async () => {
      await expect(waitForElement("#non-existent", 100))
        .rejects
        .toThrow("Element #non-existent not found within 100ms")
    })
  })
})
