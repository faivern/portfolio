"use client";

import { useSyncExternalStore } from "react";

/** One shape that becomes the other: the disc keeps its centre while a
 *  masking circle slides in to carve the crescent and the rays retract into
 *  it. Styled from `.theme-morph-*` in globals.css, driven by the button's
 *  data-mode. */
function ThemeMorphIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <mask
        id="theme-morph-crescent"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect x="0" y="0" width="24" height="24" fill="white" />
        <circle className="theme-morph-cut" cx="30" cy="-6" r="8" fill="black" />
      </mask>
      <circle
        className="theme-morph-body"
        cx="12"
        cy="12"
        r="5"
        fill="currentColor"
        mask="url(#theme-morph-crescent)"
      />
      <g
        className="theme-morph-rays"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        {/* The retract and the idle turn are kept on separate groups: one
            transform property each, so neither cancels the other. */}
        <g className="theme-morph-spin">
          <path d="M12 1.4v2.3M12 20.3v2.3M1.4 12h2.3M20.3 12h2.3M4.4 4.4l1.7 1.7M17.9 17.9l1.7 1.7M19.6 4.4l-1.7 1.7M6.1 17.9l-1.7 1.7" />
        </g>
      </g>
    </svg>
  );
}

// The <html> class set by the root layout's pre-paint script is the
// source of truth, so this reads the DOM rather than holding its own
// copy. Prerendering has no DOM, so the server snapshot assumes the dark
// default, which is what the pre-paint script applies for most visitors.
let listeners: (() => void)[] = [];

function subscribe(onChange: () => void) {
  listeners = [...listeners, onChange];
  return () => {
    listeners = listeners.filter((listener) => listener !== onChange);
  };
}

function isDark() {
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => true);

  function toggle() {
    document.documentElement.classList.toggle("dark", !dark);
    try {
      localStorage.setItem("theme", dark ? "light" : "dark");
    } catch {
      // Private-browsing storage denial: the choice just won't persist.
    }
    listeners.forEach((listener) => listener());
  }

  return (
    <button
      type="button"
      onClick={toggle}
      data-mode={dark ? "dark" : "light"}
      className="theme-toggle inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-serif text-[0.65rem] tracking-[0.2em] text-muted hover:text-foreground"
    >
      <ThemeMorphIcon className="h-[1.1rem] w-[1.1rem] shrink-0" />
      <span className="theme-toggle-label">
        {dark ? "Light theme" : "Dark theme"}
      </span>
    </button>
  );
}
