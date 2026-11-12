import { ArrowRight } from "lucide-react";
import { LINKS } from "@/lib/config";

type Props = { location: string; size?: "md" | "lg"; label?: string; showArrow?: boolean };

/** The funnel's main action. `data-event` / `data-location` feed analytics (see Analytics.tsx). */
export function DemoButton({ location, size = "lg", label = "Try the demo, no signup", showArrow = true }: Props) {
  return (
    <a href={LINKS.demo} className={`btn btn-primary ${size === "lg" ? "btn-lg" : ""}`} data-event="cta_demo_click" data-location={location}>
      {label}
      {showArrow && <ArrowRight aria-hidden className="h-[18px] w-[18px]" />}
    </a>
  );
}

export function SignupButton({ location, size = "lg", label = "Create a free account" }: Props) {
  return (
    <a href={LINKS.signup} className={`btn btn-secondary ${size === "lg" ? "btn-lg" : ""}`} data-event="cta_signup_click" data-location={location}>
      {label}
    </a>
  );
}
