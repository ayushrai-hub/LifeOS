# Typography

## Principle

Typography carries hierarchy. Decorations do not.

The site is a long-form reading system. Prefer **small body sizes**, generous whitespace, and calm hierarchy over display typography.

## Font stack

System-first for speed and longevity:

```css
--font-body: Georgia, "Times New Roman", Times, serif;
--font-mono: "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
```

Rationale:

- Serif body text reads as a document.
- No webfont required for v1 (fast, private, timeless).
- Monospace for code, metrics tables, IDs.

## Fluid sizes (production)

Defined in `styles/site.css` with `clamp()`:

| Role | Approx range | Notes |
|------|----------------|-------|
| Body | 0.95–1.05rem | Small, readable |
| Small meta | 0.8–0.9rem | Dates, labels |
| H1 | 1.35–1.65rem | Quiet strength |
| H2 | 1.1–1.3rem | |
| H3 | 1.0–1.12rem | |

Line length: target **60–75 characters** (`--measure` ≈ 40rem).

Line height: ~1.7 for body.

## Hierarchy

Use size, weight, and spacing. Not color blocks.

## Links in text

Same size as surrounding text. Underlined. Classic document blue.

## Punctuation

Do not use the em dash character. Prefer commas, semicolons, colons, or full stops.

## Related docs

- [Design-Principles.md](./Design-Principles.md)
- [Color-System.md](./Color-System.md)
