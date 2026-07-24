---
id: learning.research-topics
type: learning_profile
title: Research topics
slug: research-topics
status: review
visibility: private
created: 2026-07-23
updated: 2026-07-23
author: person.owner
version: 0.1.0
---

# Research topics

## Honesty gate

No peer-reviewed publications, thesis, or lab affiliation appear in the knowledge base.  
“Research” here means **investigation themes evidenced by systems and eval corpora**, not academic appointment.

## Active investigation themes

### A. When should systems use generative models vs deterministic rules?

- **Evidence:** `SoPia` README (“NOT a generative AI system”); `chatbot` (template/DB only); contrast with `IAS-system` / `adaptive-rag` (LLM passes).
- **Stage:** Applying as design practice; Exploring as formal research program.
- **Why it matters:** Hallucination and auditability constraints in legal/compliance and booking domains.
- **Next:** [PLACEHOLDER] One written decision record comparing the three repos.

### B. How to evaluate coding agents reliably?

- **Evidence:** Terminus/Harbor task structure, oracle vs agent runs, rubrics in `RLHF-tasks`; A/B completions in `OpenAI-RLHF` Colosseum.
- **Stage:** Applying tooling; Exploring academic eval methodology.
- **Field anchors (background, not claimed reading):** agent benchmark papers/leaderboards as a category; containerized reproducible evals.
- **Next:** Export one public task card with measured outcomes.

### C. Adaptive retrieval strategies for mixed query types

- **Evidence:** `adaptive-rag` routing taxonomy (index / general / search) + grade/rewrite loop.
- **Stage:** Applying in a personal system; Exploring SOTA comparisons.
- **Field anchors:** Adaptive RAG / query-routing literature; LangGraph multi-actor patterns.
- **Next:** [PLACEHOLDER] Offline eval set and metrics.

### D. Interpretable scoring vs black-box ranking in business data

- **Evidence:** `amex` constraints and P&L framing.
- **Stage:** Applying in competition setting.
- **Field anchors:** Interpretable ML / credit decisioning literature (general); do not claim domain employment.

## Dormant / thin research signals

| Topic | Signal | Stage |
|-------|--------|-------|
| Multi-agent crews | `crew-ai` | Exploring |
| Outlier visualization | `streamlit-outlier-visualizer` | Exploring |
| Retail price optimization | repo name only / missing README | Unverified |
| Stock analysis notebooks | missing README | Unverified |

## Empty research slots

- Authored papers: none in KB  
- Lit notes: none in KB  
- Experiment log entities: none yet; create under `knowledge/research/experiments/` when real experiments are logged
