import { SectionHeading } from "@/components/SectionHeading";
import { SCENARIOS } from "@/content/site";

export function WhoItsFor() {
  return (
    <section id="who" aria-labelledby="who-heading" className="mx-auto max-w-[1200px] px-4 pt-20 sm:px-6 lg:pt-24">
      <SectionHeading id="who-heading" align="left" eyebrow="Who it's for" title="For demanding majors who procrastinate from overwhelm, not laziness." />
      <div className="mt-9 grid gap-4 md:grid-cols-3">
        {SCENARIOS.map((s) => (
          <figure key={s.q} className="card p-6 sm:p-7">
            <blockquote className="font-display text-[21px] leading-[30px] text-ink italic">{s.q}</blockquote>
            <figcaption className="mt-3.5 text-[15px] leading-6 text-secondary">{s.a}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
