# README extract; WeCare

## Source
Pulled from repository README.md via GitHub API during knowledge ingest.
Do not treat this file as a verbatim copy of the full README.

## Project self-description (condensed)
Opening of README (truncated for orientation; not a full quote dump):

```
# We Care NGO; Marketing Site

A production-oriented React single-page application for an NGO focused on education, animal welfare, and community impact (content centered on Bhopal, India). The project is a static client bundle suitable for hosting on Vercel, Netlify, S3+CloudFront, or any static file host.

## Features

- **Multi-page marketing experience**; Home, About, Programs, Impact, Stories, Team, Locations, Journey, Donate, Contact.
- **Responsive layout**; Tailwind CSS with a consistent design language (teal accent, dark footer).
```

## Stated purpose (normalized)
Present NGO programs and collect contact/donate interest.

## Features / capabilities mentioned
- Multi-page marketing experience; Home, About, Programs, Impact, Stories, Team, Locations, Journey, Donate, Contact.
- Responsive layout; Tailwind CSS with a consistent design language (teal accent, dark footer).
- Motion; Framer Motion for section and menu animations; respects `prefers-reduced-motion` in global CSS.
- Charts; Impact page uses Recharts for illustrative metrics.
- Legal pages; `/legal/privacy`, `/legal/terms`, `/legal/accessibility` with editable copy in `src/pages/Legal.tsx`.
- Configurable contact details; Email, phone, and WhatsApp via `VITE_*` environment variables (see below).
- Image pipeline; Pages reference logical paths under `/images/…`. Out of the box, `src/lib/site-media.ts` maps those to curated remote demo assets so the site works without committing large binaries. Swap to local files or a CDN when you are ready.

## Architecture / structure notes
Stack mentioned or implied: TypeScript, React 19, Vite, Tailwind, React Router

## Setup / usage (only if useful)
Recorded in summary.md when the README provides a clear run path. Details omitted here to avoid dumping install scripts.

## Demos / screenshots
README references demo/screenshot media or image links; verify paths in repo before website use.

## Unique engineering decisions (README-backed only)
Polished frontend README and structure.

## Claims to treat carefully
Marketing site; impact metrics in UI may be illustrative; WeCareNGO sibling may duplicate.
