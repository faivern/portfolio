"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../_editorial/article.module.css";

export default function CaseStudyNav({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const disclosureRef = useRef<HTMLDetailsElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const disclosure = disclosureRef.current;
    if (!disclosure) return;
    const wide = window.matchMedia("(min-width: 72rem)");

    function syncDisclosure() {
      if (disclosure) disclosure.open = wide.matches;
    }

    syncDisclosure();
    wide.addEventListener("change", syncDisclosure);
    return () => wide.removeEventListener("change", syncDisclosure);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const item = Array.from(list?.children ?? []).find(
      (child): child is HTMLElement =>
        child instanceof HTMLElement && child.dataset.section === activeId,
    );
    if (!list || !item) return;

    function updateMarker() {
      if (!list || !item) return;
      list.parentElement?.style.setProperty("--thumb-top", `${item.offsetTop}px`);
      list.parentElement?.style.setProperty("--thumb-height", `${item.offsetHeight}px`);
    }

    updateMarker();
    const observer = new ResizeObserver(updateMarker);
    observer.observe(list);
    return () => observer.disconnect();
  }, [activeId]);

  useEffect(() => {
    const headings = sections
      .map(({ id }) => document.getElementById(id))
      .filter((heading): heading is HTMLElement => heading !== null);
    let frame = 0;

    function updateActive() {
      frame = 0;
      const readingLine = window.innerHeight * 0.25;
      const atEnd =
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
      const current = atEnd
        ? headings.at(-1)
        : headings.findLast((heading) => heading.getBoundingClientRect().top <= readingLine);
      setActiveId(current?.id ?? headings[0]?.id);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [sections]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }

  return (
    <nav aria-label="Case study sections" className={styles.contents}>
      <details ref={disclosureRef}>
        <summary className={`${styles.meta} list-item w-fit cursor-pointer py-2`}>
          Contents
        </summary>
        <div className="relative mt-2 border-l border-foreground/15">
          <span aria-hidden="true" className="cs-nav-thumb" />
          <ol ref={listRef} className="space-y-1 text-sm leading-snug">
            {sections.map((section) => {
              const isActive = section.id === activeId;
              return (
                <li key={section.id} data-section={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => handleClick(event, section.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`link-rule inline-block py-1.5 pr-1 pl-3 ${
                      isActive ? "font-semibold text-foreground" : "text-muted"
                    }`}
                  >
                    {section.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </details>
    </nav>
  );
}
