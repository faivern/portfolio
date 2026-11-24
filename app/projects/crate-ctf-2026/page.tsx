import type { Metadata } from "next";
import { TbArrowUpRight, TbWorld } from "react-icons/tb";
import { categoryResults, challengesSolved, challengesTotal } from "./results";
import editorial from "../_editorial/article.module.css";
import styles from "./results.module.css";
import { projectPath, writeUps } from "./write-ups";

const description = "My first solo CTF, with competition results and previews of three write-ups on digital forensics and OSINT.";

export const metadata: Metadata = {
  title: "Crate-CTF 2026",
  description,
  alternates: { canonical: projectPath },
};

const teamsWithSolves = 307;

const results = [
  { label: "Overall team ranking", rank: 119, total: teamsWithSolves },
  { label: "Unofficial solo team ranking", rank: 32, total: 139 },
];

const completionRate = (challengesSolved / challengesTotal) * 100;

export default function CrateCtfPage() {
  return (
    <article className={`${editorial.article} ${editorial.measure} ${editorial.centered} ${editorial.sections}`}>
      <header className={editorial.header}>
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          <div>
            <p className={editorial.meta}>
              Cybersecurity competition · <time dateTime="2026-11-21">November 21, 2026</time>
            </p>
            <h1 className={editorial.title}>Crate-CTF 2026</h1>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/crate-ctf-2026/ctf_2026.svg"
            alt=""
            width={359}
            height={359}
            className="size-20 shrink-0 sm:size-32"
          />
        </div>
        <hr className="my-7 rule-accent" />
        <p className={editorial.lede}>
          I entered my first competitive Capture the Flag event solo as <strong>altunderctrl</strong>.
          The Swedish Defence Research Agency (FOI) and the Swedish Armed Forces hosted the annual
          Jeopardy-style competition online.
        </p>
        <a
          href="https://ctf2.crate.foi.se/"
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-foreground/20 bg-panel px-3.5 py-2 text-sm font-medium transition-colors duration-200 hover:border-area-accent"
        >
          <TbWorld aria-hidden="true" className="size-5 shrink-0 text-area-accent" />
          Visit FOI’s Crate-CTF site
          <TbArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
        </a>
      </header>

      <section aria-labelledby="competition-results">
        <h2 id="competition-results" className={editorial.heading}>Competition results</h2>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className={`${editorial.divider} sm:col-span-2`}>
            <dt className="text-sm text-muted">Challenges solved</dt>
            <dd className="mt-2">
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
                <span className="font-serif text-5xl leading-none tabular-nums sm:text-6xl">
                  {challengesSolved} <span className="text-3xl text-muted sm:text-4xl">/ {challengesTotal}</span>
                </span>
                <span className="text-sm text-muted">
                  <strong className="font-medium tabular-nums text-foreground">{completionRate.toFixed(1)}%</strong> completion
                </span>
              </div>
              <div aria-hidden="true" className={`${styles.track} mt-5 h-3.5 sm:h-4`}>
                <span className={`${styles.fill} ${styles.featuredFill}`} style={{ width: `${completionRate}%` }} />
              </div>
            </dd>
          </div>
          {results.map(({ label, rank, total }) => (
            <div key={label} className="border-t border-foreground/15 py-4">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="mt-0.5 font-serif text-3xl leading-none tabular-nums">
                {rank} <span className="text-xl text-muted">/ {total}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className={editorial.caption}>
          The event had <strong className="font-bold">1,388</strong> registered users and{" "}
          <strong className="font-bold">458</strong> teams, of which{" "}
          <strong className="font-bold">{teamsWithSolves}</strong> solved at least one challenge.
          The unofficial solo ranking is based on one-member teams only.
        </p>
      </section>

      <section aria-labelledby="category-completion">
        <h2 id="category-completion" className={editorial.heading}>Completion by category</h2>
        <dl className="mt-5 divide-y divide-foreground/15 border-y border-foreground/15">
          {categoryResults.map(({ name, solved, total }) => {
            const rate = (solved / total) * 100;
            return (
              <div key={name} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-2.5 py-4">
                <dt className="text-sm font-medium">{name}</dt>
                <dd className="flex items-baseline gap-2 text-right text-xs tabular-nums text-muted sm:gap-3 sm:text-sm">
                  <span>{solved}/{total} solved</span>
                  <strong className="min-w-[4ch] font-medium text-foreground">{rate}%</strong>
                </dd>
                <dd aria-hidden="true" className={`${styles.track} col-span-2 h-1.5`}>
                  <span className={styles.fill} style={{ width: `${rate}%` }} />
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      <section aria-labelledby="technical-write-ups">
        <h2 id="technical-write-ups" className={editorial.heading}>Selected technical write-ups</h2>
        <ul className="mt-5 space-y-6">
          {writeUps.map((writeUp) => (
            <li key={writeUp.slug} className="border-t border-foreground/15 pt-5">
              <p className="text-sm text-muted">{writeUp.category}</p>
              <h3 className={`${editorial.subheading} mt-2`}>{writeUp.title}</h3>
              <p className="mt-3 mb-2">{writeUp.summary}</p>
              <p className="mt-auto text-sm text-muted">Write-up coming soon.</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="reflections" className={editorial.flow}>
        <h2 id="reflections" className={editorial.heading}>Reflections</h2>
        <p>
          As my first competitive CTF, Crate-CTF was an opportunity to put my cybersecurity knowledge
          into practice under time pressure. Competing solo meant constantly evaluating whether to
          continue investigating a challenge, approach it from a different angle, or move on. Some of
          the most rewarding challenges involved connecting seemingly unrelated clues, working with
          unfamiliar file formats, and combining multiple tools to uncover hidden information.
        </p>
        <p>
          The competition also highlighted both my strengths and areas for further development.
          While my limited experience with binary exploitation made those challenges less approachable,
          I felt considerably more comfortable with OSINT, web security, cryptography, and digital
          forensics. In particular, I enjoyed the investigative nature of the challenges, where
          curiosity, attention to detail, and unconventional thinking were often just as important as
          technical knowledge.
        </p>
        <p>
          I also experimented with AI-assisted reverse engineering. Having followed the rapid
          development of AI coding and reasoning capabilities, I was curious to see how effectively
          these tools could support binary analysis in a practical setting. It provided an interesting
          perspective on how AI can complement traditional cybersecurity tools and human reasoning.
        </p>
        <p>
          Overall, the competition reinforced my interest in investigative cybersecurity and gave me a
          clearer understanding of where my strengths lie and which skills I would like to develop
          further.
        </p>
      </section>
    </article>
  );
}
