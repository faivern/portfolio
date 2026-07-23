import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { EB_Garamond, IBM_Plex_Sans } from "next/font/google";
import { site } from "@/lib/site";
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
    default: `${site.name} | Portfolio`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: `${site.name} | ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f1ede2",
  colorScheme: "light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressCountry: "SE" },
  sameAs: site.links.map((l) => l.href),
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
        {/* WCAG 2.4.1 — bypass repeated blocks */}
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
          <div className="gap-4 border-t border-foreground/20 pt-6">
            <Link
              href="/privacy"
              className="absolute right-0 mr-8 font-sans text-[0.65rem] tracking-[0.3em] text-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              Privacy
            </Link>
          </div>
        </footer>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
