import { SectionHeading } from "@/components/SectionHeading";
import { STEPS } from "@/content/site";

/** Lowers perceived effort. An ordered list, mirrored by the HowTo JSON-LD. */
export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="mx-auto max-w-[1280px] px-4 pt-24 sm:px-6 lg:px-10 lg:pt-28">
      <SectionHeading id="how-heading" title="Get started in under a minute" />
      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="card flex flex-col gap-3 p-7">
            <span
              aria-hidden
              className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${i === 0 ? "bg-accent text-accent-text" : "bg-accent-subtle text-accent"}`}
            >
              {i + 1}
            </span>
            <h3 className="text-xl leading-7 font-semibold text-ink">
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p className="text-[15px] leading-6 text-secondary">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
