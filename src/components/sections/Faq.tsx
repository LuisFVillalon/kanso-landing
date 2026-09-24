import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { FAQ } from "@/content/site";

/**
 * AEO: headings are the exact questions people ask; answers open with the direct answer.
 * Native <details> keeps every answer in the HTML even when collapsed.
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="mx-auto max-w-[880px] px-4 pt-24 sm:px-6 lg:pt-28">
      <SectionHeading id="faq-heading" title="Frequently asked questions" />
      <div className="card mt-10 px-6 py-2 sm:px-8">
        {FAQ.map((item, i) => (
          <details key={item.q} data-faq={item.q} open={i === 0} className="group border-b border-hairline py-5 last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md text-lg leading-[26px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <h3 className="text-lg leading-[26px] font-semibold">{item.q}</h3>
              <ChevronDown aria-hidden className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-2.5 text-base leading-[26px] text-secondary">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
