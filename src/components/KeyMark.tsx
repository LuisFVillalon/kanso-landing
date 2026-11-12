import { K_GLYPH } from "@/components/Logo";

/**
 * The k key (brand/logo/kanso-mark.svg), inline so its fills follow the theme tokens and its top can
 * play the brand key press once on load (globals.css → .key-top). Decorative: the H1 says what kanso is.
 */
export function KeyMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden focusable="false">
      <rect x="22" y="32" width="156" height="148" rx="34" fill="var(--kanso-key-side)" />
      <g className="key-top">
        <rect x="22" y="20" width="156" height="140" rx="34" fill="var(--kanso-key)" />
        <path transform="translate(60.77 146) scale(0.07500)" fill="#F4EFE4" d={K_GLYPH} />
      </g>
    </svg>
  );
}
