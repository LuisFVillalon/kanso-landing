"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_COLORS, THEME_KEY } from "@/lib/theme";

/**
 * Flips between light and dark, overriding the OS setting, and remembers the choice.
 * Both icons render and CSS picks one, so the server markup never depends on the theme.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current = root.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_COLORS[next]));
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage blocked (private mode): the choice lasts until reload.
    }
  }

  return (
    <button type="button" onClick={toggle} aria-label="Toggle dark mode" title="Toggle dark mode" className="btn btn-outline border-transparent px-3">
      <Moon aria-hidden className="size-4 dark:hidden" />
      <Sun aria-hidden className="hidden size-4 dark:block" />
    </button>
  );
}
