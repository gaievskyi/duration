# Duration

Elegant, lightweight (800B gzipped) TypeScript helpers for working with time durations.

## Installation

```bash
# npm
npm install duration
# yarn
yarn add duration
# pnpm
pnpm add duration
# bun
bun add duration
```

## Usage

### Template Literal

```typescript
import duration from "duration"

const timeout = duration`30s`
const TTL = duration`1h`
const retryDelay = duration`500ms`
```

### Static Methods

```typescript
import { Duration } from "duration"

const delay = Duration.minutes(5)
const timeout = Duration.seconds(30)
```

### Arithmetic Operations

```typescript
const total = duration`1h`.add(duration`30m`)
const remaining = duration`2h`.subtract(duration`45m`)
const doubled = duration`15m`.multiply(2)
const half = duration`1h`.divide(2)
```

### Comparisons

```typescript
duration`1h`.equals(duration`60m`) // true
duration`2h`.greaterThan(duration`1h`) // true
duration`30m`.lessThan(duration`1h`) // true
```

### Unit Conversions

```typescript
const oneHour = duration`1h`

oneHour.milliseconds // 3600000
oneHour.seconds // 3600
oneHour.minutes // 60
oneHour.hours // 1
oneHour.days // 0.041666...
```

### String Representation

```typescript
duration`500ms`.toString() // "500ms"
duration`30s`.toString() // "30s"
duration`5m`.toString() // "5m"
duration`2h`.toString() // "2h"
```

## Supported Units

- `ms` - milliseconds
- `s` - seconds
- `m` - minutes
- `h` - hours
- `d` - days
- `w` - weeks
- `y` - years

## Real-world Examples

```typescript
// Replace unreadable calculations
const oldWay = 60 * 60 * 1000 * 8
const newWay = duration`8h`

// Timeouts and delays
setTimeout(() => {}, duration`5s`)

// Cache expiration
const TTL = duration`1h`
const isExpired = Date.now() > timestamp + TTL

// Throttling
const windowSize = duration`1m`
const cooldown = duration`5s`
```

## License

MIT
