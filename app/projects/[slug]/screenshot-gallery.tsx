"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectMedia } from "../data";

export default function ScreenshotGallery({
  title,
  screenshots,
}: {
  title: string;
  screenshots: ProjectMedia[];
}) {
  const [active, setActive] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setActive(null);
    setZoomed(false);
    lastTriggerRef.current?.focus();
  }, []);

  const prev = useCallback(() => {
    setZoomed(false);
    setActive((i) =>
      i === null ? i : (i - 1 + screenshots.length) % screenshots.length,
    );
  }, [screenshots.length]);

  const next = useCallback(() => {
    setZoomed(false);
    setActive((i) => (i === null ? i : (i + 1) % screenshots.length));
  }, [screenshots.length]);

  useEffect(() => {
    if (active === null) return;
    dialogRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {screenshots.map((media, i) => (
          <figure
            key={media.src}
            className="paper-panel flex min-w-0 flex-col overflow-hidden border border-foreground/10"
          >
            <button
              type="button"
              onClick={(e) => {
                lastTriggerRef.current = e.currentTarget;
                setActive(i);
              }}
              aria-label={`View ${title}, image ${i + 1} of ${screenshots.length}, in full size`}
              className="group relative flex min-h-0 flex-1 cursor-zoom-in items-center justify-center overflow-hidden bg-[#e8e2d6]"
            >
              {/* The button provides the accessible name; the thumbnail is decorative. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media.src}
                width={media.width}
                height={media.height}
                alt=""
                loading="lazy"
                className="relative z-[1] h-auto w-full"
              />
              <span
                aria-hidden="true"
                className="absolute right-2 bottom-2 z-[2] flex items-center gap-1.5 bg-background/90 px-2 py-1 font-serif text-[0.6rem] tracking-[0.2em] text-muted group-hover:bg-background group-hover:text-foreground group-focus-visible:bg-background group-focus-visible:text-foreground"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="m10.5 10.5 3 3" />
                </svg>
                Enlarge
              </span>
            </button>
            <figcaption className="relative z-[1] border-t border-foreground/10 px-4 py-3 font-sans text-xs leading-relaxed normal-case tracking-normal text-muted [text-shadow:none]">
              {media.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {active !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title}, image ${active + 1} of ${screenshots.length}`}
          tabIndex={-1}
          onClick={close}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 p-6"
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 inline-block px-2 py-2 font-serif text-xs tracking-[0.25em] text-white/70 underline-offset-4 hover:text-white hover:underline"
          >
            Close
          </button>

          <div
            className="flex max-h-full w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={
                zoomed
                  ? "max-h-[75vh] w-full overflow-auto"
                  : "flex max-h-[75vh] w-full items-center justify-center overflow-hidden"
              }
            >
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
                aria-pressed={zoomed}
                className={zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screenshots[active].src}
                  width={screenshots[active].width}
                  height={screenshots[active].height}
                  alt={screenshots[active].alt}
                  className={
                    zoomed
                      ? "max-w-none border border-white/20"
                      : "max-h-[75vh] w-auto max-w-full border border-white/20 object-contain"
                  }
                />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {screenshots.length > 1 && (
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous screenshot"
                  className="inline-block px-2 py-2 font-serif text-xs tracking-[0.25em] text-white/70 underline-offset-4 hover:text-white hover:underline"
                >
                  ←&#xFE0E; Prev
                </button>
              )}
              <span className="font-serif text-xs tracking-[0.25em] text-white/70">
                {active + 1} / {screenshots.length}
              </span>
              {screenshots.length > 1 && (
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next screenshot"
                  className="inline-block px-2 py-2 font-serif text-xs tracking-[0.25em] text-white/70 underline-offset-4 hover:text-white hover:underline"
                >
                  Next →&#xFE0E;
                </button>
              )}
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-pressed={zoomed}
                className="inline-block px-2 py-2 font-serif text-xs tracking-[0.25em] text-white/70 underline-offset-4 hover:text-white hover:underline"
              >
                {zoomed ? "Zoom out" : "Zoom in"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
