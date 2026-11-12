import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LINKS } from "@/lib/config";

export const NAV = [
  { href: "#day", label: "A day with kanso" },
  { href: "#who", label: "Who it's for" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
];

/** Sticky header. Below 760px only the logo and Try the demo stay. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-[color-mix(in_srgb,var(--tm-bg)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" aria-label="kanso, back to top" className="rounded-md no-underline">
          <Logo className="h-8 w-auto" />
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-medium min-[760px]:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-secondary no-underline hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden min-[760px]:block">
            <ThemeToggle />
          </div>
          <a href={LINKS.login} className="btn btn-secondary hidden min-[760px]:inline-flex" data-event="nav_signin_click">
            Sign in
          </a>
          <a href={LINKS.demo} className="btn btn-primary" data-event="cta_demo_click" data-location="nav">
            Try the demo
          </a>
        </div>
      </div>
    </header>
  );
}
