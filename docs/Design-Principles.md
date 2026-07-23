# Design Principles

## North star

Feel like a well-written document, not a startup landing page.

Inspiration: the *spirit* of [karpathy.ai](https://karpathy.ai/); minimal, readable, fast, timeless; without copying its code or layout verbatim.

## Ranked priorities

1. **Content**; truth, evidence, clarity
2. **Reading**; comfort for long sessions
3. **Typography**; hierarchy through type, not decoration
4. **Whitespace**; room to think
5. **Speed**; few bytes, few requests
6. **Longevity**; still readable in 10 years

If a design choice conflicts with a higher priority, discard it.

## What we do

- Black / near-black text on white / near-white background
- Simple underlines for links
- Semantic HTML (`article`, `section`, `nav`, `header`, `footer`, `time`)
- Narrow-to-medium measure for body text (~60–75 characters)
- Predictable heading scale
- Quiet dates, quiet metadata
- Evidence blocks: metrics, links to artifacts, lists of outcomes

## What we never do

- Em dashes (`—`). Use commas, semicolons, colons, or full stops.
- Gradients
- Glassmorphism
- Shadows as decoration
- Giant marketing slogans / hero billboards
- Card grids for browsing knowledge
- Pill clusters, badge stickers, icon rows
- Stock photos
- Unnecessary color accents
- Hover explosions / bounce / parallax
- Fixed desktop-only layouts
- Horizontal scrolling caused by our CSS
- Autoplaying media
- Cookie walls for reading public text
- Navigation that exposes the entire site map

## Interaction

Links look like text with a simple underline.

No buttons for primary navigation between knowledge pages.

Buttons are reserved for rare true actions (e.g., download a PDF resume), and even then prefer a plain link when possible.

## Motion

Default: none.

Allowed only if it improves comprehension (e.g., `prefers-reduced-motion` respected collapse of a long table of contents). Prefer CSS over JS.

## Density

Prefer vertical rhythm and short paragraphs over dense walls of text *or* sparse marketing voids.

A page can be long. That is fine. Scrolling a document is a feature.

## Visual identity = typography + structure

Brand is expressed through:

- consistent type
- consistent spacing
- consistent link behavior
- consistent honesty of voice

Not through logos floating on gradients.

## Page types and visual sameness

All sites share one visual language. A visitor should feel they are still in the same knowledge system when hopping from `engineering.` to `writing.`.

Differentiation comes from content, not themes.

## Related docs

- [Typography.md](./Typography.md)
- [Color-System.md](./Color-System.md)
- [Brand.md](./Brand.md)
- [Image-Guidelines.md](./Image-Guidelines.md)
