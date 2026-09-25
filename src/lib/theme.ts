/** localStorage key for the header theme toggle (components/ThemeToggle.tsx). */
export const THEME_KEY = "kanso_theme";

/** Browser chrome color per theme; matches --tm-bg in globals.css. */
export const THEME_COLORS = { light: "#f6f5f4", dark: "#191817" } as const;

/**
 * Anti-flash script: applies the saved theme to <html> before first paint.
 * With nothing saved, data-theme stays unset and the OS setting applies.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t!=="light"&&t!=="dark")return;document.documentElement.dataset.theme=t;var c=${JSON.stringify(THEME_COLORS)}[t];document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.setAttribute("content",c)})}catch(e){}})()`;
