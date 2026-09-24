import { COMPARISON, SITE } from "@/content/site";

/** Answer-first block (GEO/AEO): a quotable definition under a question heading, plus a real comparison table. */
export function WhatIsKanso() {
  return (
    <section aria-labelledby="what-is-kanso" className="mx-auto grid max-w-[1280px] items-center gap-12 px-4 pt-24 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pt-28">
      <div>
        <h2 id="what-is-kanso" className="text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-[40px] sm:leading-[48px]">
          What is kanso?
        </h2>
        <p className="mt-5 text-lg leading-[30px] text-ink">{SITE.definition}</p>
        <p className="mt-4 text-base leading-[26px] text-secondary">
          Most people juggle a to-do app, a notes app and a habit tracker that never talk to each other. kanso keeps them on one calm page, so your
          plan, your notes and your streaks live side by side.
        </p>
      </div>
      <div className="card overflow-x-auto p-2">
        <table className="w-full border-collapse text-left text-sm leading-5">
          <caption className="sr-only">kanso compared with using separate apps</caption>
          <thead>
            <tr className="border-b border-hairline">
              <th scope="col" className="p-4 font-semibold text-muted">You need</th>
              <th scope="col" className="p-4 font-semibold text-muted">Usually</th>
              <th scope="col" className="rounded-t-lg bg-accent-subtle p-4 font-semibold text-accent">With kanso</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row, i) => {
              const last = i === COMPARISON.length - 1;
              return (
                <tr key={row.need} className={last ? "" : "border-b border-hairline-subtle"}>
                  <th scope="row" className="p-4 font-normal text-ink">{row.need}</th>
                  <td className="p-4 text-secondary">{row.usually}</td>
                  <td className={`bg-accent-subtle p-4 text-ink ${last ? "rounded-b-lg font-semibold" : ""}`}>{row.kanso}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
