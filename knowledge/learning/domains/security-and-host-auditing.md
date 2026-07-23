---
id: learning.domain.security-and-host-auditing
type: learning_domain
title: Security and host auditing
slug: security-and-host-auditing
stage: applying
status: review
visibility: private
created: 2026-07-23
updated: 2026-07-23
author: person.owner
version: 0.1.0
---

# Security and host auditing

## What is it?

Collecting host posture signals (processes, persistence, listeners, users, trust) and turning them into evidence-backed findings; ideally without changing the system under test.

## Why it matters

Defenders and builders need inventories before remediation. Destructive “fixers” are the wrong default for learning and for many audits.

## Evidence of learning/application

`security-audit` (SecAudit): read-only Python engine + preserved macOS DFIR shell toolkit; MITRE ATT&CK mappings; multi-format reports; CI badge; push 2026-07-20.

## Stage

**Applying** at toolkit level. Module completeness per OS **unverified**.

## Technologies

Python, Shell, MITRE ATT&CK (as mapping target).

## Field anchors

- MITRE ATT&CK knowledge base  
- OS vendor security auditing docs (macOS/Windows/Linux)  
- DFIR collection principles (order of volatility, evidence integrity); general field knowledge

## Owner reading / courses / certs

[PLACEHOLDER; no Security+ / OSCP / etc. in KB]

## Related projects

github.repo.security-audit; thematic link to FileU’s safety-default philosophy (different domain, similar caution).

## Next

Coverage matrix; example sanitized report in KB (if shareable).
