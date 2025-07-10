# Contributing to Duration

Thank you for your interest in contributing to Duration! This project aims to provide elegant TypeScript helpers for working with time durations, and I would love you to make it even better!

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- pnpm (recommended) or npm/yarn

### Setup

1. Fork the repository
2. Clone your fork locally
3. Install dependencies:

```bash
pnpm install
```

4. Run tests to ensure everything works:

```bash
pnpm test
```

## Development Workflow

### Making Changes

1. Create a new branch for your feature or fix:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes following our coding standards
3. Add or update tests as needed
4. Ensure all tests pass:

```bash
pnpm test
```

5. Build the project to check for TypeScript errors:

```bash
pnpm build
```

### Code Style

- **No comments in code** - The code should be self-documenting through clear naming and structure
- Use TypeScript strict mode features
- Follow the existing code patterns and naming conventions
- Prefer functional programming patterns where appropriate
- Keep the API surface minimal and intuitive

### Testing

- All new features must include comprehensive tests
- Tests should cover both happy path and error cases
- Use descriptive test names that explain the behavior being tested
- Follow the existing test structure and patterns

Example test structure:

```typescript
describe("Feature Name", () => {
  it("should handle the expected case correctly", () => {
    // Test implementation
  })

  it("should throw appropriate error for invalid input", () => {
    // Error test implementation
  })
})
```

## Types of Contributions

### Bug Fixes

- Include a clear description of the bug and how to reproduce it
- Add regression tests to prevent the bug from reoccurring
- Keep fixes minimal and focused

### New Features

- Discuss major features in an issue before implementing
- Ensure new features align with the library's philosophy of elegance and simplicity
- Update documentation and examples as needed
- Consider backwards compatibility

### Documentation

- Fix typos, improve clarity, or add missing information
- Update examples to reflect current API
- Ensure documentation stays concise and practical

## API Design Principles

When contributing new features, follow these principles:

### Elegance First

- Prefer intuitive, readable APIs over complex but powerful ones
- Use template literals and method chaining where it improves readability
- Avoid configuration objects unless absolutely necessary

### Consistency

- New methods should follow existing naming patterns
- Return types should be consistent across similar operations
- Error messages should be clear and actionable

### Performance

- Avoid unnecessary allocations in hot paths
- Keep the core Duration class lightweight
- Consider the impact on bundle size

## Submitting Changes

### Pull Request Process

1. Ensure your branch is up to date with main:

```bash
git checkout main
git pull upstream main
git checkout your-branch
git rebase main
```

2. Push your changes to your fork
3. Create a pull request with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Reference to any related issues
   - Screenshots or examples if applicable

### Pull Request Guidelines

- Keep PRs focused on a single change or feature
- Include tests for all new functionality
- Update documentation if the public API changes
- Ensure CI passes before requesting review

## Release Process

Releases are handled by maintainers and follow semantic versioning:

- **Patch** (1.0.x): Bug fixes, internal improvements
- **Minor** (1.x.0): New features, backwards compatible
- **Major** (x.0.0): Breaking changes

## Getting Help

- Check existing issues and discussions
- Create an issue for bugs or feature requests
- Join discussions on existing issues
- Reach out to maintainers for guidance on larger contributions

## Code of Conduct

- Be respectful and constructive in all interactions
- Focus on the technical merits of contributions
- Help create a welcoming environment for all contributors
- Follow GitHub's community guidelines

## Recognition

Contributors will be acknowledged in:

- Git history and GitHub contributors list
- Release notes for significant contributions
- Special recognition for major features or improvements

Thank you for helping make Duration better! 🕒
