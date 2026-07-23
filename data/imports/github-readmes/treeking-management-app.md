# Trekking Management Application

Flask + Jinja2 + Bootstrap web app for managing treks, staff, and trekker bookings with role-based access (Admin, Trek Staff, User).

## Stack

- **Backend:** Flask, Flask-SQLAlchemy, Flask-Login, Flask-WTF, Flask-RESTful
- **Frontend:** Jinja2 templates, HTML, CSS, Bootstrap 5 (CDN); no required JavaScript
- **Database:** SQLite (`instance/app.db`), created programmatically via `scripts/init_db.py`

## Project structure

See `PLAN.md` and `docs/ARCHITECTURE.md` for the full layout. Main packages live under `app/` with blueprints `auth`, `admin`, `staff`, `user`, and `api`.

## Setup & run (tested locally)

```bash
cd trekking-management-app
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
python scripts/init_db.py         # creates tables + seeds Admin
# optional demo staff/user/treks:
python scripts/seed_demo_data.py
pytest -v
python run.py                     # http://127.0.0.1:5000
```

## Demo credentials

| Role | Email | Password |
|------|-------|----------|
| Admin (always seeded) | `admin@trek.app` | `Admin@123` |
| Staff (after `seed_demo_data.py`) | `staff@trek.app` | `Staff@123` |
| User (after `seed_demo_data.py`) | `user@trek.app` | `User@123` |

Admin **cannot** self-register. Staff must be approved by Admin before accessing the staff dashboard.

## Feature checklist (Section 1)

| Area | Status |
|------|--------|
| Three roles + RBAC | Done |
| Admin trek CRUD, staff approve/blacklist/assign, search, dashboard stats | Done |
| Staff gated until approved; update slots/status; participants; start/complete | Done |
| User register/login; search/filter; book Open+slots; history; profile | Done |
| Overbooking prevention; status-gated booking; blacklist lockout | Done (tested) |
| Hashed passwords, flash messages, responsive Bootstrap | Done |
| Optional JSON API (`/api/...`) | Done |
| Charts UI | Partial; stats available via `/api/stats` JSON; no chart library (no required JS) |

## Documentation

- `docs/ER_DIAGRAM.md`; Mermaid ER diagram
- `docs/ARCHITECTURE.md`; design notes
- `docs/API_ENDPOINTS.md`; JSON API
- `PLAN.md`; build plan, living checklist, compliance audit

## Known gaps / trade-offs

1. **Admin model:** single `users` table with `role=admin` (seeded), not a separate Admin table; justified in architecture docs.
2. **One staff per trek** via `assigned_staff_id` (matches spec FK).
3. **Charts:** optional; aggregates exposed as JSON only (keeps core flows JS-free).
4. **Trek delete with bookings:** closes trek and cancels active bookings instead of hard-deleting history.

## Tests

```bash
pytest -v
```

Uses in-memory SQLite only (`TestConfig`); never writes to `instance/app.db`.

