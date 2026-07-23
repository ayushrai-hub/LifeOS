# MailU - AI-Powered Email Intelligence System


- Wait for explicit confirmation before proceeding

An intelligent email management system that extracts, categorizes, and provides AI-powered search and chat capabilities for your Gmail account.

## Features

- 🔐 **Gmail API Integration**: Secure OAuth authentication and email extraction
- 🏷️ **Smart Categorization**: Automatic email categorization using zero-shot classification
- 💬 **RAG-Powered Chat**: Ask questions about your emails using natural language
- 🔍 **Semantic Search**: Find emails by meaning, not just keywords
- 📊 **Analytics & Reports**: Generate summaries and insights from your email data
- 🎯 **Local-First**: Runs entirely on your machine with Ollama for privacy

## Tech Stack

- **Backend**: Python 3.14, FastAPI
- **Database**: SQLite (metadata), ChromaDB (vectors)
- **AI/ML**: sentence-transformers, Ollama (Llama 3.1), transformers
- **Frontend**: Streamlit
- **Email**: Gmail API

## Quick Start

### Prerequisites

- Python 3.10+ (currently using 3.14.2)
- Google Cloud account (for Gmail API)
- Ollama (optional, for local LLM)

### Installation

1. **Clone and setup**:
   ```bash
   git clone <repo-url>
   cd MailU
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Configure Google Cloud**:
   - Follow [Docs/setup_google_cloud.md](Docs/setup_google_cloud.md)
   - Create OAuth credentials
   - Add credentials to `.env` file

3. **Run OAuth authentication**:
   ```bash
   ./scripts/start_oauth_server.sh
   # Visit http://localhost:8080
   ```

4. **Verify setup**:
   ```bash
   python scripts/verify_setup.py
   python scripts/verify_token.py
   ```

### Usage

**Extract emails**:
```bash
# Test with 10 emails
python scripts/fetch_full_emails.py --max 10

# Extract all emails (21k+)
python scripts/fetch_full_emails.py --max 21403
```

**Start Streamlit UI**:
```bash
streamlit run app.py
```

**Start FastAPI Backend**:
```bash
python backend/main.py
# API docs available at http://localhost:8080/docs
```

## Deployment

### Docker Deployment

```bash
# Build image
docker build -t mailu:latest .

# Run container
docker-compose up -d
```

See [Deployment Guide](Docs/DEPLOYMENT.md) for detailed instructions.

### Health Checks

```bash
# Check system health
python scripts/deployment/health_check.py

# API health endpoint
curl http://localhost:8080/health
```

### Backups

```bash
# Backup database and ChromaDB
./scripts/deployment/backup_database.sh
```

## Project Structure

```
MailU/
├── backend/          # FastAPI OAuth server
├── src/              # Source code
│   ├── auth/         # Authentication
│   ├── services/     # Gmail service
│   ├── parsers/      # Email parsing
│   ├── models/       # Data models
│   ├── db/           # Database setup
│   ├── embeddings/   # Embedding generation
│   ├── vector_db/    # ChromaDB integration
│   ├── classification/ # Email categorization
│   ├── rag/          # RAG pipeline
│   └── search/       # Search functionality
├── scripts/          # Utility scripts
├── tests/            # Test files
├── docs/             # Documentation
└── data/             # Data storage
```

## Development Status

**✅ Completed**:
- [x] Environment setup
- [x] Google Cloud OAuth configuration
- [x] Gmail API authentication
- [x] Email extraction pipeline
- [x] Database schema and storage (SQLite + ChromaDB)
- [x] Email categorization (zero-shot classification)
- [x] Embedding generation (sentence-transformers)
- [x] RAG pipeline (Ollama integration)
- [x] Streamlit UI interface
- [x] Advanced search and filtering
- [x] Report generation and analytics
- [x] Testing and quality assurance
- [x] Security and privacy enhancements
- [x] Performance optimization
- [x] Documentation and deployment

**🎉 Production Ready**: MailU is production-ready with comprehensive features, testing, and documentation.

## Documentation

### Quick Start & Setup
- [Quick Start Guide](Docs/QUICK_START.md)
- [Google Cloud Setup](Docs/setup/setup_google_cloud.md)
- [Installation Guide](Docs/setup/SETUP_GUIDE.md)

### Architecture & Development
- [System Architecture](Docs/ARCHITECTURE.md)
- [API Documentation](Docs/API_DOCUMENTATION.md)
- [Development Timeline](Docs/development/development_timeline_task_goal.md)

### Deployment & Operations
- [Deployment Guide](Docs/DEPLOYMENT.md)
- [FAQ](Docs/FAQ.md)
- [Backup Strategies](Docs/deployment/backup_strategies.md)

### Testing & Quality
- [Testing Guide](tests/TESTING_GUIDE.md)
- [Quality Metrics](reports/QUALITY_METRICS.md)

## Configuration

Copy `env.example` to `.env` and configure:

```bash
# Gmail API
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8080/callback

# Database
DATABASE_URL=sqlite:///mailu.db

# LLM
OLLAMA_BASE_URL=http://localhost:11434
ANTHROPIC_API_KEY=  # Optional
```

## License

MIT

## Contributing

See [Development Timeline](Docs/development_timeline_task_goal.md) for development phases and tasks.

