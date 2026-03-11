# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] — 2026-06-14

### Added

- `ImageZoom` block component — mouse-tracking zoom-on-hover for images with configurable zoom levels (1.5×, 2×, 2.5×, 3×) and transition duration.
- Hybrid styling approach: Tailwind utility classes for layout and transforms, CSS custom property tokens for theming.
- Placeholder state when no image source is provided.
- Error fallback state displaying alt text when image fails to load.
- Accessibility: required `alt` prop, decorative image support via empty `alt` with `role="img"`.
- Custom `className` and `imageClassName` pass-through props.
- Property-based tests (fast-check) and unit tests for ImageZoom.
- Storybook stories with interactive controls and MDX documentation page.
- `tailwindcss` added as a peer dependency (`^4.2.1`).

### Changed

- Updated library description from "D3-powered visualization components" to "visualization and interactive components" to reflect the broader scope.

## [0.2.0] — 2026-03-11

### Added

- `SpiralTimeline` block component — D3-powered spiral timeline visualization for React.
- Archimedean spiral geometry engine with one ring per calendar year and January at 12 o'clock.
- Configurable zoom controls (buttons, slider, mouse wheel).
- Draggable time-window slider for panning across the full date range.
- Fog/depth effect with configurable start ring and intensity.
- Ring color gradients using D3 interpolators (spectral, rainbow, cool, warm).
- Five data-node shapes: circle, square, triangle, star, pentagon.
- Animated transitions for spiral segments, year markers, and data nodes.
- Tooltip on hover with title, content summary, and locale-formatted date.
- Keyboard accessibility: data nodes support Enter/Space activation.
- Three-tier CSS custom property theming (core → semantic → component) with light/dark support.
- Locale-aware month labels and date formatting via `Intl.DateTimeFormat`.
- Responsive sizing via debounced `ResizeObserver`.
- Storybook stories with interactive controls, autodocs, and interaction tests.
- MDX documentation page for the Storybook UI.
- Property-based tests (fast-check) and unit tests (Vitest + Testing Library).
- Vite library mode build producing ESM, CJS, TypeScript declarations, and extracted CSS.

## [0.1.0] — 2024-05-07

### Added

- Initial project scaffolding with Vite library mode, Storybook, Vitest, and Biome.
