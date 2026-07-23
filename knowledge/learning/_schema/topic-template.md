# Topic / domain page template

Copy to `domains/<slug>.md` or `history/`.

```markdown
---
id: learning.domain.<slug>
type: learning_domain
title: ""
slug: ""
stage: exploring|learning|practicing|applying|teaching|expert  # see stages.md
status: draft|review|published|archived
visibility: private|unlisted|public
created: YYYY-MM-DD
updated: YYYY-MM-DD
author: person.owner
version: 0.1.0
evidence_refs: []   # paths to github summaries, courses, notes
---

# Title

## What is it?
## Why this domain matters
## Why I am learning it
## Stage + honesty notes
## Where I have used it
## Projects
## Technologies
## Articles / books / papers
- Owner-consumed:
- Field anchors (not claimed reading):
## Experiments
## Open questions
## What I am planning next
## Related graph IDs
```

## Ingest hooks

When adding a new repo/book/course/experiment:

1. Tag it with `learning_domains: [slug, ...]` in its frontmatter or summary.
2. Append an edge in `relationships/edges.yaml`.
3. If stage changes, append a dated line to `history/YYYY-MM.md`; do not silently edit away old stages.
4. Update `currently-learning.md` only for active items.
