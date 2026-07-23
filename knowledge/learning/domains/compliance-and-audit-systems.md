---
id: learning.domain.compliance-and-audit-systems
type: learning_domain
title: Compliance and audit systems
slug: compliance-and-audit-systems
stage: applying
status: review
visibility: private
created: 2026-07-23
updated: 2026-07-23
author: person.owner
version: 0.1.0
---

# Compliance and audit systems

## What is it?

Software that checks documents or workflows against rules (SOP, KYC/AML, legal compliance), often combining OCR, extraction, scoring, review queues, and audit logs.

## Why it matters

Regulated processes need traceability. Errors are costly; generative models can invent facts; so system design must choose determinism vs assistance carefully.

## Connection to existing work

Multiple substantial repos in this lane, including one that **rejects** generative judgment.

## Stage

**Applying / Practicing.** KYC KPI numbers in README are **unverified targets**, not results.

## Projects

| Repo | Approach | Notes |
|------|----------|-------|
| IAS-system | OCR + LangGraph + LLM assist + large docs/ | Legal/police case audit framing |
| SoPia | Deterministic SOP matching for online-fraud FIRs | Explicit anti-hallucination |
| kyc-compliance-system | OCR + classification + PII redaction + React | Treat KPIs as aspirational |

## Technologies

Python, FastAPI, React, LangGraph, Tesseract/Presidio/spaCy (KYC README), PyMuPDF/Sarvam (IAS), SQLAlchemy/SQLite/Postgres mentions.

## Field anchors

- Jurisdiction KYC/AML overviews (RBI/SEBI named in KYC README; verify before citing as compliance achievement)
- OCR engine documentation for tools actually listed
- Audit logging / evidence preservation practices

## Books / papers read by owner

[PLACEHOLDER]

## Experiments

Encoding SOP checks as data (`sop_checks.json` mentioned in IAS structure); sample FIRs in SoPia.

## Open questions

- Which SOPs are authoritative sources?
- Human review workload results?
- Differentiation write-up IAS vs SoPia?

## Next

Claim hygiene on KYC metrics; publish architecture comparison note.

## Related research theme

`research-topics.md` §A; generative vs deterministic.
