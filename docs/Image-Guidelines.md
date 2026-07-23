# Image Guidelines

## Default

Prefer **no images** unless they carry information.

No stock photos. No decorative illustrations. No icon packs.

## Allowed image types

| Type | Use |
|------|-----|
| Screenshots | Product / UI evidence in case studies |
| Diagrams | Architecture you authored |
| Plots | Metrics, experiments |
| Photos | Only if a photography/life section exists and the photo is yours |
| OG image | Simple, optional; can be text-on-plain later |

## Rules

- Compress aggressively; serve appropriately sized images
- Prefer modern formats when a pipeline exists; always keep a sensible fallback
- Width attributes / CSS max-width to avoid layout shift
- Meaningful `alt` text describing the information, not “image.png”
- Annotate screenshots lightly if the point is otherwise unclear
- Do not place floating badges on images
- Do not use full-bleed marketing heroes

## File locations

```
assets/images/
  projects/<slug>/
  diagrams/
  talks/
  og/
```

## Naming

`project-slug-dashboard-before.png`  
`project-slug-arch-v2.svg`

## Related docs

- [Design-Principles.md](./Design-Principles.md)
- [Naming-Conventions.md](./Naming-Conventions.md)
