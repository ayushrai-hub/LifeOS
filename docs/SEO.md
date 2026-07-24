# SEO

## Goals

- Accurate discovery of pages that are meant to be public
- Correct previews when links are shared
- No accidental indexing of drafts / unlisted material when avoidable

## Required on every published page

| Element | Rule |
|---------|------|
| `<title>` | Specific, human; ≤ ~60 characters when possible |
| `<meta name="description">` | One or two factual sentences; no hype |
| Canonical | `<link rel="canonical" href="https://…">` |
| Open Graph | `og:title`, `og:description`, `og:type`, `og:url`, `og:image` (optional image; use a simple text-friendly default if needed) |
| Twitter | `twitter:card`, `twitter:title`, `twitter:description` |

## Structured data

Add JSON-LD when it fits:

- `Person` on root / career
- `Article` / `BlogPosting` on writing
- `ScholarlyArticle` when applicable for research
- `BreadcrumbList` only if breadcrumbs exist (they are optional; do not force UI)

Do not fake ratings, reviews, or job postings.

## Indexing control

- Public-curated & public-reachable: allow indexing.
- Drafts: `noindex,nofollow` until ready.
- Prefer `robots.txt` that does not advertise private paths carelessly.

## URL & content SEO

- One H1 per page
- Logical heading order
- Descriptive filenames/slugs
- Internal links with meaningful anchors
- Fast pages (Core Web Vitals friendly by simplicity)

## Sitemap policy

Maintain a **curated** sitemap of pages intended for discovery; not every file in the repo.

Location (planned): `/sites/www/sitemap.xml` and/or per-site sitemaps.

## What SEO is not

SEO is not a reason to add marketing copy, keyword stuffing, or spammy footer links.

## Related docs

- [Accessibility.md](./Accessibility.md)
- [Performance section in Architecture](./Architecture.md)
- [Page-Checklist.md](./Page-Checklist.md)
