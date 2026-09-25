import type { Metadata } from "next";
import Link from "next/link";
import { PRIVACY_POLICY } from "@/content/site";
import { LINKS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What kanso stores, which services help run it, and how to delete your data.",
  robots: { index: false }, // [CONFIRM] index (and add to sitemap.ts) once the [CONFIRM] markers in PRIVACY_POLICY are filled.
};

export default function PrivacyPage() {
  const { updated, intro, sections } = PRIVACY_POLICY;

  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
      <Link href="/" className="text-sm text-accent">
        ← Back to kanso
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Privacy</h1>
      <p className="mt-2 text-sm text-muted">Last updated {updated}</p>
      <p className="mt-6 text-[17px] leading-7 text-secondary">{intro}</p>

      <nav aria-label="On this page" className="mt-8 border-y border-hairline py-5">
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-secondary no-underline hover:text-ink">
                {s.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((s) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="mt-12 scroll-mt-8">
          <h2 id={`${s.id}-heading`} className="text-xl leading-7 font-semibold text-ink">
            {s.heading}
          </h2>
          {s.items && (
            <ul className="mt-4 grid list-disc gap-2.5 pl-5 text-base leading-[26px] text-secondary marker:text-muted">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {s.body?.map((p) => (
            <p key={p} className="mt-4 text-base leading-[26px] text-secondary">
              {p}
            </p>
          ))}
        </section>
      ))}

      <p className="mt-12 border-t border-hairline pt-6 text-sm text-secondary">
        Read the code:{" "}
        <a href={LINKS.github.frontend}>kanso-frontend</a>, <a href={LINKS.github.backend}>kanso-backend</a>,{" "}
        <a href={LINKS.github.ai}>kanso-ai</a>.
      </p>
    </main>
  );
}
