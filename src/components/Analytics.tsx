"use client";

import { useEffect } from "react";

type Tracker = (event: string, props: Record<string, string>) => void;

declare global {
  interface Window {
    /** Plausible, PostHog, GA4 or your own — assign it in a script and events flow. */
    kansoTrack?: Tracker;
  }
}

/**
 * One delegated click listener: any element with `data-event` reports that event,
 * plus its `data-*` attributes as properties. Also reports scroll depth at 25/50/75/100%.
 * No tracker wired yet: in development, events are logged to the console.
 */
export function Analytics() {
  useEffect(() => {
    const track: Tracker = (event, props) => {
      if (window.kansoTrack) window.kansoTrack(event, props);
      else if (process.env.NODE_ENV === "development") console.debug("[analytics]", event, props);
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-event]");
      if (!el) return;
      const { event, ...rest } = el.dataset;
      if (event) track(event, rest as Record<string, string>);
    };

    const onToggle = (e: Event) => {
      const el = e.target as HTMLDetailsElement;
      if (el.tagName === "DETAILS" && el.open && el.dataset.faq) track("faq_open", { q: el.dataset.faq });
    };

    const seen = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark - 1 && !seen.has(mark)) {
          seen.add(mark);
          track(`scroll_${mark}`, {});
        }
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
