import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How this website handles personal data: no cookies, no tracking, no analytics.",
  alternates: { canonical: "/privacy" },
};

const lastUpdated = "2026-07-23";

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 justify-center px-6 py-16 sm:px-8 sm:py-24">
      {/* Long-form legal text is easier to read in normal case. */}
      <article className="w-full max-w-2xl normal-case tracking-normal">
        <header>
          <Link
            href="/"
            className="inline-block py-2 font-serif text-xs tracking-[0.25em] text-muted underline-offset-4 hover:text-foreground hover:underline"
          >
            ←&#xFE0E; back Home
          </Link>
          <h1 className="font-serif text-3xl tracking-[0.08em] sm:text-4xl">
            Privacy
          </h1>
          <p className="mt-3 font-serif text-sm text-muted">
            Last updated: {lastUpdated}
          </p>
        </header>

        <hr className="mt-8 border-foreground/20" />

        <div className="mt-8 space-y-8 font-serif text-sm leading-relaxed">
          <section aria-labelledby="pp-data">
            <h2
              id="pp-data"
              className="text-[0.65rem] tracking-[0.35em] text-muted uppercase"
            >
              The Short Version
            </h2>
            <p className="mt-3">
              This is a static portfolio site. No cookies, no tracking, no
              analytics, no ads, the owner doesn&apos;t collect anything about
              you. Fonts are self-hosted, so your browser never talks to Google
              or any other third party while you&apos;re here.
            </p>
            <p className="mt-3">
              The company hosting this site briefly processes technical data
              like your IP address in its server logs, as needed to deliver and
              secure the site. That happens under the hosting provider&apos;s
              own terms, the owner never sees or uses it.
            </p>
          </section>

          <section aria-labelledby="pp-contact">
            <h2
              id="pp-contact"
              className="text-[0.65rem] tracking-[0.35em] text-muted uppercase"
            >
              If You Email
            </h2>
            <p className="mt-3">
              If you get in touch via the email link, your address, name and
              message are used only to reply to you, and the conversation is
              deleted once the matter is settled, unless the law requires
              keeping it. Legal basis: legitimate interest or steps prior to a
              contract (Art. 6(1)(f) and (b) GDPR).
            </p>
          </section>

          <section aria-labelledby="pp-rights">
            <h2
              id="pp-rights"
              className="text-[0.65rem] tracking-[0.35em] text-muted uppercase"
            >
              Your Rights
            </h2>
            <p className="mt-3">
              You have the usual GDPR rights: access (Art. 15), rectification
              (Art. 16), erasure (Art. 17), restriction (Art. 18), portability
              (Art. 20) and objection (Art. 21). To exercise any of them, email{" "}
              <a
                href={`mailto:${site.email}`}
                className="underline underline-offset-4 hover:text-foreground"
              >
                {site.email}
              </a>
              . You can also lodge a complaint with the Swedish supervisory
              authority, Integritetsskyddsmyndigheten (IMY).
            </p>
            <p className="mt-3">
              Responsible for this site is its owner, reachable at the address above.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
