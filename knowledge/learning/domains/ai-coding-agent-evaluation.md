---
id: learning.domain.ai-coding-agent-evaluation
type: learning_domain
title: AI coding-agent evaluation
slug: ai-coding-agent-evaluation
stage: applying
status: review
visibility: private
created: 2026-07-23
updated: 2026-07-23
author: person.owner
version: 0.1.0
---

# AI coding-agent evaluation

## What is it?

Designing tasks, oracles, tests, and harnesses that measure whether coding agents can solve engineering problems in controlled environments (often Docker), including difficulty calibration and human review workflows.

## Why this domain matters

Model demos are cheap; reliable comparison needs reproducible tasks, hidden tests, and clear rubrics. Eval engineering is how teams decide if agents are useful.

## Why it fits this corpus

Newest high-signal work (`RLHF-tasks`, July 2026) is an eval toolchain, not a chatbot demo. Companion corpus `OpenAI-RLHF` stores ideal completions and A/B pairs and **explicitly denies** containing RLHF trainers.

## Stage

**Applying** for task authoring/tooling. **Exploring** for RL training methods (name collision only).

## Evidence

- RLHF-tasks README: Terminus Edition 2, Harbor jobs, CLI validate/audit/oracle/agent/zip, 21 tasks claimed, 79 Harbor runs claimed
- OpenAI-RLHF README: Months + Colosseum tracks; docs correcting scope
- new-harbor-tasks: thinner sibling

## Projects / technologies

Docker, Harbor, Snorkel STB, `uv`, Python, unittest-style task tests.

## Field anchors (not claimed reading)

- Containerized reproducible benchmarks as an industry pattern
- Agent coding benchmark leaderboards/papers as a literature class
- Dockerfile and hermetic test design guides

## Open questions

- Which task content is original?
- Relationship to Snorkel/Terminus (employment vs contributor); unverified
- Public pass-rate tables?

## Next

Publish one fully documented task + measured agent results; keep naming honest (“evals”, not “RLHF training”).

## Related

- github.repo.rlhf-tasks, openai-rlhf, new-harbor-tasks  
- research theme B in `research-topics.md`
