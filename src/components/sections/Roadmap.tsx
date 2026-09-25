import { FolderKanban, GraduationCap, Smile, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ROADMAP } from "@/content/site";

const ICONS: LucideIcon[] = [GraduationCap, FolderKanban, Smile];

/** Shows momentum without overpromising. Everything here is labelled as not yet available. */
export function Roadmap() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-heading" className="mx-auto max-w-[1280px] px-4 pt-24 sm:px-6 lg:px-10 lg:pt-28">
      <SectionHeading id="roadmap-heading" title="What’s coming next" subtitle="These are planned and not in the app yet." />
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {ROADMAP.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li key={item.title} className="card flex flex-col gap-3 p-7">
              <div className="flex items-center justify-between">
                <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-subtle text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-hairline px-2.5 py-0.5 text-xs font-medium text-secondary">Planned</span>
              </div>
              <h3 className="text-xl leading-7 font-semibold text-ink">{item.title}</h3>
              <p className="text-[15px] leading-6 text-secondary">{item.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
