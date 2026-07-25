import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "../data";
import MoreProjects from "./more-projects";
import ScreenshotGallery from "./screenshot-gallery";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const isLive = project.status === "live";

  // Main media slot, in priority order: live-site card → demo video →
  // screenshots gallery. Screenshots are the fallback for projects that
  // aren't hosted and can't be recorded.
  const showLiveCard = isLive && !!project.liveUrl;
  const showVideo = !showLiveCard && !!project.video;
  const showShotsAsMain = !showLiveCard && !showVideo && project.screenshots.length > 0;

  // On live projects the first screenshot is embedded in the big live-site
  // card above, skip it in the gallery to avoid showing it twice. When the
  // gallery itself is the main media, nothing is left for the bottom section.
  const galleryShots = showLiveCard
    ? project.screenshots.slice(1)
    : showShotsAsMain
      ? []
      : project.screenshots;

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
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="font-serif text-3xl tracking-[0.08em] sm:text-4xl">
              {project.title}
            </h1>
            <span className="flex shrink-0 items-baseline gap-3">
              {project.wip && (
                <span className="rounded-md border border-accent/60 px-2 py-0.5 font-serif text-xs tracking-[0.15em] text-muted">
                  Work in progress
                </span>
              )}
              <span className="font-serif text-sm tracking-widest text-muted">
                {project.year}
              </span>
            </span>
          </div>
          <p className="mt-3 font-serif text-xl leading-relaxed text-muted">
            {project.tagline}
          </p>
        </header>

        <hr className="mt-8 rule-accent" />

        {isLive && project.liveUrl && (
          <section aria-labelledby="live-heading" className="mt-12">
            <h2
              id="live-heading"
              className="font-serif text-xs tracking-[0.3em] text-muted"
            >
              Live site
            </h2>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group paper-panel mt-4 block overflow-hidden"
            >
              {project.screenshots.length > 0 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.screenshots[0]}
                  alt={`Preview of the live ${project.title} site`}
                  className="relative z-[1] w-full"
                />
              )}
              <span className="relative z-[1] flex items-baseline justify-between gap-4 border-t border-foreground/10 px-4 py-4">
                <span className="font-serif text-base tracking-[0.15em] underline-offset-4 group-hover:underline sm:text-lg">
                  {new URL(project.liveUrl).hostname}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-serif text-sm text-muted group-hover:text-foreground"
                >
                  ↗
                </span>
              </span>
            </a>
          </section>
        )}

        {showVideo && (
          <section aria-labelledby="demo-heading" className="mt-12">
            <h2
              id="demo-heading"
              className="font-serif text-xs tracking-[0.3em] text-muted"
            >
              Demo
            </h2>
            <div className="paper-panel mt-4 overflow-hidden">
              {/* WCAG 1.2: if the demo has meaningful audio or speech,
                  add a <track kind="captions" src="…" /> and a transcript. */}
              <video
                src={project.video}
                controls
                preload="metadata"
                aria-label={`Video demo of ${project.title}`}
                className="relative z-[1] w-full"
              />
            </div>
          </section>
        )}

        {showShotsAsMain && (
          <section aria-labelledby="media-screenshots-heading" className="mt-12">
            <h2
              id="media-screenshots-heading"
              className="font-serif text-xs tracking-[0.3em] text-muted"
            >
              Screenshots
            </h2>
            <ScreenshotGallery
              title={project.title}
              screenshots={project.screenshots}
            />
          </section>
        )}

        {(project.liveUrl || project.githubUrl) && (
          <section aria-labelledby="links-heading" className="mt-12">
            <h2
              id="links-heading"
              className="font-serif text-xs tracking-[0.3em] text-muted"
            >
              Links
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3 font-serif text-base">
              {project.liveUrl && (
                <li>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-md border border-foreground/15 px-4 py-2 underline-offset-4 hover:underline"
                  >
                    Live Demo
                    <span
                      aria-hidden="true"
                      className="text-muted group-hover:text-foreground"
                    >
                      ↗
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
              {project.githubUrl && (
                <li>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-md border border-foreground/15 px-4 py-2 underline-offset-4 hover:underline"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-muted group-hover:text-foreground"
                      fill="currentColor"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    GitHub
                    <span
                      aria-hidden="true"
                      className="text-muted group-hover:text-foreground"
                    >
                      ↗
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}

        <section aria-labelledby="tech-stack-heading" className="mt-12">
          <h2
            id="tech-stack-heading"
            className="font-serif text-xs tracking-[0.3em] text-muted"
          >
            Tech Stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2 font-serif text-base">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-foreground/15 px-3 py-1"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="about-heading" className="mt-12">
          <h2
            id="about-heading"
            className="font-serif text-xs tracking-[0.3em] text-muted"
          >
            About
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed normal-case tracking-normal [text-shadow:none]">
            {project.description}
          </p>
        </section>

        <section aria-labelledby="highlights-heading" className="mt-12">
          <h2
            id="highlights-heading"
            className="font-serif text-xs tracking-[0.3em] text-muted"
          >
            Highlights
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm leading-relaxed normal-case tracking-normal [text-shadow:none]">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        {galleryShots.length > 0 && (
          <section aria-labelledby="screenshots-heading" className="mt-12">
            <h2
              id="screenshots-heading"
              className="font-serif text-xs tracking-[0.3em] text-muted"
            >
              Screenshots
            </h2>
            <ScreenshotGallery
              title={project.title}
              screenshots={galleryShots}
            />
          </section>
        )}

        <MoreProjects
          projects={projects
            .filter((p) => p.slug !== project.slug)
            .map(({ slug, title, year, tagline }) => ({
              slug,
              title,
              year,
              tagline,
            }))}
        />
      </div>
    </div>
  );
}
