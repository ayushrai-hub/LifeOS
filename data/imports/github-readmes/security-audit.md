# SecAudit

[![Build](https://github.com/ayushrai-hub/security-audit/actions/workflows/ci.yml/badge.svg)](https://github.com/ayushrai-hub/security-audit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey.svg)](#)
[![Python](https://img.shields.io/badge/python-3.10%2B-blue.svg)](https://www.python.org/)
[![Release](https://img.shields.io/badge/release-v1.0.0-green.svg)](#)

**Cross-platform, read-only host security audit toolkit.**

SecAudit inventories processes, persistence, network listeners, firewall posture, users, and binary trust; then emits evidence-backed findings with severity, confidence, MITRE ATT&CK mappings, and multi-format reports.

The original **macOS DFIR shell framework** is preserved under [`macos-dfir/`](macos-dfir/) and remains fully usable. The Python engine (`secaudit`) adds a platform abstraction layer so the same modules run on **macOS**, **Windows**, and **Linux**.

## Quick start

```bash
# Python engine (recommended for cross-platform use)
python3 -m pip install -r requirements.txt
python3 -m secaudit --list-modules
python3 -m secaudit -o output

# Deep macOS collection (original shell toolkit)
cd macos-dfir && ./run.sh
```

## Safety model

This toolkit is **read-only by default**:

- Does **not** delete, quarantine, kill, unload, or remedi ate
- Does **not** disable SIP, Gatekeeper, TCC, firewall, or Defender
- Does **not** require third-party agents
- Elevation is optional and only used for deeper *reads*

## Outputs

Each run creates `output/session_<timestamp>_<pid>/` with:

| Artifact | Format |
|----------|--------|
| `report.txt` / `report.md` / `report.html` | Human reports |
| `findings.csv` / `findings.jsonl` | Structured findings |
| `summary.json` | Machine summary + scores |
| `findings.sarif.json` | SARIF 2.1.0 |
| `evidence/` | Raw collector dumps |

## Documentation

| Doc | Description |
|-----|-------------|
| [INSTALL.md](docs/INSTALL.md) | Installation |
| [QUICKSTART.md](docs/QUICKSTART.md) | First run |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Design |
| [MODULES.md](docs/MODULES.md) | Module catalog |
| [SECURITY.md](SECURITY.md) | Vulnerability reporting |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guide |
| [ROADMAP.md](docs/ROADMAP.md) | Version plan |
| [FAQ.md](docs/FAQ.md) | FAQ |
| [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Common issues |
| [macos-dfir/README.md](macos-dfir/README.md) | Legacy macOS shell framework |

## License

MIT; see [LICENSE](LICENSE).

