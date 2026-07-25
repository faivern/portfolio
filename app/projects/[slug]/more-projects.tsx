"use client";

import { useState } from "react";
import Link from "next/link";

const PAGE_SIZE = 4;

type MoreProject = {
  slug: string;
  title: string;
  year: string;
  tagline: string;
};

export default function MoreProjects({ projects }: { projects: MoreProject[] }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(projects.length / PAGE_SIZE);
  const visible = projects.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section aria-labelledby="more-projects-heading" className="mt-16">
      <h2
        id="more-projects-heading"
        className="font-serif text-xs tracking-[0.3em] text-muted"
      >
        More projects
      </h2>
      <div aria-live="polite">
        <ul className="mt-2 divide-y divide-foreground/10">
          {visible.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block py-5"
              >
                <span className="flex items-baseline justify-between gap-6">
                  <span className="font-serif text-xl tracking-[0.04em] underline-offset-4 group-hover:underline">
                    {p.title}
                  </span>
                  <span className="shrink-0 font-serif text-sm tracking-widest text-muted">
                    {p.year}
                  </span>
                </span>
                <span className="mt-2 block font-serif text-base leading-relaxed text-muted">
                  {p.tagline}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {pageCount > 1 && (
        <div className="mt-4 flex items-center justify-center gap-x-6">
          <button
            type="button"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            aria-label="Previous projects"
            className="inline-block px-2 py-2 font-serif text-xs tracking-[0.25em] text-muted underline-offset-4 hover:text-foreground hover:underline disabled:cursor-default disabled:opacity-40 disabled:hover:text-muted disabled:hover:no-underline"
          >
            ←&#xFE0E; Prev
          </button>
          <span
            aria-label={`Page ${page + 1} of ${pageCount}`}
            className="font-serif text-xs tracking-[0.25em] text-muted"
          >
            {page + 1} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === pageCount - 1}
            aria-label="Next projects"
            className="inline-block px-2 py-2 font-serif text-xs tracking-[0.25em] text-muted underline-offset-4 hover:text-foreground hover:underline disabled:cursor-default disabled:opacity-40 disabled:hover:text-muted disabled:hover:no-underline"
          >
            Next →&#xFE0E;
          </button>
        </div>
      )}
    </section>
  );
}
