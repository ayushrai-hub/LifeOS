# Missing information

Generated: 2026-07-23

Import sources: `data/imports/2026-07-23-linkedin-resume.txt`, `data/imports/2026-07-23-identity-profiles.csv`, owner chat URLs.

## Critical gaps

| Area | What's missing | Affected entities |
|------|----------------|-------------------|
| Certification issuers | Provider, issue date, credential ID/URL | All `cert.*` |
| Award detail | Issuer, date, event for open mic performer | `award.open-mic-performer` |
| FoCDoT Best Work | Dates, artifacts | `achievement.focdot-best-work-twice` |
| Role metrics | Quantitative impact | Most `experience.*` |
| Company URLs | Official websites | Most `company.*` / `organization.*` |
| All India Radio / UiPath | Responsibility bullets | respective experience entities |
| Location conflict | Pune headline vs Bhopal address/roles | `person.owner`, contact address |
| Phone country code | Assumed +91 for `tel:` URL | `contact.phone` |
| Education spelling | "progarmming" | `education.iitm-bs-data-science` |
| School date span | 2008–2020 for 12th may include earlier years | `education.mission-english-hss-12th` |
| Skill levels | Provisional only | All new `skill.*` |

## Identity fields often empty

- `last_updated` (platform-side) unknown for nearly all profiles
- Related skills/projects/companies on many identity YAML left for deeper linking
