# Metrics

## Why measure

Measurement keeps the site honest: performance, clarity, and usefulness; not vanity.

## Product metrics (site health)

| Metric | Target | Notes |
|--------|--------|-------|
| Lighthouse Performance | ≥ 95 | On representative pages |
| Lighthouse Accessibility | ≥ 95 | Aim for clean audits |
| Lighthouse Best Practices | ≥ 95 | |
| Lighthouse SEO | ≥ 95 | On indexable pages |
| Total CSS (critical path) | small | Prefer shared minimal sheets |
| JS weight | ~0 unless needed | |
| Time to readable content | immediate | No spinners for text |

## Content metrics (quality proxies)

Track manually or lightly:

- % of project entries that are full case studies
- % of pages with at least one evidence link
- Number of placeholder tokens remaining on “published” pages
- Orphan page count
- Broken internal links

## Audience metrics (optional, privacy-first)

If analytics exist later:

- Prefer privacy-respecting, cookieless options
- Never required to read content
- Optimize for “time reading” proxies carefully; do not chase engagement hacks

## Case study metrics (content, not site)

Each case study should define its own success metrics historically:

- latency, cost, error rate, adoption, revenue impact, time saved, quality scores

State the window and method.

## Review cadence

- Quarterly: Lighthouse sample + link audit
- On template change: full a11y pass
- On major publish: checklist

## Related docs

- [Page-Checklist.md](./Page-Checklist.md)
- [SEO.md](./SEO.md)
- [Accessibility.md](./Accessibility.md)
