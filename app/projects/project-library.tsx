"use client";

import { useState } from "react";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  TbCode,
  TbDeviceTv,
  TbLayoutGrid,
  TbShieldCheck,
  TbTerminal2,
  TbTopologyStar3,
  TbWorld,
} from "react-icons/tb";
import {
  projects,
  type Project,
  type ProjectArea,
  type ProjectCategory,
} from "./data";
import { TechnologyBadge } from "@/lib/technology-badge";
import { MatrixRain } from "./matrix-rain";

type FilterLabel = "All Projects" | ProjectArea;

// `areaClass` carries the area's ink. "All Projects" deliberately has none,
// so the neutral chip falls back to the gilt while the grid below it shows
// both inks at once.
const filters: { label: FilterLabel; icon: IconType; areaClass?: string }[] = [
  { label: "All Projects", icon: TbLayoutGrid },
  { label: "Software Development", icon: TbCode, areaClass: "area-software" },
  { label: "Cybersecurity", icon: TbShieldCheck, areaClass: "area-security" },
];

const categoryIcons: Record<ProjectCategory, IconType> = {
  Web: TbWorld,
  "Systems & Integration": TbTopologyStar3,
  "Device Apps": TbDeviceTv,
  "CLI Tools": TbTerminal2,
  "Security Lab": TbShieldCheck,
};

function statusLabel(project: Project) {
  if (project.wip) return "Work in progress";
  if (project.status === "live") return "Live";
  if (project.status === "completed") return "Completed personal lab";
  return "Demo";
}

// Cross-listed projects take the security ink, the more specific of the two.
function areaClass(project: Project) {
  return project.areas.includes("Cybersecurity")
    ? "area-security"
    : "area-software";
}

function inArea(label: FilterLabel) {
  return projects.filter(
    (p) => label === "All Projects" || p.areas.includes(label as ProjectArea),
  );
}

export default function ProjectLibrary() {
  const [filter, setFilter] = useState<FilterLabel>("All Projects");
  const [hovered, setHovered] = useState<FilterLabel | null>(null);
  const visible = inArea(filter);

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects"
        className="mt-8 flex flex-wrap gap-3"
      >
        {filters.map(({ label, icon: Icon, areaClass: chipArea }) => {
          const active = filter === label;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(label)}
              onPointerEnter={() => setHovered(label)}
              onPointerLeave={() => setHovered((h) => (h === label ? null : h))}
              className={`filter-chip relative inline-flex cursor-pointer items-center overflow-hidden rounded-md px-4 py-3 font-serif text-sm tracking-[0.08em] ${chipArea ?? ""} ${active ? "is-active" : "text-muted"}`}
            >
              {label === "Cybersecurity" ? (
                <MatrixRain active={hovered === label} />
              ) : null}
              {label === "Software Development" ? (
                <span aria-hidden="true" className="chip-blueprint" />
              ) : null}
              <span className="relative z-10 inline-flex items-center gap-2.5">
                <Icon
                  aria-hidden="true"
                  focusable="false"
                  className={`h-[1.15rem] w-[1.15rem] shrink-0 ${active ? "text-area-accent" : ""}`}
                />
                {label}
                <span className="font-sans text-[0.7rem] tracking-[0.1em] text-muted">
                  {inArea(label).length}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p
        role="status"
        className="mt-6 font-sans text-xs normal-case tracking-normal text-muted"
      >
        {visible.length} {visible.length === 1 ? "project" : "projects"} ·{" "}
        {filter}
      </p>

      {/* Keyed on the filter so React remounts the list and the cards are
          dealt again on every change, rather than popping in place. */}
      <ul key={filter} className="mt-6 grid items-start gap-6 sm:grid-cols-2">
        {visible.map((p, index) => {
          const CategoryIcon = categoryIcons[p.category];
          const preview = p.cardImage ?? p.screenshots[0];
          return (
            <li
              key={p.slug}
              className={`project-card-stagger ${areaClass(p)}`}
              style={{ "--i": Math.min(index, 7) } as React.CSSProperties}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="paper-panel project-card group flex flex-col overflow-hidden border border-foreground/10"
              >
                <span
                  className={`project-card-media block aspect-[16/9] overflow-hidden border-b border-foreground/10 ${preview ? "" : "project-card-media-empty"}`}
                >
                  {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={preview.src}
                      alt=""
                      width={preview.width}
                      height={preview.height}
                      loading="lazy"
                      decoding="async"
                      className="project-card-image h-full w-full object-cover object-top"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center">
                      <span className="flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-panel">
                        <CategoryIcon
                          aria-hidden="true"
                          focusable="false"
                          className="h-9 w-9 text-accent/70"
                        />
                      </span>
                    </span>
                  )}
                </span>

                <span className="flex flex-1 flex-col p-6">
                  <span className="flex items-center justify-between gap-4 font-sans text-[0.65rem] tracking-[0.12em] text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <CategoryIcon
                        aria-hidden="true"
                        focusable="false"
                        className="h-4 w-4 shrink-0 text-area-accent"
                      />
                      {p.projectType}
                    </span>
                    <span>{p.year}</span>
                  </span>

                  <h2 className="link-rule mt-4 w-fit font-serif text-2xl leading-snug tracking-[0.04em]">
                    {p.title}
                  </h2>

                  <span className="project-card-details mt-auto">
                    <span className="project-card-details-inner">
                      <span className="block pt-3 font-sans text-sm leading-7 normal-case tracking-normal text-muted [text-shadow:none]">
                        {p.tagline}
                      </span>

                      <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-foreground/15 px-2.5 py-1 font-sans text-[0.7rem] normal-case tracking-normal text-muted [text-shadow:none]">
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${p.status === "live" ? "bg-area-accent" : "bg-foreground/35"}`}
                        />
                        {p.category} · {statusLabel(p)}
                      </span>

                      <span className="mt-4 flex flex-wrap gap-2">
                        {p.techStack.slice(0, 3).map((t) => (
                          <TechnologyBadge key={t} technology={t} />
                        ))}
                      </span>

                      <span className="mt-6 block font-serif text-xs tracking-[0.15em]">
                        {p.caseStudy ? "Read investigation" : "Explore project"}{" "}
                        <span aria-hidden="true" className="project-card-arrow">
                          →
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
