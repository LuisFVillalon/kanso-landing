import { ChevronDown } from "lucide-react";
import { FAQ } from "@/content/site";

/**
 * AEO: headings are the exact questions people ask; answers open with the direct answer.
 * Native <details> keeps every answer in the HTML even when collapsed, and the FAQPage
 * JSON-LD (lib/jsonld.ts) is built from the same FAQ array.
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="mx-auto grid max-w-[1200px] gap-5 px-4 pt-20 sm:px-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-10 lg:pt-24">
      <div>
        <h2 id="faq-heading" className="font-display text-[30px] leading-[38px] font-medium text-ink sm:text-4xl sm:leading-11">
          Questions
        </h2>
        <p className="mt-2.5 text-base leading-[26px] text-muted">Straight answers, no fine print.</p>
      </div>
      <div className="grid gap-2.5">
        {FAQ.map((item, i) => (
          <details key={item.q} data-faq={item.q} open={i === 0} className="group card px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md [&::-webkit-details-marker]:hidden">
              <h3 className="text-base leading-6 font-bold text-ink">{item.q}</h3>
              <ChevronDown aria-hidden className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none" />
            </summary>
            <p className="mt-2.5 text-[15px] leading-6 text-secondary">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
