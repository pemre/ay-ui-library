# Product: 🌜 Ay UI Library

## Purpose

Ay UI Library is a standalone, publishable npm package containing reusable D3-powered visualization components for React. It is designed as an independent design system that can be consumed by any React project.

## Relationship to Bürküt

Bürküt is an interactive history explorer app. Ay UI Library was created to house visualization components (starting with `SpiralTimeline`) that Bürküt will consume as an npm dependency. The key principle: **zero coupling**.

- Ay UI Library has no imports from Bürküt
- All data, callbacks, and locale are passed via props
- The CSS token architecture mirrors Bürküt's three-tier system so components render correctly in both Storybook (standalone) and when consumed by Bürküt
- Data interfaces are designed to be compatible with Bürküt's content data structure, but the library itself has no knowledge of Bürküt's internals

## Block Component Model

A "Block" is an independent, self-contained UI component living in `src/blocks/{BlockName}/`. Each Block:

- Is a React component accepting data and configuration via props
- Uses D3 for SVG math/scales/data-joins (not for DOM creation outside SVG)
- Follows the three-tier CSS custom property architecture for theming
- Includes co-located tests, stories, and documentation
- Is exported from the package barrel (`src/index.ts`)

## npm Publishing Workflow

1. Update version in `package.json` following semver
2. Update `CHANGELOG.md` with notable changes
3. Run all quality gates (`typecheck`, `lint`, `test`, `build`)
4. `npm publish` — the `"files": ["dist"]` field ensures only built output is published

## npm Link Workflow (Local Development)

For developing the library alongside a consumer app (e.g., Bürküt):

```bash
# In ay-ui-library/
npm link

# In the consumer project (e.g., Bürküt)
npm link ay-ui-library
```

Changes to the library source are reflected in the consumer after rebuilding (`npm run build`). The consumer imports as if from npm:

```typescript
import { SpiralTimeline } from "ay-ui-library";
import "ay-ui-library/dist/style.css";
```

## Design Philosophy

- **Props-driven**: All behavior is controlled via props — no global state, no context providers
- **Sensible defaults**: Every config field has a default; rendering with just `data` produces a functional visualization
- **Theme-agnostic**: Components use CSS custom properties, not hardcoded colors. Consumers control theming
- **Type-safe**: Full TypeScript interfaces exported for all public APIs
- **Testable**: Pure utility functions extracted for independent testing; components tested with Testing Library + property-based tests via fast-check
- **Documented**: Storybook stories with interactive controls serve as living documentation
