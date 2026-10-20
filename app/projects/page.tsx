import type { Metadata } from "next";
import Link from "next/link";
import ProjectLibrary from "./project-library";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/lib/theme-toggle";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore projects by ${site.plainName}, including software applications, self-hosted infrastructure, and hands-on security labs.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects",
    description: `Explore projects by ${site.plainName}, including software applications, self-hosted infrastructure, and hands-on security labs.`,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="project-surface flex flex-1 justify-center px-6 py-16 sm:px-8 sm:py-24">
      <div className="w-full max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="link-rule inline-block py-2 font-serif text-xs tracking-[0.25em] text-muted"
          >
            ← Business Card
          </Link>
          <ThemeToggle />
        </div>
        <header className="mt-8">
          <h1 className="font-serif text-3xl tracking-[0.08em] sm:text-4xl">
            Projects
          </h1>
        </header>
        <hr className="mt-6 rule-accent" />
        <ProjectLibrary />
      </div>
    </div>
  );
}
