import type { Metadata } from "next";
import Link from "next/link";
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from "./data";
import { site } from "@/lib/site";
import { ProjectCategoryIcon } from "@/lib/project-category-icon";
import { TechnologyBadge } from "@/lib/technology-badge";

const categoryDescriptions: Record<ProjectCategory, string> = {
  Web: "Public-facing websites and browser experiences built for real-world use.",
  "Systems & Integration":
    "Software connecting multiple applications, services, and hardware.",
  "Device Apps": "Software designed for dedicated screens and the hardware behind them.",
  "CLI Tools": "Focused utilities that turn complex work into clear outcomes.",
};

export const metadata: Metadata = {
  title: "Projects",
  description: `All projects by ${site.plainName}, including web products, systems integration, device apps, and CLI tools.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects",
    description: `All projects by ${site.plainName}, including web products, systems integration, device apps, and CLI tools.`,
    url: "/projects",
  },
};

function categoryId(category: string) {
  return `category-${category.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
}

export default function ProjectsPage() {
  const groups = projectCategories.map((category) => ({
    category,
    items: projects.filter((p) => p.category === category),
  }));

  return (
    <div className="flex flex-1 justify-center px-6 py-16 sm:px-8 sm:py-24">
      <div className="w-full max-w-5xl">
        <Link
          href="/"
          className="inline-block py-2 font-serif text-xs tracking-[0.25em] text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          ←&#xFE0E; Business Card
        </Link>

        <header className="mt-8">
          <h1 className="font-serif text-3xl tracking-[0.08em] sm:text-4xl">
            Projects
          </h1>
          <p className="mt-4 max-w-xl font-serif text-base leading-relaxed tracking-[0.08em] text-muted">
            {projects.length} projects across {groups.length} disciplines,
            from public-facing products to systems integration and focused tools.
          </p>
        </header>

        <hr className="mt-8 rule-accent" />

        <nav aria-label="Project categories" className="mt-8">
          <p className="font-serif text-xs tracking-[0.3em] text-muted">
            Explore by discipline
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map(({ category, items }) => (
              <li key={category}>
                <a
                  href={`#${categoryId(category)}`}
                  className="group flex h-full items-center justify-between gap-4 rounded-md border border-foreground/15 px-4 py-4 transition-colors hover:border-foreground/35 hover:bg-[#f6f1e8]"
                >
                  <span className="inline-flex items-center gap-2 font-serif text-sm tracking-[0.16em]">
                    <ProjectCategoryIcon
                      category={category}
                      className="h-4 w-4"
                    />
                    {category}
                  </span>
                  <span className="shrink-0 font-serif text-xs tracking-widest text-muted">
                    {items.length}
                    <span className="sr-only">
                      {" "}
                      {items.length === 1 ? "project" : "projects"}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 space-y-20">
          {groups.map(({ category, items }) => (
            <section
              key={category}
              aria-labelledby={categoryId(category)}
              className="scroll-mt-8"
            >
              <div className="grid gap-8 lg:grid-cols-[13rem_1fr] lg:gap-12">
                <header>
                  <h2
                    id={categoryId(category)}
                    className="flex items-center gap-2.5 font-serif text-2xl tracking-[0.1em]"
                  >
                    <ProjectCategoryIcon
                      category={category}
                      className="h-5 w-5"
                    />
                    {category}
                  </h2>
                  <p className="mt-3 font-serif text-sm leading-relaxed tracking-[0.08em] text-muted">
                    {categoryDescriptions[category]}
                  </p>
                </header>

                <ul className="grid gap-4 sm:grid-cols-2">
                  {items.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="paper-panel group flex h-full flex-col overflow-hidden border border-foreground/10 p-5 sm:p-6"
                      >
                        <span className="flex items-center justify-between gap-4">
                          <span className="font-serif text-xs tracking-[0.22em] text-muted">
                            {p.year}
                          </span>
                          <span className="font-serif text-xs tracking-[0.16em] text-muted">
                            {p.wip
                              ? "Work in progress"
                              : p.status === "live"
                                ? "Live"
                                : "Demo"}
                          </span>
                        </span>

                        <span className="mt-8 flex items-start justify-between gap-5">
                          <span className="font-serif text-xl leading-snug tracking-[0.04em] underline-offset-4 group-hover:underline">
                            {p.title}
                          </span>
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-lg transition-transform group-hover:translate-x-1"
                          >
                            →&#xFE0E;
                          </span>
                        </span>

                        <span className="mt-3 block font-serif text-sm leading-relaxed tracking-[0.06em] text-muted">
                          {p.tagline}
                        </span>

                        <span className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-sans text-[0.65rem] tracking-[0.1em] text-muted">
                          <span className="font-semibold uppercase tracking-[0.14em]">
                            Platforms
                          </span>
                          <span>{p.platforms.join(" · ")}</span>
                        </span>

                        <span className="mt-4 flex flex-wrap gap-2">
                          {p.techStack.slice(0, 3).map((technology) => (
                            <TechnologyBadge
                              key={technology}
                              technology={technology}
                            />
                          ))}
                          {p.techStack.length > 3 && (
                            <span className="px-1 py-1 font-sans text-[0.65rem] tracking-[0.08em] text-muted">
                              <span aria-hidden="true">
                                +{p.techStack.length - 3}
                              </span>
                              <span className="sr-only">
                                , {p.techStack.slice(3).join(", ")}
                              </span>
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
