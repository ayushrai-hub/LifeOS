# Intelligent Audit System (IAS)

An AI-powered audit system for Indian court judgments and police case files, designed to identify compliance gaps and potential acquittal risks.

## Features

- **OCR Processing**: Extracts text from PDF documents using PyMuPDF and Sarvam Document Intelligence OCR
- **Judgment Analysis**: Analyzes court judgments for legal compliance and potential issues
- **SOP Compliance**: Checks against Standard Operating Procedures for police investigations
- **AI-Powered Insights**: Uses NVIDIA NIM (OpenAI-compatible) for intelligent analysis and recommendations
- **Bilingual Support**: Hindi and English language support
- **Audit Trail**: Complete audit history with folder-based storage

## Documentation

Product and engineering references live under **`docs/`**:

| Document | Purpose |
|----------|---------|
| [docs/PRD.md](docs/PRD.md) | Product requirements |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design |
| [docs/FEATURES_AND_WORKFLOW.md](docs/FEATURES_AND_WORKFLOW.md) | Features & user workflows |
| [docs/API.md](docs/API.md) | HTTP API |
| [docs/SECURITY.md](docs/SECURITY.md) | Threat model & hardening |
| [docs/PERFORMANCE.md](docs/PERFORMANCE.md) | Latency & scale notes |
| [docs/TESTING.md](docs/TESTING.md) | Test strategy |
| [docs/IMPLEMENTATION_PHASES.md](docs/IMPLEMENTATION_PHASES.md) | Phased delivery plan |
| [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md) | Operator & developer setup |
| [docs/POSTGRESQL_MIGRATION.md](docs/POSTGRESQL_MIGRATION.md) | Postgres migration playbook |

## Project Structure

```
IAS-system/
├── main.py               # Thin shim; exposes ``app`` for ``uvicorn main:app``
├── ias/                  # Backend application package (pipelines, API, PDF)
│   ├── main.py           # FastAPI routes + middleware
│   ├── graph.py          # LangGraph audit pipeline (OCR → SOP → score)
│   ├── config.py         # Env-backed settings (paths resolve to repo root)
│   ├── db.py / models.py # Persistence + schemas
│   ├── ocr.py, preprocess.py, chunker.py
│   ├── structure.py, sop_engine.py, ai_pass.py, report.py
│   ├── samiksha.py, judgment_analyzer.py
│   ├── report_generator.py, html_letter_pdf.py, templates/
│   └── auth.py, middleware_security.py, rate_limit.py, export_bundle.py, …
├── scripts/              # Dev helpers (e.g. token generator)
├── tests/                # Pytest suite
├── docs/                 # PRD, API, architecture, ops
├── frontend/
│   └── index.html        # Web UI
├── sop_db/
│   └── sop_checks.json   # SOP definitions
├── storage/              # Runtime data (typically gitignored)
│   ├── audits/, uploads/, reports/, …
└── .env                  # Secrets (gitignored)
```

## Setup Instructions

### Prerequisites

- Python 3.12+
- SQLite3
- API Keys (NVIDIA, Sarvam)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd IAS system
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

5. Initialize the database:
```bash
python -c "from db import init_db; init_db()"
```

### Running the Application

Start the FastAPI server:
```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Access the web interface at: `http://127.0.0.1:8000`

## API Endpoints

- `POST /api/audit` - Upload and audit a PDF file
- `POST /api/samiksha` - Analyze a court judgment (optional `area` field)
- `GET /api/cases` - List audit cases
- `GET /api/cases/{id}` - Get case details
- `POST /api/reports/audit/{case_id}/official-letter-pdf` - Supervisory memo PDF (selected checks)
- `GET /api/samiksha` - List samiksha reports
- `GET /api/ranking/samiksha` - Aggregate Samiksha failures by station/district/IO/area
- `GET /api/health` - Health check

See [docs/API.md](docs/API.md) for the full contract.

## Automated tests

```bash
pip install -r requirements-dev.txt
pytest tests/ -v --tb=short
```

## Security switches (production)

- **`IAS_REQUIRE_AUTH`**; require `Authorization: Bearer …` for protected routes (see [docs/API.md](docs/API.md)).
- **`IAS_ADMIN_TOKEN`**; role **admin** (delete endpoints); **`IAS_API_TOKEN`**; supervisor or viewer (`IAS_API_TOKEN_ROLE`).
- **`IAS_RATE_LIMIT_POST_PER_MINUTE`**; throttle POST `/api/*` per IP (process-local).
- **`IAS_SCAN_COMMAND`**; optional malware scan after upload.

PostgreSQL scale-out notes: [docs/POSTGRESQL_MIGRATION.md](docs/POSTGRESQL_MIGRATION.md).

**Phase 5 (reports):** branded official letters via Playwright (`IAS_LETTER_PDF_ENGINE`), bulk **`GET /api/export/cases-zip`** (admin token when auth is on). See [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md) and [scripts/generate_api_tokens.py](scripts/generate_api_tokens.py).

## Configuration

Required environment variables in `.env`:
- `NVIDIA_API_KEY` - NVIDIA NIM API key (`nvapi-...`)
- `NVIDIA_BASE_URL` - NVIDIA NIM base URL (default `https://integrate.api.nvidia.com/v1`)
- `NVIDIA_MODEL` - NVIDIA model name (e.g. `meta/llama-3.1-70b-instruct`)
- `SARVAM_API_SUBSCRIPTION_KEY` - Sarvam subscription key (`sk_...`)

## Safety & Security

- **API Keys**: Stored in `.env` file (never commit to git)
- **User Data**: Stored in `storage/` directory (gitignored)
- **Database**: SQLite database file (gitignored)
- **Logs**: Application logs stored separately (gitignored)

## OCR Quality Handling

The system uses intelligent OCR quality detection:
- **Good**: Reliable extraction
- **Moderate**: Partial OCR, analysis continues
- **Poor**: Limited confidence, partial analysis generated
- **Critical**: Fallback to alternative OCR method

Low-quality OCR does not fail the analysis - it generates a warning and continues with partial results.

## License

Proprietary - MP Police

## Support

For issues and support, contact the development team.

