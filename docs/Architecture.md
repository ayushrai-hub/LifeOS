# Architecture

> **Knowledge-first:** [KNOWLEDGE_SYSTEM.md](./KNOWLEDGE_SYSTEM.md) is authoritative for data. This document describes the optional static website **consumer**.

## Purpose

This repository is a **Personal Knowledge Base** with an optional **Personal Knowledge Website** consumer: a long-lived, human-readable system that publishes selected knowledge as HTML.

The knowledge base under `/knowledge` is the single source of truth. The website must not invent or hardcode facts.

## Design goals

| Goal | Constraint |
|------|------------|
| Longevity | Survive years of content growth without rewrites |
| Single source of truth | Facts live once in `/knowledge` |
| Readability | Every HTML/CSS file remains understandable by humans |
| Performance | Target Lighthouse 95+; minimal JS; small CSS |
| Discoverability (controlled) | Homepage exposes curated entry points only |
| Exploration | Deeper pages are reached through contextual links |
| Evidence | Claims are replaced by artifacts, metrics, and links |
| Independence | KB stands alone; each major topic site is optional |

## High-level model

```
example.com                    → root navigation (curated)
├── engineering.example.com    → engineering knowledge + portfolio
├── ai.example.com             → AI work, notes, experiments
├── ml.example.com             → machine learning specifically
├── projects.example.com       → project index + case studies
├── writing.example.com        → essays, long-form
├── blog.example.com           → chronological posts
├── notes.example.com          → working notes
├── research.example.com       → papers, experiments, findings
├── career.example.com         → experience, resume, timeline
├── leadership.example.com     → people, teams, decisions
├── management.example.com     → operating, process, orgs
├── books.example.com          → reading, book notes
└── …future sites              → add without changing root IA
```

Locally, published HTML maps to folders under `/sites/<name>/`.
Knowledge entities map to `/knowledge/<domain>/`.

## Architectural principles

1. **Knowledge first.** `/knowledge` is SoT; `/sites` renders.
2. **Static first.** Prefer plain HTML files for the consumer.
3. **Sites are independent.** A site under `/sites/ai/` must make sense alone.
4. **Shared chrome, separate content.** Common CSS/partials live in `/styles`, `/includes`, `/components`.
5. **Templates are contracts.** New pages start from templates; new entities from `/knowledge/templates`.
6. **Links form the graph.** Navigation bars that list everything are forbidden by default.
7. **Placeholders over fiction.** Missing personal facts stay as `[PLACEHOLDER: …]`.
8. **Live clock ≠ content dates.** Bottom-right live local time is UI chrome; chronology lives in entities / `_system/site-status.yaml`.

## Runtime model

### Local development

- Serve the repository root with a simple static HTTP server (`npm start`).
- Path-based browsing: `/sites/www/index.html`.

### Production (Vercel)

- Root `vercel.json` rewrites `/` → `/sites/www/index.html`.
- Shared assets served from repo paths (`/styles`, `/scripts`, `/knowledge`).
- Update `knowledge/_system/site-status.yaml` on meaningful publishes.

## Layering

```
┌─────────────────────────────────────────┐
│  Sites (published HTML)                 │  /sites/*
├─────────────────────────────────────────┤
│  Templates + Partials                   │  /templates, /includes, /components
├─────────────────────────────────────────┤
│  Styles + Scripts                       │  /styles, /scripts
├─────────────────────────────────────────┤
│  Knowledge Base (source of truth)       │  /knowledge
├─────────────────────────────────────────┤
│  Derived indexes                        │  /data
├─────────────────────────────────────────┤
│  Documentation (operating system)       │  /docs
└─────────────────────────────────────────┘
```

## Technology choices (website consumer)

| Allowed | Not allowed (core) |
|---------|--------------------|
| HTML5 | React / Vue / Angular / Svelte |
| Hand-written CSS | Tailwind / Bootstrap / UI kits |
| Minimal vanilla JS | Heavy SPA routers |
| Optional tiny helpers | Mandatory build pipelines |
| Semantic markup | Card grids, marketing heroes |

## Search readiness

Even before search exists:

- Entity search fields in knowledge metadata
- Machine-readable stub in `/knowledge/metadata/search`
- Stable URLs; never rename casually

## Non-goals

- Viral growth loops
- Newsletter popups
- Dark-pattern engagement
- “Personal brand” marketing copy
- Invented biography
- Hardcoding facts in HTML

## Related docs

- [KNOWLEDGE_SYSTEM.md](./KNOWLEDGE_SYSTEM.md)
- [FILE_STRUCTURE.md](./FILE_STRUCTURE.md)
- [Folder-Structure.md](./Folder-Structure.md)
- [Information-Architecture.md](./Information-Architecture.md)
- [FUTURE_FEATURES.md](./FUTURE_FEATURES.md)
