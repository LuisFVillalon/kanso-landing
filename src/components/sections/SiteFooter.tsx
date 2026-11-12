import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SITE } from "@/content/site";
import { LINKS } from "@/lib/config";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: LINKS.demo, label: "Try the demo" },
      { href: "#day", label: "A day with kanso" },
      { href: "#features", label: "Features" },
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
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 px-4 pt-12 pb-10 text-sm leading-[22px] sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 flex flex-col items-start gap-2 lg:col-span-1">
          <Logo className="h-8 w-auto" />
          <span className="font-display text-xl text-ink italic">{SITE.tagline}</span>
          <span className="text-muted">© {new Date().getFullYear()} kanso</span>
          <ThemeToggle />
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-2">
            <span className="font-bold text-ink">{col.title}</span>
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
