import Image from "next/image";
import { Film, ImageIcon, PlayCircle } from "lucide-react";
import type { MediaSpec } from "@/content/site";

type Props = {
  media: MediaSpec;
  className?: string;
  /** Hero only: loads eagerly because it is the largest paint. */
  priority?: boolean;
  compact?: boolean;
};

/**
 * Shows the real asset once `media.src` is set in content/site.ts; until then, a
 * labelled placeholder that says exactly what to record. Videos are muted,
 * looping and inline (smaller and smoother than GIFs).
 */
export function Media({ media, className = "", priority = false, compact = false }: Props) {
  const ratio = { aspectRatio: `${media.width} / ${media.height}` };

  if (media.src && media.kind === "image") {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        priority={priority}
        className={`h-auto w-full rounded-lg border border-hairline ${className}`}
      />
    );
  }

  if (media.src) {
    return (
      <video
        className={`w-full rounded-lg border border-hairline ${className}`}
        style={ratio}
        src={media.src}
        poster={media.poster}
        width={media.width}
        height={media.height}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "none"}
        aria-label={media.alt}
      />
    );
  }

  const Icon = media.kind === "video" ? PlayCircle : media.kind === "gif" ? Film : ImageIcon;
  const label = media.kind === "video" ? "Video" : media.kind === "gif" ? "Loop" : "Screenshot";

  return (
    <div
      role="img"
      aria-label={`Placeholder: ${media.alt}`}
      style={ratio}
      className={`flex w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-wire bg-surface-raised p-6 text-center text-secondary ${className}`}
    >
      {!compact && <Icon aria-hidden className="h-10 w-10 text-accent" strokeWidth={1.8} />}
      <span className="rounded-full border border-hairline bg-surface px-3 py-1 font-mono text-xs font-medium text-ink">
        {label} · {media.file}
        {!compact && ` · ${media.width}×${media.height}`}
      </span>
      {!compact && <span className="max-w-md text-[13px] leading-5">{media.brief}</span>}
    </div>
  );
}
