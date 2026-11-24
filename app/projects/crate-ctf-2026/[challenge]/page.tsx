import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../_editorial/article.module.css";
import { projectPath, writeUps } from "../write-ups";

type Props = { params: Promise<{ challenge: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return writeUps.map(({ slug }) => ({ challenge: slug }));
}

async function getWriteUp(params: Props["params"]) {
  const { challenge } = await params;
  const writeUp = writeUps.find(({ slug }) => slug === challenge);
  if (!writeUp) notFound();
  return writeUp;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const writeUp = await getWriteUp(params);
  return {
    title: `${writeUp.title} | Crate-CTF 2026`,
    description: writeUp.summary,
    alternates: { canonical: `${projectPath}/${writeUp.slug}` },
  };
}

export default async function WriteUpPage({ params }: Props) {
  const writeUp = await getWriteUp(params);

  return (
    <article className={`${styles.article} ${styles.measure} ${styles.centered} mt-8`}>
      <Link href={projectPath} className={`link-rule inline-block py-2 ${styles.meta}`}>
        Crate-CTF 2026 overview
      </Link>
      <header className={styles.header}>
        <p className={styles.meta}>{writeUp.category}</p>
        <h1 className={styles.title}>{writeUp.title}</h1>
        <p className={styles.lede}>{writeUp.summary}</p>
        <dl className={`${styles.divider} mt-6`}>
          <dt className={styles.meta}>Techniques and tools</dt>
          <dd className="mt-1">{writeUp.techniques}</dd>
        </dl>
        <p className={`${styles.meta} mt-4`}>Solution reconstructed from the challenge answer key.</p>
      </header>
      <div className={styles.sections}>
        {writeUp.sections.map(({ title, body }, index) => (
          <section key={title} aria-labelledby={`write-up-section-${index}`}>
            <h2 id={`write-up-section-${index}`} className={styles.heading}>{title}</h2>
            <p className="mt-4">{body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
