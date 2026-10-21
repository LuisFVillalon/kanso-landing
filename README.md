# kanso-landing

![kanso](brand/logo/kanso-lockup-horizontal.svg)

The marketing site for **kanso**: tasks, notes and habits on one calm page. Keep it kanso.

It's built to rank in search, get quoted by AI answer engines, and move visitors from the hero to the demo to an account.

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

The build downloads Fraunces, M PLUS Rounded 1c and Geist Mono from Google Fonts through `next/font`, so it needs internet access (Vercel has it).

### Environment

| Variable | What it's for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | This site's canonical URL. Used in metadata, `sitemap.xml`, `robots.txt` and the JSON-LD. |
| `NEXT_PUBLIC_APP_URL` | The kanso app. Sign-in and sign-up links go to `/login` and `/signup` there. |
| `NEXT_PUBLIC_DEMO_URL` | Where every "Try the demo" button goes. Defaults to the app's home page, which has the demo button. If you add a route in kanso-frontend that starts the demo straight away (for example `/demo`), point this at it to cut one click from the funnel. |

## Project layout

```
src/
  app/
    layout.tsx            metadata, skip link, analytics listener
    fonts.ts              Fraunces, M PLUS Rounded 1c and Geist Mono via next/font
    page.tsx              the home page: sections in funnel order + JSON-LD
    globals.css           brand tokens (light + dark), Tailwind theme and type scale, .btn/.card/.chip/.highlight/.coil
    favicon.ico, icon.svg, apple-icon.png, manifest.webmanifest   icons from brand/icons
    opengraph-image.png, twitter-image.png                         1200×630 social card (brand/icons/og-image.png)
    robots.ts, sitemap.ts
    privacy/page.tsx      placeholder policy page (noindex until written)
  components/
    sections/             one file per page section
    Media.tsx             real video/image once `src` is set, labelled placeholder until then
    Cta.tsx               DemoButton (primary) and SignupButton (secondary)
    Logo.tsx              the horizontal lockup, inline, themed for light and dark
    Analytics.tsx         delegated click, FAQ-open and scroll-depth events
  content/site.ts         ALL copy: features, FAQ, steps, pricing, media briefs
  lib/
    config.ts             URLs from the environment
    jsonld.ts             SoftwareApplication, FAQPage, HowTo and WebSite schema
brand/                    the brand kit: DESIGN.md, tokens, logo, icons, snippets
public/
  icon-*.png              manifest icons
  llms.txt                plain-language summary for AI crawlers
  media/                  put recorded videos and screenshots here
```

## Before launch: the [CONFIRM] list

Search the repo for `[CONFIRM` and `[PRICE]`. Each one is a fact the page can't invent:

- **Pricing** (`PRICING` and the "Is kanso free?" answer in `content/site.ts`). Once it's settled, also add `offers` to the SoftwareApplication schema in `lib/jsonld.ts`.
- **Mobile support** (the last FAQ answer).
- **Testimonials** (`TESTIMONIALS`). Use only real quotes, with permission. The section is hidden in production while the list is empty and shows placeholders in development.
- **Privacy policy** (`app/privacy/page.tsx`). Remove the `noindex` once it's written.
- **Domain.** Set `NEXT_PUBLIC_SITE_URL` to the real domain and update the links in `public/llms.txt`.

FAQ answers still marked `[CONFIRM` are left out of the FAQPage schema automatically.

## Adding the product media

Every media spot is described in `content/site.ts` (`HERO_MEDIA`, each feature's `media`, `CUSTOMIZATIONS`). Each entry has the file name, size, alt text and a brief of what to record. To swap a placeholder for the real thing:

1. Save the file in `public/media/` under the listed name.
2. Set `src: "/media/<file>"` on that entry. For the hero video, also set `poster` to a small `.webp` frame.

Record loops as muted **WebM or MP4**, not GIF: they're usually 5–10× smaller. `Media` plays them muted, looping and inline, and only preloads the hero. Keep the hero video under about 3 MB and its poster under 150 KB.

## SEO, GEO and AEO: what's built in

- **Metadata:** title, description, canonical, Open Graph and X cards, theme colors for light and dark, and the brand social image.
- **Structured data:** SoftwareApplication, FAQPage (built from the same `FAQ` array the page renders, so they can't drift apart), HowTo and WebSite/Organization with the GitHub repos as `sameAs`.
- **Answer-first copy:**
  - A "What is kanso?" H2 followed by one quotable definition (`SITE.definition`). Reuse that sentence verbatim in READMEs and listings.
  - A real comparison `<table>`.
  - An ordered "how it works" list.
  - FAQ questions written the way people ask them, in native `<details>` so every answer is in the HTML.
- **Crawlers:** `robots.txt` allows search engines and the AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and others). `sitemap.xml` and `/llms.txt` are served.
- **Speed and accessibility:**
  - The page is fully static and server-rendered.
  - Fonts are self-hosted by `next/font`, and media below the fold isn't preloaded.
  - There's a skip link, one H1 with H2/H3 in order, focus styles (accent edge plus a 3px accent-subtle ring) and WCAG AA colors in both themes.

## Funnel and analytics

Sections run awareness → interest → desire → confidence → action: hero, proof strip, what is kanso, features, customization, how it works, quotes, privacy, pricing, FAQ, final CTA. The demo is the primary (filled) action everywhere, and signup is always the secondary (tinted) button.

`Analytics.tsx` reports:

- `cta_demo_click` and `cta_signup_click`, with the location (`nav`, `hero`, `pricing`, `final`)
- `faq_open`, with the question
- `scroll_25` / `50` / `75` / `100`

To connect a tool, assign `window.kansoTrack = (event, props) => …` (Plausible, PostHog, GA4…). In development, events are logged to the console.

Track visitors → `cta_demo_click` → demo started → signup from the demo. The last two events belong in kanso-frontend.

## Deploying

Import the repo in Vercel, set the three environment variables and deploy. No other configuration is needed.
