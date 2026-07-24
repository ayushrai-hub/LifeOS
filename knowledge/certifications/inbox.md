---
id: certifications.inbox
type: note
title: Courses and certifications inbox
slug: certifications-inbox
description: "Capture queue for credentials and courses before full entities exist."
status: draft
visibility: private
created: 2026-07-23
updated: 2026-07-23
author: person.owner
version: 0.2.0
written_at: 2026-07-23
relationships:
  related_projects: []
  related_domains: []
---

# Courses and certifications inbox

When you finish a course or earn a credential:

1. Drop the PDF/image under `knowledge/media/certificates/` with a metadata entity.
2. Create `certifications/<slug>.md` or `learning/courses/<slug>.md` from templates.
3. Link related `domain.*` and `skill.*`.
4. Add a `timeline_event` if it was a meaningful milestone.
5. Clear the bullet from this inbox.

## Queue

### Promoted to entities (still need proof)

- [x] Introduction to Machine Learning → `cert.introduction-to-machine-learning` (issuer/date missing)
- [x] Mental Health Workshop → `cert.mental-health-workshop`
- [x] Advanced Excel Workshop → `cert.advanced-excel-workshop`
- [x] Pandora Box → `cert.pandora-box` (clarify what this was)
- [x] Weird Chess → `cert.weird-chess` (clarify what this was)
- [x] IITM BS Data Science path → `course.iitm-bs-data-science-applications`
- [x] Takshashila PPA → `course.takshashila-public-policy-analysis`

### Still to capture

- [ ] Attach certificate files / Drive exports for the five LinkedIn certs
- [ ] Split IITM BS into per-module `course.*` entities as modules complete
- [ ] Salesforce Trailblazer courses worth promoting from profile → course/cert entities
- [ ] Any UiPath academy credentials from champion period
