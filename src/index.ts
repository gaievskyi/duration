type DurationUnit = "ms" | "s" | "m" | "h" | "d" | "w" | "y"

interface DurationValue {
  milliseconds: number
  seconds: number
  minutes: number
  hours: number
  days: number
  weeks: number
  years: number
  valueOf(): number
  toString(): string
}

const UNIT_MULTIPLIERS: Record<DurationUnit, number> = {
  ms: 1,
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
  w: 7 * 24 * 60 * 60 * 1000,
  y: 365 * 24 * 60 * 60 * 1000,
}

class Duration implements DurationValue {
  #_ms: number

  constructor(milliseconds: number) {
    this.#_ms = milliseconds
  }

  public static ms(value: number): Duration {
    return new Duration(value)
  }

  public static seconds(value: number): Duration {
    return new Duration(value * 1000)
  }

  public static minutes(value: number): Duration {
    return new Duration(value * 60 * 1000)
  }

  public static hours(value: number): Duration {
    return new Duration(value * 60 * 60 * 1000)
  }

  public static days(value: number): Duration {
    return new Duration(value * 24 * 60 * 60 * 1000)
  }

  public static weeks(value: number): Duration {
    return new Duration(value * 7 * 24 * 60 * 60 * 1000)
  }

  public static years(value: number): Duration {
    return new Duration(value * 365 * 24 * 60 * 60 * 1000)
  }

  get milliseconds(): number {
    return this.#_ms
  }

  get seconds(): number {
    return this.#_ms / 1000
  }

  get minutes(): number {
    return this.#_ms / (60 * 1000)
  }

  get hours(): number {
    return this.#_ms / (60 * 60 * 1000)
  }

  get days(): number {
    return this.#_ms / (24 * 60 * 60 * 1000)
  }

  get weeks(): number {
    return this.#_ms / (7 * 24 * 60 * 60 * 1000)
  }

  get years(): number {
    return this.#_ms / (365 * 24 * 60 * 60 * 1000)
  }

  valueOf(): number {
    return this.#_ms
  }

  toString(): string {
    if (this.#_ms < 1000) {
      return `${this.#_ms}ms`
    } else if (this.#_ms < 60 * 1000) {
      return `${this.#_ms / 1000}s`
    } else if (this.#_ms < 60 * 60 * 1000) {
      return `${this.#_ms / (60 * 1000)}m`
    } else if (this.#_ms < 24 * 60 * 60 * 1000) {
      return `${this.#_ms / (60 * 60 * 1000)}h`
    } else if (this.#_ms < 7 * 24 * 60 * 60 * 1000) {
      return `${this.#_ms / (24 * 60 * 60 * 1000)}d`
    } else if (this.#_ms < 365 * 24 * 60 * 60 * 1000) {
      return `${this.#_ms / (7 * 24 * 60 * 60 * 1000)}w`
    } else {
      return `${this.#_ms / (365 * 24 * 60 * 60 * 1000)}y`
    }
  }

  public add(other: DurationValue): Duration {
    return new Duration(this.#_ms + other.valueOf())
  }

  public subtract(other: DurationValue): Duration {
    return new Duration(this.#_ms - other.valueOf())
  }

  public multiply(factor: number): Duration {
    return new Duration(this.#_ms * factor)
  }

  public divide(divisor: number): Duration {
    return new Duration(this.#_ms / divisor)
  }

  public equals(other: DurationValue): boolean {
    return this.#_ms === other.valueOf()
  }

  public greaterThan(other: DurationValue): boolean {
    return this.#_ms > other.valueOf()
  }

  public lessThan(other: DurationValue): boolean {
    return this.#_ms < other.valueOf()
  }
}

function parseDuration(durationStr: string): Duration {
  const trimmed = durationStr.trim()

  if (!trimmed) {
    throw new Error("Duration string cannot be empty")
  }

  const match = trimmed.match(/^(\d+(?:\.\d+)?)(ms|s|m|h|d|w|y)$/)

  if (!match) {
    throw new Error(
      `Invalid duration format: "${durationStr}". Expected format: number + unit (ms, s, m, h, d, w, y)`,
    )
  }

  const [, valueStr, unit] = match
  const value = parseFloat(valueStr)

  if (isNaN(value) || value < 0) {
    throw new Error(
      `Invalid duration value: "${valueStr}". Must be a non-negative number`,
    )
  }

  const milliseconds = value * UNIT_MULTIPLIERS[unit as DurationUnit]
  return new Duration(milliseconds)
}

function duration(strings: TemplateStringsArray, ...values: unknown[]): Duration
function duration(durationStr: string): Duration
function duration(
  stringsOrDurationStr: TemplateStringsArray | string,
  ...values: unknown[]
): Duration {
  if (typeof stringsOrDurationStr === "string") {
    return parseDuration(stringsOrDurationStr)
  }

  if (stringsOrDurationStr.length !== 1 || values.length !== 0) {
    throw new Error(
      "Duration template literal must contain only a single string without interpolation",
    )
  }

  return parseDuration(stringsOrDurationStr[0])
}

export { duration, Duration, type DurationValue, type DurationUnit }
export default duration
