import { describe, it, expect } from "vitest"
import duration, { Duration } from "../src/index"

describe("Duration", () => {
  describe("Template Literal Syntax", () => {
    it("should parse milliseconds correctly", () => {
      const result = duration`500ms`
      expect(result.milliseconds).toBe(500)
    })

    it("should parse seconds correctly", () => {
      const result = duration`30s`
      expect(result.milliseconds).toBe(30000)
      expect(result.seconds).toBe(30)
    })

    it("should parse minutes correctly", () => {
      const result = duration`5m`
      expect(result.milliseconds).toBe(300000)
      expect(result.minutes).toBe(5)
    })

    it("should parse hours correctly", () => {
      const result = duration`2h`
      expect(result.milliseconds).toBe(7200000)
      expect(result.hours).toBe(2)
    })

    it("should parse days correctly", () => {
      const result = duration`1d`
      expect(result.milliseconds).toBe(86400000)
      expect(result.days).toBe(1)
    })

    it("should parse weeks correctly", () => {
      const result = duration`1w`
      expect(result.milliseconds).toBe(604800000)
      expect(result.weeks).toBe(1)
    })

    it("should parse years correctly", () => {
      const result = duration`1y`
      expect(result.milliseconds).toBe(31536000000)
      expect(result.years).toBe(1)
    })

    it("should parse decimal values", () => {
      const result = duration`1.5h`
      expect(result.hours).toBe(1.5)
      expect(result.minutes).toBe(90)
    })

    it("should handle zero values", () => {
      const result = duration`0s`
      expect(result.milliseconds).toBe(0)
    })
  })

  describe("Error Handling", () => {
    it("should throw error for empty string", () => {
      expect(() => duration``).toThrow("Duration string cannot be empty")
    })

    it("should throw error for invalid format", () => {
      expect(() => duration`invalid`).toThrow("Invalid duration format")
    })

    it("should throw error for missing unit", () => {
      expect(() => duration`5`).toThrow("Invalid duration format")
    })

    it("should throw error for invalid unit", () => {
      expect(() => duration`5x`).toThrow("Invalid duration format")
    })

    it("should throw error for negative values", () => {
      expect(() => duration`-5m`).toThrow("Invalid duration format")
    })

    it("should throw error for non-numeric values", () => {
      expect(() => duration`abc5m`).toThrow("Invalid duration format")
    })

    it("should throw error for template literal with interpolation", () => {
      const value = 5
      expect(() => duration`${value}m`).toThrow(
        "Duration template literal must contain only a single string without interpolation",
      )
    })
  })

  describe("Unit Conversions", () => {
    const oneHour = duration`1h`

    it("should convert to milliseconds", () => {
      expect(oneHour.milliseconds).toBe(3600000)
    })

    it("should convert to seconds", () => {
      expect(oneHour.seconds).toBe(3600)
    })

    it("should convert to minutes", () => {
      expect(oneHour.minutes).toBe(60)
    })

    it("should convert to hours", () => {
      expect(oneHour.hours).toBe(1)
    })

    it("should convert to days", () => {
      expect(oneHour.days).toBe(1 / 24)
    })

    it("should convert to weeks", () => {
      expect(oneHour.weeks).toBe(1 / (24 * 7))
    })

    it("should convert to years", () => {
      expect(oneHour.years).toBe(1 / (24 * 365))
    })
  })

  describe("String Representation", () => {
    it("should display milliseconds for small values", () => {
      expect(duration`500ms`.toString()).toBe("500ms")
    })

    it("should display seconds for medium values", () => {
      expect(duration`30s`.toString()).toBe("30s")
    })

    it("should display minutes for appropriate values", () => {
      expect(duration`5m`.toString()).toBe("5m")
    })

    it("should display hours for appropriate values", () => {
      expect(duration`2h`.toString()).toBe("2h")
    })

    it("should display days for appropriate values", () => {
      expect(duration`3d`.toString()).toBe("3d")
    })

    it("should display weeks for appropriate values", () => {
      expect(duration`2w`.toString()).toBe("2w")
    })

    it("should display years for large values", () => {
      expect(duration`1y`.toString()).toBe("1y")
    })
  })

  describe("valueOf Method", () => {
    it("should return milliseconds when used as primitive", () => {
      const _duration = duration`5m`
      expect(_duration.valueOf()).toBe(300000)
      expect(+_duration).toBe(300000)
    })

    it("should work with numeric operations", () => {
      const _duration = duration`1s`
      expect(_duration.valueOf() + 1000).toBe(2000)
    })
  })

  describe("Duration Class Direct Usage", () => {
    it("should create duration from milliseconds", () => {
      const duration = new Duration(5000)
      expect(duration.seconds).toBe(5)
    })

    it("should work with all methods", () => {
      const duration = new Duration(60000)
      expect(duration.minutes).toBe(1)
      expect(duration.toString()).toBe("1m")
    })
  })

  describe("Static Methods", () => {
    it("should create duration with milliseconds", () => {
      const duration = Duration.ms(100)
      expect(duration.milliseconds).toBe(100)
    })

    it("should create duration with seconds", () => {
      const duration = Duration.seconds(2)
      expect(duration.seconds).toBe(2)
      expect(duration.milliseconds).toBe(2000)
    })

    it("should create duration with minutes", () => {
      const duration = Duration.minutes(5)
      expect(duration.minutes).toBe(5)
      expect(duration.milliseconds).toBe(300000)
    })

    it("should create duration with hours", () => {
      const duration = Duration.hours(1)
      expect(duration.hours).toBe(1)
      expect(duration.milliseconds).toBe(3600000)
    })

    it("should create duration with days", () => {
      const duration = Duration.days(1)
      expect(duration.days).toBe(1)
      expect(duration.milliseconds).toBe(86400000)
    })

    it("should create duration with weeks", () => {
      const duration = Duration.weeks(1)
      expect(duration.weeks).toBe(1)
      expect(duration.milliseconds).toBe(604800000)
    })

    it("should create duration with years", () => {
      const duration = Duration.years(1)
      expect(duration.years).toBe(1)
      expect(duration.milliseconds).toBe(31536000000)
    })

    it("should handle decimal values", () => {
      const duration = Duration.hours(1.5)
      expect(duration.hours).toBe(1.5)
      expect(duration.minutes).toBe(90)
    })
  })

  describe("Real-world Use Cases", () => {
    it("should replace complex TTL calculations", () => {
      const oldWay = 60 * 60 * 1000 * 8
      const newWay = duration`8h`
      expect(newWay.valueOf()).toBe(oldWay)
    })

    it("should handle timeout scenarios", () => {
      const timeout = duration`30s`
      const start = Date.now()
      expect(timeout.milliseconds).toBe(30000)
      expect(start + timeout.valueOf()).toBeGreaterThan(start)
    })
  })

  describe("Edge Cases", () => {
    it("should handle very large numbers", () => {
      const _duration = duration`999999999ms`
      expect(_duration.milliseconds).toBe(999999999)
    })

    it("should handle very small decimal values", () => {
      const _duration = duration`0.001s`
      expect(_duration.milliseconds).toBe(1)
    })

    it("throws error for NaN values", () => {
      expect(() => duration`NaN`).toThrow("Invalid duration format")
    })

    it("throws error for Infinity values", () => {
      expect(() => duration`Infinity`).toThrow("Invalid duration format")
    })
  })
})
