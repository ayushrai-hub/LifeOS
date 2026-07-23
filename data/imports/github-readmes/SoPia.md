# 🔒 Police SOP Compliance Audit System

Government-grade SOP compliance audit system for police FIR case files (Online Fraud cases).

## ⚠️ Critical Notice

**This is NOT a generative AI system.** It is a deterministic audit tool with:
- ✅ Zero hallucination tolerance
- ✅ Full decision traceability  
- ✅ Rule-based scoring only (no AI judgment)
- ✅ Verbatim text extraction only
- ✅ Immutable audit logging

## 🎯 Purpose

Automates SOP compliance checking for online fraud FIR case files:
1. Extracts documented actions from case files
2. Matches against predefined SOP steps
3. Scores compliance using configurable thresholds
4. Generates auditable reports with source evidence

## 📁 Project Structure

```
police_sop_audit_system/
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── core/         # Config, constants
│   │   ├── models/       # Database models, schemas
│   │   ├── services/     # Extraction, Matching, Scoring, Reporting
│   │   ├── api/          # API routes
│   │   └── utils/        # PDF parser, audit logger
│   ├── tests/            # Unit tests + sample FIRs
│   ├── main.py           # Application entry
│   └── requirements.txt
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # Upload, Report, AuditLog
│   │   ├── services/     # API client
│   │   └── styles/       # CSS
│   └── package.json
├── docs/                 # Documentation
│   ├── ARCHITECTURE.md
│   ├── SETUP.md
│   └── API_SPEC.md
└── sample_data/          # Sample FIR files
```

## 🚀 Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Access at `http://localhost:5173`

## 📊 Pipeline Stages

| Stage | Technology | Constraint |
|-------|------------|------------|
| Document Ingestion | PyMuPDF | Parse only |
| Extraction | GPT-4o/Claude | Verbatim only, temp=0 |
| Matching | sentence-transformers | Embeddings only |
| Scoring | Python rules | Thresholds only |
| Reporting | Jinja2 | Templates only |

## 🔍 Verification

### No Hallucination Check
```bash
curl http://localhost:8000/api/v1/cases/{case_id}/audit-log
```

Verify:
- `hallucination_check_passed: true` for all entries
- `source_sentences` exist in original document
- `rule_applied` shows deterministic rule

### Integrity Check
```bash
python -c "
from app.utils.audit_logger import AuditLogger
from app.models.database import init_db, get_session
engine = init_db()
logger = AuditLogger(get_session(engine))
result = logger.validate_no_hallucinations('CASE-ID')
print(f'Valid: {result["is_valid"]}')
"
```

## 🧪 Testing with Sample FIRs

```bash
# Upload sample
curl -X POST "http://localhost:8000/api/v1/cases/upload" \
  -F "file=@backend/tests/sample_firs/fir_sample_1.txt"

# Process
curl -X POST "http://localhost:8000/api/v1/cases/{case_id}/process"

# View report
curl "http://localhost:8000/api/v1/cases/{case_id}/report"
```

## ⚙️ Configuration

### SOP Thresholds (per step)
- `done_threshold`: Minimum score for ✅ (default: 0.75)
- `partial_threshold`: Minimum score for ⚠ (default: 0.50)

Edit in database or via API.

### Environment Variables
```bash
DATABASE_URL=sqlite:///./police_audit.db
EXTRACTION_API_KEY=sk-...  # OpenAI/Anthropic
SECRET_KEY=your-secret
DEBUG=false
```

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md) - System design
- [Setup Guide](docs/SETUP.md) - Installation instructions
- [API Spec](docs/API_SPEC.md) - Endpoint reference

## 🔐 Security

- No case data sent to external APIs (except extraction LLM)
- Immutable audit logs with SHA-256 hashes
- Role-based access control
- 7-year log retention

## 🛡️ Compliance Guarantees

1. **Zero Hallucination**: All output either from source document or SOP database
2. **Full Traceability**: Every decision linked to source sentence
3. **Deterministic Scoring**: Same input always produces same output
4. **Human Review Required**: System flags ambiguous cases automatically

## 📜 License

Internal Government Use - Confidential

## 🤝 Support

For technical issues:
1. Check [SETUP.md](docs/SETUP.md) troubleshooting
2. Review audit logs for specific case
3. Verify SOP thresholds are appropriate

---

**Built for compliance. Designed for trust. Zero hallucinations guaranteed.**

