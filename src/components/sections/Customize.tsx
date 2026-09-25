import { Media } from "@/components/Media";
import { SectionHeading } from "@/components/SectionHeading";
import { CUSTOMIZATIONS } from "@/content/site";

export function Customize() {
  return (
    <section aria-labelledby="customize-heading" className="mx-auto max-w-[1280px] px-4 pt-24 sm:px-6 lg:px-10 lg:pt-28">
      <SectionHeading id="customize-heading" title="Make it feel like your notebook" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CUSTOMIZATIONS.map((c) => (
          <div key={c.title} className="card flex flex-col gap-2.5 p-6">
            <Media media={c.media} compact sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" />
            <h3 className="mt-1.5 text-[17px] leading-6 font-semibold text-ink">{c.title}</h3>
            <p className="text-sm leading-[22px] text-secondary">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
