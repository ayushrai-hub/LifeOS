---
id: learning.currently-learning
type: learning_profile
title: Currently learning
slug: currently-learning
status: review
visibility: private
created: 2026-07-23
updated: 2026-07-23
author: person.owner
version: 0.1.0
---

# Currently learning

Evidence window: public GitHub activity through **2026-07-23**.  
Stages defined in [`stages.md`](./stages.md). Sources in [`evidence-ledger.md`](./evidence-ledger.md).

Nothing below is claimed as expertise.

## Active now (strong recency + artifacts)

### 1. AI coding-agent evaluation / Harbor–Terminus task systems

| Field | Content |
|-------|---------|
| **Stage** | Applying (tooling + task corpus); Exploring for formal RLHF *training* |
| **Why interested** | Multiple repos dedicated to evaluating LLM coding agents with Dockerized tasks, oracles, and review CLIs. |
| **Evidence** | `RLHF-tasks` last push 2026-07-22 (README: 21 tasks, Harbor runs, CLI); `OpenAI-RLHF` (eval corpus; README states **not** RLHF training); `new-harbor-tasks`. |
| **Current understanding** | Can author/validate/package agent benchmark tasks and run oracle/agent loops per README workflows. Formal PPO/DPO training pipelines are **not** evidenced (explicitly denied in OpenAI-RLHF docs). |
| **Books / papers / videos** | [PLACEHOLDER; none recorded in KB] |
| **Docs / tools** | Harbor, Snorkel STB, Docker, `uv` (from READMEs) |
| **Experiments / projects** | github.repo.rlhf-tasks, github.repo.openai-rlhf, github.repo.new-harbor-tasks |
| **Related skills** | AI evals, Docker environments, automation CLIs |
| **Open questions** | Personal role vs platform (contractor/contributor?); unverified. Which tasks are original vs templates? |
| **Next milestones** | [PLACEHOLDER] Document affiliation; publish one public write-up of a task design; add measured agent pass-rate tables if available. |
| **Domain page** | [`domains/ai-coding-agent-evaluation.md`](./domains/ai-coding-agent-evaluation.md) |

### 2. Host security auditing / DFIR-style inventory

| Field | Content |
|-------|---------|
| **Stage** | Practicing → Applying (toolkit shipped in repo form) |
| **Why interested** | Cross-platform read-only audit tool with MITRE mappings and explicit non-destructive safety model. |
| **Evidence** | `security-audit` last push 2026-07-20; README describes Python `secaudit` + preserved `macos-dfir/` shell framework; CI badge. |
| **Current understanding** | Designing evidence-backed host findings with severity/confidence; read-only collection posture. Depth of each OS module unverified beyond README. |
| **Books / papers / videos** | [PLACEHOLDER] |
| **Docs / tools** | MITRE ATT&CK (referenced), Python, shell |
| **Projects** | github.repo.security-audit |
| **Open questions** | Which modules are complete on Windows/Linux vs macOS? |
| **Next milestones** | [PLACEHOLDER] Module coverage matrix with evidence. |
| **Domain page** | [`domains/security-and-host-auditing.md`](./domains/security-and-host-auditing.md) |

### 3. Interpretable business analytics under constraints

| Field | Content |
|-------|---------|
| **Stage** | Applying (competition artifact) |
| **Why interested** | Chose transparent P&L scoring over black-box ML when the problem forbade proxy-target models. |
| **Evidence** | `amex` README; Amex Campus Challenge 2026 Round 1; 500k cardmembers; `run.py` pipeline. |
| **Current understanding** | Can frame profitability as Revenue − Cost style scoring and ship a reproducible pipeline. Competition placement **unverified**. |
| **Projects** | github.repo.amex |
| **Open questions** | Score/placement? Feature definitions f1–f23 documented where? |
| **Next milestones** | [PLACEHOLDER] Record outcome if known; extract equation into a note. |
| **Domain page** | [`domains/interpretable-analytics.md`](./domains/interpretable-analytics.md) |

## Recently active / ongoing practice (slightly older pushes, still core themes)

### 4. RAG and agentic LLM applications

| Field | Content |
|-------|---------|
| **Stage** | Practicing / Applying (multiple systems); **not** Expert |
| **Evidence** | `adaptive-rag` (LangGraph, Qdrant, routing); `MailU` (local email RAG); bio keyword “LLMs”; IAS uses LLM pass. |
| **Last notable push** | adaptive-rag ~2026-04; MailU earlier 2026; theme is established even if not the absolute newest commits. |
| **Domain page** | [`domains/rag-and-agentic-systems.md`](./domains/rag-and-agentic-systems.md) |

### 5. Compliance, KYC, and audit automation (incl. deterministic designs)

| Field | Content |
|-------|---------|
| **Stage** | Practicing / Applying |
| **Evidence** | `IAS-system`, `SoPia` (explicitly non-generative), `kyc-compliance-system` (aspirational KPIs; treat carefully). |
| **Domain page** | [`domains/compliance-and-audit-systems.md`](./domains/compliance-and-audit-systems.md) |

### 6. Full-stack TypeScript / React product UIs

| Field | Content |
|-------|---------|
| **Stage** | Practicing |
| **Evidence** | `WeCare`, `WeCareNGO`, `Shiksha-Mitra`, `ClubMe`, `Expert-O`, `navigator-tech`, etc. |
| **Domain page** | [`domains/fullstack-typescript-react.md`](./domains/fullstack-typescript-react.md) |

## Active building habit (low topical signal)

- `daily-commit-work` pushed 2026-07-23; README essentially empty. Evidence of **commit cadence**, not of a learning topic. Do not invent a subject from this repo.

## Not currently evidenced as “learning now”

Resume skills lists, certificates, book clubs, course platforms; **missing from KB**. Do not fill from imagination.
