# Interview Quest V3 — Test Report

Test date: 2026-10-15

## Automated checks

- **PASS** — `node --check app.js`
- **PASS** — `node --check question-bank.js`
- **PASS** — `node --check sw.js`
- **PASS** — `node validate-question-bank.js`: 300 records, 300 unique IDs, 300 unique question texts, 13 categories and 7 role labels
- **PASS** — all required question fields are present; supported difficulty and type values are used; every question has role metadata; any provided topic reference uses HTTPS
- **PASS** — original question IDs `iq-001` through `iq-100` remain in their original order; V3 additions follow from `iq-101`
- **PASS** — required role/topic/difficulty/type filters and the question-bank load-error message exist in HTML; the question-bank script loads before `app.js`
- **PASS** — `node smoke-test.js`: app initialization rendered 300 cards; target-role and topic filters narrowed results; a simulated missing bank displayed the load-error fallback
- **PASS** — local HTTP server returned status 200 for `index.html`, `style.css`, `app.js`, `question-bank.js`, `sw.js`, `manifest.webmanifest`, `icon.svg`, `README.md`, `TEST-REPORT.md`, `validate-question-bank.js` and `smoke-test.js`
- **PASS** — service-worker cache name is `interview-quest-v3` and includes the primary app files; old `interview-quest-*` caches are removed on activation
- **PASS** — `manifest.webmanifest` parses as valid JSON
- **PASS** — existing `interviewQuest.v1` localStorage key is retained so prior practice history and bookmarks can still be read

## Not yet verified

- **UNTESTED** — full visual/manual testing on a real Android phone and desktop browser
- **UNTESTED** — published GitHub Pages deployment after V3 files are uploaded; the local test does not prove that the online site is updated
- **UNTESTED** — actual ChatGPT app hand-off and prompt prefill on every Android browser; ChatGPT's `?q=` behavior is not a guaranteed public integration contract
- **UNTESTED** — fresh-install/offline PWA behavior on a physical phone
- **UNTESTED** — correctness of every suggested answer in a specific employer's interview; candidates should verify tool- and database-version-specific details against current documentation

## Known scope limits

The app is a static frontend. Local bookmarks, practice history and XP do not sync between devices. It does not use a paid backend, does not call the OpenAI API, and does not embed a ChatGPT conversation. The ChatGPT shortcut opens the official website and attempts to copy a contextual prompt as a fallback. A working internet connection is needed for the first full load and external ChatGPT use.
