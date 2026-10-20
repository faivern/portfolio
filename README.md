# Portfolio: Gustaf FAIVRE

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript
and Tailwind CSS 4. Fully static, no tracking, no cookies.

## Getting Started

```bash
npm install
npm run dev     # development server
npm run build   # static export → out/ (plain HTML/CSS/JS, no Node server)
npm run lint    # ESLint (flat config, includes jsx-a11y rules)
```

The site is a fully static export (`output: "export"` in `next.config.ts`).
Deploy by copying `out/` to any static web server; `deploy/nginx.conf` is the
reference nginx config (security headers, routing, 404, MIME fixes) for the
Raspberry Pi host.

The reference config also supports Cloudflare Tunnel on
`127.0.0.1:8080`. Keep its proxy-safe relative redirects and the
`$uri.html`-first route lookup intact: Next.js emits same-named route
directories alongside HTML files, and allowing nginx to select a directory
first leaks the internal port in its automatic trailing-slash redirect.

Set the canonical origin before deploying (used by OpenGraph, sitemap and
robots.txt):

```bash
cp .env.example .env.local   # then edit NEXT_PUBLIC_SITE_URL
```

## Editing Content

- Site-wide identity, links, profile, technical stack and description:
  `lib/site.ts`. The business-card reverse presents the stack in four concise
  groups; project pages provide the project-specific technical context.
- Tech-stack icon assignments: `lib/technology-badge.tsx`. Icons come from a
  generated local subset of `tech-stack-icons`; add new catalog IDs to
  `scripts/generate-tech-stack-icons.mjs` and run
  `npm run generate:tech-icons`. Do not edit the generated file directly.
  Supplemental icons use locally bundled `react-icons`: Simple Icons for
  Wireshark and VMware, and Tabler shield/terminal symbols for Wazuh, OpenSSH,
  CyberChef, dCode, and ExifTool
  (representative symbols, not their brand logos). Assignments and colours live
  in `lib/technology-badge.tsx`.
- Projects: `app/projects/data.ts`; media lives in
  `public/projects/<slug>/` and is referenced by absolute path. Detail pages
  are ultra-short editorial case studies for recruiters: a human `tagline`,
  `problem`, `solution`, three titled `highlights`, and two short
  `technicalProof` entries. Keep the main copy below roughly 200 words and
  explain why an engineering choice matters instead of writing documentation.
  `description` is the concise metadata summary. Each screenshot supplies
  intrinsic dimensions, descriptive alt text, and a visible caption; optional
  `example` data renders a first-party input/output visual for projects without
  screenshots. Set `videoPlaceholder` while a walkthrough is pending so every
  screenshot remains under "A closer look"; replace it with `video` when the
  local MP4 is ready. Set `videoCaption` for a project-specific visible caption.
  An optional `videoPoster` uses the matching first screenshot as the poster and
  keeps it out of the gallery. For a video-only case study, use the ordered
  `videos` array; its first item is featured and every item needs a short,
  descriptive `title` and `description`. All projects live on `/projects`; the
  business-card reverse instead holds the short profile and grouped technical
  stack from `lib/site.ts`.
  Use `areas` for browsing interests and `projectType` for the card label.
  Use `category` for the single primary engineering focus and `platforms` for
  important interfaces or architectural surfaces; `projectCategories` defines
  display order. Related-project cards prefer the same category, then shared
  platforms.

## Conventions

### Theming

- All colours come from the tokens in `app/globals.css`: `--background`,
  `--foreground`, `--muted`, `--accent`, `--accent-software`,
  `--accent-security`, `--focus`, the
  card-stock surfaces (`--panel`, `--panel-edge`, `--panel-sunken`,
  `--panel-raised`, `--panel-tint`) and the case-study code colours
  (`--code-string`, `--code-tag`, `--code-attr`, `--code-comment`). Do not
  hardcode hex values in components; use the token utilities (`bg-panel`,
  `bg-panel-sunken`, `text-(--code-tag)`) so both themes stay correct.
- There are two area inks, and a surface chooses one rather than naming it.
  `.area-software` sets `--area-accent` to `--accent-software` (TypeScript
  blue), `.area-security` sets it to `--accent-security` (terminal green).
  `--accent` (antique gold) is neither area's ink; it is the neutral fallback
  for unmarked surfaces and for general furniture. Accent-coloured
  furniture reads `var(--area-accent, var(--accent))`, or the `area-accent`
  Tailwind utility (`text-area-accent`, `bg-area-accent`,
  `border-area-accent`), so an unmarked subtree — the home card, `/privacy`,
  the footer — falls back to the gilt. `/projects` applies the class per card
  and per filter chip, which is why both inks show at once there. Never point
  new furniture at `--accent` directly.
- Dark mode is opt-in per page: a page's root element carries
  `project-surface`, and the dark tokens are scoped to
  `html.dark:has(.project-surface)`. The home page keeps its bone business
  card on a dark desk, and `/privacy` stays on paper, so neither opts in.
- Dark is the default. With nothing stored, the pre-paint script applies it
  unless the browser reports an explicit `prefers-color-scheme: light`, so an
  OS light preference still wins on a first visit.
- `lib/theme-toggle.tsx` renders the control (placed in the top row of each
  project page beside the back link). The `dark` class on `<html>` is the
  single source of truth; the inline script in `app/layout.tsx` applies the
  stored choice, or the default above, before first paint. The icon is one
  disc that morphs between sun and moon via CSS geometry properties
  (`.theme-morph-*`), with the ray retraction and the hover spin on separate
  groups so the two transforms do not cancel each other. The choice
  persists in `localStorage` under `theme` (functional state only, not a
  cookie and not tracking).
- Re-verify contrast when changing any token: `--muted` must stay >= 4.5:1
  against both `--background` and `--panel` in both themes.

### Motion

- One easing curve across the site: `cubic-bezier(0.22, 0.61, 0.36, 1)`. It is
  an ease-out with no overshoot — nothing bounces.
- Shared utilities in `app/globals.css`: `.reveal` (sections rise as they enter
  the viewport), `.project-card-stagger` (cards are dealt; the markup sets `--i`
  per card and caps it), `.link-rule` (an underline that wipes in from the
  left, measured from the content box so padded touch targets still hug the
  text) and `.cs-nav-thumb` (the case-study nav marker, positioned from
  `--thumb-top`/`--thumb-height` measured in `case-study-nav.tsx`).
- The two area filter chips on `/projects` announce their area on hover: the
  outline takes `--area-accent`, the Software Development chip raises a
  drifting blueprint grid (`.chip-blueprint`, declared paused and resumed on
  hover so leaving freezes rather than snaps back) and the Cybersecurity chip
  runs falling glyphs on a canvas (`app/projects/matrix-rain.tsx`, which bails
  out entirely under reduced motion and keeps its loop alive past hover-out
  only to fade the trails).
- Every effect needs an explicit `prefers-reduced-motion: reduce` escape, and
  the reduced-motion state must still convey the same information — e.g. the
  underline is present statically rather than absent.
- Scroll-driven animations are a special case: they must sit inside
  `@media (prefers-reduced-motion: no-preference)`. The global
  `animation-duration` clamp does nothing to them, because a `view()` timeline
  takes its progress from scroll position rather than elapsed time. Keep them
  behind `@supports (animation-timeline: view())` too, so unsupporting browsers
  never apply the rule and content is never stranded at `opacity: 0`, and keep
  the `animation-range` short so a section near the end of the document still
  completes.

### Accessibility (WCAG 2.2 AA)

- Semantic landmarks live in `app/layout.tsx` (`main`) and
  `lib/site-footer.tsx` (`footer`); pages render inside the shared
  `<main id="content">`. The footer renders on every page except `/`, where
  the business card already carries the contact links. There is no site-wide
  header/navbar, contact links live on the front of the home-page business
  card; a short profile and technical stack are on its reverse (card flip on
  click, instant swap under reduced motion), with no nested scrolling. The full
  work index lives on `/projects`.
- First focusable element is a "skip to main content" link.
- Never use `text-foreground/<opacity>` for text, it fails contrast
  requirements. Use the `text-muted` token (4.95:1) for secondary text
  instead. See `app/globals.css`.
- All three accents (`--accent` muted gold, `--accent-software` blue,
  `--accent-security` green) are decorative
  furniture only (hairline rules, the monogram, underlines, icons), never body
  text, where they fail WCAG AA contrast on the bone stock. As non-text UI they
  must still clear 3:1 (WCAG 1.4.11) against the surface behind them.
- Keep focus styles intact (`:focus-visible` in `app/globals.css`); test
  keyboard-only navigation after UI changes.
- New pages must keep heading hierarchy (one `<h1>`, ordered `<h2>`s) and
  label sections with `aria-labelledby`.
- Images require descriptive `alt`; videos need an accessible name and,
  where meaningful audio exists, captions (`<track kind="captions">`).

### Privacy (GDPR)

- The site sets no cookies and runs no analytics, do not add any without
  also adding a consent mechanism and updating `/privacy`.
- Fonts are self-hosted via `next/font` (no third-party requests).
- Privacy policy lives at `/privacy`; update "Last updated" when it changes.

### Security

- HTTP security headers (CSP, HSTS, nosniff, frame-ancestors, Referrer-Policy,
  Permissions-Policy) are configured in `deploy/nginx.conf`, a static export
  cannot set headers from `next.config.ts`, so nginx owns them.
- The CSP allows inline scripts because the site is statically rendered
  (no per-request nonce). If you move to dynamic rendering, switch to a
  nonce-based CSP (see the Next.js CSP guide, `proxy.ts`).
- Never reintroduce server-only features (`headers()`/`redirects()`/
  `rewrites()` in `next.config.ts`, server actions, request-reading route
  handlers, the default `next/image` optimizer), they break `output: "export"`.

### SEO

- `metadataBase` comes from `NEXT_PUBLIC_SITE_URL` (`lib/site.ts`).
- Root metadata + OpenGraph/Twitter cards: `app/layout.tsx`; per-project
  metadata: `app/projects/[slug]/page.tsx` (`generateMetadata`).
- `robots.txt`, `sitemap.xml` and the web app manifest are generated by
  `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`.
- A `Person` + `WebSite` JSON-LD `@graph` is injected in `app/layout.tsx`
  (plain-form name, `sameAs` profiles, `knowsAbout` collected from the
  project tech stacks). The stylized display name (`Gustaf FAIVRE`) stays
  visual-only; metadata and structured data use the plain form.

## Project Structure

```
app/
  layout.tsx            # landmarks, skip link, metadata, JSON-LD
  page.tsx              # home
  globals.css           # design tokens, focus styles, reduced motion
  error.tsx             # client error boundary
  not-found.tsx         # 404
  robots.ts sitemap.ts manifest.ts
  privacy/              # GDPR privacy policy
  projects/             # full index of all projects
  projects/[slug]/      # project detail pages (statically generated)
lib/
  site.ts               # single source of truth for identity/metadata
```

## Security case studies and project discovery

The unified project index has three filters: All Projects, Software Development,
and Cybersecurity. `areas` accepts multiple interests; `category` remains the
specific engineering focus, and `projectType` supplies the card label.
Cybersecurity is reserved for actual security work, self-hosting or
infrastructure alone does not qualify. Software projects retain their existing
showcase layout and URLs.

Index cards show a preview image: the first entry in `screenshots`, or
`cardImage` when a project needs a different one (case studies keep their
evidence in the case-study file, not in `screenshots`). Projects with neither
fall back to a tile bearing their category icon.

On pointer devices a card shows only its preview and title until hover or
keyboard focus unfolds the description, status and technologies. The disclosure
is gated on `(hover: hover) and (pointer: fine)`, so touch devices — which have
no hover state — always show the whole card. The details stay in the DOM in
both cases, so assistive technology and crawlers see them regardless.

Security projects use `caseStudy` to select a typed content file from
`content/case-studies/index.ts`. To add one:

1. Create a file in `content/case-studies/` satisfying `CaseStudy` and register it.
2. Add project metadata in `app/projects/data.ts` with the matching `caseStudy`
   key, a unique slug, areas, project type, technologies, and a repository URL
   when available. Use the case study's optional `sources` array for attributed
   references (title, URL, and a short explanation of their role).
   Software-only story fields are not required for security projects.
3. Add local evidence under `public/projects/<slug>/`, recording its source.
   Supply dimensions, descriptive alt text, and captions. Distinguish recorded
   observations from proposed tests and unknown results.
   Borrowed screenshots use optional media `credit` fields (`author`, `sourceUrl`,
   `license`, `licenseUrl`) for linked attribution below the image; record original
   URLs and any changes in the project's evidence provenance file.
4. Run `npm run lint` and `npm run build`; check mobile reading, keyboard
   filters, section links, and screenshot enlargement.

The reusable renderer supports paragraphs, XML-highlighted configuration,
terminal/code blocks, image galleries, architecture flows, workflow/incident
timelines, and findings tables. Timeline entries should distinguish workflow
order from verified timestamps. The contents navigation comes from section IDs.
Typed content fits the existing TypeScript metadata approach without an MDX
compiler or runtime Markdown dependency. Add new block types only as needed.
Sitemap entries and detail metadata are generated from project metadata; previews
use the first available project or case-study image. `/projects/SOC-001` is the
first security case study, based on the linked repository, with four original
screenshots and a diagram reconstructed from its documented architecture.
`/projects/FRA-Exfiltratoren` documents three of seven CTF flags using screenshots
extracted from the author's PDF. Its evidence provenance is recorded in
`public/projects/FRA-Exfiltratoren/SOURCES.md`; gaps in UDP reconstruction
validation are stated in the article.
