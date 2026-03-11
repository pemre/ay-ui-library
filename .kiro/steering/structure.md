# Project Structure

```
ay-ui-library/
├── src/
│   ├── index.ts                              # Barrel export — re-exports all blocks + public types
│   ├── blocks/
│   │   └── SpiralTimeline/
│   │       ├── SpiralTimeline.tsx             # Main component
│   │       ├── SpiralTimeline.css             # Component-level CSS custom properties
│   │       ├── SpiralTimeline.test.tsx         # Vitest + RTL tests (unit + property-based)
│   │       ├── SpiralTimeline.stories.tsx      # Storybook stories with args/controls/play functions
│   │       ├── SpiralTimeline.mdx             # MDX documentation page for Storybook
│   │       ├── types.ts                       # Public TypeScript interfaces
│   │       ├── defaults.ts                    # DEFAULT_CONFIG constant
│   │       ├── geometry.ts                    # Pure spiral math functions
│   │       ├── geometry.test.ts               # Geometry property tests
│   │       ├── shapes.ts                      # SVG shape rendering utilities
│   │       ├── shapes.test.ts                 # Shape unit tests
│   │       ├── colors.ts                      # Color interpolation + fog utilities
│   │       ├── colors.test.ts                 # Color property tests
│   │       ├── TimeWindowSlider.tsx           # Time window slider sub-component
│   │       └── ZoomControls.tsx               # Zoom controls sub-component
│   ├── styles/
│   │   └── tokens.css                         # Core + semantic design tokens (light/dark)
│   └── tests/
│       └── setup.ts                           # Vitest setup (jest-dom matchers)
├── .storybook/
│   ├── main.ts                               # Discovers src/blocks/**/*.stories.tsx, React-Vite framework
│   ├── preview.ts                            # Loads tokens.css, configures viewports/themes
│   └── preview-head.html                     # Injects token CSS into Storybook iframe
├── .kiro/
│   └── steering/                             # Kiro steering documents (this directory)
├── dist/                                     # Build output (git-ignored)
│   ├── index.es.js
│   ├── index.cjs.js
│   ├── index.d.ts
│   └── style.css
├── package.json
├── tsconfig.json
├── vite.config.ts                            # Vite library mode + Vitest config
├── biome.json
├── README.md                                 # Package-level documentation
├── CHANGELOG.md
└── LICENSE                                   # MIT
```

## Conventions

### File Co-location

Each Block lives in `src/blocks/{BlockName}/` with co-located files:

| File | Purpose |
|------|---------|
| `{BlockName}.tsx` | Main React component |
| `{BlockName}.css` | Component-level CSS custom properties |
| `{BlockName}.test.tsx` | Vitest + Testing Library tests (unit + property-based) |
| `{BlockName}.stories.tsx` | Storybook stories with args, controls, autodocs, play functions |
| `{BlockName}.mdx` | MDX documentation page for Storybook UI |
| `types.ts` | Public TypeScript interfaces and types |
| `defaults.ts` | Default configuration constants |

Utility modules (e.g., `geometry.ts`, `colors.ts`, `shapes.ts`) live alongside the component with their own co-located `.test.ts` files.

### Barrel Export

`src/index.ts` re-exports all Block components and their public types. Every new Block must be added here.

```typescript
export { SpiralTimeline } from "./blocks/SpiralTimeline/SpiralTimeline.tsx";
export type { DataNode, SpiralTimelineConfig, /* ... */ } from "./blocks/SpiralTimeline/types.ts";
```

### Naming Conventions

- Block directories: PascalCase (`SpiralTimeline`)
- Component files: PascalCase matching directory (`SpiralTimeline.tsx`)
- Utility files: camelCase (`geometry.ts`, `colors.ts`)
- Test files: match source file + `.test` suffix (`geometry.test.ts`)
- Story files: match component + `.stories` suffix (`SpiralTimeline.stories.tsx`)
- CSS files: match component (`SpiralTimeline.css`)
- CSS custom properties: `--{block-name}-{property}` (e.g., `--spiral-bg`)

### Sub-components

Sub-components (e.g., `TimeWindowSlider.tsx`, `ZoomControls.tsx`) live in the same Block directory. They are not exported from the barrel — only the main component and its types are public.
