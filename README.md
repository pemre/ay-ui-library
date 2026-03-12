# 🌜 Ay UI Library

Reusable visualization and interactive components for React.

[![Build](https://img.shields.io/github/actions/workflow/status/pemre/ay-ui-library/ci.yml?branch=main)](https://github.com/pemre/ay-ui-library/actions)
[![npm](https://img.shields.io/npm/v/ay-ui-library)](https://www.npmjs.com/package/ay-ui-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

📖 **[Live Storybook Demo](https://pemre.github.io/ay-ui-library/)** — Interactive examples, API docs, and theme playground.

---

## Philosophy & Design Principles

- **Standalone package** — Zero coupling to any consuming app. Data, callbacks, and locale are passed via props.
- **D3 for math, React owns the DOM** — D3-powered components use D3 for scales, color interpolators, geometry, and data joins inside a single `<svg>`. It never creates DOM outside the SVG element.
- **CSS custom properties for theming** — A three-tier token architecture (core → semantic → component) enables theme switching via `data-theme` attribute or CSS variable overrides.
- **Blocks architecture** — Each component lives in `src/blocks/{Name}/` with co-located `.tsx`, `.css`, `.test.tsx`, and `.stories.tsx` files. A barrel `src/index.ts` re-exports the public API.
- **Property-based testing** — Correctness properties are encoded as executable tests using fast-check, complemented by unit tests with Vitest and Testing Library.

---

## Quick Start

### Install from npm

```bash
npm install ay-ui-library
```

Import the component and its stylesheet:

```tsx
import { SpiralTimeline } from "ay-ui-library";
import "ay-ui-library/dist/style.css";
```

### Local development with `npm link`

If you're developing the library alongside a consuming app (e.g. Bürküt):

```bash
# In the ay-ui-library directory
npm install
npm link

# In the consuming app directory
npm link ay-ui-library
```

Changes to the library source are reflected in the consuming app without publishing.

---

## Components

### SpiralTimeline

A D3-powered spiral timeline visualization where each concentric ring represents one calendar year, months are arranged as radial sectors, and data nodes are plotted at their calendar positions. Supports configurable zoom, fog, ring gradients, animations, custom shapes, a hideable time-window slider with animated transitions, and full theme/locale customization.

```tsx
import { SpiralTimeline } from "ay-ui-library";
import type { DataNode, SpiralTimelineConfig } from "ay-ui-library";

const data: DataNode[] = [
  { date: new Date("2024-03-15"), type: "event", title: "Equinox", content: "Spring begins" },
  { date: new Date("2023-07-04"), type: "event", title: "Midyear", content: "Summer peak" },
];

const config: SpiralTimelineConfig = {
  yearsToShow: 3,
  yearLabelPosition: "top-right",
  fog: { enabled: true, startRing: 2, intensity: 0.6 },
  timeWindow: { visible: true, animationEnabled: true, animationDuration: 400 },
};

function App() {
  const [windowStart, setWindowStart] = useState(2023);

  return (
    <SpiralTimeline
      data={data}
      config={config}
      locale="en"
      windowStart={windowStart}
      onWindowStartChange={setWindowStart}
      onYearsToShowChange={(years) => console.log("Zoom:", years)}
    />
  );
}
```

See the [Storybook demo](https://pemre.github.io/ay-ui-library/) for interactive examples and full API documentation.

#### Performance Stress Test

The `PerformanceStress` story renders SpiralTimeline with a large synthetic dataset (100–2000 nodes) and an FPS overlay to help identify rendering bottlenecks. Open it in Storybook and adjust the node count slider to find the threshold where performance degrades on your device.

### ImageZoom

A mouse-tracking zoom-on-hover component for images. Users hover over an image and the cursor position is tracked as a percentage of the image dimensions — the image scales up around that point, letting users inspect detail without navigating away.

- Configurable zoom levels: 1.5×, 2×, 2.5×, 3×
- Configurable transition duration
- Placeholder and error fallback states
- Accessible: required `alt` prop, decorative image support via empty `alt`
- Hybrid styling: Tailwind utilities for layout/transforms + CSS custom property tokens for theming

> **Note:** ImageZoom requires `tailwindcss` as a peer dependency. Your consuming project must have Tailwind CSS configured for the hover-zoom and layout utilities to take effect.

```tsx
import { ImageZoom } from "ay-ui-library";
import "ay-ui-library/dist/style.css";
import type { ImageZoomConfig } from "ay-ui-library";

const config: ImageZoomConfig = {
  zoomLevel: 2.5,
  transitionDuration: 400,
};

function App() {
  return (
    <ImageZoom
      src="/photos/landscape.jpg"
      alt="Mountain landscape at sunset"
      config={config}
      className="my-custom-container"
    />
  );
}
```

See the [ImageZoom stories](https://pemre.github.io/ay-ui-library/?path=/docs/blocks-imagezoom--docs) in the live Storybook for interactive examples.

---

## Theming & Design Tokens

The library uses a three-tier CSS custom property architecture:

| Tier | Naming Pattern | Location | Example |
|------|---------------|----------|---------|
| Core | `--{category}-{name}-{scale}` | `styles/tokens.css :root` | `--color-amber-500`, `--space-2`, `--radius-md` |
| Semantic | `--{category}-{context}` | `styles/tokens.css :root` + `[data-theme="dark"]` | `--color-primary`, `--color-bg-surface` |
| Component | `--{component}-{property}` | Block `.css` file | `--spiral-bg`, `--spiral-tooltip-bg` |

### Theme switching

Set the `data-theme` attribute on any ancestor element:

```html
<div data-theme="dark">
  <SpiralTimeline data={data} />
</div>
```

### Overriding component tokens

Target the component class to override its tokens without touching the semantic layer:

```css
.my-wrapper .spiral-timeline {
  --spiral-primary: hotpink;
  --spiral-tooltip-bg: #1a1a2e;
}
```

---

## Contributing

### Development setup

```bash
git clone https://github.com/pemre/ay-ui-library.git
cd ay-ui-library
npm install
npm run dev          # Start Storybook on http://localhost:6006
```

### Coding standards

- **TypeScript** — Strict mode enabled. All public APIs must have JSDoc comments.
- **Linting & formatting** — Biome with 2-space indent, 100 line width, double quotes, semicolons.
- **CSS** — Plain CSS with custom properties. No CSS-in-JS. Components consume semantic tokens; never reference core tokens directly.
- **File co-location** — Each block has `.tsx`, `.css`, `.test.tsx`, and `.stories.tsx` in the same directory.

### Testing

- **Vitest** + **Testing Library** for unit and integration tests.
- **fast-check** for property-based tests encoding correctness properties.
- Run tests: `npm test`
- All tests must pass before merge.

### Storybook conventions

- Every block must have a `.stories.tsx` with interactive controls via `argTypes`.
- Enable `tags: ["autodocs"]` for automatic API documentation.
- Add interaction tests via `play` functions using `@storybook/test`.
- Include an MDX documentation page for usage guides and configuration examples.

### PR process

1. Create a feature branch from `main`.
2. Implement changes with tests and stories.
3. Ensure all quality gates pass (see below).
4. Open a PR with a clear description of changes.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Storybook dev server on port 6006 |
| `npm run build` | Build the library (Vite library mode → `dist/`) |
| `npm test` | Run all tests (single pass) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | Type-check with `tsc --noEmit` |
| `npm run lint` | Lint source with Biome |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format source with Biome |
| `npm run storybook` | Start Storybook dev server |
| `npm run build-storybook` | Build static Storybook site |

### Storybook deployment

Storybook is automatically built and deployed to [GitHub Pages](https://pemre.github.io/ay-ui-library/) on every push to `main` via the `deploy-docs.yml` GitHub Actions workflow.

### Quality gates (must all pass before merge)

```bash
npx tsc --noEmit        # zero type errors
npx biome check src     # zero diagnostics
npm test                # all tests pass
npm run build           # production build succeeds
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a record of notable changes per release. This project follows [Semantic Versioning](https://semver.org/).

---

## License

[MIT](./LICENSE) © Ay UI Library Contributors
