---
id: learning.domain.deterministic-vs-generative-design
type: learning_domain
title: Deterministic vs generative design
slug: deterministic-vs-generative-design
stage: applying
status: review
visibility: private
created: 2026-07-23
updated: 2026-07-23
author: person.owner
version: 0.1.0
---

# Deterministic vs generative design

## What is it?

A product/architecture choice: when to use generative models versus fixed rules, templates, or scorecards; especially under auditability and hallucination constraints.

## Why it matters

“Add an LLM” is not always correct. Legal, booking, and compliance contexts often need refusals, verbatim evidence, and reproducible scores.

## Evidence (strong)

| Artifact | Choice |
|----------|--------|
| SoPia | Explicitly not generative; rule-based SOP scoring |
| chatbot | No external LLM; templates + DB only |
| IAS-system / adaptive-rag | Generative assistance used inside broader pipelines |
| amex | Interpretable equation instead of black-box ML |

## Stage

**Applying** as repeated design judgment across repos. Formal research program still **Exploring**.

## Why I am learning / practicing it

Pattern recurrence shows deliberate tradeoff-making, not one-off demos.

## Field anchors

- Hallucination and grounding literature (general)
- Safety/assurance arguments for high-stakes software

## Next

One decision-record article linking the four artifacts above.

## Related

`research-topics.md` §A; domains compliance + RAG + analytics.
