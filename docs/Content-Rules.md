# Content Rules

## Source of truth

This repository is the single source of truth for public knowledge about the owner.

External profiles (LinkedIn, GitHub, etc.) may mirror facts, but when they disagree, **this repo wins** after deliberate update.

## Do not invent

If a fact is not provided by the owner, use a placeholder.

```
[PLACEHOLDER: metric; p95 latency before/after]
```

Invented metrics, employers, titles, quotes, or screenshots are defects.

## Evidence over assertion

Every non-trivial claim needs at least one of:

- number
- artifact link (repo, paper, talk, doc)
- named project with case study
- dated event

## One page, one job

Do not mix a resume, a manifesto, and three case studies on one URL unless the template explicitly supports sections with clear headings.

## Case studies are mandatory for projects

A project is not a bullet on a list. It becomes a case study with:

- Problem
- Context
- Constraints
- Architecture
- Implementation
- Challenges
- Tradeoffs
- Metrics
- Screenshots (if UI/visual; else omit)
- Lessons learned
- Future improvements

If a section is unknown, placeholder it; do not delete the section heading silently without a note.

## Notes vs essays vs docs

| Kind | Finish bar |
|------|------------|
| Note | Can be rough; must be dated; must be honest |
| Essay / writing | Edited; durable |
| Case study | Structured; evidence-heavy |
| Research | Claims scoped; methods visible |

## Updates

- Prefer append-only corrections (“Updated 2026-07-01: …”) for public essays when substance changes.
- Fix typos quietly.
- Record major revisions in page metadata when relevant.

## Sensitive content

Do not publish:

- secrets, keys, credentials
- private personal data of others without consent
- confidential employer information
- legal-risk material

## Filename and identity

Content files and published pages share stable IDs where possible. See [Naming-Conventions.md](./Naming-Conventions.md).

## Intake of future materials

When resume / LinkedIn / GitHub / blogs arrive:

1. Map each item to a page type template
2. Fill placeholders
3. Interlink
4. Decide visibility tier
5. Only then consider adding a root homepage link

## Related docs

- [Writing-Guidelines.md](./Writing-Guidelines.md)
- [Content-Lifecycle.md](./Content-Lifecycle.md)
- [Page-Checklist.md](./Page-Checklist.md)
