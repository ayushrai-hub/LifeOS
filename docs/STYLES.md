# Styles

## Canonical file

`styles/site.css` - the only stylesheet linked by live and migrated pages.

`styles/main.css` - one-line `@import "./site.css"` for older template references.

## Design intent

- Document reading experience (Georgia stack)
- Small fluid type via `clamp()`
- Comfortable measure (`~40rem`)
- Classic blue links, purple visited
- Large whitespace, calm hierarchy
- No cards, gradients, or marketing chrome

## Responsiveness

- `overflow-x: hidden` on `body`
- `max-width: 100%` on media and tables
- Fluid padding `--page-pad-x/y`
- Coarse pointer tap padding for list links
- Narrow (`≤360px`), phone, tablet, ultrawide/4K measure tweaks
- Print stylesheet reduces chrome

## Accessibility

- `:focus-visible` outline using `--color-focus`
- Skip link becomes visible on focus
- `prefers-reduced-motion` disables smooth scroll and animations

## Removed

Unused modular trees (`styles/base`, `components`, `layouts`, `themes`) duplicated `site.css` with conflicting tokens and were deleted in the 2026-07-23 optimization pass.

## Extension

Add new rules to `site.css` sparingly. Prefer semantic elements over new wrapper classes. If the file grows past maintainability, split by cascade layer (`@layer reset, base, components`) while keeping a single public entry file.

## Related

- [Typography.md](./Typography.md)
- [Color-System.md](./Color-System.md)
- [Design-Principles.md](./Design-Principles.md)
