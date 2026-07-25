// ─────────────────────────────────────────────────────────────
//  EDIT ME, project content. Media files live in
//  public/projects/<slug>/ and are referenced by absolute path,
//  e.g. "/projects/project-one/demo.mp4". Sections without content
//  (no video, no screenshots) are hidden.
//
//  Page layout (top → bottom): title + `tagline` (one punchy line),
//  the main media (live-site card or demo video), Live Demo/GitHub
//  links, tech stack, an About paragraph (`description`), 3–4
//  `highlights`, and extra screenshots.
//
//  Write `description` and `highlights` for a non-technical reader
//  (think HR): what the thing does and why it's impressive, in plain
//  language, no jargon. The tech stack chips carry the technical
//  signal.
//
//  `status` picks how the project shows its main media:
//    "live" → published site: shows a large live-site card embedding
//             the first screenshot (like Cinelas). Set `liveUrl`.
//    "demo" → not deployed (e.g. school work): shows the video demo
//             instead. Set `video`.
//  Fallback order for the main media slot: live-site card → video →
//  screenshots gallery. A project that isn't hosted and can't be
//  recorded shows its screenshots in the media slot instead.
//
//  `wip` (optional): renders a "Work in progress" tag next to the
//  title on the project page and the /projects index.
//
//  `featured` (optional): the 3–4 projects shown on the business card
//  back. Everything is listed on the /projects index page regardless.
//
//  `category`: grouping header on the /projects index page (projects
//  are grouped under their category in data order).
// ─────────────────────────────────────────────────────────────
export type Project = {
  slug: string;
  title: string;
  // One punchy line under the title, what was built, at what scale.
  // Also used on the /projects index and the business card back.
  tagline: string;
  // Short "About" paragraph: what the product does, in plain language
  // a non-technical reader understands. Also used for the page's
  // metadata description.
  description: string;
  // 3–4 highlights that sell the project to a non-technical reader.
  highlights: string[];
  year: string;
  // Shows a "Work in progress" tag next to the title.
  wip?: boolean;
  // Featured projects appear on the business card back; the rest are
  // listed on the /projects index page only. Keep it to 3–4.
  featured?: boolean;
  // Grouping header on the /projects index page, e.g. "Web Apps".
  category: string;
  techStack: string[];
  status: "live" | "demo";
  // Set githubUrl / liveUrl to the project's links; leave undefined to hide them.
  githubUrl?: string;
  liveUrl?: string;
  video?: string;
  screenshots: string[];
};

export const projects: Project[] = [
  {
    slug: "Cinelas",
    title: "Movie & TV Discovery Platform",
    tagline: "A production movie & TV discovery platform, live at cinelas.com, indexing 1.3M+ titles.",
    description:
      "Ever spent half an evening scrolling, not knowing what to watch? Cinelas fixes that. It knows about more than 1.3 million movies and shows, learns your taste to suggest what you'd actually enjoy, and lets you build lists, track what you've seen, and rate titles in detail. It's a real, live product at cinelas.com, open to everyone.",
    highlights: [
      "A live product anyone can sign up for and use today, not a demo",
      "Suggests what to watch next based on your personal taste, across 1.3M+ titles",
      "Fair rankings: a title with five rave reviews can't outrank one loved by thousands",
      "Stays fast by remembering movie data instead of re-fetching it on every visit",
    ],
    year: "2026",
    featured: true,
    category: "Web Apps",
    techStack: [".NET", "React", "PostgreSQL", "Docker", "Azure"],
    status: "live",
    githubUrl: "https://www.github.com/faivern/streaming-app",
    liveUrl: "https://cinelas.com",
    video: "/projects/Cinelas/demo.mp4",
    screenshots: [
      "/projects/cinelasMedia/screenshot-1.png"
    ],
  },
  {
    slug: "Booking-Platform",
    title: "Booking Platform for Service Businesses",
    tagline: "End-to-end booking for service businesses: real-time admin dashboard, SMS verification, automated reminders.",
    description:
      "Booking an appointment, minus the phone tag. Customers pick a time in a few taps and confirm their phone number with a text-message code. Staff see new bookings appear on their dashboard the moment they happen, and the system sends confirmation and reminder emails on its own.",
    highlights: [
      "New bookings appear on the staff dashboard instantly, no refresh needed",
      "Phone verification by text message keeps fake bookings out",
      "Confirmation and reminder emails go out automatically, so staff don't have to chase no-shows",
      "Separate, secure sign-ins for customers and staff",
    ],
    year: "2026",
    featured: true,
    category: "Web Apps",
    techStack: ["React", ".NET", "SQL Server", "Twilio", "SignalR"],
    status: "demo",
    githubUrl: "https://github.com/faivern/booking-service-platform",
    video: "/projects/Booking-Platform/booking-demo.mp4", // TODO: add the demo video
    screenshots: [],
  },
  {
    slug: "Cinelas-TV",
    title: "Self-Hosted Media Browser for Google TV",
    tagline: "A Google TV app that pairs TMDB discovery with your own media library, self-hosted on a Raspberry Pi.",
    description:
      "Turns a Google TV into the ultimate couch companion: browse movies and shows with posters, ratings, and summaries, then play your own collection, all from one remote-friendly interface. Everything runs on a Raspberry Pi at home, no subscriptions or cloud services involved.",
    highlights: [
      "A real TV app, navigated with the remote from the couch",
      "Combines a personal movie collection with rich info about every title in one screen",
      "Video streams straight to the TV, so even a tiny Raspberry Pi keeps up",
      "Fully self-hosted at home: no subscriptions, nothing sent to third parties",
    ],
    year: "2026",
    featured: true,
    category: "Apps & Systems",
    techStack: ["React", "Capacitor", "ASP.NET Core", "PostgreSQL", "Jellyfin", "Docker"],
    status: "demo",
    githubUrl: "https://github.com/faivern/cinelas-tv",
    video: "/projects/Cinelas-TV/demo.mp4", // TODO: add the demo video
    screenshots: [],
  },
  {
    slug: "Distributed-Ad-Platform",
    title: "Distributed Ad Platform",
    tagline: "Three separate .NET apps, web, API, and desktop, managing ads and subscribers in sync over HTTP.",
    description:
      "Three programs working as one: a website where companies manage their ads, a behind-the-scenes service that keeps the subscriber register, and a desktop app for staff to manage subscribers. Change something in one place and the others stay in sync automatically.",
    highlights: [
      "One system split into three apps that keep each other up to date",
      "Website and desktop app talk to the same central service, so data never disagrees",
      "Each part can be maintained and deployed on its own",
    ],
    year: "2025",
    category: "Apps & Systems",
    techStack: ["ASP.NET Core MVC", "Web API", "EF Core", "SQL Server", "WinForms"],
    status: "demo",
    githubUrl: "https://github.com/faivern/distributed-ad-platform",
    screenshots: [],
  },
  {
    slug: "Sky-Tracker-AI",
    title: "ADS-B Flight Tracker with AI Query Layer",
    tagline: "Live aircraft tracking from a real radio antenna, with an AI layer that answers questions in plain English.",
    description:
      "Ever wondered which plane is flying over your house right now? A small antenna on a Raspberry Pi listens to the radio signals aircraft constantly broadcast and shows them live on a radar-style map. You can ask questions in plain English, like 'what's the highest plane overhead?', and a little desk gadget lights up when one passes by. (Work in progress.)",
    highlights: [
      "Tracks real aircraft live, picked up straight from their radio broadcasts",
      "Ask questions in plain English, the AI translates them into database lookups",
      "A radar-style web map updates in real time",
      "A physical desk gadget alerts you when a plane flies overhead",
    ],
    year: "2026",
    wip: true,
    featured: true,
    category: "Apps & Systems",
    techStack: ["Java", "Spring Boot", "React", "FastAPI", "PostgreSQL", "ESP32"],
    status: "demo",
    githubUrl: "https://github.com/faivern/sky-tracker-ai",
    screenshots: ["/projects/Sky-Tracker-AI/architecture-v1.0.png"],
  },
  {
    slug: "Portfolio",
    title: "Personal Portfolio: Self-Hosted Static Site",
    tagline: "This very site, privacy-first and self-hosted on a Raspberry Pi, with zero third-party requests.",
    description:
      "The site you're looking at right now. It's built to respect every visitor: fast, fully usable by keyboard and screen readers, and completely private, no cookies, no tracking, not a single request to a third party. It runs on a Raspberry Pi at home.",
    highlights: [
      "You're using it right now",
      "Accessible to everyone: fully keyboard-navigable and screen-reader friendly",
      "Privacy by design: no cookies, no analytics, zero third-party requests",
      "Self-hosted on a Raspberry Pi, yet loads fast anywhere in the world",
    ],
    year: "2026",
    category: "Apps & Systems",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "nginx", "Cloudflare", "Raspberry Pi"],
    status: "live",
    githubUrl: "https://github.com/faivern/portfolio",
    liveUrl: "https://gustaffaivre.dev",
    screenshots: ["/projects/Portfolio/screenshot-1.png"],
  },
  {
    slug: "AI-Customer-Insight",
    title: "AI Customer Insight CLI",
    tagline: "Turns raw customer feedback CSVs into structured, actionable reports.",
    description:
      "Reads through hundreds of customer feedback comments and writes the report a manager actually wants: how customers feel overall, the themes that keep coming up, quick wins, and what to fix long-term. What would take days of reading takes minutes.",
    highlights: [
      "Turns a spreadsheet of raw feedback into a ready-to-read report",
      "Combines hard statistics with AI-written summaries, so numbers back up the narrative",
      "Handles large feedback files without tripping AI usage limits",
    ],
    year: "2025",
    category: "CLI Tools",
    techStack: ["Python", "OpenAI API", "pandas", "typer"],
    status: "demo",
    githubUrl: "https://github.com/faivern/ai-customer-insight",
    screenshots: [],
  },
  {
    slug: "Content-Management-AI",
    title: "Secure AI Text Analysis CLI",
    tagline: "A security-first CLI for AI text analysis: summarize, translate, and score sentiment.",
    description:
      "An assistant for working with text documents: it summarizes, translates, and gauges the tone of .txt and .pdf files. It's built to be skeptical, documents can't trick it into ignoring its instructions, and every answer from the AI is checked before it's shown.",
    highlights: [
      "Summarizes, translates, and scores the sentiment of documents in seconds",
      "Defended against 'prompt injection': hidden instructions inside a document can't hijack it",
      "Every AI answer is validated before it's trusted",
    ],
    year: "2025",
    category: "CLI Tools",
    techStack: ["Python", "OpenAI API", "PyPDF2", "pytest"],
    status: "demo",
    githubUrl: "https://github.com/faivern/content-management-ai",
    screenshots: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
