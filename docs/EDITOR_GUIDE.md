# Editor Guide

## Who this is for

Future-you, collaborators, and AI agents editing `/knowledge`.

## Before you edit

1. Read [KNOWLEDGE_SYSTEM.md](./KNOWLEDGE_SYSTEM.md)
2. Find the existing entity; do not create a duplicate
3. Copy from `/knowledge/templates` when creating new entities

## Editing checklist (quick)

- [ ] Correct path and filename
- [ ] `id`, `type`, `slug` stable and consistent
- [ ] `updated` set to today
- [ ] Relationships point to real IDs
- [ ] No duplicated facts copied from another file
- [ ] Placeholders used instead of guesses
- [ ] Visibility/status appropriate

## Creating a new entity

```text
1. Copy knowledge/templates/<type>.md
2. Set id/title/slug/metadata
3. Fill sections; placeholder unknowns
4. Add relationship IDs
5. Validate (scripts/knowledge/validate.py)
6. Link from related entities if needed
```

## Editing identity links

- Prefer updating the YAML in `knowledge/social|contact|business`
- Set `last_verified` when you confirm a URL still works
- If two records collide, mark `duplicate-candidate` and file under `knowledge/review`

## Do not

- Hardcode knowledge into `/sites` HTML
- Delete uncertain identity rows; queue for review
- “Improve” metrics without a source
- Rename IDs casually

## AI agent rules

Agents must:

- Follow templates and schemas
- Flag uncertainty explicitly
- Propose relationship links rather than pasting prose duplicates
- Refuse to invent biography

## Related docs

- [CONTENT_WORKFLOW.md](./CONTENT_WORKFLOW.md)
- [QUALITY_CHECKLIST.md](./QUALITY_CHECKLIST.md)
