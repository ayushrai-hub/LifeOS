# We Care NGO; Marketing Site

A production-oriented React single-page application for an NGO focused on education, animal welfare, and community impact (content centered on Bhopal, India). The project is a static client bundle suitable for hosting on Vercel, Netlify, S3+CloudFront, or any static file host.

## Features

- **Multi-page marketing experience**; Home, About, Programs, Impact, Stories, Team, Locations, Journey, Donate, Contact.
- **Responsive layout**; Tailwind CSS with a consistent design language (teal accent, dark footer).
- **Motion**; Framer Motion for section and menu animations; respects `prefers-reduced-motion` in global CSS.
- **Charts**; Impact page uses Recharts for illustrative metrics.
- **Legal pages**; `/legal/privacy`, `/legal/terms`, `/legal/accessibility` with editable copy in `src/pages/Legal.tsx`.
- **Configurable contact details**; Email, phone, and WhatsApp via `VITE_*` environment variables (see below).
- **Image pipeline**; Pages reference logical paths under `/images/…`. Out of the box, `src/lib/site-media.ts` maps those to curated remote demo assets so the site works without committing large binaries. Swap to local files or a CDN when you are ready.

## Tech stack

| Area        | Choice |
|------------|--------|
| UI         | React 19, TypeScript |
| Build      | Vite 7 |
| Styling    | Tailwind CSS 3, tailwindcss-animate |
| Components | Radix UI primitives, shadcn-style `src/components/ui/*` |
| Routing    | React Router 7 |
| Forms      | Contact/newsletter UI (demo submit); Zod + RHF available in stack for future wiring |
| Deploy     | `vercel.json` SPA rewrites included |

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** 10+

## Setup

```bash
git clone <your-fork-or-repo-url>
cd WeCare
npm install
```

Copy environment template (optional):

```bash
cp .env.example .env.local
```

Edit `.env.local` with real contact values before production.

## Scripts

| Command        | Description |
|----------------|-------------|
| `npm run dev`  | Dev server at `http://localhost:5173` |
| `npm run build`| Typecheck + production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |
| `npm test`     | Vitest (unit tests) |

## Environment variables

All client-side variables must be prefixed with `VITE_`.

| Variable | Purpose |
|----------|---------|
| `VITE_CONTACT_EMAIL` | Shown in Contact + Footer |
| `VITE_WHATSAPP_E164` | Digits only (no `+`) for `wa.me` links |
| `VITE_PHONE_TEL` | Value for `tel:` hrefs |
| `VITE_PHONE_DISPLAY` | Human-readable phone label |
| `VITE_MEDIA_BASE_URL` | Optional CDN origin; if set, image paths become `${base}${path}` (see `site-media.ts`) |

See `.env.example` for a ready-to-copy template.

## Replacing demo images

1. Add files under `public/images/` (see `public/images/README.md`).
2. Update `src/lib/site-media.ts` so each logical path points to your local path (e.g. `'/images/hero-children.jpg'`) or use `VITE_MEDIA_BASE_URL`.

Ensure you have rights to use and publish all media.

## Deployment

### Vercel

Connect the repo; framework preset **Vite**. Build command `npm run build`, output directory `dist`. `vercel.json` already contains SPA fallthrough rewrites.

### Other static hosts

Upload the contents of `dist/` after `npm run build`. Configure the host to serve `index.html` for unknown paths (SPA fallback).

## Project documentation

Detailed docs are in **[`doc/`](./doc/README.md)**:

- [Architecture](./doc/ARCHITECTURE.md); System design and data flow
- [Codebase guide](./doc/CODEBASE_GUIDE.md); Directory tour
- [Contributing](./doc/CONTRIBUTING.md); Branching and standards
- [Changelog](./doc/CHANGELOG.md); Release history
- [API scope](./doc/API_DOCS.md); Static-site / env / future API notes

## License

Private / rights reserved unless otherwise noted by the repository owner.

