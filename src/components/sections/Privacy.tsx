import { Check } from "lucide-react";
import { PRIVACY_POINTS } from "@/content/site";

/** Removes the privacy objection right before pricing. */
export function Privacy() {
  return (
    <section aria-labelledby="privacy-heading" className="mx-auto max-w-[1280px] px-4 pt-24 sm:px-6 lg:px-10 lg:pt-28">
      <div className="grid items-center gap-10 rounded-lg border border-hairline bg-midnight-ink p-8 text-white sm:p-14 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 id="privacy-heading" className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl sm:leading-[44px]">
            Your notebook stays yours
          </h2>
          <p className="mt-4 text-[17px] leading-7 text-[#d9dcef]">kanso is built so nobody else can read your data, and the code is public so you can check.</p>
        </div>
        <ul className="grid gap-4 text-base leading-6">
          {PRIVACY_POINTS.map((p) => (
            <li key={p} className="flex gap-2.5">
              <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sky-wash" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
