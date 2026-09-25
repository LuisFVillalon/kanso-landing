import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LINKS } from "@/lib/config";

const NAV = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

/** Sticky header: sign-in and the signup CTA never leave the screen. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface-overlay shadow-nav backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <a href="#top" aria-label="kanso, back to top" className="no-underline">
          <Logo />
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-medium md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-secondary no-underline hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={LINKS.login} className="btn btn-outline hidden border-transparent sm:inline-flex" data-event="nav_signin_click">
            Sign in
          </a>
          <a href={LINKS.signup} className="btn btn-primary" data-event="cta_signup_click" data-location="nav">
            Try the demo
          </a>
        </div>
      </div>
    </header>
  );
}
