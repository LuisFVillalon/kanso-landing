# kanso-landing

![kanso](brand/logo/kanso-lockup-horizontal.svg)

The marketing site for **kanso**, a calm planner for students: tasks with suggested work times, a week calendar, notes, habits and mood in one place. Keep it kanso.

The page walks through one student's day with kanso, from the 8 AM Daily brief to Sunday's Reports. It's built to rank in search, get quoted by AI answer engines, and move visitors from the hero to the demo to an account.

| | |
|---|---|
| Stack | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 |
| Design | The kanso brand identity in [`brand/`](brand/DESIGN.md): paper and ink, the k key, Fraunces and M PLUS Rounded 1c, light and dark themes. `brand/DESIGN.md` is the source of truth. |
| Related | [kanso-frontend](https://github.com/LuisFVillalon/kanso-frontend) (the app) · [kanso-backend](https://github.com/LuisFVillalon/kanso-backend) · [kanso-ai](https://github.com/LuisFVillalon/kanso-ai) |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the URLs
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

The fonts are self-hosted from `src/app/fonts/`, so the build needs no network access.

### Environment

| Variable | What it's for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | This site's canonical URL. Used in metadata, `sitemap.xml`, `robots.txt` and the JSON-LD. |
| `NEXT_PUBLIC_APP_URL` | The kanso app. Sign-in and sign-up links go to `/login` and `/signup` there. |
| `NEXT_PUBLIC_DEMO_URL` | Where every "Try the demo" button goes. Defaults to the app's signup page, which has the demo button. If you add a route in kanso-frontend that starts the demo straight away (for example `/demo`), point this at it to cut one click from the funnel. |

## The page

In order (`src/app/page.tsx`):

1. **Header**: logo, A day with kanso · Who it's for · Features · FAQ, the theme toggle, Sign in and Try the demo. Below 760 px only the logo and Try the demo stay.
2. **Hero**: the k key plays the brand key press once, 600 ms after load (the pressed frame for 300 ms with reduced motion), then Ctrl + Zen keycaps, "Keep it kanso.", the H1, both CTAs and slot A1 (a phone frame below 640 px).
3. **A day with kanso**: 8:00 AM Daily brief (A2), 9:00 AM suggested times (A3), 11:15 AM Focus timer and Free time (A4), 2:00 PM notes (A5), 6:00 PM mood check-in (A6), Sunday Reports (A7).
4. **Who it's for**: three student scenarios.
5. **Instead of four apps**: a real `<table>` (the Usually column hides on a phone).
6. **And everything else a semester needs**: eight feature cards.
7. **Trust**: rules not a chatbot, your notebook stays yours, built in the open, and a link to `/privacy`.
8. **FAQ**: native `<details>`, from the same array as the FAQPage JSON-LD.
9. **Final CTA** and the **footer** (with a second theme toggle for phones).

There are no testimonials, user counts, pricing tiers or roadmap claims: kanso is free, and the page only says what the app does today. When the app changes, check `src/content/site.ts`, `public/llms.txt` and the FAQ against it.

## Project layout

```
src/
  app/
    layout.tsx            metadata, skip link, theme script, analytics listener
    fonts.ts, fonts/      Fraunces and M PLUS Rounded 1c, Latin subsets, self-hosted (OFL)
    page.tsx              the home page: sections in order + JSON-LD
    globals.css           brand tokens (light + dark), Tailwind theme, .btn/.card/.chip/.keycap/.frame/.coil, the key press
    favicon.ico, icon.svg, apple-icon.png, manifest.webmanifest   icons from brand/icons
    opengraph-image.png, twitter-image.png                         1200×630 social card (brand/icons/og-image.png)
    robots.ts, sitemap.ts
    privacy/page.tsx      the privacy policy (PRIVACY_POLICY)
  components/
    sections/             one file per page section
    Media.tsx             one media slot in a browser frame: a still or a clip, light and dark
    ThemedVideo.tsx       a clip that plays only while on screen, and never with reduced motion
    MediaLightbox.tsx     click-to-enlarge for stills
    KeyMark.tsx           the k key, inline, with the key press
    Cta.tsx               DemoButton (primary, ink) and SignupButton (secondary)
    Logo.tsx              the horizontal lockup, inline, themed for light and dark
    Analytics.tsx         delegated click, FAQ-open and scroll-depth events
  content/site.ts         ALL copy: the day, scenarios, comparison, features, trust, FAQ, media slots, privacy policy
  lib/
    config.ts             URLs from the environment
    jsonld.ts             SoftwareApplication, FAQPage and WebSite schema
scripts/record/           scripted stills and clips of the real app with demo data (see its README)
brand/                    the brand kit: DESIGN.md, tokens, logo, icons, snippets
public/
  icon-*.png              manifest icons
  llms.txt                plain-language summary for AI crawlers
  media/                  the A1–A7 stills, light and dark (aN-light.webp, aN-dark.webp, a1-phone-*.webp)
```

## Media: stills now, clips later

Each slot (A1–A7) is one `MediaSpec` in `src/content/site.ts`. It launches as a still, in light and dark, and `Media` shows the one for the current theme (the OS setting or the toggle). Both copies are lazy, so the hidden one never downloads.

Every still is a real screenshot of kanso-frontend, made by `scripts/record/` with the fictional student Maya. Never use a real account or anyone's personal data.

To swap a still for a clip (the layout doesn't change):

1. Record and encode it with `scripts/record/` (`rec.mjs clip`, then `encode.mjs`): VP9 WebM plus an H.264 MP4, 1600×1000, 30 fps, ≤ 15 s, muted.
2. Save the files in `public/media/` (for example `a1-light.webm`, `a1-light.mp4`, and the same for dark).
3. On the slot, set `kind: "video"`, point `src` at the WebMs and `mp4` at the MP4s, and set `poster` to the slot's stills.

Clips loop muted and inline, play only while on screen, and show the poster with reduced motion. Only the hero preloads its metadata.

Budgets: stills ≤ 120 KB (the hero ≤ 150 KB); clips ≤ 1 MB for the hero WebM and ≤ 700 KB for the others, MP4 ≤ 1.5× that; all media ≤ 1.5 MB per theme with stills, ≤ 6 MB with every clip.

## SEO, GEO and AEO: what's built in

- **Metadata:** title, description, canonical, Open Graph and X cards, theme colors for light and dark, and the brand social image.
- **Structured data:** SoftwareApplication (with the feature list and a free offer), FAQPage (built from the same `FAQ` array the page renders, so they can't drift apart) and WebSite/Organization with the GitHub repos as `sameAs`.
- **Answer-first copy:**
  - One quotable definition (`SITE.definition`), also at the top of `public/llms.txt`. Reuse that sentence verbatim in READMEs and listings.
  - A real comparison `<table>` ("Instead of four apps").
  - FAQ questions written the way people ask them, in native `<details>` so every answer is in the HTML.
- **Crawlers:** `robots.txt` allows search engines and the AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and others). `sitemap.xml` and `/llms.txt` are served.
- **Speed and accessibility:**
  - The page is fully static and server-rendered.
  - Fonts are self-hosted Latin subsets (about 200 KB in all), and only the hero's media is near the first screen.
  - There's a skip link, one H1 with H2/H3 in order, focus styles (accent edge plus a 3px accent-subtle ring), WCAG AA colors in both themes, and reduced-motion handling for the key press and clips.

## Funnel and analytics

The demo is the primary (ink) action everywhere, and signup is always the secondary (outlined) button.

`Analytics.tsx` reports:

- `cta_demo_click` and `cta_signup_click`, with the location (`nav`, `hero`, `final`)
- `nav_signin_click`
- `faq_open`, with the question
- `scroll_25` / `50` / `75` / `100`

To connect a tool, assign `window.kansoTrack = (event, props) => …` (Plausible, PostHog, GA4…). In development, events are logged to the console.

Track visitors → `cta_demo_click` → demo started → signup from the demo. The last two events belong in kanso-frontend.

## Before launch

- **Privacy policy** (`app/privacy/page.tsx`, `PRIVACY_POLICY`): it predates mood check-ins, events and Google Calendar, so check it against the app, then remove the `noindex` and add it to the sitemap.
- **Domain.** Set `NEXT_PUBLIC_SITE_URL` to the real domain and update the links in `public/llms.txt`.

## Deploying

Import the repo in Vercel, set the three environment variables and deploy. No other configuration is needed.
