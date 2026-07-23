# Accessibility Guidelines (Knowledge → Consumers)

Knowledge content must be writable and renderable accessibly.

## Content rules

- Use clear headings in Markdown (logical order).
- Describe links by destination/purpose.
- Alt text for images lives on media entities (`alt` field); consumers must use it.
- Do not rely on color or emoji alone to convey meaning.
- Language: set `lang` in consumer HTML (`en` default unless specified on entity).
- Avoid images of text for essential content.

## Media entity fields

```yaml
alt: string
transcript: string          # for video/audio when available
captions_path: string
```

## Consumer targets

Published sites aim for **WCAG 2.2 AA** (see [Accessibility.md](./Accessibility.md)).

## Live clock UI

If a consumer shows a live date/time widget:

- Prefer visually quiet text
- Ensure contrast meets AA
- Do not rely on color alone for AM/PM or timezone
- Expose timezone clearly (e.g. local browser timezone label)
- Avoid flashing updates; once-per-second text change is acceptable if it does not trigger photosensitive risk (no strobing)

## Related docs

- [Accessibility.md](./Accessibility.md)
- [FUTURE_FEATURES.md](./FUTURE_FEATURES.md)
