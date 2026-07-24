# Accessibility

## Standard

Target **WCAG 2.2 Level AA** for all published pages.

## Non-negotiables

- Semantic HTML elements for structure
- One descriptive `h1`
- Heading levels that do not skip arbitrarily (`h2` → `h4` without reason is a smell)
- Sufficient color contrast (body text on background ≥ 4.5:1)
- Visible focus styles for keyboard users
- Links distinguishable not by color alone (underline)
- `alt` text for meaningful images; empty `alt=""` for decorative (prefer no decorative images)
- Form controls have labels (rare on this site)
- `lang` attribute on `<html>`
- No keyboard traps
- Respect `prefers-reduced-motion`

## Media

- Captions for published video when hosted here
- Transcripts preferred for talks

## Link text

Screen reader users hear links out of context. “Report PDF” beats “Read more.”

## Skip link

Include a “Skip to content” link as the first focusable element on multi-section pages.

## Testing

Minimum before publishing a major template change:

- Keyboard-only pass
- Zoom to 200%
- axe / Lighthouse accessibility audit
- Spot-check with a screen reader when possible

## Related docs

- [Design-Principles.md](./Design-Principles.md)
- [Color-System.md](./Color-System.md)
- [Page-Checklist.md](./Page-Checklist.md)
