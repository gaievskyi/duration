# Duration

Elegant, lightweight, declarative TypeScript helpers for converting human-readable time durations to milliseconds.

## Roadmap

- [ ] Add type-safe duration string parsing (e.g. `duration("5abc")` should type-hint human-readable error)
- [ ] Implement `Duration.decode` for retrieving durations from strings, e.g. `Duration.decode("5 minutes")`

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
