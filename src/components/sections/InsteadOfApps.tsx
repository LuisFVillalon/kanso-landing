import { COMPARISON } from "@/content/site";

/** A real <table>: easy for answer engines to quote. On a phone the "Usually" column hides. */
export function InsteadOfApps() {
  return (
    <section aria-labelledby="apps-heading" className="mx-auto max-w-[1200px] px-4 pt-16 sm:px-6 lg:pt-20">
      <h2 id="apps-heading" className="font-display text-[30px] leading-[38px] font-medium text-ink sm:text-4xl sm:leading-11">
        Instead of four apps
      </h2>
      <div className="card mt-6 overflow-hidden">
        <table className="w-full border-collapse text-left text-[15px] leading-6">
          <thead>
            <tr className="border-b border-hairline">
              <th scope="col" className="px-4 py-3.5 text-xs leading-4 font-bold tracking-widest text-muted uppercase sm:px-5">
                You need
              </th>
              <th scope="col" className="hidden px-4 py-3.5 text-xs leading-4 font-bold tracking-widest text-muted uppercase sm:table-cell sm:px-5">
                Usually
              </th>
              <th scope="col" className="px-4 py-3.5 text-xs leading-4 font-bold tracking-widest text-muted uppercase sm:px-5">
                In kanso
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.need} className="border-b border-hairline last:border-b-0">
                <th scope="row" className="px-4 py-3.5 font-normal text-secondary sm:px-5">
                  {row.need}
                </th>
                <td className="hidden px-4 py-3.5 text-secondary sm:table-cell sm:px-5">{row.usually}</td>
                <td className="px-4 py-3.5 font-bold text-ink sm:px-5">{row.kanso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
