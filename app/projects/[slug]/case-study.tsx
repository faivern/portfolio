import Link from "next/link";
import type { Project } from "../data";
import type { CaseBlock, CaseStudy } from "@/content/case-studies/types";
import { TechnologyBadge } from "@/lib/technology-badge";
import { ThemeToggle } from "@/lib/theme-toggle";
import CaseStudyNav from "./case-study-nav";
import ScreenshotGallery from "./screenshot-gallery";

function blockText(block: CaseBlock): string {
  switch (block.type) {
    case "paragraph":
      return block.text;
    case "code":
      return `${block.caption} ${block.code}`;
    case "images":
      return block.images.map((image) => image.alt).join(" ");
    case "diagram":
      return `${block.caption} ${block.nodes.map((n) => `${n.title} ${n.detail}`).join(" ")}`;
    case "timeline":
      return block.items.map((i) => `${i.title} ${i.detail}`).join(" ");
    case "table":
      return `${block.caption} ${block.headers.join(" ")} ${block.rows.flat().join(" ")}`;
  }
}

function readingMinutes(study: CaseStudy): number {
  const words = study.sections
    .flatMap((section) => [section.title, ...section.blocks.map(blockText)])
    .join(" ")
    .trim()
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Ordered longest-match-first: a comment swallows anything that looks like a
// tag inside it, and tags are claimed before the bare-identifier attribute
// rule so an element name is never mistaken for an attribute.
const xmlToken =
  /(<!--[\s\S]*?-->)|("[^"]*")|(<\/?[\w:.-]+|\/?>)|([\w:.-]+)(?==)/g;

// Index matches the capture group order above.
const xmlTokenClass = [
  "text-(--code-comment)",
  "text-(--code-string)",
  "font-semibold text-(--code-tag)",
  "text-(--code-attr)",
];

function highlightXml(code: string) {
  const out: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of code.matchAll(xmlToken)) {
    if (match.index > cursor) out.push(code.slice(cursor, match.index));
    const group = match.findIndex((g, i) => i > 0 && g !== undefined) - 1;
    out.push(
      <span key={match.index} className={xmlTokenClass[group]}>
        {match[0]}
      </span>,
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < code.length) out.push(code.slice(cursor));

  return out;
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="leading-7">{block.text}</p>;
    case "images":
      return (
        <ScreenshotGallery
          title="Investigation evidence"
          screenshots={block.images}
        />
      );
    case "code":
      return (
        <figure className="min-w-0 rounded-md border border-foreground/20 bg-panel">
          <figcaption className="border-b border-foreground/15 px-4 py-3 text-xs text-muted">
            {block.caption}
          </figcaption>
          <pre
            tabIndex={0}
            aria-label={block.caption}
            className="overflow-x-auto p-4 text-sm leading-7"
          >
            <code>
              {block.language === "xml"
                ? highlightXml(block.code)
                : block.code}
            </code>
          </pre>
        </figure>
      );
    case "diagram":
      return (
        <figure className="paper-panel border border-foreground/15 p-5">
          <ol className="grid gap-5 md:grid-cols-3">
            {block.nodes.map((node, index) => (
              <li key={node.title} className="border-l border-area-accent pl-4">
                <p className="text-xs text-muted">
                  0{index + 1}{" "}
                  {index < block.nodes.length - 1 && (
                    <span aria-hidden="true">→</span>
                  )}
                </p>
                <p className="mt-2 font-semibold">{node.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {node.detail}
                </p>
              </li>
            ))}
          </ol>
          <figcaption className="mt-5 text-xs leading-6 text-muted">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "timeline":
      return (
        <ol className="space-y-5 border-l border-foreground/20 pl-5">
          {block.items.map((item) => (
            <li key={item.title}>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 leading-7 text-muted">{item.detail}</p>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div
          className="overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label={block.caption}
        >
          <table className="w-full text-left text-sm leading-6">
            <caption className="mb-3 text-left text-muted">
              {block.caption}
            </caption>
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th
                    scope="col"
                    key={h}
                    className="border-b border-foreground/30 p-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th
                        key={j}
                        scope="row"
                        className="border-b border-foreground/15 p-3 font-medium"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td key={j} className="border-b border-foreground/15 p-3">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
export default function SecurityCaseStudy({
  project,
  study,
}: {
  project: Project;
  study: CaseStudy;
}) {
  return (
    <div className="project-surface area-security flex flex-1 justify-center px-6 py-14 sm:px-8 sm:py-20">
      <article className="w-full max-w-5xl min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/projects"
            className="link-rule py-2 text-xs tracking-[0.2em] text-muted"
          >
            ← All projects
          </Link>
          <ThemeToggle />
        </div>
        <header className="mt-8">
          <p className="text-xs leading-6 text-muted">{study.context}</p>
          <h1 className="mt-5 max-w-4xl font-serif text-3xl leading-tight tracking-[0.04em] sm:text-5xl">
            {project.title}
          </h1>
        </header>
        <hr className="my-10 rule-accent" />
        <div className="grid items-start gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-8">
            <nav aria-label="Case study sections">
              <p className="mb-3 text-xs text-muted">Contents</p>
              <CaseStudyNav
                sections={[
                  ...study.sections.map(({ id, title }) => ({ id, title })),
                  ...(project.githubUrl || study.techniques?.length || study.sources?.length
                    ? [{ id: "full-write-up", title: study.sources?.length ? "Sources & tools used" : "Full technical write-up" }]
                    : []),
                ]}
              />
            </nav>
            <p className="mt-5 pl-3 text-xs text-muted">
              {readingMinutes(study)} min read
            </p>
            <ul className="mt-5 flex flex-wrap gap-1.5 pl-3">
              {project.techStack.map((technology) => (
                <TechnologyBadge
                  as="li"
                  key={technology}
                  technology={technology}
                  variant="profile"
                />
              ))}
            </ul>
          </div>
          <div className="min-w-0 space-y-12">
            {study.sections.map((section) => (
              <section
                key={section.id}
                aria-labelledby={section.id}
                className="reveal scroll-mt-8"
              >
                <h2
                  id={section.id}
                  tabIndex={-1}
                  className="font-serif text-2xl tracking-[0.05em]"
                >
                  {section.title}
                </h2>
                <div className="mt-5 min-w-0 space-y-5 font-sans text-sm normal-case tracking-normal [text-shadow:none]">
                  {section.blocks.map((block, index) => (
                    <Block key={index} block={block} />
                  ))}
                </div>
              </section>
            ))}
            {(project.githubUrl || study.techniques?.length || study.sources?.length) && <section
              aria-labelledby="full-write-up"
              className="scroll-mt-8 border-t border-foreground/20 pt-8"
            >
              <h2
                id="full-write-up"
                tabIndex={-1}
                className="font-serif text-2xl"
              >
                {study.sources?.length ? "Sources & tools used" : "Full technical write-up"}
              </h2>
              <p className="mt-4 font-sans text-sm leading-7 normal-case tracking-normal">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="underline underline-offset-4"
                  >
                    Repository, configuration, and complete evidence on GitHub ↗
                  </a>
                )}
              </p>
              {study.techniques?.map((t) => (
                <p
                  key={t.id}
                  className="mt-4 font-sans text-sm normal-case tracking-normal text-muted"
                >
                  <a href={t.url} className="underline underline-offset-4">
                    MITRE ATT&amp;CK {t.id} · {t.name} ↗
                  </a>
                </p>
              ))}
              {study.sources?.map((source) => (
                <p
                  key={source.url}
                  className="mt-4 font-sans text-sm leading-7 normal-case tracking-normal"
                >
                  <a href={source.url} className="underline underline-offset-4">
                    {source.title} ↗
                  </a>
                  <span className="mt-1 block text-muted">{source.detail}</span>
                </p>
              ))}
              {!!study.sources?.length && (
                <div className="mt-6">
                  <h3 className="font-sans text-sm font-semibold normal-case tracking-normal">
                    Tools used
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
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
              )}
            </section>}
          </div>
        </div>
      </article>
    </div>
  );
}
