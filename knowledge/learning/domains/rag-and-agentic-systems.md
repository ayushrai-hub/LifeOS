---
id: learning.domain.rag-and-agentic-systems
type: learning_domain
title: RAG and agentic systems
slug: rag-and-agentic-systems
stage: applying
status: review
visibility: private
created: 2026-07-23
updated: 2026-07-23
author: person.owner
version: 0.1.0
---

# RAG and agentic systems

## What is it?

**Retrieval-Augmented Generation (RAG)** grounds model answers in retrieved documents. **Agentic** variants add routing, tools, critique loops, and state machines (often via graph frameworks) so the system chooses *how* to answer; not only *what* to retrieve.

## Why this domain matters

Naive single-shot prompting fails on private corpora, freshness, and tool use. Production assistants need retrieval, grading, fallbacks (web vs index vs parametric memory), and audit trails.

## Why someone with this GitHub corpus would study it

Public work already centers on LLM apps that must answer from documents, email, or mixed sources; not model fine-tuning alone.

## Stage

**Applying** on personal/project systems. **Not** Expert-level (no production metrics or employment proof in KB).

## Why I am learning it (inferred)

Repeated construction of RAG/agent pipelines across repos; profile bio lists LLMs.

## Where I have used it / projects

| Project | Role of domain | Evidence |
|---------|----------------|----------|
| adaptive-rag | Core product | Routing + LangGraph + Qdrant + grade/rewrite |
| MailU | Email RAG chat/search | ChromaDB, local LLM, Gmail extract |
| IAS-system | LLM analysis pass in audit pipeline | NVIDIA NIM mentioned |

## Technologies connected

Python, FastAPI, LangGraph, Qdrant, ChromaDB, MongoDB, OpenAI APIs, Streamlit, sentence-transformers, Ollama (MailU).

## Articles / books / papers

- **Owner-consumed:** [PLACEHOLDER; none in KB]
- **Field anchors (background research for the domain; not claimed reading):**
  - Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* (2020); foundational RAG framing
  - LangGraph documentation; multi-actor / stateful agent workflows
  - Qdrant documentation; vector search operations
  - OpenAI / provider docs for tool calling and embeddings (as used by stack)

## Experiments

- adaptive-rag query-type routing (index/general/search); described in README
- MailU local-first pipeline; described in README  
Measured quality experiments: [PLACEHOLDER]

## Open questions

- Retrieval metrics (recall@k, faithfulness)?
- Cost/latency budgets?
- Evaluation sets?

## What to learn next

1. Offline evaluation harness for adaptive-rag  
2. Failure taxonomy (bad chunking, routing errors, web noise)  
3. [PLACEHOLDER: owner goals]

## Related graph

- skills: skill.rag, skill.agentic-workflows  
- github: adaptive-rag, mailu, ias-system  
- research theme: Adaptive retrieval (`research-topics.md` §C)
