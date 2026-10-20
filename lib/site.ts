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
  role: "Software Developer",
  areas: "Full-stack / Cybersecurity",
  jobTitle: "Software Developer",
  location: "Karlstad, Sweden",
  email: "gustaf.faivre@outlook.com",
  url: siteUrl,
  description:
    "Portfolio of Gustaf Faivre, a software developer building applications, operating infrastructure, and exploring security through hands-on labs.",
  profile: {
    about:
      "Building software from idea to production, with an interest in everything behind it. I enjoy the full development lifecycle, from developing applications to understanding the infrastructure and security that support them, with a particular interest in AI.",
    availability: "Open to work / connect",
    education: {
      degree: "B.Sc. Information Systems Development",
      institution: "Karlstad University",
      period: "2022–2025",
    },
    skillGroups: [
      {
        label: "Frontend",
        skills: ["React", "JavaScript", "TypeScript", "Next.js", "Tailwind", "HTML", "CSS"],
      },
      {
        label: "Backend",
        skills: ["C#", ".NET", "Java", "Spring Boot", "Python", "PostgreSQL", "SQL Server", "Supabase", "nginx"],
      },
      {
        label: "Cybersecurity",
        skills: ["Wazuh", "Wireshark", "OpenSSH"],
      },
      {
        label: "AI, Tools & DevOps",
        skills: ["Codex", "Claude Code", "Linux", "Docker", "VMware", "Azure DevOps", "Git"],
      },
    ],
  },
  locale: "en_US",
  links: [
    { label: "GitHub", href: "https://github.com/faivern" },
    { label: "LinkedIn", href: "https://linkedin.com/in/gustaf-faivre" },
  ],
} as const;
