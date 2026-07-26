<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes, APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project conventions

Full details live in `README.md`, keep both in sync when conventions change.

- **Identity/metadata**: edit `lib/site.ts` only; layouts, robots, sitemap and manifest import from it. Canonical origin comes from `NEXT_PUBLIC_SITE_URL`.
- **Landmarks**: `app/layout.tsx` owns `<main id="content">` plus the skip link; `lib/site-footer.tsx` owns `<footer>` and renders it on every page except `/` (the business card already shows the contact links there). There is no site-wide header/navbar; contact links live on the front of the home-page business card, its reverse introduces the developer and technical stack (flip on click), and the full work index lives on `/projects`. Pages must NOT render their own `<main>`.
- **Color/contrast (WCAG AA)**: never use `text-foreground/<opacity>` for text, it fails contrast. Use the `text-muted` token (4.95:1). If `--background`/`--foreground` change, re-verify `--muted` contrast ≥ 4.5:1.
- **A11y**: one `<h1>` per page, sections labelled with `aria-labelledby`, descriptive `alt` text, accessible names on videos, external links announce new tabs. Keep `:focus-visible` and `prefers-reduced-motion` styles in `globals.css` intact.
- **Privacy (GDPR)**: no cookies, no analytics, no third-party requests (fonts are self-hosted). Adding any tracking requires a consent mechanism and a `/privacy` update.
- **Tech-stack icons**: technology labels map to the local `tech-stack-icons` subset in `lib/technology-badge.tsx`. When adding a catalog icon, add its ID to `scripts/generate-tech-stack-icons.mjs` and run `npm run generate:tech-icons`; do not edit the generated file.
- **Static export**: `output: "export"` in `next.config.ts`; `npm run build` emits `out/` for nginx (reference config: `deploy/nginx.conf`). No server-only features (server actions, `headers()`/`redirects()`/`rewrites()` in config, request-reading route handlers, default `next/image`). Metadata routes (`icon.tsx`, `apple-icon.tsx`, `robots.ts`, `sitemap.ts`, `manifest.ts`) need `export const dynamic = "force-static"`.
- **Security**: headers live in `deploy/nginx.conf` (a static export can't set them from `next.config.ts`). CSP allows inline scripts because rendering is static; switch to nonce-based CSP (`proxy.ts`) if going dynamic.
- **Routing metadata**: add new public pages to `app/sitemap.ts`.
