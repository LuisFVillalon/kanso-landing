import { DemoButton, SignupButton } from "@/components/Cta";

/** Last conversion chance, bound by the notebook coil. */
export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-10 lg:py-28">
      <div className="card relative flex flex-col items-center overflow-hidden px-6 pt-16 pb-14 text-center sm:px-16 sm:pt-20 sm:pb-18">
        <div aria-hidden className="coil absolute inset-x-0 top-0" />
        <h2 id="final-cta-heading" className="text-4xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-5xl sm:leading-[56px]">
          See it with <span className="highlight">real</span> data
        </h2>
        <p className="mt-4 max-w-[560px] text-lg leading-7 text-secondary">One click opens a sandbox with tasks, notes and habit streaks already filled in.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <DemoButton location="final" showArrow={false} />
          <SignupButton location="final" />
        </div>
      </div>
    </section>
  );
}
