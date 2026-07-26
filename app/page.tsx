"use client";

// ─────────────────────────────────────────────────────────────
//  EDIT ME, placeholder content. Replace with your own details.
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FaBriefcase,
  FaGraduationCap,
  FaLocationDot,
} from "react-icons/fa6";
import { site } from "@/lib/site";
import { TechnologyBadge } from "@/lib/technology-badge";
// ─────────────────────────────────────────────────────────────

export default function Home() {
  const [flipped, setFlipped] = useState(false);
  const frontRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  // Where the current pointer press started (nearest link/button, if any).
  const pressRef = useRef<Element | null>(null);

  // Flipping makes the visible face inert, which would silently drop
  // keyboard focus to <body>; move it to the revealed face instead.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    (flipped ? backRef : frontRef).current?.focus({ preventScroll: true });
    // Flipped: the back lies flat, so level any tilt the front picked up.
    if (flipped) {
      tiltRef.current?.style.setProperty("--rx", "0deg");
      tiltRef.current?.style.setProperty("--ry", "0deg");
    }
  }, [flipped]);

  // Pointer-driven tilt + sheen. Only for fine pointers (not touch)
  // and only when motion is welcome, per the a11y conventions.
  const tiltEnabled = useRef(false);
  useEffect(() => {
    tiltEnabled.current =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el || !tiltEnabled.current) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    // The back face lies flat, no tilt there, only the sheen tracks.
    if (!flipped) {
      // Cap tilt at 2.5deg each way; a restrained "held card" angle.
      el.style.setProperty("--ry", `${(px - 0.5) * 5}deg`);
      el.style.setProperty("--rx", `${(py - 0.5) * -5}deg`);
    }
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--sheen", "1");
  };

  const handlePointerLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--sheen", "0");
  };

  return (
    <div className="business-card flex flex-1 items-center justify-center px-6 py-6 sm:px-8 sm:py-10 lg:py-16">
      <div className="card-stage w-full max-w-[929px] [perspective:1600px]">
        <div
          ref={tiltRef}
          className="card-tilt"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div
            className={`card-3d grid h-[43rem] min-[360px]:h-[40rem] min-[480px]:h-[36rem] sm:h-[31rem] md:aspect-[7/4] md:h-auto ${flipped ? "is-flipped" : ""}`}
            onPointerDown={(e) => {
              // The tilt moves the card under the pointer, so a press that
              // starts on a link can end slightly off it, the click then
              // targets a common ancestor and would read as a flip. Remember
              // where the press began and let it through instead.
              pressRef.current = (e.target as HTMLElement).closest("a, button");
            }}
            onClick={(e) => {
              if (pressRef.current) {
                pressRef.current = null;
                return;
              }
              // Links/buttons handle their own clicks; clicks inside a link
              // list (separators, padding, empty rows) are dead hits near a
              // target and do nothing. Anywhere else flips.
              if ((e.target as HTMLElement).closest("a, button, ul")) return;
              setFlipped((f) => !f);
            }}
          >
          {/* ── Front: the pure card ─────────────────────────── */}
          <section
            ref={frontRef}
            tabIndex={-1}
            aria-labelledby="card-name"
            inert={flipped}
            className="card-face col-start-1 row-start-1 flex min-h-[280px] cursor-pointer flex-col items-center px-8 py-7 text-center"
          >
            <span aria-hidden="true" className="card-monogram font-serif">
              {site.name
                .split(/\s+/)
                .map((w, i) => (
                  <span
                    key={i}
                    className={i > 0 ? "-ml-[0.34em] translate-y-[0.34em]" : undefined}
                  >
                    {w[0]}
                  </span>
                ))}
            </span>

            <div className="flex flex-1 flex-col items-center justify-center">
              <h1
                id="card-name"
                className="font-serif text-4xl tracking-[0.08em] sm:text-5xl"
              >
                {site.name}
              </h1>
              <p className="mt-3 font-sans text-[0.65rem] tracking-[0.3em] text-muted">
                {site.role}
              </p>
              <hr className="mt-6 w-12 border-t border-accent/70" />
            </div>

            <ul className="flex flex-wrap items-center justify-center font-sans text-[0.65rem] tracking-[0.25em]">
              {[
                ...site.links,
                { label: "Email", href: `mailto:${site.email}` },
              ].map((l, i) => {
                const external = !l.href.startsWith("mailto:");
                return (
                  <li
                    key={l.label}
                    className={
                      i > 0
                        ? "before:text-muted before:content-['·']"
                        : undefined
                    }
                  >
                    <a
                      href={l.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-block px-3 py-2 text-muted underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {l.label}
                      {external && (
                        <span className="sr-only"> (opens in a new tab)</span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <span className="dogear group absolute right-0 bottom-0">
              {/* Decorative simulated fold; not interactive, hidden from AT. */}
              <span aria-hidden="true" className="dogear-fold" />
              <button
                type="button"
                onClick={() => setFlipped(true)}
                className="dogear-label relative z-10 -m-2 cursor-pointer p-2 font-sans text-[0.6rem] tracking-[0.25em] text-muted hover:text-foreground"
              >
                About Me
              </button>
            </span>
          </section>

          {/* ── Back: profile ────────────────────────────────── */}
          <section
            ref={backRef}
            tabIndex={-1}
            aria-labelledby="about-me"
            inert={!flipped}
            className="card-face card-back col-start-1 row-start-1 flex min-h-[280px] cursor-pointer flex-col overflow-hidden px-6 pt-6 sm:px-8 sm:pt-7"
          >
            <h2
              id="about-me"
              className="text-center font-sans text-[0.72rem] tracking-[0.35em] text-muted"
            >
              About Me
            </h2>

            <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 pb-4">
              <p className="max-w-[52rem] normal-case font-serif text-base leading-[1.45] tracking-[0.025em] sm:text-[1.05rem]">
                {site.profile.about}
              </p>

              <div className="flex flex-col gap-2.5 border-y border-foreground/10 py-3 normal-case font-sans text-[0.7rem] leading-snug tracking-[0.035em] text-muted">
                <p className="inline-flex items-start gap-1.5">
                  <FaLocationDot
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  />
                  {site.location}
                </p>
                <p className="inline-flex items-start gap-1.5">
                  <FaGraduationCap
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  />
                  <span>
                    <span>{site.profile.education.degree}</span>
                    <span aria-hidden="true"> · </span>
                    <span className="sr-only">, </span>
                    <span>
                      {site.profile.education.institution}
                      <span aria-hidden="true"> · </span>
                      <span className="sr-only">, </span>
                      {site.profile.education.period}
                    </span>
                  </span>
                </p>
                <p className="inline-flex items-start gap-1.5">
                  <FaBriefcase
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  />
                  {site.profile.availability}
                </p>
              </div>

              <div className="flex min-h-0 flex-1 flex-col">
                <h3 className="font-sans text-[0.62rem] font-medium tracking-[0.24em] text-muted pb-2">
                  How I Like to Build
                </h3>
                <dl className="mt-2 grid flex-1 grid-cols-2 content-start gap-x-4 gap-y-3 sm:grid-rows-2 sm:content-stretch sm:gap-x-8 sm:gap-y-4">
                  {site.profile.skillGroups.map((group) => (
                    <div
                      key={group.label}
                      className="min-w-0"
                    >
                      <dt className="font-sans text-[0.62rem] font-medium tracking-[0.2em] text-muted">
                        {group.label}
                      </dt>
                      <dd className="mt-1.5">
                        <ul className="flex flex-wrap gap-1">
                          {group.skills.map((technology) => (
                            <TechnologyBadge
                              key={technology}
                              as="li"
                              technology={technology}
                              variant="profile"
                            />
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="-mx-6 grid min-h-14 shrink-0 grid-cols-[3.5rem_1fr_3.5rem] items-center border-t border-accent/50 px-4 sm:-mx-8">
              <button
                type="button"
                onClick={() => setFlipped(false)}
                className="justify-self-start cursor-pointer p-2 font-sans text-base text-muted hover:text-foreground"
              >
                <span aria-hidden="true">←&#xFE0E;</span>
                <span className="sr-only">Back to the front of the card</span>
              </button>

              <Link
                href="/projects"
                className="justify-self-center py-3 text-center font-sans text-[0.72rem] tracking-[0.28em] text-muted underline-offset-4 hover:text-foreground hover:underline"
              >
                Explore all projects <span aria-hidden="true">→&#xFE0E;</span>
              </Link>
            </div>
          </section>
          </div>
        </div>
      </div>
    </div>
  );
}
