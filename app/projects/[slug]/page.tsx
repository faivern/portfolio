import SecurityCaseStudy from "./case-study";
import { caseStudies } from "@/content/case-studies";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProject,
  generatedProjects,
  type Project,
  type SoftwareProject,
  type ProjectExample,
  type ProjectMedia,
  type ProjectVideo,
} from "../data";
import MoreProjects from "./more-projects";
import ScreenshotGallery from "./screenshot-gallery";
import { ProjectCategoryIcon } from "@/lib/project-category-icon";
import { TechnologyBadge } from "@/lib/technology-badge";
import ProjectShell from "../_editorial/project-shell";
import styles from "../_editorial/article.module.css";

export function generateStaticParams() {
  return generatedProjects.map((project) => ({ slug: project.slug }));
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

  const preview =
    project.screenshots[0] ??
    (project.caseStudy
      ? caseStudies[project.caseStudy]?.sections
          .flatMap((s) => s.blocks)
          .find((b) => b.type === "images")?.images[0]
      : undefined);
  return {
    title: project.title,
    description: project.description,
    twitter: {
      card: preview ? "summary_large_image" : "summary",
      title: project.title,
      description: project.description,
      ...(preview && { images: [{ url: preview.src, alt: preview.alt }] }),
    },
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
      ...(preview && {
        images: [
          {
            url: preview.src,
            width: preview.width,
            height: preview.height,
            alt: preview.alt,
          },
        ],
      }),
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
      className="mt-6 flex flex-wrap gap-3 text-sm font-medium"
    >
      {project.liveUrl && (
        <li>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-md border border-foreground/20 bg-panel px-4 py-2.5 underline-offset-4 hover:underline"
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
    <figure className={styles.evidence}>
      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <div className="min-w-0 border-t border-foreground/20 pt-4">
          <p className={styles.meta}>
            {example.inputLabel}
          </p>
          <p className="mt-3 whitespace-pre-line">
            {example.input}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="self-center text-center font-serif text-xl text-muted rotate-90 md:rotate-0"
        >
          →&#xFE0E;
        </span>
        <div className="min-w-0 border-t border-foreground/20 pt-4">
          <p className={styles.meta}>
            {example.outputLabel}
          </p>
          <p className="mt-3 whitespace-pre-line">
            {example.output}
          </p>
        </div>
      </div>
      <figcaption className={styles.caption}>
        A simplified view of how {title} turns an input into a useful outcome.
      </figcaption>
    </figure>
  );
}

function HeroImage({
  project,
  media,
}: {
  project: SoftwareProject;
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
      className="h-auto w-full"
    />
  );

  return (
    <figure className="min-w-0">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {image}
          <span className="sr-only">
            Visit the live project (opens in a new tab)
          </span>
        </a>
      ) : (
        image
      )}
      <figcaption className={styles.caption}>
        {media.caption}
      </figcaption>
    </figure>
  );
}

function VideoShowcase({
  project,
  videos,
}: {
  project: Project;
  videos: ProjectVideo[];
}) {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className={styles.meta}>
            Product walkthroughs
          </p>
          <p className={styles.caption}>
            Four short demonstrations, ordered by the clearest view of the core
            experience.
          </p>
        </div>
        <p className={styles.meta}>
          {videos.length} videos
        </p>
      </div>

      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, index) => {
          const isFeatured = index === 0;

          return (
            <li
              key={video.src}
              className={isFeatured ? "md:col-span-2 lg:col-span-3" : "min-w-0"}
            >
              <figure className="min-w-0">
                <div className="relative bg-panel-sunken">
                  <video
                    controls
                    playsInline
                    preload="none"
                    aria-label={`${video.title} — video ${index + 1} of ${videos.length} for ${project.title}`}
                    className="aspect-video w-full object-contain"
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support embedded video.
                  </video>
                </div>
                <figcaption className={styles.caption}>
                  <h3 className={`${styles.subheading} text-foreground`}>
                    {video.title}
                  </h3>
                  <p className="mt-2">
                    {video.description}
                  </p>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ProjectHero({ project }: { project: SoftwareProject }) {
  if (project.videos?.length) {
    return <VideoShowcase project={project} videos={project.videos} />;
  }

  if (project.video) {
    return (
      <figure className="min-w-0">
        <video
          controls
          playsInline
          preload="metadata"
          poster={project.videoPoster}
          aria-label={`Video demonstration of ${project.title}`}
          className="w-full"
        >
          <source src={project.video} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
        <figcaption className={styles.caption}>
          {project.videoCaption ??
            `A guided demonstration of ${project.title}.`}
        </figcaption>
      </figure>
    );
  }

  if (project.videoPlaceholder) {
    return (
      <figure className="min-w-0">
        <div className="flex aspect-video items-center justify-center bg-panel-sunken p-8 text-center">
          <div>
            <svg
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-muted"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="m20 16 13 8-13 8V16Z" fill="currentColor" />
            </svg>
            <p className={`${styles.meta} mt-5`}>
              Video walkthrough
            </p>
            <p className={styles.caption}>
              Coming soon
            </p>
          </div>
        </div>
        <figcaption className={styles.caption}>
          {project.videoCaption ??
            `A guided demonstration of ${project.title} will be added here.`}
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
    generatedProjects.map((candidate, index) => [candidate.slug, index]),
  );

  return generatedProjects
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

  if (project.caseStudy !== undefined) {
    const study = caseStudies[project.caseStudy];
    if (!study) throw new Error(`Missing case study: ${project.caseStudy}`);
    return <SecurityCaseStudy project={project} study={study} />;
  }

  const supportingScreenshots =
    project.videos?.length || project.video || project.videoPlaceholder
      ? project.screenshots.slice(
          project.videoPoster && !project.showVideoPosterInGallery ? 1 : 0,
        )
      : project.screenshots.slice(1);

  return (
    <ProjectShell area="software">
      <article className={styles.article}>
        <header className={`${styles.header} ${styles.measure} ${styles.centered}`}>
          <p className={`${styles.meta} flex flex-wrap items-center gap-x-3 gap-y-2`}>
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
              <span className="border-l-2 border-area-accent pl-2">
                Work in progress
              </span>
            )}
          </p>
          <h1 className={styles.title}>
            {project.title}
          </h1>
          <p className={styles.lede}>
            {project.tagline}
          </p>
          <ProjectLinks project={project} />

          <dl className={`${styles.divider} mt-7 grid gap-x-6 gap-y-4 sm:grid-cols-2`}>
            <div>
              <dt className={styles.meta}>
                Platforms
              </dt>
              <dd className="mt-1 text-base leading-relaxed">
                {project.platforms.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className={styles.meta}>
                Focus
              </dt>
              <dd className="mt-1 text-base leading-relaxed">
                {project.highlights.map((item) => item.title).join(" · ")}
              </dd>
            </div>
          </dl>
        </header>

        <section aria-labelledby="project-view-heading" className="mt-10">
          <h2 id="project-view-heading" className="sr-only">
            Project view
          </h2>
          <ProjectHero project={project} />
        </section>

        <div className={`${styles.measure} ${styles.centered} ${styles.sections} mt-14`}>
          <section aria-labelledby="story-heading" className={styles.flow}>
            <h2 id="story-heading" className={styles.heading}>The story</h2>
            <h3 className={styles.subheading}>{project.problemTitle ?? "The problem"}</h3>
            <p>{project.problem}</p>
            <h3 className={styles.subheading}>What it delivers</h3>
            <p>{project.solution}</p>
          </section>

          <section aria-labelledby="highlights-heading" className={`${styles.divider} ${styles.flow}`}>
            <h2 id="highlights-heading" className={styles.heading}>At a glance</h2>
            <ul className="space-y-6">
              {project.highlights.map((highlight) => (
                <li key={highlight.title}>
                  <h3 className={styles.subheading}>{highlight.title}</h3>
                  <p className="mt-2">{highlight.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="proof-heading" className={`${styles.divider} ${styles.flow}`}>
            <h2 id="proof-heading" className={styles.heading}>Built with</h2>
            <ul aria-label="Technology stack" className="flex flex-wrap gap-2">
              {project.techStack.map((technology) => (
                <TechnologyBadge as="li" key={technology} technology={technology} variant="full" />
              ))}
            </ul>
            <ul className="space-y-6">
              {project.technicalProof.map((proof) => (
                <li key={proof.title}>
                  <h3 className={styles.subheading}>{proof.title}</h3>
                  <p className="mt-2">{proof.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {supportingScreenshots.length > 0 && (
          <section aria-labelledby="screenshots-heading" className="mt-(--article-section-gap)">
            <h2
              id="screenshots-heading"
              className={styles.heading}
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
    </ProjectShell>
  );
}
