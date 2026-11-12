import Image from "next/image";
import { MediaLightbox } from "@/components/MediaLightbox";
import { ThemedVideo } from "@/components/ThemedVideo";
import type { MediaSpec, Themed } from "@/content/site";

type Props = {
  media: MediaSpec;
  /** Rendered width, for the srcset. */
  sizes: string;
  /** The window title in the browser frame. */
  label?: string;
  /** Hero only: preload the clip's metadata and show the phone still below 640px. */
  hero?: boolean;
  className?: string;
};

/**
 * Light and dark copies of a still. CSS shows the one for the current theme (the OS setting or the
 * header toggle), and because both are lazy, the hidden one is never downloaded.
 */
function ThemedImage({ src, alt, width, height, sizes, className = "" }: { src: Themed; alt: string; width: number; height: number; sizes: string; className?: string }) {
  return (
    <>
      <Image src={src.light} alt={alt} width={width} height={height} sizes={sizes} quality={90} className={`h-auto w-full dark:hidden ${className}`} />
      <Image src={src.dark} alt={alt} width={width} height={height} sizes={sizes} quality={90} className={`hidden h-auto w-full dark:block ${className}`} />
    </>
  );
}

/**
 * One storyboard slot (content/site.ts), in a browser frame. A still today; set `kind: "video"`
 * with `src`, `mp4` and `poster` and the same slot plays the clip, with no layout change.
 */
export function Media({ media, sizes, label = "kanso", hero = false, className = "" }: Props) {
  const asset =
    media.kind === "video" && media.poster ? (
      <ThemedVideo src={media.src} mp4={media.mp4} poster={media.poster} width={media.width} height={media.height} alt={media.alt} hero={hero} />
    ) : (
      <ThemedImage src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} />
    );

  return (
    <>
      {hero && media.phone && (
        <div className="mx-auto w-[min(280px,78vw)] rounded-[34px] bg-ink p-2.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:hidden">
          <div className="overflow-hidden rounded-[26px]">
            <ThemedImage src={media.phone.src} alt={media.alt} width={media.phone.width} height={media.phone.height} sizes="280px" />
          </div>
        </div>
      )}
      <figure className={`frame relative ${hero && media.phone ? "hidden sm:block" : ""} ${className}`}>
        <div aria-hidden className="flex h-[30px] items-center gap-1.5 border-b border-hairline bg-surface-raised px-3">
          <i className="block size-[9px] rounded-full bg-wire" />
          <i className="block size-[9px] rounded-full bg-wire" />
          <i className="block size-[9px] rounded-full bg-wire" />
          <b className="ml-2.5 truncate text-[11px] leading-none font-medium text-muted">{label}</b>
        </div>
        <div className="relative">
          {asset}
          {media.kind === "image" && <MediaLightbox media={media} />}
        </div>
      </figure>
    </>
  );
}
