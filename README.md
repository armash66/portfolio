# The Engineering Diaries

A four-page newspaper portfolio for Armash Ansari. Local first, with no build step or package dependencies.

## Run locally

Requires Node.js 20 or newer.

```sh
npm run dev
```

On PowerShell with script execution restricted, use `npm.cmd run dev` or `node server.mjs`.
Open http://127.0.0.1:4173. Refresh after editing source files.

## Edit your details

- `content.js`: résumé path, email, LinkedIn, LeetCode, project entries, and milestones.
- `app.js`: article copy, page composition, navigation, and GitHub activity.
- `styles.css`: typography, newspaper columns, mobile layout, and page transitions.
- `assets/`: illustrations, project screenshots, and your résumé PDF.

Set `resume` in `content.js` to a local PDF path such as `assets/armash-ansari-resume.pdf`. Only publish contact information you want on the public website. No upload dashboard is included.

The front page introduces Armash. The work page features ECG ML and EduQuery, with other experiments reduced to one-line links. The background page presents education, internship experience and skills from the supplied resume, without repeating project features. Current grades are omitted because the supplied resume is outdated. A replacement resume PDF is still needed. Contact details and the public LeetCode username are configured. Anukool India Pvt Ltd is listed without dates or duties pending the updated resume.

## Data and presentation

The GitHub panel uses the public GitHub Contributions API at `github-contributions-api.jogruber.de/v4/armash66?y=last`. This unofficial service scrapes the public calendar and caches it for one hour. The website also caches successful responses in memory for one hour, validates daily entries, and shows a fallback message on failure. The calendar reports the dates actually returned, contribution totals, active days, and the maximum daily count. On mobile, only the calendar scrolls horizontally. LeetCode uses a same-origin `/api/leetcode` endpoint backed by its public GraphQL profile data. It needs no login, caches for one hour, and returns a labelled stale record if an upstream refresh fails. The calendar shows UTC submission dates for the current year; solved totals are all-time. This is an undocumented public endpoint and may change.

Fonts are loaded from Google Fonts with local serif fallbacks. The ECG feature has an architecture schematic, not a clinical trace or result. The EduQuery feature illustrates its five parsing states with examples, not real student records. The old workshop illustration remains in assets but is no longer displayed. Pages use a brief CSS perspective transition; a fully simulated draggable paper curl is not implemented. Reduced-motion settings disable the animation.

## Checks

```sh
npm run check
```

This runs JavaScript syntax checks. For visual checks, visit all four hash routes at desktop and mobile widths. The LeetCode panel requires a backend. `server.mjs` serves it for local previews; `api/leetcode.mjs` also exports a Vercel-compatible request handler. A purely static host needs an equivalent API function. Deployment has not been performed.

## Letterpress design

The edition uses dense uneven columns, an original SVG workbench illustration, boxed notices, layered paper edges, grain and a fold shadow. Navigation animates in either direction; link, illustration and calendar hover effects remain subtle. Reduced-motion preferences disable movement. The front page introduces Armash, the work page retains only two main projects, and the record and activity pages have their own compositions.
