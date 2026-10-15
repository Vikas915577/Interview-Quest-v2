# Interview Quest V3.1 — Interview Preparation

Free, mobile-first static interview practice for Data Analyst, BI Analyst, MIS/Reporting Analyst, Junior BI Developer, Junior Data Engineer and Business Analyst roles.

## What's new in V3.1

- **500 validated question records** across 13 topics, with role tags, difficulty, suggested answers, tips and follow-ups where available.
- **SQL Lab with 4 sample tables** (`employees`, `departments`, `customers`, `orders`) and 20 guided SQL exercises.
- The SQL Lab includes beginner, intermediate and interview-level tasks, hints, example solutions, explanations and expected-result checks. It does **not** execute SQL in the browser; copy a solution into a local practice database to run it.
- **10-day roadmap**, starting with SQL basics, aggregations, joins and interview SQL before Excel/Power BI, Python/Pandas, analysis, Birst/data modelling, resume/English and a mock interview.
- Search, role/topic/difficulty/type filters, bookmarks, XP/streak tracking and question-specific ChatGPT shortcuts remain in place.
- Responsive sample data tables can be horizontally scrolled on small phones.
- Service worker cache updated to `interview-quest-v3-1` to reduce stale-app confusion.

## Files

Keep these files together in the repository root: `index.html`, `style.css`, `app.js`, `question-bank.js`, `sql-lab.js`, `sw.js`, `manifest.webmanifest`, `icon.svg`.

## Publish from an Android phone

1. Download and extract `Interview-Quest-v3.1.zip`.
2. Open your GitHub repository and upload the **contents** of the extracted folder to the repository root on `main`, replacing the existing application files.
3. In GitHub, check **Settings → Pages**: branch `main`, folder `/(root)`.
4. Wait for Pages to deploy and open the published URL. Do not create an extra nested folder.
5. Close any installed PWA window, reload the website and check the bank shows **500**. The bank total is calculated from loaded validated questions, not just a decorative label.

## Run automated checks

Requires Node.js:

```bash
node --check app.js
node --check question-bank.js
node --check sql-lab.js
node --check sw.js
node validate-question-bank.js
node smoke-test.js
```

To serve locally, run `python -m http.server 8000` from this folder and open `http://localhost:8000`.

## Free features and limitations

Core practice, sample tables, hints, solutions, roadmap, bookmarks and progress use static frontend code and local browser storage; no paid API or backend is required. The app does not execute SQL queries or embed ChatGPT. ChatGPT opens separately, and prompt prefill is browser-dependent. Progress/bookmarks are stored on this device/browser and are not synced to other devices.

## Data and learning notes

The SQL lab's sample records are illustrative practice data. SQL examples follow common SQL patterns; date functions and some syntax can differ between database engines. Official references include PostgreSQL's SQL tutorial, Python/pandas documentation, Microsoft Learn for Power BI and Infor's current documentation. Always verify version-specific product behavior against the deployed platform.
