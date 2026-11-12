# scripts/record: stills and clips of the real app

Scripted, repeatable media for the landing page's slots A1–A7 (`src/content/site.ts`). The scripts drive the real kanso-frontend production build in headless Chrome with real mouse and key events. The data is the fictional student **Maya** only, served by a mock API: never a real account, never anyone's personal data.

| File | What it does |
|---|---|
| `mock.mjs` | The mock kanso API with Maya's Fall 2026 term: classes, lab and library shifts (kanso events), Study group and Advisor check-in (Google events), tasks, habits with streaks, notes, nine weeks of history and 40+ mood check-ins. `GET /__reset` restores it between takes. |
| `rec.mjs` | One scenario per slot. `still` stops at the slot's state and saves a WebP; `clip` records the same steps as screencast frames, with a visible cursor and key hints. |
| `encode.mjs` | Turns a clip take into a 30 fps VP9 WebM and an H.264 MP4. |

## The frozen clock

Everything is relative to **Thursday, November 12, 2026, 9:05 AM** in America/Los_Angeles (`KANSO_NOW`). The mock builds Maya's week around it, and `rec.mjs` freezes the page's clock at the same instant, so every take shows the same week, the same suggested times and the same term countdown on any day.

## Setup

You need a kanso-frontend checkout, Node 22, and Playwright's `chrome-headless-shell` (`npx playwright install chromium-headless-shell`).

```bash
# 1. The mock API (port 4991; MOCK_PORT changes it)
node scripts/record/mock.mjs

# 2. kanso-frontend, built against the mock. The placeholder Supabase values are never called:
#    rec.mjs signs in with a fake, unsigned session in localStorage.
cd ../kanso-frontend
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder \
NEXT_PUBLIC_KANSO_API_URL=http://localhost:4991 NEXT_PUBLIC_KANSO_AI_URL=http://localhost:4991 \
  npx next build && npx next start -p 3127

# 3. Chrome. --font-render-hinting=none keeps headless text spacing the same as a real browser's.
chrome-headless-shell --headless --remote-debugging-port=9351 --hide-scrollbars --font-render-hinting=none about:blank
```

Use `next build` and `next start`, not `next dev`: the dev server is too slow to record.

`APP`, `MOCK` and `CDP` override the app URL (`http://localhost:3127`), the mock URL (`http://localhost:4991`) and the DevTools port (`9351`).

## Stills

```bash
node scripts/record/rec.mjs stills public/media                     # all 16: A1–A7 and the phone hero, light and dark
node scripts/record/rec.mjs still A3 dark public/media/a3-dark.webp  # one
node scripts/record/rec.mjs still A1 light public/media/a1-phone-light.webp phone
```

Desktop stills are 1600×1000 (a 1280×800 window at 1.25×), and the phone hero is 780×1688 (390×844 at 2×). Each is WebP at quality 80, about 45–90 KB.

| Slot | Still |
|---|---|
| A1 | The create-task form: "Write speech outline", 1 hour, When to work on it with three times, the soonest picked, and its "Can't go earlier / Can't go later" line. Also at phone width. |
| A2 | Home with the Daily brief: Today's activity log, Today's schedule and Habits left today. |
| A3 | The week view: classes, shifts, Google events and Work on blocks. |
| A4 | Home widgets: the Fall 2026 countdown, timers, habits, Focus, the month and Free time. |
| A5 | Notes with "Cell respiration review" open. |
| A6 | The daily check-in with Good, energy Steady, and Slept well and Exercised picked. |
| A7 | Reports › Productivity › Overview for the week, with Pace ahead of last week. |

## Clips

```bash
SLOW=12 node scripts/record/rec.mjs clip A1 light rec/a1-light
START=0.3 node scripts/record/encode.mjs rec/a1-light public/media/a1-light 1600 36
```

On a busy machine, software rendering paints about 12 fps, so a clip take runs the page `SLOW` times slower than real: CSS and Web animations through `Animation.setPlaybackRate`, and `setTimeout`, `setInterval`, `Date` and `performance.now` through the clock script. `encode.mjs` divides the frame timestamps back, so the video plays at true speed and stays smooth. `START` and `END` (seconds) trim the take.

`encode.mjs` uses `ffmpeg-static` when it's installed here (`npm i ffmpeg-static` in this folder), else `ffmpeg` on the PATH, or `FFMPEG`. Playwright's bundled ffmpeg can make the WebM but has no H.264 encoder, so it skips the MP4.

Each scenario already plays its still's steps with the cursor (A1 records as a 9 s take today). Add the clip's extra steps (listed as `clip` on each slot in `src/content/site.ts`) after the still's state:

| Slot | Clip adds | Mock needs |
|---|---|---|
| A1 | Which day → Monday and pick, Create & plan, then the Work on block on the week view | `create-task` and `create-work-block` are mocked |
| A2 | Plan my habits puts Read 20 pages at a free time; the Undo toast | — |
| A3 | Drag the BIO 210 block 30 min later, resize it, the clash ring and "Move to …?", Move | The Tuesday block already runs into Study group |
| A4 | Start 25 min on "CS 160 problem set 6", the ring fills, the block is saved, Free time drops | — |
| A5 | / → Table, highlight "net 2 ATP", the word count ticks, press the k for focus mode | — |
| A6 | Save check-in, the Undo toast | `save-mood-checkin` is mocked |
| A7 | Pace chips Tasks → Habits, then Mood › Patterns | Nine weeks of history and the shift-day mood dip are mocked |

Budgets: ≤ 15 s; the hero WebM ≤ 1 MB, the others ≤ 700 KB; MP4 ≤ 1.5× the WebM.
