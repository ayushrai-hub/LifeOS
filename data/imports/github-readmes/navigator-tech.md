# Navigator Technologies; Marketing Site

Production-oriented marketing website for **Navigator Technologies** (industrial R&D, automation panels, RF solutions, data loggers, TLC, and test & measurement). Built as a server-rendered React application with file-based routing and a token-based design system.

## Features

- **Server-side rendering (SSR)** with React Router 7 and Vite 7
- **Product and solution pages**: STP panels, RF solutions, RTO cards, industrial data loggers, TLC panels, TMI
- **Contact flow** with client-side validation; enquiry opens the visitor’s mail client (`mailto:`); no backend required
- **Theming** via `@dazl/color-scheme` (light/dark) and CSS design tokens (`app/styles/tokens/`, `app/styles/theme.css`)
- **Accessible UI primitives** (Radix-style components under `app/components/ui/`)
- **Responsive layout** with CSS Modules per route and shared global utilities

## Tech stack

| Area | Choice |
|------|--------|
| Runtime | Node.js (SSR + static client assets) |
| Framework | React 19, React Router 7 |
| Build | Vite 7, `@react-router/dev` |
| Styling | CSS Modules, design tokens, Dazl theme tooling |
| Forms / validation | `react-hook-form`, `@hookform/resolvers`, Zod 4 |
| Icons | `lucide-react` |

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** 10+ (or compatible package manager)

## Setup

1. **Clone the repository** and enter the project directory.

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Images (important)**  
   Placeholder JPEGs are committed under `public/images/` so the app runs out of the box. For production, replace them with real photography and branding assets (same filenames), or update the paths in CSS (`*.module.css`) and `app/components/navigation/navigation.tsx` (`LOGO_SRC`).  
   To regenerate placeholders (e.g. after a clean clone):

   ```bash
   npm run images:placeholders
   ```

4. **Development server**

   ```bash
   npm run dev
   ```

   Default URL: [http://localhost:5173](http://localhost:5173) (see terminal output if different).

5. **Production build**

   ```bash
   npm run build
   npm run start
   ```

   `start` runs `react-router-serve` against `./build/server/index.js`.

## Environment variables

This project does **not** require `.env` for the current feature set. Optional future use:

| Variable | Purpose |
|----------|---------|
| `PORT` | Often read by hosting platforms for the Node server |
| `NODE_ENV` | Set automatically by most hosts (`production` / `development`) |

Keep secrets out of the repo; `.gitignore` includes `.env` and `.env.local` patterns.

## Usage notes

- **Contact form**: Submits by opening a `mailto:` link to the enquiry address defined in `app/config/site.ts`. Users complete send in their email client. This avoids storing PII on your server but depends on the client having a mail handler configured.
- **Navigation / routes**: Primary nav links live in `app/config/nav.ts`. Route modules are registered in `app/routes.ts`; keep paths in sync (see comment in `app/routes.ts`).

## Deployment

1. Run `npm run build`.
2. Deploy **at minimum**:
   - `package.json` and `package-lock.json`
   - `build/client/` (static assets)
   - `build/server/` (SSR entry)
   - `node_modules/` (install on the host with `npm ci` or `npm install --omit=dev` as appropriate)
3. Start with `npm run start` (or your process manager calling the same command).
4. Suitable for **Node-friendly** hosts (Fly.io, Railway, Render, VPS, etc.). For **static-only** hosting you would need to switch to SPA/static export mode (not the current default; SSR is enabled in `react-router.config.ts`).

Further detail: [ARCHITECTURE.md](./ARCHITECTURE.md), [CODEBASE_GUIDE.md](./CODEBASE_GUIDE.md).

## Documentation index

- [ARCHITECTURE.md](./ARCHITECTURE.md); system design and data flow
- [CODEBASE_GUIDE.md](./CODEBASE_GUIDE.md); folder-by-folder guide
- [CONTRIBUTING.md](./CONTRIBUTING.md); how to contribute
- [CHANGELOG.md](./CHANGELOG.md); release-style change log
- [API_DOCS.md](./API_DOCS.md); HTTP API (not applicable for this static-marketing SSR app)

## License / legal

Private project (`"private": true` in `package.json`). Adjust licensing if you open-source the repo.

