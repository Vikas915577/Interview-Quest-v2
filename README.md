# Interview Quest — Interview Practice

A mobile-first static interview preparation app for Data Analyst, BI Analyst, MIS/Reporting Analyst and junior Data Engineering preparation. This release adds a searchable question bank, saved-for-revision questions, answer reveal, category/difficulty/type filters and question-specific ChatGPT shortcuts.

## What is included

- Nine guided practice modules: telephonic, HR, technical, SQL, Excel/Power BI/Infor Birst, Python/Pandas, English confidence, full mock interview and resume/project explanations.
- A curated starter bank of **100 distinct interview questions with suggested answers and interview tips**.
- Search across question text, answers and topics; filters for topic, difficulty and question type.
- Save/bookmark questions for revision. Saved questions and practice progress are stored in this browser using `localStorage`.
- One-click **Open ChatGPT** link in the header and contextual **Ask ChatGPT** actions for practice modules and bank questions.
- Copy-prompt fallback if ChatGPT does not prefill the question on a particular browser/device.
- XP, daily practice completion, streak and a 7-day starter plan.
- PWA manifest and offline caching for app files and question bank after the first successful load.
- No external API key or backend is required for the current features.

## ChatGPT behavior and limitation

The app opens the official ChatGPT site separately; it does not embed ChatGPT's signed-in chat. It tries the `https://chatgpt.com/?q=...` prompt-prefill URL, which is not a guaranteed or documented public integration contract. The contextual prompt is also copied to the clipboard as a fallback when browser permissions allow it. If prefill does not work, paste the copied prompt into a new ChatGPT chat. Signing in may be required to save ChatGPT conversations. The app does not call the OpenAI API and does not send practice progress to ChatGPT automatically.

## Research and reference sources

Question topics and technical explanations were organized against official or primary documentation. The question bank is study material, not a claim that an employer will ask every listed question.

- PostgreSQL SQL tutorial and query concepts: https://www.postgresql.org/docs/current/tutorial.html
- Python tutorial: https://docs.python.org/3/tutorial/
- pandas user guide, including missing data, merge and groupby: https://pandas.pydata.org/docs/user_guide/
- Microsoft Learn Power BI transformation and modelling: https://learn.microsoft.com/en-us/power-bi/transform-model/
- Microsoft Learn star schema guidance: https://learn.microsoft.com/en-us/power-bi/guidance/star-schema
- Microsoft Excel XLOOKUP reference: https://support.microsoft.com/en-us/excel/functions/xlookup-function
- Infor Birst official documentation: https://docs.infor.com/birst/latest/en-us/birstolh/default.html

Documentation links were checked during the October 15, 2026 implementation. Product details can change; use the current official page when verifying tool-specific behavior. Infor Birst questions intentionally focus on general modeling/reporting workflows unless exact version-specific behavior can be verified.

## Publish to GitHub Pages from a phone

1. Open your `Interview-Quest` repository.
2. Upload/replace these files in the repository root: `index.html`, `style.css`, `app.js`, `question-bank.js`, `sw.js`, `manifest.webmanifest`, `icon.svg`, and `README.md`.
3. Keep the files in the root directory; do not upload the folder as a nested folder.
4. Open **Settings → Pages** and confirm the source is branch `main`, folder `/ (root)`.
5. After deployment finishes, open the Pages URL. If the older version still appears, close the installed/PWA window, reload the page and clear the website's cached data if needed.

## Local testing

Use a local web server for complete service-worker/PWA testing, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Privacy and persistence

Progress and bookmarks are saved on the current device/browser only. There is no account sync or remote database in this static release. Clearing site data or changing browsers/devices can make that local data unavailable. Do not store sensitive personal information in this app.

## Adding more questions

Edit `question-bank.js` and add a row with these fields in order: category, difficulty (`Beginner`, `Intermediate`, or `Interview`), type (`Concept`, `Practical`, `Scenario`, `Behavioral`, or `Communication`), question, suggested answer, and interview tip. The app assigns stable IDs from row order, so when adding a batch, append records instead of inserting them in the middle to avoid changing IDs for saved questions. Review new answers and links before publishing. Build the bank in carefully checked batches rather than adding repetitive low-quality questions just to increase the count.
