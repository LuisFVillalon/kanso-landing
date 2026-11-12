import { DemoButton, SignupButton } from "@/components/Cta";
import { KeyMark } from "@/components/KeyMark";
import { Media } from "@/components/Media";
import { HERO_MEDIA, SITE } from "@/content/site";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="mx-auto max-w-[1200px] px-4 pt-11 pb-10 text-center sm:px-6 sm:pt-16">
      <KeyMark className="mx-auto size-[88px] sm:size-28" />
      <p className="mt-4 inline-flex items-center gap-2.5 text-[15px] font-medium text-muted">
        <kbd className="keycap">Ctrl</kbd>
        <span>+</span>
        <kbd className="keycap">Zen</kbd>
      </p>
      <p className="mt-5 font-display text-2xl text-ink italic">{SITE.tagline}</p>
      <h1 id="hero-heading" className="mx-auto mt-3 max-w-[900px] font-display text-[40px] leading-[46px] font-medium tracking-[-0.01em] text-ink sm:text-[56px] sm:leading-[62px] lg:text-[64px] lg:leading-[70px]">
        Your whole pile of to-dos, down to <span className="highlight">one clear</span> next step.
      </h1>
      <p className="mx-auto mt-5 max-w-[640px] text-base leading-[26px] text-secondary sm:text-lg sm:leading-[30px]">
        kanso is a calm, notebook-like planner for students. It finds free time for your work between classes and shifts, keeps your
        notes and habits, and tells you what to do next.
      </p>
      <div className="mt-8 flex flex-col items-stretch justify-center gap-2.5 min-[540px]:flex-row min-[540px]:items-center">
        <DemoButton location="hero" />
        <SignupButton location="hero" />
      </div>
      <p className="mt-3 text-[13px] leading-5 font-medium text-muted">Opens a private sandbox with sample data. Deleted after a day.</p>
      <div className="mx-auto mt-12 max-w-[1080px] text-left">
        <Media media={HERO_MEDIA} hero label="kanso · plan a task" sizes="(min-width: 1128px) 1080px, calc(100vw - 48px)" />
      </div>
    </section>
  );
}
