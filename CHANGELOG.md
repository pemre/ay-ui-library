# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

- `ImageZoom` block component
