import { SectionHeading } from "@/components/SectionHeading";
import { TESTIMONIALS } from "@/content/site";

/**
 * Real quotes only. While TESTIMONIALS is empty, production renders nothing and
 * development shows three placeholders so the layout stays visible.
 */
export function Testimonials() {
  const isDev = process.env.NODE_ENV === "development";
  if (TESTIMONIALS.length === 0 && !isDev) return null;

  return (
    <section aria-labelledby="quotes-heading" className="mx-auto max-w-[1280px] px-4 pt-24 sm:px-6 lg:px-10 lg:pt-28">
      <SectionHeading id="quotes-heading" title="What people say" />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.length > 0
          ? TESTIMONIALS.map((t) => (
              <figure key={t.name} className="card m-0 flex flex-col justify-between gap-6 p-7">
                <blockquote className="text-base leading-[26px] text-ink">“{t.quote}”</blockquote>
                <figcaption className="text-sm text-secondary">
                  <span className="font-semibold text-ink">{t.name}</span>, {t.role}
                </figcaption>
              </figure>
            ))
          : [1, 2, 3].map((n) => (
              <figure key={n} className="m-0 flex h-56 flex-col justify-between rounded-lg border-2 border-dashed border-wire bg-surface-raised p-6 text-secondary">
                <span className="self-start rounded-full border border-hairline bg-surface px-3 py-1 font-mono text-xs text-ink">QUOTE · real user #{n}</span>
                <span className="text-[13px] leading-5">[Real testimonial naming a specific outcome.] — [Name], [role]</span>
              </figure>
            ))}
      </div>
    </section>
  );
}
