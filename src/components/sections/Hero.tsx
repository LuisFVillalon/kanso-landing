import { DemoButton, SignupButton } from "@/components/Cta";
import { Media } from "@/components/Media";
import { HERO_MEDIA, SITE } from "@/content/site";

/** Awareness → interest. The H1 carries the head keyword; one filled CTA. */
export function Hero() {
  return (
    <section id="top" className="mx-auto flex max-w-[1280px] flex-col items-center px-4 pt-14 pb-20 text-center sm:px-6 sm:pt-22 sm:pb-24 lg:px-10">
      <p className="font-display text-h2 text-ink italic sm:text-h1">{SITE.tagline}</p>
      <h1 className="mt-6 max-w-[980px] font-display text-h1 text-ink lg:text-display">
        The simple productivity app for your tasks, notes and habits, in one <span className="highlight">calm</span> place.
      </h1>
      <p className="mt-7 max-w-[680px] text-lg leading-8 text-secondary">
        {SITE.name} plans your day, keeps your notes and tracks your streaks, then tells you what to focus on next.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <DemoButton location="hero" />
        <SignupButton location="hero" />
      </div>
      <p className="mt-3.5 text-small font-normal text-muted">Opens a private sandbox with sample data in one click. Nothing you do there is shared.</p>
      <div className="mt-14 w-full rounded-lg bg-surface sm:mt-16">
        <Media media={HERO_MEDIA} priority />
      </div>
    </section>
  );
}
