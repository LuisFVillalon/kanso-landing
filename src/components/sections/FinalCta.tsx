import { DemoButton, SignupButton } from "@/components/Cta";

const CHIPS = ["Free and open source", "Works in any browser", "Light and dark"];

export function FinalCta() {
  return (
    <section aria-labelledby="final-heading" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:py-24">
      <div className="card overflow-hidden text-center">
        <div aria-hidden className="coil" />
        <div className="px-6 pt-12 pb-11 sm:pt-14 sm:pb-13">
          <h2 id="final-heading" className="font-display text-[32px] leading-10 font-medium text-ink sm:text-[44px] sm:leading-[52px]">
            Free. Calm. Yours.
          </h2>
          <p className="mx-auto mt-3.5 max-w-[520px] text-[17px] leading-7 text-secondary">
            No plans to pick and no card. Open the demo to see a week already planned, then make an account when you want to keep it.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
            {CHIPS.map((c) => (
              <li key={c} className="chip border border-hairline bg-bg text-[13px] text-secondary">
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-2.5 min-[420px]:flex-row min-[420px]:items-center">
            <DemoButton location="final" label="Try the demo" />
            <SignupButton location="final" />
          </div>
        </div>
      </div>
    </section>
  );
}
