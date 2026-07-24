# Components

Reusable HTML fragments. The static site does **not** use server-side includes yet. Fragments are copied manually or inlined by generators.

## `includes/`

| File | Intent | Wired? |
|------|--------|--------|
| `head-meta.html` | Charset, viewport, OG stubs | No (pages inline meta) |
| `footer.html` | Home link footer | No (`foot` class inlined) |
| `skip-link.html` | Skip to content | Pattern copied into pages |

## `components/`

| File | Intent | Wired? |
|------|--------|--------|
| `draft-banner.html` | Draft notice | Pattern in CSS `.draft-banner` |
| `meta-row.html` | Quiet metadata line | Use `.meta` |
| `toc-case-study.html` | Case study TOC | Unused until deep case studies ship |

## `templates/pages/`

Starters for new page types (`resume.html`, `portfolio-home.html`, `project-case-study.html`, …). Generators (`build-site.ps1`, `migrate-ayushrai-site.ps1`) emit finished HTML rather than runtime-templating these files.

## Generator-inlined patterns

| Pattern | Class / element | Where |
|---------|-----------------|-------|
| Skip link | `.skip-link` | All modern pages |
| Reading column | `.page` | All |
| Muted line | `.tagline`, `.muted`, `.meta` | Hubs |
| Draft / provenance | `.draft-banner` | Migrated pages |
| Lists | `.home-list`, `.entity-list`, `.related-links` | Indexes |
| Footer | `.foot` | Most pages |

## Extension

To introduce true includes: add a small build step that concatenates `includes/*` into pages, or adopt HTML SSI on the host. Until then, keep fragments as references and regenerate via scripts.

## Related

- [STYLES.md](./STYLES.md)
- [SCRIPTS.md](./SCRIPTS.md)
