// The brand families (brand/snippets/fonts.ts), self-hosted by next/font at build time.
// layout.tsx applies every variable on <html>; globals.css maps them to font-display, font-sans and font-mono.
import { Fraunces, Geist_Mono, M_PLUS_Rounded_1c } from "next/font/google";

/** Display: wordmark, display text, H1 and H2. */
export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"], // weight stays variable when axes are set
  variable: "--font-fraunces",
  display: "swap",
});

/** Body, UI, labels and H3. */
export const mplusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mplus-rounded",
  display: "swap",
});

/** Code-like strings only. */
export const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
