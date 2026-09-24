import { Check } from "lucide-react";
import { SignupButton } from "@/components/Cta";
import { SectionHeading } from "@/components/SectionHeading";
import { PRICING } from "@/content/site";
import { LINKS } from "@/lib/config";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="mx-auto flex max-w-[1280px] flex-col items-center px-4 pt-24 sm:px-6 lg:px-10 lg:pt-28">
      <SectionHeading id="pricing-heading" title="Simple pricing" subtitle={PRICING.headline} />
      <div className="card mt-10 flex w-full max-w-[520px] flex-col gap-5 p-8 shadow-product sm:p-10">
        <p className="flex items-baseline gap-2">
          <span className="text-5xl leading-[56px] font-semibold tracking-[-0.02em] text-ink">{PRICING.price}</span>
          <span className="text-base text-secondary">{PRICING.period}</span>
        </p>
        <ul className="grid gap-2.5 text-[15px] leading-[22px] text-ink">
          {PRICING.includes.map((item) => (
            <li key={item} className="flex gap-2">
              <Check aria-hidden className="mt-0.5 h-[18px] w-[18px] shrink-0 text-success" />
              {item}
            </li>
          ))}
        </ul>
        <SignupButton location="pricing" label="Create your account" />
        <a href={LINKS.demo} className="text-center text-sm font-medium text-accent" data-event="cta_demo_click" data-location="pricing">
          or try the demo first
        </a>
      </div>
    </section>
  );
}
