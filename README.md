# Interview Quest V3 — Interview Preparation

**Free, mobile-first interview practice app.** V3 includes 300 curated questions across 13 topics, target-role filtering, suggested answers, practical tips, follow-up prompts, bookmarks, XP/streak tracking, a 7-day starter plan and shortcuts to the official ChatGPT site.

## What is new in V3

- Expanded the question bank from 100 to **300 unique questions**. Original 100 questions remain at the top of the bank so the existing `iq-001` to `iq-100` saved-question IDs remain stable.
- Added Business Analyst requirements, MIS/reporting and data-modeling/warehouse questions, plus deeper SQL, Excel, Power BI, Python/Pandas, data analysis, data engineering, Infor Birst, HR, resume/project and simple-English practice.
- Added role tags and a **Target role** filter for Data Analyst, BI Analyst, Junior BI Developer, Junior Data Engineer, MIS/Reporting Analyst and Business Analyst preparation.
- Answers reveal an interview tip and a follow-up question where available. The ChatGPT prompt includes the topic, target roles, suggested answer and tip to make practice more focused.
- Added two practice modules: **Data Analysis & Case Studies** and **Business Analyst & MIS Reporting**.
- Added a visible question-bank load warning and basic runtime record validation so a missing/malformed bank is easier to diagnose.
- Bumped the service-worker cache name to V3 so older cached V2 assets can be removed on activation.
- Added `validate-question-bank.js` for repeatable data checks.

## Contents

- `index.html` — mobile-first interface and navigation
- `style.css` — responsive dark UI
- `app.js` — practice modules, filters, saved questions, progress, XP and ChatGPT hand-off
- `question-bank.js` — 300 questions with suggested answers, tips, follow-ups and role tags
- `sw.js` — offline/PWA asset cache, versioned for V3
- `manifest.webmanifest` and `icon.svg` — install metadata and icon
- `validate-question-bank.js` — question-bank validation script
- `smoke-test.js` — startup, role-filter, topic-filter and load-error smoke test
- `TEST-REPORT.md` — checks that were run and limits that still need manual testing

## How to run it for free

You can open it as a static site from GitHub Pages. It does not require a paid database, a server, or an OpenAI API key for the app features included here.

1. Upload the **contents** of this folder to the root of your GitHub repository. Do not upload the V3 folder as a nested folder.
2. In GitHub, open **Settings → Pages** and set the source to branch `main`, folder `/ (root)`.
3. Wait for Pages to deploy, then open the published URL.
4. If the old version still appears, close the installed/PWA window and reload. V3 uses a new cache name, but device/browser caching can still delay what you see.

For local testing, run `python -m http.server 8000` from this folder and open `http://localhost:8000`.

## Running the question-bank checks

With Node.js installed, run:

```bash
node validate-question-bank.js
node smoke-test.js
node --check app.js
node --check question-bank.js
node --check sw.js
```

The validator checks total count, unique IDs and question text, required fields, supported difficulty/type values, role metadata, category coverage, stable IDs for the original 100 questions, HTML filter elements and service-worker cache version. The smoke test initializes the app with a small DOM test double, verifies all 300 cards render, tests role/topic filters and confirms the visible load-error fallback works.

## ChatGPT integration: important limits

The app opens the official ChatGPT site in a separate tab and attempts to include the question in the URL. That prefill behavior is not a guaranteed public API contract, so a fallback copies a contextual prompt to the clipboard when browser permissions allow it. This is a **shortcut, not an embedded ChatGPT conversation**. The app does not call the OpenAI API or transmit browser progress to ChatGPT automatically. Signing in to ChatGPT may be needed for ChatGPT-side features.

## Progress, privacy and offline use

Bookmarks, XP and completed practice sessions are stored in the current browser's `localStorage`. They do not sync across devices and may be lost if site data is cleared. The service worker caches the app for offline use after the first successful online load. First-install/offline behavior must still be verified on the target Android browser.

## Question quality and scope

The bank is a learning aid, not a promise that an employer will ask every question. Suggested answers should be checked against the tool/database version used in a real job. Infor Birst content deliberately focuses on general reporting, modeling, data quality and troubleshooting; version-specific implementation details should be confirmed in the official documentation. For resume questions, describe only real responsibilities, tools and outcomes—do not invent achievements.

## Official references

- PostgreSQL SQL tutorial: https://www.postgresql.org/docs/current/tutorial.html
- Python tutorial: https://docs.python.org/3/tutorial/
- pandas user guide: https://pandas.pydata.org/docs/user_guide/
- Microsoft Learn — Power BI modeling: https://learn.microsoft.com/en-us/power-bi/transform-model/
- Microsoft Learn — star schema: https://learn.microsoft.com/en-us/power-bi/guidance/star-schema
- Microsoft Excel XLOOKUP: https://support.microsoft.com/en-us/excel/functions/xlookup-function
- Infor Birst documentation: https://docs.infor.com/birst/latest/en-us/birstolh/default.html
- IIBA business analysis resources: https://www.iiba.org/
