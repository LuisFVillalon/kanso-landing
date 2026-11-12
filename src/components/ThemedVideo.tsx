"use client";

import { useEffect, useRef } from "react";
import type { Themed } from "@/content/site";

type Props = { src: Themed; mp4?: Themed; poster: Themed; width: number; height: number; alt: string; hero: boolean };

/**
 * A muted loop in light and dark copies; CSS shows the current theme's. It plays only while on
 * screen and visible, and never with reduced motion, where the poster (the slot's still) stays.
 * Nothing loads before then except the hero's metadata.
 */
export function ThemedVideo({ src, mp4, poster, width, height, alt, hero }: Props) {
  const light = useRef<HTMLVideoElement>(null);
  const dark = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videos = [light.current, dark.current].filter((v): v is HTMLVideoElement => v !== null);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          // offsetParent is null for the copy hidden by the other theme.
          if (e.isIntersecting && !reduce.matches && v.offsetParent !== null) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.25 },
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  const video = (theme: "light" | "dark", ref: React.RefObject<HTMLVideoElement | null>) => (
    <video
      ref={ref}
      className={`h-auto w-full ${theme === "light" ? "block dark:hidden" : "hidden dark:block"}`}
      width={width}
      height={height}
      poster={poster[theme]}
      muted
      loop
      playsInline
      preload={hero ? "metadata" : "none"}
      aria-label={alt}
    >
      <source src={src[theme]} type="video/webm" />
      {mp4 && <source src={mp4[theme]} type="video/mp4" />}
    </video>
  );

  return (
    <>
      {video("light", light)}
      {video("dark", dark)}
    </>
  );
}
