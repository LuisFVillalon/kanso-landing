/** Facts only — add a real user count or rating here once you have one. */
const FACTS = ["Next.js 16 + React 19", "FastAPI + Postgres", "Supabase sign-in", "Deployed on Vercel & Fly.io"];

export function ProofStrip() {
  return (
    <section aria-label="How kanso is built" className="border-y border-hairline bg-surface">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-7 text-sm text-secondary sm:px-6 lg:px-10">
        <span className="font-semibold text-ink">Open source, built in the open</span>
        {FACTS.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
    </section>
  );
}
