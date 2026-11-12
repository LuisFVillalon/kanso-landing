import { Media } from "@/components/Media";
import { SectionHeading } from "@/components/SectionHeading";
import { DAY } from "@/content/site";

/** One student's day, 8 AM to Sunday: each moment brings in the feature that helps. Rows alternate on desktop. */
export function DayTimeline() {
  return (
    <section id="day" aria-labelledby="day-heading" className="mx-auto max-w-[1200px] px-4 pt-20 pb-10 sm:px-6 lg:pt-24">
      <SectionHeading
        id="day-heading"
        eyebrow="A day with kanso"
        title={
          <>
            One calm page from your first class to <span className="italic">Call it a day</span>.
          </>
        }
      />
      <ol className="mt-12 lg:mt-14">
        {DAY.map((step, i) => (
          <li
            key={step.id}
            className={`grid gap-4 border-t border-hairline py-8 lg:items-center lg:gap-8 lg:py-10 ${
              i % 2 ? "lg:grid-cols-[120px_minmax(0,1.25fr)_minmax(0,1fr)]" : "lg:grid-cols-[120px_minmax(0,1fr)_minmax(0,1.25fr)]"
            }`}
          >
            <p className="flex items-baseline gap-2.5 font-display text-[22px] leading-tight font-medium text-ink lg:block">
              {step.time}
              <small className="block font-sans text-[11px] leading-snug font-bold tracking-[0.12em] text-muted uppercase lg:mt-1.5">
                {step.label}
              </small>
            </p>
            <div className={i % 2 ? "lg:order-3" : ""}>
              <h3 className="font-display text-[26px] leading-[34px] font-medium text-ink sm:text-[28px] sm:leading-9">{step.title}</h3>
              <p className="mt-2.5 text-base leading-[26px] text-secondary">{step.body}</p>
              <ul className="mt-3.5 grid gap-1.5 text-[15px] leading-6 text-secondary">
                {step.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden className="text-pencil">
                      —
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className={i % 2 ? "lg:order-2" : ""}>
              <Media media={step.media} label={`kanso · ${step.label.toLowerCase()}`} sizes="(min-width: 1200px) 580px, (min-width: 1024px) 48vw, calc(100vw - 32px)" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
