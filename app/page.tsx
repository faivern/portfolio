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
  const [hasTurned, setHasTurned] = useState(false);
  const frontRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  // Where the current pointer press started (nearest link/button, if any).
  const pressRef = useRef<Element | null>(null);

  const flipCard = (next: boolean) => {
    setHasTurned(true);
    setFlipped(next);
  };

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
      tiltRef.current?.style.setProperty("--shadow-x", "0px");
      tiltRef.current?.style.setProperty("--shadow-y", "0px");
    }
  }, [flipped]);

  // Pointer-driven tilt + sheen. Only for fine pointers (not touch)
  // and only when motion is welcome, per the a11y conventions.
  const tiltEnabled = useRef(false);
  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      tiltEnabled.current = pointer.matches && !motion.matches;
      if (!tiltEnabled.current) {
        for (const property of ["--rx", "--ry", "--shadow-x", "--shadow-y", "--sheen"]) {
          tiltRef.current?.style.removeProperty(property);
        }
      }
    };
    update();
    pointer.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      pointer.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
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
      el.style.setProperty("--shadow-x", `${(px - 0.5) * -12}px`);
      el.style.setProperty("--shadow-y", `${(py - 0.5) * -8}px`);
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
    el.style.setProperty("--shadow-x", "0px");
    el.style.setProperty("--shadow-y", "0px");
  };

  return (
    <div className="business-card flex flex-1 items-center justify-center px-3 py-4 min-[360px]:px-4 sm:px-8 sm:py-10 lg:py-16">
      <div className="card-stage w-full max-w-[929px] [container-type:inline-size] [perspective:1600px]">
        <div
          ref={tiltRef}
          className="card-tilt"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className={`card-lift ${hasTurned ? (flipped ? "turn-to-back" : "turn-to-front") : ""}`}>
          <div
            className={`card-3d grid min-h-[43rem] min-[360px]:min-h-[40rem] min-[480px]:min-h-[36rem] sm:min-h-[31rem] md:min-h-[calc(100cqw*4/7)] ${flipped ? "is-flipped" : ""}`}
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
              flipCard(!flipped);
            }}
          >
          {/* ── Front: the pure card ─────────────────────────── */}
          <section
            ref={frontRef}
            tabIndex={-1}
            aria-labelledby="card-name"
            inert={flipped}
            className="card-face col-start-1 row-start-1 flex min-h-[280px] cursor-pointer flex-col items-center px-8 pt-7 pb-20 text-center"
          >
            <span aria-hidden="true" className="card-monogram font-serif">
              {site.name
                .split(/\s+/)
                .map((w, i) => (
                  <span
                    key={i}
                    // Margin, not transform: a transformed glyph paints in its own
                    // stacking context, so the foil gradient clipped to the
                    // monogram's text would stay at the unshifted position.
                    className={i > 0 ? "-ml-[0.34em] mt-[0.34em]" : undefined}
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
              <p className="mt-4 max-w-md font-sans text-[0.65rem] leading-6 tracking-[0.12em] text-muted">
                {site.areas}
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
                onClick={() => flipCard(true)}
                className="dogear-label relative z-10 inline-flex min-h-11 cursor-pointer items-center gap-2 px-4 py-2 font-sans text-[0.8rem] tracking-[0.04em] text-foreground"
              >
                Flip to meet me <span aria-hidden="true">↻</span>
              </button>
            </span>
          </section>

          {/* ── Back: profile ────────────────────────────────── */}
          <section
            ref={backRef}
            tabIndex={-1}
            aria-labelledby="about-me"
            inert={!flipped}
            className="card-face card-back col-start-1 row-start-1 flex min-h-[280px] cursor-pointer flex-col overflow-hidden px-4 pt-4 min-[360px]:px-5 sm:px-8 sm:pt-7"
          >
            <h2
              id="about-me"
              className="text-center font-sans text-[0.72rem] tracking-[0.35em] text-muted"
            >
              About Me
            </h2>

            <div className="card-profile-body mt-3 flex flex-1 flex-col gap-3 pb-3 sm:mt-4 sm:gap-3">
              <p className="max-w-[52rem] normal-case font-serif text-sm leading-[1.4] tracking-[0.025em] sm:text-[1.05rem] sm:leading-[1.45]">
                {site.profile.about}
              </p>

              <div className="card-profile-meta flex flex-col gap-1.5 border-y border-foreground/10 py-2 normal-case font-sans text-xs leading-snug tracking-[0.035em] text-muted sm:text-[0.85rem]">
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

              <div className="flex flex-1 flex-col">
                <h3 className="pb-1 font-sans text-[0.62rem] font-medium tracking-[0.2em] text-muted sm:pb-2 sm:text-[0.68rem] sm:tracking-[0.24em]">
                  My Toolbox
                </h3>
                <dl className="mt-1 grid flex-1 grid-cols-2 content-start gap-x-2 gap-y-2 sm:mt-2 sm:content-stretch sm:gap-x-8 sm:gap-y-2.5">
                  {site.profile.skillGroups.map((group) => (
                    <div
                      key={group.label}
                      className="min-w-0"
                    >
                      <dt className="font-sans text-[0.58rem] font-medium tracking-[0.14em] text-muted sm:text-[0.62rem] sm:tracking-[0.2em]">
                        {group.label}
                      </dt>
                      <dd className="mt-1 sm:mt-1.5">
                        <ul className="flex flex-wrap gap-0.5 sm:gap-1">
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

            <div className="card-profile-footer mt-2 -mx-4 flex shrink-0 items-center gap-2 border-t border-area-accent/50 px-3 py-2 min-[360px]:-mx-5 sm:-mx-8 sm:px-5">
              <button
                type="button"
                onClick={() => flipCard(false)}
                className="flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center font-sans text-base text-muted hover:text-foreground"
              >
                <span aria-hidden="true">←&#xFE0E;</span>
                <span className="sr-only">Back to the front of the card</span>
              </button>

              <Link
                href="/projects"
                className="card-projects-button mx-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-area-accent bg-foreground px-3 py-3 text-center font-sans text-xs font-medium tracking-[0.06em] text-panel hover:underline hover:underline-offset-4 sm:gap-3 sm:px-5 sm:text-sm"
              >
                Explore projects <span aria-hidden="true">→&#xFE0E;</span>
              </Link>
              <span aria-hidden="true" className="hidden w-11 shrink-0 sm:block" />
            </div>
          </section>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
