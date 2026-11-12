import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/Analytics";
import { SITE } from "@/content/site";
import { SITE_URL } from "@/lib/config";
import { THEME_COLORS, THEME_SCRIPT } from "@/lib/theme";
import { fraunces, mplusRounded } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE.title, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "student planner",
    "planner app for college students",
    "study planner that finds free time",
    "to-do list with calendar and notes",
    "habit and mood tracker for students",
    "Canvas and Google Calendar planner",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_US",
  },
  // The card image comes from app/opengraph-image.png and app/twitter-image.png (brand/icons/og-image.png).
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: THEME_SCRIPT may set data-theme on <html> before React hydrates.
    <html lang="en" className={`${fraunces.variable} ${mplusRounded.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <a href="#main" className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50">
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
