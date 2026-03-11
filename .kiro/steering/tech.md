# Tech Stack & Build

## Core Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Language | TypeScript (strict mode) | ^5.9 |
| Framework | React | ^18.0.0 |
| Visualization | D3 | ^7.0.0 |
| Bundler | Vite (library mode) | ^5.4 |
| Type declarations | vite-plugin-dts | ^4.5 |
| Component dev | Storybook (React-Vite) | ^8.6 |
| Test runner | Vitest | ^1.6 |
| Component testing | @testing-library/react | ^16.3 |
| Property-based testing | fast-check | ^4.6 |
| DOM environment | jsdom | ^28.1 |
| Linting/Formatting | Biome | ^2.4 |
| Styling | Plain CSS with custom properties (no CSS-in-JS) |

React, ReactDOM, and D3 are **peer dependencies** — they are externalized from the build output.

## Commands

```bash
npm run dev            # Start Storybook dev server on port 6006
npm run build          # Vite library mode build → dist/
npm test               # Run all tests (vitest run, single pass)
npm run test:watch     # Vitest in watch mode
npm run typecheck      # tsc --noEmit
npm run lint           # biome check src
npm run lint:fix       # biome check --fix src
npm run format         # biome format --write src
npm run storybook      # Alias for dev (Storybook on port 6006)
npm run build-storybook # Build static Storybook site
```

## Quality Gates (must all pass before merge)

```bash
npx tsc --noEmit        # zero type errors
npx biome check src     # zero diagnostics
npm test                # all tests pass
npm run build           # production build succeeds
```

## Build Pipeline

Vite library mode produces:

| Output | Description |
|--------|-------------|
| `dist/index.es.js` | ESM bundle |
| `dist/index.cjs.js` | CJS bundle |
| `dist/index.d.ts` | Rolled-up TypeScript declarations |
| `dist/style.css` | Extracted CSS (tokens + component styles) |

Entry point: `src/index.ts`. Externals: `react`, `react-dom`, `react/jsx-runtime`, `d3`.

## TypeScript Configuration

- Target: ES2020
- Module: ESNext, bundler resolution
- JSX: react-jsx
- Strict mode enabled
- Declaration + declarationMap generation
- `allowImportingTsExtensions` enabled
- `isolatedModules` enabled

## Biome Configuration

- Indent: 2 spaces
- Line width: 100
- Quotes: double
- Semicolons: always
- Import organization: auto via `assist.actions.source.organizeImports`
- Linter: recommended rules + `useExhaustiveDependencies` (warn)

## CSS Custom Property Token Architecture

Three-tier system mirroring Bürküt's design:

| Tier | Naming Pattern | Location | Example |
|------|---------------|----------|---------|
| Core | `--{category}-{name}-{scale}` | `src/styles/tokens.css :root` | `--color-amber-500`, `--space-2`, `--radius-md` |
| Semantic | `--{category}-{context}` | `src/styles/tokens.css :root` + `[data-theme="dark"]` | `--color-primary`, `--color-bg-surface`, `--color-text-primary` |
| Component | `--{component}-{property}` | Block's co-located `.css` file | `--spiral-bg`, `--spiral-tooltip-bg` |

Components consume **semantic tokens only**. Core tokens are never referenced directly by component CSS. Theme switching works via `data-theme="dark"` attribute on a parent element.

## Testing Configuration

- Environment: jsdom
- Setup file: `src/tests/setup.ts` (imports `@testing-library/jest-dom/vitest`)
- CSS processing enabled in tests
- `passWithNoTests: true`
- Property tests use fast-check with minimum 100 iterations per property
- Property test tag format: `// Feature: d3-timeline-widget, Property {N}: {title}`
