"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useRef, useState } from "react";
import type { MediaSpec } from "@/content/site";

/**
 * Click-to-enlarge overlay for real media. The recordings are full desktop windows, so
 * inline they're scaled well below 1:1; this shows them as big as the viewport allows.
 * The enlarged copy mounts only while open, so it never adds to the page's initial load.
 */
export function MediaLightbox({ media }: { media: MediaSpec & { src: string } }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label={`Enlarge: ${media.alt}`}
        className="group absolute inset-0 cursor-zoom-in rounded-lg"
      >
        <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 text-[13px] font-medium text-ink shadow-nav transition-colors duration-150 group-hover:bg-accent group-hover:text-accent-text">
          <Maximize2 aria-hidden className="h-3.5 w-3.5" />
          Enlarge
        </span>
      </button>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        aria-label={media.alt}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/85"
      >
        {/* Clicking the dark area around the media closes it, like most lightboxes. */}
        <div
          className="flex h-full w-full items-center justify-center p-3 sm:p-8"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          {open &&
            (media.kind === "image" ? (
              <Image
                src={media.src}
                alt={media.alt}
                width={media.width}
                height={media.height}
                unoptimized
                className="h-auto max-h-full w-auto max-w-full rounded-lg"
              />
            ) : (
              <video
                className="h-auto max-h-full w-auto max-w-full rounded-lg"
                src={media.src}
                poster={media.poster}
                width={media.width}
                height={media.height}
                autoPlay
                muted
                loop
                playsInline
                controls
                aria-label={media.alt}
              />
            ))}
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink shadow-nav hover:bg-surface-raised"
        >
          <X aria-hidden className="h-5 w-5" />
        </button>
      </dialog>
    </>
  );
}
