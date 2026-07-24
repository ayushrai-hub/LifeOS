# OpenMemory Guide

## Overview

Personal Knowledge Base (PKB) / LifeOS. Canonical facts live in `/knowledge`; `/sites` is a static HTML consumer. Local preview: `python3 -m http.server 3000` (preferred over `npm start` / `serve`, which can bind odd ports and 500 on directory URLs).

## Architecture

- **Source of truth:** `knowledge/` (YAML + Markdown entities)
- **Site shell:** `sites/**/index.html` + shared `styles/site.css`
- **Homepage build:** `scripts/build-home.js` ← `knowledge/_system/homepage.yaml` → `sites/www/index.html` + `data/home.json`
- **Catalog build:** `npm run build:site` (PowerShell) for resumes/portfolios/domains

## Components

- **Homepage (`sites/www`):** Wide shell (`.page.home`), photo + lede side-by-side (`.home-hero`), compact door nav (`.home-doors`), three useful panels (`.home-panels`: focus / latest / updated), colophon footer from `homepage.yaml`
- **Favicon:** `assets/icons/favicon.svg` (geometric A monogram, ink on paper); also mirrored at `/favicon.svg`; linked site-wide via `<link rel="icon">`
- **Site chrome:** Fixed top-right B/W theme toggle (`scripts/site-chrome.js`, styles in `site.css`)
- **Inner pages:** Narrower reading measure (`--measure` ~48rem), document aesthetic (Georgia, blue links, no cards)

## Patterns

- Minimal document UI; denser vertical rhythm; use width for lists/panels on home, keep prose measure readable
- No em dashes; evidence over marketing copy
- **Contact surfaces:** Booking (Calendly + Cal.com) and Support (Buy Me a Coffee) live on `sites/contact`; Topmate mentoring on Career + Contact; never homepage hero/CTA

## User Defined Namespaces

- [Leave blank - user populates]
