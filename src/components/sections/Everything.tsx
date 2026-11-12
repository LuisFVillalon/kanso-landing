import { SectionHeading } from "@/components/SectionHeading";
import { MORE_FEATURES } from "@/content/site";

export function Everything() {
  return (
    <section id="features" aria-labelledby="features-heading" className="mx-auto max-w-[1200px] px-4 pt-20 sm:px-6 lg:pt-24">
      <SectionHeading id="features-heading" title="And everything else a semester needs" />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-3.5 lg:grid-cols-4">
        {MORE_FEATURES.map((f) => (
          <li key={f.title} className="card p-4 sm:p-5">
            <h3 className="text-base leading-[22px] font-bold text-ink">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-[22px] text-secondary">{f.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
