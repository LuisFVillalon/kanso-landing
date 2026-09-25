import { SITE } from "@/content/site";
import { LINKS } from "@/lib/config";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: LINKS.demo, label: "Demo" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Open source",
    links: [
      { href: LINKS.github.frontend, label: "kanso-frontend" },
      { href: LINKS.github.backend, label: "kanso-backend" },
      { href: LINKS.github.ai, label: "kanso-ai" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: LINKS.login, label: "Sign in" },
      { href: LINKS.signup, label: "Create account" },
      { href: LINKS.privacy, label: "Privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-14 text-sm leading-[22px] sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-10">
        <div className="flex flex-col gap-2.5">
          <span className="text-lg font-bold tracking-tight text-ink">{SITE.name}</span>
          <span className="text-secondary">{SITE.tagline}</span>
          <span className="text-muted">© {new Date().getFullYear()} kanso</span>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-2">
            <span className="font-semibold text-ink">{col.title}</span>
            {col.links.map((l) => (
              <a key={l.label} href={l.href} className="text-secondary no-underline hover:text-ink">
                {l.label}
              </a>
            ))}
          </nav>
        ))}
      </div>
    </footer>
  );
}
