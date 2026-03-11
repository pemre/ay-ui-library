# Adding a New Block Component

Step-by-step process for adding a new Block to the library.

## 1. Scaffold Files

Create the Block directory and co-located files:

```
src/blocks/{BlockName}/
├── {BlockName}.tsx
├── {BlockName}.css
├── {BlockName}.test.tsx
├── {BlockName}.stories.tsx
├── {BlockName}.mdx
├── types.ts
└── defaults.ts
```

## 2. Define Types and Defaults

In `types.ts`, define:
- The data interface (e.g., `DataNode`)
- The config interface with all optional fields (e.g., `{BlockName}Config`)
- The props interface combining data, config, locale, className

In `defaults.ts`, define a `DEFAULT_CONFIG` constant with sensible defaults for every config field.

## 3. Implement the Component

In `{BlockName}.tsx`:
- Accept `data`, `config`, `locale`, `className` props (not all blocks need every prop — e.g., ImageZoom uses `src`/`alt` instead of `data`)
- Merge user config with `DEFAULT_CONFIG` via shallow per-sub-object merge
- For D3-based blocks: use D3 for SVG math and data joins only — React owns the DOM
- For pure React blocks: no D3 dependency needed (e.g., ImageZoom)
- Attach `ResizeObserver` for responsive sizing if needed (debounced)
- Clean up all D3 selections, observers, and listeners on unmount

### Hybrid Tailwind Styling (optional per block)

Some blocks (e.g., ImageZoom) use a hybrid styling approach where Tailwind utility classes handle layout, transitions, and transforms, while the library's CSS custom property token system handles theming. When using this approach:

- Tailwind utilities are used for layout properties (`overflow-hidden`, `w-full`, `h-full`, `cursor-zoom-in`) and dynamic values (`hover:scale-[N]`, `duration-[Nms]`)
- Component-level CSS custom properties still follow the three-tier token architecture for colors, borders, and radii
- `tailwindcss` is declared as a peer dependency — consumers must have Tailwind configured for utility classes to take effect
- The component should still render and function correctly without Tailwind (graceful degradation), though layout utilities won't apply

## 4. CSS Custom Properties

In `{BlockName}.css`, define component-level tokens mapped to semantic tokens:

```css
.{block-name} {
  --{block}-bg: var(--color-bg-body);
  --{block}-surface: var(--color-bg-surface);
  --{block}-text: var(--color-text-primary);
  --{block}-text-secondary: var(--color-text-secondary);
  --{block}-primary: var(--color-primary);
  --{block}-border: var(--color-border-default);
}
```

Never reference core tokens (e.g., `--color-gray-500`) directly. Always go through semantic tokens.

## 5. Write Tests

In `{BlockName}.test.tsx` and any utility `.test.ts` files:

- Use `@testing-library/react` for component rendering and DOM queries
- Use `fast-check` for property-based tests (minimum 100 iterations)
- Tag each property test: `// Feature: {feature-name}, Property {N}: {title}`
- Cover: valid rendering, user interactions, accessibility attributes, edge cases (empty data, invalid input, unmount cleanup)

Example property test structure:

```typescript
import fc from "fast-check";

it("Property N: description", () => {
  fc.assert(
    fc.property(fc.array(arbDataNode, { minLength: 1 }), (data) => {
      // render component, assert property holds
    }),
    { numRuns: 100 }
  );
});
```

## 6. Create Storybook Stories

In `{BlockName}.stories.tsx`:

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { BlockName } from "./{BlockName}.tsx";

const meta: Meta<typeof BlockName> = {
  title: "Blocks/{BlockName}",
  component: BlockName,
  tags: ["autodocs"],
  argTypes: {
    // Expose controls for every config field, including nested ones
  },
};
export default meta;
type Story = StoryObj<typeof BlockName>;

export const Default: Story = {
  args: { data: sampleData },
};
```

Include:
- Default story with sample data and all config fields as args
- Stories for each visual variant
- Light/dark theme story via decorator
- Responsive behavior story at different container sizes
- Empty data story
- Interaction tests via `play` functions using `@storybook/test`

## 7. Write MDX Documentation

In `{BlockName}.mdx`, provide a usage guide, configuration examples, theming instructions, and data format documentation for the Storybook UI.

## 8. Update Barrel Export

In `src/index.ts`, add:

```typescript
export { BlockName } from "./blocks/{BlockName}/{BlockName}.tsx";
export type { DataInterface, ConfigInterface, PropsInterface } from "./blocks/{BlockName}/types.ts";
```

## 9. Verify

Run all quality gates:

```bash
npx tsc --noEmit        # zero type errors
npx biome check src     # zero diagnostics
npm test                # all tests pass
npm run build           # production build succeeds
```

Verify the component renders correctly in Storybook (`npm run dev`).
