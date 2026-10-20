"use client";

import { useEffect, useRef, useState } from "react";

export default function CaseStudyNav({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const listRef = useRef<HTMLOListElement>(null);

  // Measure the active item and hand its box to the marker, which
  // transitions between positions rather than jumping.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-section="${activeId}"]`);
    if (!list || !item) return;
    list.style.setProperty("--thumb-top", `${item.offsetTop}px`);
    list.style.setProperty("--thumb-height", `${item.offsetHeight}px`);
  }, [activeId, sections]);

  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((heading): heading is HTMLElement => heading !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -70% 0px" },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [sections]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    target.focus({ preventScroll: true });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }

  return (
    <ol
      ref={listRef}
      className="relative space-y-2 border-l border-foreground/15 font-sans text-sm normal-case tracking-normal"
    >
      <span aria-hidden="true" className="cs-nav-thumb" />
      {sections.map((section) => {
        const isActive = section.id === activeId;
        return (
          <li key={section.id} data-section={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(event) => handleClick(event, section.id)}
              aria-current={isActive ? "true" : undefined}
              className={`link-rule inline-block py-1 pl-3 ${
                isActive ? "font-semibold text-foreground" : "text-muted"
              }`}
            >
              {section.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
