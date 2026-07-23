# SEO Guidelines (Knowledge → Consumers)

SEO applies when a **consumer** publishes an entity. The knowledge base stores the fields; pages must not invent separate marketing copy.

## Required fields on public entities

- `seo.title`
- `seo.description`
- `seo.canonical_path` (path; host added by consumer config)
- `description` / `summary` aligned with SEO description (do not contradict)

## Rules

1. Titles describe the entity accurately; no clickbait.
2. Descriptions are factual summaries, not slogans.
3. Slugs are stable; renames need redirects.
4. `visibility: private|unlisted` → consumers set `noindex` / omit from sitemaps.
5. Structured data (JSON-LD) should be generated from entity types (Person, Article, CreativeWork); not hand-duplicated in HTML as a second source of truth.
6. Do not keyword-stuff `aliases` / `keywords`.

## Open Graph / Twitter

Consumers may map:

- `og:title` ← `seo.title` or `title`
- `og:description` ← `seo.description`
- `og:image` ← designated media entity if present

## Sitemap / robots

Generated from published + public entities only. Curated homepage links remain intentionally sparse (see website IA docs); sitemaps may still list reachable public URLs when the owner opts in via `_system/seo-policy.yaml`.

## Related docs

- [METADATA_GUIDELINES.md](./METADATA_GUIDELINES.md)
- [SEO.md](./SEO.md); website consumer companion
