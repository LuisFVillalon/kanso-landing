import Image from "next/image";
import { Film, ImageIcon, PlayCircle } from "lucide-react";
import { MediaLightbox } from "@/components/MediaLightbox";
import type { MediaSpec } from "@/content/site";

type Props = {
  media: MediaSpec;
  className?: string;
  /** Hero only: loads eagerly because it is the largest paint. */
  priority?: boolean;
  compact?: boolean;
  /** Rendered width of an image, for its srcset. Defaults to the full content column. */
  sizes?: string;
};

/**
 * Shows the real asset once `media.src` is set in content/site.ts; until then, a
 * labelled placeholder that says exactly what to record. Videos are muted,
 * looping and inline (smaller and smoother than GIFs). Real media gets an "Enlarge" overlay.
 */
export function Media({ media, className = "", priority = false, compact = false, sizes = "(min-width: 1280px) 1200px, 100vw" }: Props) {
  const ratio = { aspectRatio: `${media.width} / ${media.height}` };

  if (media.src) {
    const asset =
      media.kind === "image" ? (
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          priority={priority}
          sizes={sizes}
          // Screenshots are mostly UI text, which the default quality (75) visibly smears.
          quality={90}
          className="h-auto w-full rounded-lg border border-hairline"
        />
      ) : (
        <video
          className="block h-auto w-full rounded-lg border border-hairline"
          // "auto" lets the file's real ratio win once it loads, so a spec that's slightly off never letterboxes.
          style={{ aspectRatio: `auto ${media.width} / ${media.height}` }}
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

    return (
      <div className={`relative rounded-lg ${className}`}>
        {asset}
        <MediaLightbox media={{ ...media, src: media.src }} />
      </div>
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
