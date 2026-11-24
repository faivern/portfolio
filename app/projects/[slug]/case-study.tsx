import type { Project } from "../data";
import type { CaseBlock, CaseStudy } from "@/content/case-studies/types";
import { TechnologyBadge } from "@/lib/technology-badge";
import ProjectShell from "../_editorial/project-shell";
import styles from "../_editorial/article.module.css";
import CaseStudyNav from "./case-study-nav";
import ScreenshotGallery from "./screenshot-gallery";

function blockText(block: CaseBlock): string {
  switch (block.type) {
    case "heading":
    case "paragraph":
      return block.text;
    case "facts":
      return block.items.map((item) => `${item.label} ${item.value}`).join(" ");
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
  "text-muted",
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
    case "heading":
      return <h3 className={`${styles.measure} ${styles.subheading}`}>{block.text}</h3>;
    case "facts":
      return (
        <dl className={`${styles.measure} grid gap-x-6 sm:grid-cols-2`}>
          {block.items.map((item) => (
            <div key={item.label} className="min-w-0 border-b border-foreground/15 py-3">
              <dt className={styles.meta}>{item.label}</dt>
              <dd className="mt-1 text-base leading-relaxed">{item.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "paragraph":
      return <p className={styles.measure}>{block.text}</p>;
    case "images":
      return (
        <div className={styles.evidence}>
          <ScreenshotGallery
            title="Investigation evidence"
            screenshots={block.images}
          />
        </div>
      );
    case "code":
      return (
        <figure className={styles.evidence}>
          <pre
            tabIndex={0}
            aria-label={block.caption}
            className={styles.code}
          >
            <code>
              {block.language === "xml"
                ? highlightXml(block.code)
                : block.code}
            </code>
          </pre>
          <figcaption className={styles.caption}>{block.caption}</figcaption>
        </figure>
      );
    case "diagram":
      return (
        <figure className={styles.evidence}>
          <ol className="grid list-decimal gap-5 pl-6 marker:text-muted sm:grid-cols-3 sm:gap-10">
            {block.nodes.map((node) => (
              <li key={node.title} className="pl-1">
                <p className="mt-2 font-semibold">{node.title}</p>
                <p className="mt-2 text-base leading-relaxed">
                  {node.detail}
                </p>
              </li>
            ))}
          </ol>
          <figcaption className={styles.caption}>
            {block.caption}
          </figcaption>
        </figure>
      );
    case "timeline":
      return (
        <ol className={`${styles.measure} space-y-5 border-l border-foreground/20 pl-5`}>
          {block.items.map((item) => (
            <li key={item.title}>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1">{item.detail}</p>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div
          className={`${styles.evidence} overflow-x-auto`}
          tabIndex={0}
          role="region"
          aria-label={block.caption}
        >
          <table className="w-full text-left text-base leading-relaxed [overflow-wrap:normal]">
            <caption className={`${styles.caption} mb-3 text-left`}>
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
  const hasSources = Boolean(project.githubUrl || study.techniques?.length || study.sources?.length);
  const sourcesTitle = study.sources?.length ? "Sources & tools used" : "Full technical write-up";
  const contents = [
    ...study.sections.map(({ id, title }) => ({ id, title })),
    ...(hasSources ? [{ id: "full-write-up", title: sourcesTitle }] : []),
  ];

  return (
    <ProjectShell area="security">
      <article className={styles.article}>
        <header className={`${styles.header} ${styles.measure}`}>
          <p className={styles.meta}>{study.context}</p>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={`${styles.meta} mt-4`}>{readingMinutes(study)} min read</p>
          <ul aria-label="Technology stack" className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.map((technology) => (
              <TechnologyBadge as="li" key={technology} technology={technology} variant="profile" />
            ))}
          </ul>
        </header>

        <div className={styles.contentsLayout}>
          <CaseStudyNav sections={contents} />
          <div className={`${styles.contentsBody} ${styles.sections} min-w-0`}>
            {study.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className={styles.divider}>
                {section.presentation && (
                  <p className={`${styles.meta} mb-2`}>
                    {section.presentation === "report" ? "Investigation report" : "Investigation story"}
                  </p>
                )}
                <h2
                  id={section.id}
                  tabIndex={-1}
                  className={`${styles.measure} ${styles.heading} ${styles.anchor}`}
                >
                  {section.title}
                </h2>
                <div className={`${styles.flow} mt-5 min-w-0`}>
                  {section.blocks.map((block, index) => (
                    <Block key={index} block={block} />
                  ))}
                </div>
              </section>
            ))}
            {hasSources && (
              <section aria-labelledby="full-write-up" className={`${styles.measure} ${styles.divider} ${styles.flow}`}>
                <h2 id="full-write-up" tabIndex={-1} className={`${styles.heading} ${styles.anchor}`}>
                  {sourcesTitle}
                </h2>
                {project.githubUrl && (
                  <p>
                    <a href={project.githubUrl} className="underline underline-offset-4">
                      Repository, configuration, and complete evidence on GitHub ↗
                    </a>
                  </p>
                )}
                {study.techniques?.map((technique) => (
                  <p key={technique.id}>
                    <a href={technique.url} className="underline underline-offset-4">
                      MITRE ATT&amp;CK {technique.id} · {technique.name} ↗
                    </a>
                  </p>
                ))}
                {study.sources?.map((source) => (
                  <p key={source.url}>
                    <a href={source.url} className="underline underline-offset-4">
                      {source.title} ↗
                    </a>
                    <span className="mt-1 block">{source.detail}</span>
                  </p>
                ))}
                {!!study.sources?.length && (
                  <>
                    <h3 className={styles.subheading}>Tools used</h3>
                    <ul className="flex flex-wrap gap-2">
                      {project.techStack.map((technology) => (
                        <TechnologyBadge as="li" key={technology} technology={technology} variant="full" />
                      ))}
                    </ul>
                  </>
                )}
              </section>
            )}
          </div>
        </div>
      </article>
    </ProjectShell>
  );
}
