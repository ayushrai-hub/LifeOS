# Color System

## Principle

Unnecessary color is noise. Default to ink on paper.

## Tokens

```css
--color-bg: #ffffff;
--color-bg-subtle: #fafafa;   /* rare; prefer white */
--color-text: #111111;
--color-text-muted: #555555;
--color-border: #dddddd;
--color-link: #0000ee;
--color-link-hover: #0000ee;
--color-link-visited: #551a8b;
--color-focus: #0b57d0;       /* focus ring only */
--color-draft: #8a5a00;       /* draft banner text */
```

Inline links use classic document blue (underline + color). Visited links shift to purple. Focus rings use `--color-focus`.

## Forbidden

- Purple-to-indigo marketing gradients
- Neon accents
- Glass tints
- Large colored hero panels
- Tag chip palettes

## Dark mode

Black-and-white invert via top-right **Dark / Light** toggle (`html[data-theme="dark"]`).
Preference is stored in `localStorage.theme`. Keep contrast AA; do not add colored dark themes.

## Charts / diagrams

When diagrams need color, use a small discrete palette documented per image; not site-wide rainbow themes.

## Related docs

- [Accessibility.md](./Accessibility.md)
- [Design-Principles.md](./Design-Principles.md)
