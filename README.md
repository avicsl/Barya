# 🚌 Barya-Pamasahe Calculator

> **Terminal-based AI agent** that calculates the financial impact of the 2026 jeepney fare crisis, compares rail alternatives, and generates legal + AI-powered commuter advice.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Set your Gemini API key (for AI recommendations)
#    Windows CMD:
set GEMINI_API_KEY=your_key_here
#    PowerShell:
$env:GEMINI_API_KEY="your_key_here"

# 3. Run
python barya.py
```

---

## 🧠 Features

| Feature | Description |
|---|---|
| **Fare Engine** | Calculates LTFRB-legal fares for Traditional + Modern Jeepney |
| **PISTON Threat Analysis** | Shows the financial impact if the ₱23 petition is approved |
| **Economic Opportunity Cost** | Computes monthly/annual budget loss in real terms (rice, electricity) |
| **Rail Alternatives** | LRT-2 & MRT-3 fares with 50% discount (active since Mar 23, 2026) |
| **Legal Shield** | Taglish script to challenge overcharging + official hotlines |
| **AI Diskarte** | Gemini 1.5 Flash generates hyper-local route recommendations |

---

## 📊 2026 Fare Constants

| Mode | Base Fare | Base KM | Per Succeeding KM |
|---|---|---|---|
| Traditional Jeepney | ₱14.00 | 4 km | ₱2.00 |
| Modern/E-Jeepney | ₱17.00 | 4 km | ₱2.40 |
| PISTON Petition ⚠️ | ₱23.00 | 4 km | ₱2.00 |

> ⚠️ The PISTON petition (filed April 20, 2026) is **NOT YET APPROVED** by LTFRB.

---

## 🗂 Project Structure

```
barya-cli/
├── barya.py          # Main CLI application
├── fares.json        # Transit fare database (LRT-2, MRT-3, Jeepney)
├── requirements.txt  # Python dependencies
└── README.md         # This file
```

---

## 🔑 Environment Variables

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key for AI analysis |

---

## 📞 Reporting Overcharging

- **LTFRB Hotline**: (02) 8426-2515
- **DOTr Action Center**: 790-8303 / Text `DOTR` to 2919  
- **MMDA**: 136
- **8888 Citizen Connect**: 8888

---

*Data sources: LTFRB MC 2024-011 | DOTR 50% Rail Discount (Mar 23, 2026) | DOLE NCR Minimum Wage*
