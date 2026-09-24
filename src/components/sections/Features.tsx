import { Check } from "lucide-react";
import { Media } from "@/components/Media";
import { SectionHeading } from "@/components/SectionHeading";
import { FEATURES, SECONDARY_FEATURES } from "@/content/site";

/** Desire: each H3 is phrased the way people search for it; media alternates sides. */
export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="mx-auto flex max-w-[1280px] flex-col gap-20 px-4 pt-24 sm:px-6 lg:gap-24 lg:px-10 lg:pt-28">
      <SectionHeading id="features-heading" title="Everything on your plate, in one view" subtitle="Six tools that share one calendar, one set of tags and one daily plan." />

      {FEATURES.map((f, i) => (
        <article key={f.id} id={f.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={i % 2 === 1 ? "lg:order-2" : ""}>
            <span className={`chip ${f.chipClass}`}>{f.label}</span>
            <h3 className="mt-4 text-[26px] leading-[34px] font-semibold tracking-[-0.02em] text-ink sm:text-[30px] sm:leading-[38px]">{f.title}</h3>
            <p className="mt-3.5 text-[17px] leading-7 text-secondary">{f.body}</p>
            {f.bullets && (
              <ul className="mt-5 grid gap-2.5 text-[15px] leading-[22px] text-ink">
                {f.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <Check aria-hidden className="mt-0.5 h-[18px] w-[18px] shrink-0 text-success" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Media media={f.media} />
        </article>
      ))}

      <div className="grid gap-6 lg:grid-cols-2">
        {SECONDARY_FEATURES.map((f) => (
          <article key={f.id} id={f.id} className="card flex flex-col gap-3.5 p-6 sm:p-8">
            <span className={`chip self-start ${f.chipClass}`}>{f.label}</span>
            <h3 className="text-2xl leading-8 font-semibold text-ink">{f.title}</h3>
            <p className="text-base leading-[26px] text-secondary">{f.body}</p>
            <Media media={f.media} className="mt-2" />
          </article>
        ))}
      </div>
    </section>
  );
}
