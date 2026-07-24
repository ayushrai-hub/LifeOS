# American Express Campus Challenge 2026; Round 1

**Measuring Customer Profitability for the Premier Card**

A deterministic, business-grounded profitability framework that scores 500,000 cardmembers using a transparent P&L equation (Revenue − Cost). No supervised ML on proxy targets.

---

## Quick Start

```bash
# 1. Create environment (once)
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 2. Run full pipeline
python run.py

# 3. Faster rerun (skip EDA plots)
python run.py --skip-eda
```

**Outputs:**
| File | Description |
|------|-------------|
| `submission.xlsx` | Official submission (500K predictions + framework prose) |
| `report.md` | Auto-generated run summary |
| `outputs/` | EDA CSVs, correlation heatmap, run logs |

---

## Problem Statement

- **Goal:** Rank cardmembers by estimated issuer profitability using f1–f23
- **Evaluation:** Accuracy = % overlap between your predicted top 20% and Amex's hidden actual top 20%
- **Constraint:** Design an interpretable equation; not a black-box model or proxy-target regression
- **Output:** Continuous dollar P&L score per `id`; Amex applies the top-20% cut

---

## Repository Structure

```
assignment-tirios/
├── README.md                          # This file
├── docs/TECHNICAL_REPORT.md           # Full methodology documentation
├── config.py                          # All economic coefficients (PDF-anchored)
├── run.py                             # Main entry point
├── profitability_pipeline.py          # Alias for run.py
├── amex_r1/
│   ├── data.py                        # Step 0: load & verify dataset
│   ├── eda.py                         # Step 1: exploratory analysis
│   ├── transforms.py                  # Step 2/4: imputation & winsorization
│   ├── profitability.py             # Step 3: P&L equation
│   ├── validation.py                  # Step 5/6: sanity & validation checks
│   ├── submission.py                  # Step 7: Excel submission writer
│   ├── report.py                      # Markdown report generator
│   └── pipeline.py                    # Orchestrator
├── main_dataset.csv                   # 500K scoring population
├── description.csv                    # Feature dictionary
├── campus_challenge26_r1.pdf        # Official brief
├── Predictions.csv                    # Reference draft baseline
└── submission.xlsx                    # Final deliverable
```

---

## Profitability Equation (Summary)

```
Net Profitability ($) =
  REVENUE
    + f5 × 2.5%  +  (f6+f9) × 0.3%     # interchange (f5 authoritative)
    + f1 × 24.5%                        # interest on revolve balance
    + f20 × $625  +  f19 × $175         # annual fees

  − COSTS
    − max(f21, 0.3×accrual_pts) × $0.015   # rewards funding
    − f13×$40 + f14 + f15×$15 + f16        # benefit fulfillment
    − f11 × (f1 + 0.05×f17) × 0.50         # expected credit loss
    − f20 × $45                             # servicing
    − f2×$250 + f3×$2,500                  # attrition / distress

  + ENGAGEMENT (minor)
    + 2×ln(1+f12) + ln(1+f22) + 5×f23
```

All coefficients live in `config.py` with source annotations. See [docs/TECHNICAL_REPORT.md](docs/TECHNICAL_REPORT.md) for full derivation.

---

## Latest Run Results

| Metric | Value |
|--------|-------|
| Predictions | 500,000 (no nulls) |
| Mean score | $487 |
| Range | −$7,484 to +$6,360 |
| Top 20% cutoff | ~$1,349 |
| Bootstrap Jaccard (top-20% stability) | 0.593 |
| Spearman vs draft `Predictions.csv` | 0.697 |
| Top-20% overlap vs draft | 72.5% |

**Face validity (top vs bottom 20%):** higher f1, f19, f20; lower f3, f11, f21 (redemption).

---

## Key Design Decisions

1. **f5 is authoritative for interchange**; category spends (f6–f10) do not sum to f5 (<1% within 1% tolerance)
2. **Null spend/benefit fields → 0**; structural absence of activity, not random missingness
3. **f7 negatives kept**; net-of-refunds reduces revenue
4. **f3 weighted 10× f2**; collection cancellations are severe distress signal
5. **Interest dominates ranking**; ~90% of revenue variance from f1×APR (revolvers on Pay Over Time)
6. **id never used** as a predictive feature

---

## Tuning

Edit coefficients in `config.py`, then re-run:

```bash
python run.py --skip-eda
```

Sensitivity analysis (in pipeline output) shows APR ±5pp moves ~11% of top-20% membership; interchange ±20% is stable (Jaccard ~0.97).

---

## Documentation Index

| Document | Contents |
|----------|----------|
| [README.md](README.md) | Overview, setup, quick reference |
| [docs/TECHNICAL_REPORT.md](docs/TECHNICAL_REPORT.md) | Full EDA, equation, imputation, validation |
| [docs/COEFFICIENTS.md](docs/COEFFICIENTS.md) | Coefficient table with sources and sensitivity |
| [report.md](report.md) | Auto-generated per-run summary |
| [description.csv](description.csv) | Official feature dictionary |
| [config.py](config.py) | Coefficient source code with comments |

---

## Submission Checklist

- [x] 500,000 rows in `Predictions` sheet, no blanks
- [x] IDs match template order (0–499999)
- [x] `Profitability Framework` sheet column B filled for all sections
- [x] Template section labels unchanged
- [x] No `id` used as feature
- [x] No rows dropped or added

Upload `submission.xlsx` to Unstop.

