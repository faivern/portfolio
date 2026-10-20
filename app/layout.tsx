import type { Metadata, Viewport } from "next";
import { EB_Garamond, IBM_Plex_Sans } from "next/font/google";
import { site } from "@/lib/site";
import { SiteFooter } from "@/lib/site-footer";
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

// colorScheme stays "light": `/` is always bone stock, and the dark project
// surfaces set `color-scheme: dark` themselves in globals.css.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1ede2" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1b1d" },
  ],
  colorScheme: "light",
};

// Technologies are collected from the project data, nothing invented here.
const knowsAbout = [...new Set(projects.flatMap((p) => p.techStack))].sort();

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
        {/* Applies the stored (or system) theme before first paint, so the
            project pages never flash bone before going dark. The class is
            only consumed by the .project-surface-scoped rules in
            globals.css, so the business card stays on paper either way.
            Dark is the default: with nothing stored it is applied unless the
            browser reports an explicit light preference. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&!matchMedia("(prefers-color-scheme: light)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />

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

        {/* Hidden on the landing page, the card already carries these links. */}
        <SiteFooter />

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
