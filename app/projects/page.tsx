import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "./data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `All projects by ${site.plainName} — web apps, systems, and CLI tools.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects",
    description: `All projects by ${site.plainName} — web apps, systems, and CLI tools.`,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  // Group by category, preserving data order for both groups and entries.
  const groups = [...new Set(projects.map((p) => p.category))].map(
    (category) => ({
      category,
      items: projects.filter((p) => p.category === category),
    }),
  );

  return (
    <div className="flex flex-1 justify-center px-6 py-16 sm:px-8 sm:py-24">
      <div className="w-full max-w-2xl">
        <Link
          href="/"
          className="inline-block py-2 font-serif text-xs tracking-[0.25em] text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          ← Business Card
        </Link>

        <header className="mt-8">
          <h1 className="font-serif text-3xl tracking-[0.08em] sm:text-4xl">
            Projects
          </h1>
        </header>

        <hr className="mt-8 rule-accent" />

        {groups.map(({ category, items }, i) => (
          <section
            key={category}
            aria-labelledby={`category-${i}`}
            className="mt-10"
          >
            <h2
              id={`category-${i}`}
              className="font-serif text-xs tracking-[0.3em] text-muted"
            >
              {category}
            </h2>
            <ul className="mt-2 divide-y divide-foreground/10">
              {items.map((p) => (
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
                      {p.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
