# Duration

Elegant, lightweight (800B gzipped), declarative TypeScript helpers for working with time durations.

## Roadmap

- [ ] Add type-safe duration string parsing (e.g. `duration("5abc")` should type-hint human-readable error)
- [ ] Implement `Duration.decode` for retrieving durations from strings, e.g. `Duration.decode("5 minutes")`

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

### Function invocation

```typescript
import duration from "duration"

const interval = duration("30s")
```

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

### Decoding from strings (Coming soon)

```typescript
import { Duration } from "duration"
const duration = Duration.decode("5 minutes")
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

## Supported Units

- `ms` - milliseconds
- `s` - seconds
- `m` - minutes
- `h` - hours
- `d` - days
- `w` - weeks
- `y` - years

## Examples

```typescript
import duration from "duration"

// Replace unreadable calculations
const oldBoringWay = 60 * 60 * 1000 * 8
// with declarative duration
const newElegantWay = duration`8h`

// Timeouts and intervals
setTimeout(() => {}, duration`5s`)
setInterval(() => {}, duration`30s`)

// Cache expiration
const TTL = duration`1h`
const isExpired = Date.now() > timestamp + TTL

// Throttling
const windowSize = duration`1s`
const cooldown = duration`5s`
```

## License

MIT
