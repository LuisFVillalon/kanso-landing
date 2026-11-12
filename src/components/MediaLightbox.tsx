"use client";

import { Maximize2, X } from "lucide-react";
import { useRef, useState } from "react";
import type { MediaSpec } from "@/content/site";

/**
 * Click-to-enlarge for a still. The stills are full app windows, so inline they're scaled well
 * below 1:1; this shows the current theme's copy as big as the viewport allows. The enlarged
 * copy mounts only while open, so it never adds to the page's initial load.
 */
export function MediaLightbox({ media }: { media: MediaSpec }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button type="button" onClick={show} aria-label={`Enlarge: ${media.alt}`} className="group absolute inset-0 cursor-zoom-in">
        <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 text-[13px] font-medium text-ink opacity-0 shadow-nav transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
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
        {/* Clicking the dark area around the still closes it, like most lightboxes. */}
        <div className="flex h-full w-full items-center justify-center p-3 sm:p-8" onClick={(e) => e.target === e.currentTarget && close()}>
          {open && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- full-size original, no resizing wanted */}
              <img src={media.src.light} alt={media.alt} width={media.width} height={media.height} className="h-auto max-h-full w-auto max-w-full rounded-lg dark:hidden" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media.src.dark} alt={media.alt} width={media.width} height={media.height} className="hidden h-auto max-h-full w-auto max-w-full rounded-lg dark:block" />
            </>
          )}
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
