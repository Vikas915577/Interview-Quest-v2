# Interview Quest V3.1 — Test Report

Test date: 2026-10-15

## Automated checks

- PASS — `node --check app.js`
- PASS — `node --check question-bank.js`
- PASS — `node --check sql-lab.js`
- PASS — `node --check sw.js`
- PASS — question bank validation: 500 non-empty question records, unique IDs, unique question text, 13 categories, and 7 role labels.
- PASS — preserved legacy IDs `iq-001` through `iq-100`; added records start at `iq-301`.
- PASS — SQL Lab data validation: 4 sample tables, all rows match table schemas, 20 unique exercises with tasks, hints, solutions, explanations and expected checks.
- PASS — smoke test: app renders 500 question cards, role/topic filters narrow results, SQL module renders all tables and 20 exercise cards, saved-attempt textareas are present, roadmap has 10 entries, and the missing-bank warning appears if question data is unavailable.
- PASS — HTML loads question bank and SQL Lab scripts before `app.js`; service worker cache is versioned as `interview-quest-v3-1` and includes `sql-lab.js`.
- PASS — web manifest parses as JSON.

## Not verified here

- NOT TESTED — live GitHub Pages deployment and Android phone visual testing. The package must be uploaded to the repository root and deployment must complete before the published website changes.
- NOT TESTED — SQL statements are not executed in the browser. Users can write and save attempts, then reveal/copy example solutions; correctness can be checked in a local SQL database.
- NOT TESTED — actual ChatGPT prompt prefill on every Android browser.

## Scope and privacy

No paid API key is required. SQL attempts, bookmarks and progress are stored in local browser storage on the current device; there is no cross-device sync. Sample rows are fictional practice data.
