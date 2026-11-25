# The Engineering Diaries

Armash Ansari's personal portfolio, presented as a four-page newspaper. A place for my work in backend development and applied machine learning, my background, and a few things I enjoy outside engineering.

The design takes its cues from old newspapers: a centered masthead, historic type, warm paper, fine dividing rules, and uneven columns. The layout adapts to smaller screens while keeping a clear reading order.

## Inside the paper

- **Front page** — an introduction, work interests, and contact details.
- **Selected work** — ECG ML and EduQuery, with brief links to other projects.
- **Background** — education, internships, and technical skills.
- **Daily record** — GitHub contributions, LeetCode practice, and weekend interests in films and beginner chess.

## Built with

HTML, CSS, and vanilla JavaScript, with a small Node.js endpoint for LeetCode data. No package dependencies or build step. Fonts are IM Fell English, Libre Caslon Display, and UnifrakturMaguntia, loaded through Google Fonts.

## Run locally

Requires Node.js 20 or newer.

```sh
npm run dev
```

Open [localhost:4173](http://127.0.0.1:4173). Refresh after editing files. On Windows, use `npm.cmd run dev` if PowerShell blocks npm scripts.

## Updating the portfolio

| File | Contents |
| --- | --- |
| `content.js` | Profile, contacts, education, experience, and projects |
| `app.js` | Page content, navigation, and activity displays |
| `styles.css` | Layout, typography, responsive styles, and transitions |
| `api/leetcode.mjs` | LeetCode profile and calendar endpoint |
| `server.mjs` | Local preview server |
| `assets/` | Images and other static files |

To add a resume, place the PDF in `assets/` and set `resume` in `content.js` to its path, such as `assets/armash-ansari-resume.pdf`. The resume link is not configured yet.

## Activity data

GitHub contributions use the public [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api). LeetCode data is fetched through `/api/leetcode` using its public GraphQL endpoint, without account credentials.

Successful responses are cached for an hour. The LeetCode cache is held in memory and can reset when a server instance restarts. Both integrations depend on unofficial services or endpoints; unavailable data is handled with a fallback message. LeetCode's calendar covers the current year in UTC, while solved totals cover all time.

## Hosting

For Vercel, select **Other** as the framework, leave the build command empty, and use `.` as the output directory. The `api/` directory supplies the LeetCode function; `server.mjs` is for local previews.

A static-only host needs an equivalent API endpoint. Verify both activity panels on the live site after deployment.

## Checks

```sh
npm run check
```

This checks JavaScript syntax in `app.js` and `server.mjs`. For layout checks, visit all four pages at desktop and mobile widths. Page transitions respect reduced-motion preferences.
