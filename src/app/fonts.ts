// The brand families (brand/DESIGN.md → Typography), self-hosted from ./fonts with next/font/local.
// layout.tsx applies both variables on <html>; globals.css maps them to font-display and font-sans.
//
// Both are Google Fonts' own Latin subsets (SIL Open Font License, ./fonts/OFL-*.txt), trimmed to what
// the page uses, because next/font/google can't pin an axis or drop subsets:
// - Fraunces with SOFT pinned at 100, weights 400–500 and the full optical-size axis (WONK stays at
//   its default, 0): 62 KB + 79 KB italic, against 121 KB + 150 KB with every axis. The hero H1 is
//   the page's largest paint, so this file decides it.
//   Source: fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,400..500,100;1,9..144,400..500,100
// - M PLUS Rounded 1c at 400, 500 and 700. From next/font/google it is a Japanese family of ~120
//   unicode-range chunks per weight: ~380 @font-face rules in the render-blocking CSS and ~3.4 MB of
//   preloaded fonts. Characters outside the Latin subset fall back to system-ui.
import localFont from "next/font/local";

/** Display: wordmark, display text, H1 and H2. */
export const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-soft-latin-normal.woff2", weight: "400 500", style: "normal" },
    { path: "./fonts/fraunces-soft-latin-italic.woff2", weight: "400 500", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

/** Body, UI, labels and H3. */
export const mplusRounded = localFont({
  src: [
    { path: "./fonts/mplus-rounded-1c-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/mplus-rounded-1c-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/mplus-rounded-1c-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mplus-rounded",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
