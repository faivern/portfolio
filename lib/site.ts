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
  // Display form (stylized on the business card) vs. plain form used for
  // metadata, JSON-LD and other machine-facing identity.
  name: "Gustaf FAIVRE",
  plainName: "Gustaf Faivre",
  givenName: "Gustaf",
  familyName: "Faivre",
  role: "Software Developer — FullStack",
  jobTitle: "Software Developer",
  location: "Karlstad, Sweden",
  email: "gustaf.faivre@outlook.com",
  url: siteUrl,
  description:
    "Portfolio of Gustaf Faivre, a software developer building full-stack applications, AI-powered systems, cloud services and personal software projects.",
  profile: {
    about:
      "Building from idea to production-ready software used by real people. I enjoy the full development lifecycle, especially applying AI to make systems smarter.",
    availability: "Open to work / connect",
    education: {
      degree: "B.Sc. Information Systems Development",
      institution: "Karlstad University",
      period: "2022–2025",
    },
    skillGroups: [
      {
        label: "Frontend",
        skills: [
          "Next.js",
          "React",
          "JavaScript",
          "TypeScript",
          "Tailwind",
          "HTML",
          "CSS",
        ],
      },
      {
        label: "Backend",
        skills: ["Java", "Spring Boot", "Python", "C#", ".NET", "nginx"],
      },
      {
        label: "Databases",
        skills: ["PostgreSQL", "SQL Server", "MongoDB"],
      },
      {
        label: "AI, Tools & DevOps",
        skills: [
          "Claude Code",
          "Linux",
          "Docker",
          "Git",
          "GitHub",
          "Azure DevOps",
        ],
      },
    ],
  },
  locale: "en_US",
  links: [
    { label: "GitHub", href: "https://github.com/faivern" },
    { label: "LinkedIn", href: "https://linkedin.com/in/gustaf-faivre" },
  ],
} as const;
