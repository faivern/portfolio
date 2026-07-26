import Link from "next/link";
import type { Project } from "../data";
import { ProjectCategoryIcon } from "@/lib/project-category-icon";

export default function MoreProjects({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <section
      aria-labelledby="more-projects-heading"
      className="mt-20 border-t border-foreground/15 pt-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="more-projects-heading"
            className="font-serif text-xs tracking-[0.3em] text-muted"
          >
            Continue exploring
          </h2>
          <p className="mt-3 font-serif text-xl normal-case tracking-[0.04em]">
            More projects
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-block py-2 font-serif text-xs tracking-[0.2em] text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          View all projects →&#xFE0E;
        </Link>
      </div>

      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="paper-panel group flex h-full flex-col overflow-hidden border border-foreground/10 p-5 sm:p-6"
            >
              <span className="relative z-[1] flex items-center justify-between gap-4 font-serif text-[0.62rem] tracking-[0.2em] text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <ProjectCategoryIcon
                    category={project.category}
                    className="h-3.5 w-3.5"
                  />
                  {project.category}
                </span>
                <span>{project.year}</span>
              </span>
              <span className="relative z-[1] mt-8 flex items-start justify-between gap-4">
                <span className="font-serif text-xl leading-snug tracking-[0.04em] underline-offset-4 group-hover:underline">
                  {project.title}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                >
                  →&#xFE0E;
                </span>
              </span>
              <span className="relative z-[1] mt-3 block font-sans text-sm leading-6 normal-case tracking-normal text-muted [text-shadow:none]">
                {project.tagline}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
