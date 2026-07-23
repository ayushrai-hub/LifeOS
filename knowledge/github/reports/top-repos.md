# Top repositories

Selection is grounded in README clarity, problem framing, technical depth, documentation, shipping signals, and portfolio usefulness. Star counts are weak across the account and are **not** the primary ranker.

Ingest: 2026-07-23 · Account: ayushrai-hub · Public repos: 72

## Ranked showcase set

### 1. adaptive-rag

- **Why top:** Clearest end-to-end AI systems project: adaptive query routing, LangGraph graph nodes, Qdrant, FastAPI + Streamlit, structured `src/` described in README.
- **Proves:** RAG / agentic workflow engineering, API + UI delivery, modular LLM app design.
- **Highlight later:** Architecture (route → retrieve → grade → rewrite → generate / web / general), stack diagram, runnable surfaces.
- **Do not highlight:** Unverified latency/quality claims; “production” language without deployment proof; star count (0).

### 2. RLHF-tasks

- **Why top:** Operational toolchain, not a toy notebook. Claims 21 tasks, Harbor job runs, CLI (`validate`, `audit`, `oracle`, `agent`, `zip`), structured `tasks/`.
- **Proves:** AI coding-agent evaluation, Docker task authoring, review automation, shipping under an external benchmark protocol (Terminus / Snorkel / Harbor).
- **Highlight later:** CLI workflows, task anatomy (`instruction.md`, Dockerfile, tests), calibration against reference models.
- **Do not highlight:** Affiliation/employment with Snorkel (unverified); treat platform names as context only. Name is “RLHF-tasks” but content is Terminus eval tasks.

### 3. IAS-system

- **Why top:** Domain system with an unusually complete `docs/` set (PRD, architecture, security, API, testing, phases). LangGraph OCR→SOP→score pipeline stated clearly.
- **Proves:** Applied AI in legal/police audit context, OCR pipelines, FastAPI packaging, technical writing discipline.
- **Highlight later:** Problem (compliance / acquittal risk), pipeline stages, bilingual support, documentation maturity.
- **Do not highlight:** Accuracy KPIs or “government adoption” unless separately verified. API key dependencies are constraints, not achievements.

### 4. SoPia

- **Why top:** Explicitly rejects generative AI for a compliance auditor; zero-hallucination / rule-based framing is a strong engineering judgment signal.
- **Proves:** Deterministic extraction + scoring, audit logging, full-stack compliance tooling mindset.
- **Highlight later:** “Not generative AI” constraint, FIR online-fraud SOP checking, evidence-backed reports.
- **Do not highlight:** As a separate “LLM product.” Note domain overlap with IAS-system without claiming they are the same system.

### 5. OpenAI-RLHF

- **Why top:** Large eval corpus with honest docs that the name is misleading (no RLHF trainer). Scripts for manifest/test/validate; Months + Colosseum tracks.
- **Proves:** LLM-code evaluation data work, documentation integrity, scale of curated tasks (~1450 Python files claimed in README).
- **Highlight later:** What the repo *is* (eval archive) and what it *is not* (RL training). Example tasks (TradingBot, BondAnalyzer).
- **Do not highlight:** Title as proof of RLHF expertise. Per-task quality is uneven by nature of corpora.

### 6. FileU

- **Why top:** Safety-first file organizer; dry-run default; copy→SHA-256 verify→move; stdlib-only. Rare clarity for a utility. 1 star (small but nonzero).
- **Proves:** Defensive systems thinking, CLI UX, cross-platform path handling.
- **Highlight later:** Safety model and failure behavior.
- **Do not highlight:** “Production-ready” as measured uptime; scope is intentionally narrow.

### 7. security-audit (SecAudit)

- **Why top:** Read-only host audit toolkit with explicit non-destructive safety model, MITRE mappings, CI badge, Python engine + preserved macOS DFIR shell path.
- **Proves:** Security/DFIR tooling instincts, cross-platform design, evidence-oriented reporting.
- **Highlight later:** Safety model and report artifacts.
- **Do not highlight:** Unverified coverage completeness of every OS module.

### 8. amex

- **Why top:** Competition solution with a deliberate constraint: interpretable P&L equation, not proxy-target ML, on 500k rows.
- **Proves:** Business-grounded analytics, refusal of black-box when the problem forbids it, reproducible `run.py` pipeline.
- **Highlight later:** Problem statement + design choice (deterministic profitability).
- **Do not highlight:** Placement/score (unverified). Not a general-purpose product.

### 9. chatbot

- **Why top:** Appointment chatbot that **does not** call LLMs; template + DB only. Docker, tests, clear runbook.
- **Proves:** Full-stack JS, deterministic product design, shipping discipline (honesty about non-LLM behavior).
- **Highlight later:** Determinism and test/Docker story.
- **Do not highlight:** As an “AI chatbot.”

## Honorable mentions (not full showcase without caveats)

| Repo | Why notable | Blocker |
|------|-------------|---------|
| kyc-compliance-system | Strong product/architecture README | KPI numbers look aspirational |
| MailU | Local-first email RAG | README roughness; scale claims unverified |
| WeCare / Shiksha-Mitra | Solid frontend product READMEs | Depth beyond UI unverified |
| hiring_intellgence | Reproducible ops tooling + tests | Personal tooling; name typo |
| my-learning | Curriculum writing | Aspirational competencies; overlaps Karm stub |

## Explicitly not top

- Forks, empty stubs, food-blog duplicates, portfolio experiments, `DriveDoo` / `code2022` aggregates, `Expert-O` (hype-heavy), pre-launch marketing-only sites, daily-commit noise repos.

## Method limitations

- Git tree API returned 403 (rate limit) during structure sampling; structure evidence is mostly README-described.
- No private repos inspected.
- No runtime execution of projects during ingest.
