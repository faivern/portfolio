/**
 * Single source of truth for site-wide identity and metadata.
 * Imported by layouts, pages, robots.ts, sitemap.ts and manifest.ts.
 *
 * NEXT_PUBLIC_SITE_URL must be the canonical production origin
 * (no trailing slash). It drives metadataBase, OpenGraph URLs,
 * sitemap and robots output.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gustaffaivre.dev"
).replace(/\/+$/, "");

export const site = {
  name: "Gustaf FAIVRE",
  role: "Software Developer — FullStack",
  location: "Sweden",
  email: "gustaf.faivre@outlook.com",
  url: siteUrl,
  description:
    "Selected work, architecture notes and contact of Gustaf FAIVRE, full-stack software developer based in Sweden.",
  locale: "en_US",
  links: [
    { label: "GitHub", href: "https://github.com/faivern" },
    { label: "LinkedIn", href: "https://linkedin.com/in/gustaf-faivre" },
  ],
} as const;
