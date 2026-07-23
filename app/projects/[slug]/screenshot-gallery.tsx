"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function ScreenshotGallery({
  title,
  screenshots,
}: {
  title: string;
  screenshots: string[];
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
      <div className="mt-4 grid gap-4">
        {screenshots.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={(e) => {
              lastTriggerRef.current = e.currentTarget;
              setActive(i);
            }}
            aria-label={`View ${title}, screenshot ${i + 1} of ${screenshots.length}, in full size`}
            className="group relative block w-full cursor-zoom-in overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="relative z-[1] w-full" />
            {/* Click affordance: always visible, brightens on hover/focus */}
            <span
              aria-hidden="true"
              className="absolute right-2 bottom-2 z-[2] flex items-center gap-1.5 bg-background/80 px-2 py-1 font-serif text-[0.6rem] tracking-[0.2em] text-muted group-hover:bg-background group-hover:text-foreground group-focus-visible:bg-background group-focus-visible:text-foreground"
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
        ))}
      </div>

      {active !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title}, screenshot ${active + 1} of ${screenshots.length}`}
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
                  src={screenshots[active]}
                  alt={`${title}, screenshot ${active + 1}`}
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
                  ← Prev
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
                  Next →
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
