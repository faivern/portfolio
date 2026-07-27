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
  keeps it out of the gallery. All projects live on `/projects`; the
  business-card reverse instead holds the short profile and grouped technical
  stack from `lib/site.ts`.
  Use `category` for the single primary engineering focus and `platforms` for
  important interfaces or architectural surfaces; `projectCategories` defines
  display order. Related-project cards prefer the same category, then shared
  platforms.

## Conventions

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
- The single accent is `--accent` (muted gold). Reserve it for decorative
  furniture only (the card's hairline rule and monogram), never body text,
  where it fails WCAG AA contrast on the bone stock.
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
