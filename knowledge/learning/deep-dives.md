---
id: learning.deep-dives
type: learning_profile
title: Deep dives
slug: deep-dives
status: review
visibility: private
created: 2026-07-23
updated: 2026-07-23
author: person.owner
version: 0.1.0
---

# Deep dives

Topics where artifact depth exceeds a single toy repo. Still not “expert” unless marked otherwise.

## 1. Adaptive / agentic RAG systems

- **Stage:** Applying (project-level)
- **Center of gravity:** `adaptive-rag` README; routing (index / general / search), LangGraph nodes, Qdrant, grading, rewrite, Mongo history, FastAPI + Streamlit.
- **Secondary:** `MailU` (personal email RAG, local-first).
- **Why deep:** Architecture is spelled out as a graph of responsibilities, not a single `ChatCompletion` call.
- **Canonical field references (not proof you read them):** LangGraph documentation; original RAG survey/paper lineage (Lewis et al., 2020) as field background; Qdrant docs.
- **Owner reading list:** [PLACEHOLDER]
- **Open questions:** Evaluation harness? Failure modes on bad retrieval? Cost controls?
- **Domain:** [`domains/rag-and-agentic-systems.md`](./domains/rag-and-agentic-systems.md)

## 2. Coding-agent benchmarks (Terminus / Harbor)

- **Stage:** Applying
- **Center:** `RLHF-tasks` toolchain + task library; supporting corpus in `OpenAI-RLHF`.
- **Why deep:** Validation/audit/review automation and difficulty calibration against named models; operational eval engineering.
- **Canonical field references:** Harbor/agent-eval literature broadly; Docker best practices; (do not cite Snorkel internal docs as personal IP).
- **Owner reading list:** [PLACEHOLDER]
- **Domain:** [`domains/ai-coding-agent-evaluation.md`](./domains/ai-coding-agent-evaluation.md)

## 3. Compliance audit systems (generative-assisted vs deterministic)

- **Stage:** Applying / Practicing
- **Centers:** `IAS-system` (OCR + LangGraph + docs suite); `SoPia` (deterministic SOP scoring, anti-hallucination stance).
- **Why deep:** Same problem family approached with opposite generative policies; strong design tension to document.
- **Canonical field references:** Domain SOP sources are jurisdiction-specific; [PLACEHOLDER: which SOP texts were encoded?]; OCR tool docs (Tesseract/Sarvam/PyMuPDF as named in READMEs).
- **Domain:** [`domains/compliance-and-audit-systems.md`](./domains/compliance-and-audit-systems.md)

## 4. Safety-first systems utilities & host security

- **Stage:** Applying (FileU); Applying/Practicing (security-audit)
- **Why deep:** Shared theme of **non-destructive defaults**, logging, and reversible/evidence-oriented operations.
- **Domain:** FileU under systems practice; security in [`domains/security-and-host-auditing.md`](./domains/security-and-host-auditing.md)

## Not deep dives (yet)

Frontend marketing sites, food-blog clones, empty stubs, forks; see GitHub portfolio-worthiness report.
