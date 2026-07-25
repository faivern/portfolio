import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { EB_Garamond, IBM_Plex_Sans } from "next/font/google";
import { site } from "@/lib/site";
import { projects } from "./projects/data";
import "./globals.css";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // The home page is a client component, so its title comes from this
    // default: "Gustaf Faivre | Software Developer".
    default: `${site.plainName} | ${site.jobTitle}`,
    template: `%s | ${site.plainName}`,
  },
  description: site.description,
  authors: [{ name: site.plainName, url: site.url }],
  creator: site.plainName,
  publisher: site.plainName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.plainName,
    title: `${site.plainName} | ${site.jobTitle}`,
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: `${site.plainName} | ${site.jobTitle}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f1ede2",
  colorScheme: "light",
};

// Technologies are collected from the project data, nothing invented here.
const knowsAbout = [...new Set(projects.flatMap((p) => p.techStack))].sort();

type IconProps = React.SVGProps<SVGSVGElement>;

function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const contactIcons: Record<string, React.ComponentType<IconProps>> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
};

// Footer contact/social links, same source as the business card front.
const contactLinks = [
  ...site.links,
  { label: "Email", href: `mailto:${site.email}` },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.plainName,
      givenName: site.givenName,
      familyName: site.familyName,
      jobTitle: site.jobTitle,
      url: site.url,
      email: `mailto:${site.email}`,
      address: { "@type": "PostalAddress", addressCountry: "SE" },
      knowsAbout,
      sameAs: site.links.map((l) => l.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.plainName,
      url: site.url,
      inLanguage: "en",
      author: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${plexSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* WCAG 2.4.1, bypass repeated blocks */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:border focus:border-foreground focus:bg-background focus:px-4 focus:py-3 focus:text-xs focus:tracking-[0.25em]"
        >
          Skip to main content
        </a>

        <main id="content" tabIndex={-1} className="flex flex-1 flex-col">
          {children}
        </main>

        <footer className="px-6 py-8 sm:px-8">
          <div className="relative flex flex-col items-center gap-4 border-t border-foreground/20 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="font-sans text-[0.65rem] tracking-[0.3em] text-muted">
              &copy; {new Date().getFullYear()} {site.plainName}
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-1">
              {contactLinks.map((l) => {
                const external = !l.href.startsWith("mailto:");
                const Icon = contactIcons[l.label];
                return (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex items-center gap-1.5 p-2 font-sans text-[0.65rem] tracking-[0.25em] text-muted underline-offset-4 hover:text-foreground hover:underline"
                    >
                      <Icon className="h-4 w-4" />
                      {l.label}
                      {external && (
                        <span className="sr-only"> (opens in a new tab)</span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/privacy"
              className="font-sans text-[0.65rem] tracking-[0.3em] text-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              Privacy
            </Link>
          </div>
        </footer>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
