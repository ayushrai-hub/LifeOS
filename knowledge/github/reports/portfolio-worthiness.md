# Portfolio worthiness

Guidance for what the website should showcase vs keep low-priority or hidden.  
Consume `repositories/<slug>/summary.md`; do not re-scrape GitHub.

## Showcase (primary website candidates)

Use as case-study seeds after a human pass that strips unverified metrics.

| Repo | Angle for site | Primary skills signal |
|------|----------------|------------------------|
| adaptive-rag | AI systems / RAG architecture | LangGraph, vector DB, FastAPI |
| RLHF-tasks | AI evals / agent benchmarking | Docker tasks, Harbor, tooling |
| IAS-system | Domain AI + docs maturity | OCR, LangGraph, compliance |
| SoPia | Deterministic compliance engineering | Auditability, anti-hallucination design |
| OpenAI-RLHF | Eval corpora + honest naming | Data/eval craft, documentation |
| FileU | Safety-minded systems utility | Python CLI, hashing, dry-run |
| security-audit | Security tooling | DFIR, read-only audits |
| amex | Decision quality under constraints | Interpretable analytics |
| chatbot | Full-stack + deterministic UX | React/Express/Docker |

## Conditional (show only with caveats)

| Repo | May show if… | Must not claim… |
|------|--------------|-----------------|
| kyc-compliance-system | Framed as system design / stack evidence | 80% time reduction, 95% OCR, 99.9% uptime as achieved |
| MailU | Framed as local RAG experiment | Guaranteed privacy at scale; polished product status |
| WeCare | Frontend craft for NGO site | Organizational impact numbers unless sourced |
| Shiksha-Mitra | Product UI / concept | Live pairing backend without proof |
| hiring_intellgence | Process/automation anecdote | “Hiring platform” product |
| my-learning | Teaching / curriculum thinking | That a full school/platform is shipped |
| ayush-work | Link to personal site artifact | Engineering depth |

## Low priority (reachable, not curated home)

- ClubMe (pre-launch marketing)
- Expert-O (brand-heavy, weak shipping evidence)
- gitutorialdemo (small teaching repo; 1 star)
- navigator-tech, rasor, overlay-text-box-extension, Auto-Typer, crew-ai, daily-challenge, treeking-management-app, Foodblogwebsite, tds* course repos, the-open-framework, UI_slack, PLacifKoo, new-harbor-tasks (thin relative to Terminus mainline)

## Hide / do not showcase

| Repo | Reason |
|------|--------|
| system-prompts-and-models-of-ai-tools | Fork |
| Python_Cheat_Sheet_Dr_AngShuMan_Ghosh | Fork |
| DriveDoo | Aggregate dump; prefer individual strong repos |
| code2022 | Aggregate; duplicates other repos |
| Karm | Stub; content lives in my-learning |
| daily-commit-work, ss, new, task, task2, exam, test, HI, dd, js | Noise / empty / no meaningful README |
| portfolio, portfolio-trial-ayush, ayush.me, githubpages, react-portfolio-main, IHA-art-studio | Thin portfolio experiments |
| food-Website, food-blog-website, foodie-blog-starter_* | Duplicate/template food sites |
| WeCareNGO | No README at ingest; likely sibling of WeCare; review before any link |

## Traction reality check

- Do not invent popularity. Account-level stars are near zero.
- Safe to mention only measured metadata: e.g. FileU and gitutorialdemo have 1 star each at ingest.

## Website consumer rules

1. Link to `summary.md` fields, not live GitHub scraping.
2. Prefer problem → approach → evidence over adjectives.
3. If a README KPI is unmarked as measured, label **unverified** or omit.
