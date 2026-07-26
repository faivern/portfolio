import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProject,
  projects,
  type Project,
  type ProjectExample,
  type ProjectMedia,
} from "../data";
import MoreProjects from "./more-projects";
import ScreenshotGallery from "./screenshot-gallery";
import { ProjectCategoryIcon } from "@/lib/project-category-icon";
import { TechnologyBadge } from "@/lib/technology-badge";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
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

function ExternalArrow() {
  return (
    <span aria-hidden="true" className="text-muted group-hover:text-foreground">
      ↗&#xFE0E;
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4 text-muted group-hover:text-foreground"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveUrl && !project.githubUrl) return null;

  return (
    <ul
      aria-label="Project links"
      className="mt-8 flex flex-wrap gap-3 font-serif text-sm"
    >
      {project.liveUrl && (
        <li>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-md border border-foreground/20 bg-[#f6f1e8] px-4 py-2.5 underline-offset-4 hover:underline"
          >
            Visit live project
            <ExternalArrow />
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
            className="group inline-flex items-center gap-2 rounded-md border border-foreground/20 px-4 py-2.5 underline-offset-4 hover:underline"
          >
            <GitHubIcon />
            GitHub
            <ExternalArrow />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      )}
    </ul>
  );
}

function ExampleFlow({
  title,
  example,
}: {
  title: string;
  example: ProjectExample;
}) {
  return (
    <figure className="paper-panel overflow-hidden border border-foreground/10 p-5 sm:p-8">
      <div className="relative z-[1] grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <div className="rounded-md border border-foreground/15 bg-background p-5">
          <p className="font-serif text-[0.65rem] tracking-[0.28em] text-muted">
            {example.inputLabel}
          </p>
          <p className="mt-4 whitespace-pre-line font-sans text-sm leading-7 normal-case tracking-normal [text-shadow:none]">
            {example.input}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="self-center text-center font-serif text-xl text-muted md:rotate-0"
        >
          →&#xFE0E;
        </span>
        <div className="rounded-md border border-foreground/15 bg-background p-5">
          <p className="font-serif text-[0.65rem] tracking-[0.28em] text-muted">
            {example.outputLabel}
          </p>
          <p className="mt-4 whitespace-pre-line font-sans text-sm leading-7 normal-case tracking-normal [text-shadow:none]">
            {example.output}
          </p>
        </div>
      </div>
      <figcaption className="relative z-[1] mt-4 font-sans text-xs leading-relaxed normal-case tracking-normal text-muted [text-shadow:none]">
        A simplified view of how {title} turns an input into a useful outcome.
      </figcaption>
    </figure>
  );
}

function HeroImage({
  project,
  media,
}: {
  project: Project;
  media: ProjectMedia;
}) {
  const image = (
    // Static export uses local images with explicit dimensions instead of the
    // default next/image optimizer, which requires a server.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media.src}
      width={media.width}
      height={media.height}
      alt={media.alt}
      className="relative z-[1] h-auto w-full"
    />
  );

  return (
    <figure className="paper-panel overflow-hidden border border-foreground/10">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          {image}
          <span className="sr-only">
            Visit the live project (opens in a new tab)
          </span>
        </a>
      ) : (
        image
      )}
      <figcaption className="relative z-[1] border-t border-foreground/10 px-4 py-3 font-sans text-xs leading-relaxed normal-case tracking-normal text-muted [text-shadow:none] sm:px-5">
        {media.caption}
      </figcaption>
    </figure>
  );
}

function ProjectHero({ project }: { project: Project }) {
  if (project.video) {
    return (
      <figure className="paper-panel overflow-hidden border border-foreground/10">
        <video
          controls
          playsInline
          preload="metadata"
          poster={project.screenshots[0]?.src}
          aria-label={`Video demonstration of ${project.title}`}
          className="relative z-[1] w-full"
        >
          <source src={project.video} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
        <figcaption className="relative z-[1] border-t border-foreground/10 px-4 py-3 font-sans text-xs leading-relaxed normal-case tracking-normal text-muted [text-shadow:none] sm:px-5">
          A guided demonstration of the customer and staff booking experience.
        </figcaption>
      </figure>
    );
  }

  if (project.screenshots[0]) {
    return <HeroImage project={project} media={project.screenshots[0]} />;
  }

  if (project.example) {
    return <ExampleFlow title={project.title} example={project.example} />;
  }

  return null;
}

function getRelatedProjects(project: Project) {
  const originalOrder = new Map(
    projects.map((candidate, index) => [candidate.slug, index]),
  );

  return projects
    .filter((candidate) => candidate.slug !== project.slug)
    .map((candidate) => {
      const sharedPlatforms = candidate.platforms.filter((platform) =>
        project.platforms.includes(platform),
      ).length;
      return {
        candidate,
        score:
          (candidate.category === project.category ? 100 : 0) + sharedPlatforms,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        (originalOrder.get(a.candidate.slug) ?? 0) -
          (originalOrder.get(b.candidate.slug) ?? 0),
    )
    .slice(0, 3)
    .map(({ candidate }) => candidate);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const supportingScreenshots = project.screenshots.slice(1);

  return (
    <div className="flex flex-1 justify-center px-6 py-14 sm:px-8 sm:py-20">
      <article className="w-full max-w-6xl">
        <Link
          href="/projects"
          className="inline-block py-2 font-serif text-xs tracking-[0.25em] text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          ←&#xFE0E; All projects
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:gap-16">
          <div>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-serif text-[0.68rem] tracking-[0.24em] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <ProjectCategoryIcon
                  category={project.category}
                  className="h-5 w-5"
                />
                {project.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
              <span aria-hidden="true">·</span>
              <span>
                {project.status === "live" ? "Live product" : "Project demo"}
              </span>
              {project.wip && (
                <span className="rounded-md border border-accent/60 px-2 py-1 tracking-[0.14em]">
                  Work in progress
                </span>
              )}
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.08] tracking-[0.045em] sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl font-serif text-xl leading-relaxed normal-case tracking-[0.025em] text-muted sm:text-2xl">
              {project.tagline}
            </p>
            <ProjectLinks project={project} />
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-l border-foreground/15 pl-5 lg:grid-cols-1">
            <div>
              <dt className="font-serif text-[0.62rem] tracking-[0.28em] text-muted">
                Platforms
              </dt>
              <dd className="mt-1 font-sans text-sm normal-case tracking-normal [text-shadow:none]">
                {project.platforms.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="font-serif text-[0.62rem] tracking-[0.28em] text-muted">
                Focus
              </dt>
              <dd className="mt-1 font-sans text-sm normal-case tracking-normal [text-shadow:none]">
                {project.highlights.map((item) => item.title).join(" · ")}
              </dd>
            </div>
          </dl>
        </header>

        <hr className="mt-10 rule-accent" />

        <section aria-labelledby="project-view-heading" className="mt-10">
          <h2 id="project-view-heading" className="sr-only">
            Project view
          </h2>
          <ProjectHero project={project} />
        </section>

        <section
          aria-labelledby="story-heading"
          className="mt-14 grid gap-8 lg:grid-cols-[12rem_1fr_1fr] lg:gap-12"
        >
          <h2
            id="story-heading"
            className="font-serif text-xs tracking-[0.3em] text-muted"
          >
            The story
          </h2>
          <div>
            <h3 className="font-serif text-2xl tracking-[0.06em]">
              The problem
            </h3>
            <p className="mt-3 font-sans text-sm leading-7 normal-case tracking-normal [text-shadow:none]">
              {project.problem}
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl tracking-[0.06em]">
              What it delivers
            </h3>
            <p className="mt-3 font-sans text-sm leading-7 normal-case tracking-normal [text-shadow:none]">
              {project.solution}
            </p>
          </div>
        </section>

        <section aria-labelledby="highlights-heading" className="mt-16">
          <div className="flex items-end justify-between gap-8">
            <h2
              id="highlights-heading"
              className="font-serif text-xs tracking-[0.3em] text-muted"
            >
              At a glance
            </h2>
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-foreground/15 sm:block"
            />
          </div>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {project.highlights.map((highlight, index) => (
              <li
                key={highlight.title}
                className="paper-panel overflow-hidden border border-foreground/10 p-5 sm:p-6"
              >
                <div className="relative z-[1]">
                  <span
                    aria-hidden="true"
                    className="font-serif text-xs tracking-[0.2em] text-muted"
                  >
                    0{index + 1}
                  </span>
                  <h3 className="mt-6 font-serif text-xl tracking-[0.06em]">
                    {highlight.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-6 normal-case tracking-normal text-muted [text-shadow:none]">
                    {highlight.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="proof-heading"
          className="mt-16 grid gap-8 lg:grid-cols-[12rem_1fr] lg:gap-12"
        >
          <div>
            <h2
              id="proof-heading"
              className="font-serif text-xs tracking-[0.3em] text-muted"
            >
              Built with
            </h2>
            <ul
              aria-label="Technology stack"
              className="mt-5 flex flex-wrap gap-2"
            >
              {project.techStack.map((technology) => (
                <TechnologyBadge
                  as="li"
                  key={technology}
                  technology={technology}
                  variant="full"
                />
              ))}
            </ul>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2">
            {project.technicalProof.map((proof) => (
              <li key={proof.title} className="border-l border-foreground/20 pl-5">
                <h3 className="font-serif text-lg tracking-[0.07em]">
                  {proof.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-6 normal-case tracking-normal text-muted [text-shadow:none]">
                  {proof.detail}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {supportingScreenshots.length > 0 && (
          <section aria-labelledby="screenshots-heading" className="mt-16">
            <h2
              id="screenshots-heading"
              className="font-serif text-xs tracking-[0.3em] text-muted"
            >
              A closer look
            </h2>
            <ScreenshotGallery
              title={project.title}
              screenshots={supportingScreenshots}
            />
          </section>
        )}

        <MoreProjects projects={getRelatedProjects(project)} />
      </article>
    </div>
  );
}
