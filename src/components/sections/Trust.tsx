import { ArrowRight } from "lucide-react";
import { TRUST } from "@/content/site";
import { LINKS } from "@/lib/config";

/** Only true facts: how suggestions are made, where the data goes, and that the code is public. */
export function Trust() {
  return (
    <section id="trust" aria-labelledby="trust-heading" className="mx-auto max-w-[1200px] px-4 pt-20 sm:px-6 lg:pt-24">
      <div className="rounded-2xl bg-ink px-6 py-8 text-bg sm:p-12 dark:border dark:border-hairline dark:bg-surface dark:text-ink">
        <h2 id="trust-heading" className="sr-only">
          Privacy and trust
        </h2>
        <div className="grid gap-6 md:grid-cols-3 md:gap-9">
          {TRUST.map((t) => (
            <div key={t.title}>
              <h3 className="font-display text-2xl leading-[30px] font-medium">{t.title}</h3>
              <p className="mt-2.5 text-[15px] leading-6 opacity-85">{t.body}</p>
            </div>
          ))}
        </div>
        <a href={LINKS.privacy} className="mt-8 inline-flex items-center gap-1.5 rounded-md text-[15px] font-bold underline underline-offset-4">
          Read the privacy policy
          <ArrowRight aria-hidden className="size-4" />
        </a>
      </div>
    </section>
  );
}
