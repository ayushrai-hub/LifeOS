# Content Guidelines

## Source of truth

All factual content about the owner lives in `/knowledge`. Consumers mirror; they do not fork facts.

## Honesty rules

- Never exaggerate.
- Never invent.
- Never fabricate achievements, titles, metrics, or affiliations.
- Never use marketing language or unsupported buzzwords.
- Every non-trivial claim needs evidence: metrics, projects, experience, or artifacts.

## Placeholders

When unknown:

```
[PLACEHOLDER: metric; latency before/after]
```

or omit optional sections while leaving the heading with:

```
_Not yet documented._
```

## One entity, one job

Do not merge a full biography into every project file. Reference `person.owner` and skill/project IDs.

## Skills

Do not reduce skills to names. Include description, experience, level, evidence, related work, and goals.

## Projects

Projects are case studies. Prefer structure over adjectives.

## Experience

Prefer references to achievement and project entities over pasting the same bullets in multiple files.

## Achievements

Each achievement is an entity with date, category, evidence, and links; not a slogan.

## Voice alignment

Follow [VOICE_AND_TONE.md](./VOICE_AND_TONE.md) and [STYLE_GUIDE.md](./STYLE_GUIDE.md).

## Sensitive data

Do not store secrets, credentials, private data about others, or confidential employer material in public-visibility entities.

## Updates

- Fix typos quietly; bump `updated`.
- Material changes: bump `version`, note change if public narrative would otherwise mislead.

## Related docs

- [Content-Rules.md](./Content-Rules.md); website-oriented companion
- [CONTENT_WORKFLOW.md](./CONTENT_WORKFLOW.md)
- [QUALITY_CHECKLIST.md](./QUALITY_CHECKLIST.md)
