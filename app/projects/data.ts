// ─────────────────────────────────────────────────────────────
//  EDIT ME — placeholder content. Replace with your own projects.
//  Media files live in public/projects/<slug>/ and are referenced
//  by absolute path, e.g. "/projects/project-one/demo.mp4".
//  Sections without content (no video, no screenshots) are hidden.
//
//  `architecture` is a list of rows (label → value) rendered as a
//  spec sheet, e.g. { label: "Data", value: "PostgreSQL" }.
//
//  `diagram` (optional) renders a flow diagram above the spec sheet:
//  nodes placed in columns (left → right), edges drawn as labelled
//  arrows between them. Solid = request path, dashed = background,
//  double-headed = two-way. See architecture-diagram.tsx.
//
//  `status` picks how the project shows its main media:
//    "live" → published site: shows a large live-site card embedding
//             the first screenshot (like Cinelas). Set `liveUrl`.
//    "demo" → not deployed (e.g. school work): shows the video demo
//             instead. Set `video`.
//
//  `featured` (optional): the 3–4 projects shown on the business card
//  back. Everything is listed on the /projects index page regardless.
//
//  `category`: grouping header on the /projects index page (projects
//  are grouped under their category in data order).
// ─────────────────────────────────────────────────────────────
export type DiagramNode = {
  id: string;
  label: string;
  // Small secondary lines listed under the node title.
  details?: string[];
  // 0-based column; columns are laid out left → right.
  column: number;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  // "sync" solid arrow (default) · "async" dashed · "duplex" two-way.
  kind?: "sync" | "async" | "duplex";
};

export type Diagram = {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  // Featured projects appear on the business card back; the rest are
  // listed on the /projects index page only. Keep it to 3–4.
  featured?: boolean;
  // Grouping header on the /projects index page, e.g. "Web Apps".
  category: string;
  techStack: string[];
  // Architecture as a spec sheet: each row maps a layer/role to its
  // choice (and, if useful, a short reason). Rendered as label → value.
  architecture: { label: string; value: string }[];
  diagram?: Diagram;
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
    description: "A full-stack web app for discovering movies and TV shows, with data from an external API, AI-powered recommendations, and user accounts.",
    year: "2026",
    featured: true,
    category: "Web Apps",
    techStack: [".NET", "React", "PostgreSQL", "Docker", "Azure"],
    status: "live",
    githubUrl: "https://www.github.com/faivern/streaming-app",
    liveUrl: "https://cinelas.com",
    architecture: [
      { label: "Frontend", value: "React SPA — React Query + Axios, 20+ custom hooks" },
      { label: "API", value: ".NET REST — TmdbService with 6-hour cache" },
      { label: "Auth", value: "Google OAuth · secure cookie sessions" },
      { label: "Data", value: "PostgreSQL — lists, tracking, reviews" },
      { label: "Rankings", value: "Bayesian rating algorithm (IMDb-style)" },
      { label: "Infra", value: "Docker · Azure" },
    ],
    diagram: {
      nodes: [
        {
          id: "spa",
          label: "React SPA",
          details: ["React Query · Axios", "TypeScript"],
          column: 0,
        },
        {
          id: "api",
          label: ".NET API",
          details: ["REST controllers", "TmdbService · 6h cache", "Google OAuth"],
          column: 1,
        },
        { id: "db", label: "PostgreSQL", details: ["Lists · tracking", "Reviews"], column: 2 },
        { id: "tmdb", label: "TMDB API", details: ["1.3M+ titles"], column: 2 },
      ],
      edges: [
        { from: "spa", to: "api", label: "REST" },
        { from: "api", to: "db", label: "SQL" },
        { from: "api", to: "tmdb", label: "Metadata (cached)" },
      ],
      caption:
        "The React SPA talks to the .NET REST API through React Query and Axios. Movie and TV metadata requests go through the backend's TmdbService, which caches TMDB responses for six hours to keep the app fast and stay within API rate limits. Everything the user creates — custom lists, watch tracking, and four-dimension reviews — lives in PostgreSQL, and popularity rankings use a Bayesian (IMDb-style) rating algorithm so titles with few votes don't top the charts. Sign-in is handled by Google OAuth with secure cookie sessions, and the whole stack runs in Docker on Azure.",
    },
    video: "/projects/Cinelas/demo.mp4",
    screenshots: [
      "/projects/cinelasMedia/screenshot-1.png"
    ],
  },
  {
    slug: "Booking-Platform",
    title: "Booking Platform for Service Businesses",
    description: "A booking platform for service businesses with a live-updating admin dashboard, SMS phone verification, and automated confirmation and reminder emails.",
    year: "2026",
    featured: true,
    category: "Web Apps",
    techStack: ["React", ".NET", "SQL Server", "Twilio", "SignalR"],
    status: "demo",
    githubUrl: "https://github.com/faivern/booking-service-platform",
    architecture: [
      { label: "Frontend", value: "React SPA — admin dashboard + booking flow" },
      { label: "API", value: ".NET — REST + SignalR for real-time updates" },
      { label: "Auth", value: "JWT + SMS one-time codes (Twilio)" },
      { label: "Data", value: "SQL Server via EF Core" },
      { label: "Email", value: "Confirmations + reminders via background queue" },
    ],
    diagram: {
      nodes: [
        {
          id: "spa",
          label: "React SPA",
          details: ["Admin dashboard", "Booking flow"],
          column: 0,
        },
        {
          id: "api",
          label: ".NET API",
          details: [
            "REST controllers",
            "SignalR hub",
            "JWT · OTP auth",
            "Background jobs",
          ],
          column: 1,
        },
        { id: "db", label: "SQL Server", column: 2 },
        { id: "sms", label: "Twilio", column: 2 },
        { id: "smtp", label: "SMTP Email", column: 2 },
      ],
      edges: [
        { from: "spa", to: "api", label: "REST" },
        { from: "spa", to: "api", label: "SignalR", kind: "duplex" },
        { from: "api", to: "db", label: "EF Core" },
        { from: "api", to: "sms", label: "SMS OTP" },
        { from: "api", to: "smtp", label: "Email queue", kind: "async" },
      ],
      caption:
        "When a customer books, the React app calls the .NET REST API, which saves the booking to SQL Server through EF Core. The SignalR hub then pushes the new booking to the admin dashboard in real time, so staff see it without refreshing. Customers verify their phone number with a one-time code sent by Twilio SMS. Confirmation and reminder emails are sent by a background job, so they never slow down the booking request.",
    },
    video: "/projects/Booking-Platform/booking-demo.mp4", // TODO: add the demo video
    screenshots: [],
  },
  {
    slug: "Cinelas-TV",
    title: "Self-Hosted Media Browser for Google TV",
    description: "A self-hosted media browser for Google TV that combines TMDB metadata with playback of your own media library through Jellyfin, all served from a Raspberry Pi.",
    year: "2026",
    featured: true,
    category: "Apps & Systems",
    techStack: ["React", "Capacitor", "ASP.NET Core", "PostgreSQL", "Jellyfin", "Docker"],
    status: "demo",
    githubUrl: "https://github.com/faivern/cinelas-tv",
    architecture: [
      { label: "TV client", value: "React + Capacitor (thin UI)" },
      { label: "API", value: "ASP.NET Core — all business logic" },
      { label: "Media server", value: "Jellyfin (Direct Play, no transcoding)" },
      { label: "Data", value: "PostgreSQL · TMDB as metadata source" },
      { label: "Infra", value: "Docker Compose · nginx · Raspberry Pi 5" },
    ],
    diagram: {
      nodes: [
        { id: "tv", label: "Google TV app", details: ["React + Capacitor", "UI only"], column: 0 },
        { id: "nginx", label: "nginx", details: ["Same-origin entry"], column: 1 },
        { id: "api", label: "ASP.NET Core", details: ["Auth · lists · reviews", "TMDB + Jellyfin integration"], column: 2 },
        { id: "db", label: "PostgreSQL", column: 3 },
        { id: "jellyfin", label: "Jellyfin", column: 3 },
        { id: "tmdb", label: "TMDB API", column: 3 },
      ],
      edges: [
        { from: "tv", to: "nginx", label: "HTTPS" },
        { from: "nginx", to: "api", label: "/api/*" },
        { from: "nginx", to: "jellyfin", label: "/jellyfin/* stream" },
        { from: "api", to: "db", label: "EF Core" },
        { from: "api", to: "jellyfin", label: "Playback lookup" },
        { from: "api", to: "tmdb", label: "Metadata (cached)" },
      ],
      caption:
        "The TV app is a thin client — it only renders the UI. Every request goes through nginx to the ASP.NET Core backend, which holds all the business logic. Movie and show metadata comes from TMDB, app state (users, lists, reviews) is stored in PostgreSQL, and Jellyfin streams the actual video files directly through nginx, so the backend never has to move video bytes itself.",
    },
    video: "/projects/Cinelas-TV/demo.mp4", // TODO: add the demo video
    screenshots: [],
  },
  {
    slug: "Distributed-Ad-Platform",
    title: "Distributed Ad Platform",
    description: "A distributed .NET system for managing advertisements and subscribers across three separate apps — an MVC web app, a Web API, and a Windows desktop client — that stay in sync over HTTP.",
    year: "2025",
    category: "Apps & Systems",
    techStack: ["ASP.NET Core MVC", "Web API", "EF Core", "SQL Server", "WinForms"],
    status: "demo",
    githubUrl: "https://github.com/faivern/distributed-ad-platform",
    architecture: [
      { label: "Web app", value: "ASP.NET Core MVC (AdSystem)" },
      { label: "API", value: "ASP.NET Core Web API (SubscriberSystem)" },
      { label: "Desktop client", value: "Windows Forms" },
      { label: "Data", value: "SQL Server · EF Core — one database per service" },
      { label: "Sync", value: "System-to-system over HTTP" },
    ],
    diagram: {
      nodes: [
        { id: "mvc", label: "AdSystem MVC", details: ["Ad management", "Advertiser sign-up"], column: 0 },
        { id: "winui", label: "WinForms client", details: ["Subscriber CRUD"], column: 0 },
        { id: "api", label: "SubscriberSystem API", details: ["REST", "Subscriber domain"], column: 1 },
        { id: "adsdb", label: "Ads DB", details: ["SQL Server"], column: 2 },
        { id: "subdb", label: "Subscribers DB", details: ["SQL Server"], column: 2 },
      ],
      edges: [
        { from: "winui", to: "api", label: "REST" },
        { from: "mvc", to: "api", label: "Subscriber sync" },
        { from: "mvc", to: "adsdb", label: "EF Core" },
        { from: "api", to: "subdb", label: "EF Core" },
      ],
      caption:
        "The system is split into two independent services, each with its own SQL Server database. The AdSystem MVC web app manages ads and advertisers, and forwards subscriber changes to the SubscriberSystem Web API over HTTP. The WinForms desktop client talks to that same Web API to create, edit, and remove subscribers.",
    },
    screenshots: [],
  },
  {
    slug: "Sky-Tracker-AI",
    title: "ADS-B Flight Tracker with AI Query Layer",
    description: "An end-to-end flight tracking platform: a Raspberry Pi with a radio antenna captures live aircraft broadcasts into PostgreSQL, shown on a radar-style web UI, with an ESP32 desk gadget for nearby-flight alerts and an AI layer that answers questions in plain English.",
    year: "2026",
    featured: true,
    category: "Apps & Systems",
    techStack: ["Java", "Spring Boot", "React", "FastAPI", "PostgreSQL", "ESP32"],
    status: "demo",
    githubUrl: "https://github.com/faivern/sky-tracker-ai",
    architecture: [
      { label: "Edge", value: "Raspberry Pi · RTL-SDR · readsb decoder" },
      { label: "Ingest", value: "Spring Boot — sessionizer · geofence · batched writes" },
      { label: "API", value: "Spring Boot REST + WebSocket live feed" },
      { label: "AI layer", value: "FastAPI — LLM tool-calling, read-only parameterized SQL" },
      { label: "Data & events", value: "PostgreSQL · MQTT (mosquitto) → ESP32" },
    ],
    diagram: {
      nodes: [
        { id: "sdr", label: "Antenna + RTL-SDR", details: ["1090 MHz ADS-B", "readsb decoder · Pi"], column: 0 },
        { id: "ingest", label: "Spring Boot ingest", details: ["Sessionizer · geofence", "Batched writes"], column: 1 },
        { id: "db", label: "PostgreSQL", column: 2 },
        { id: "mqtt", label: "MQTT", column: 2 },
        { id: "api", label: "Spring Boot API", details: ["Stats · history"], column: 3 },
        { id: "ai", label: "FastAPI AI", details: ["NL → SQL"], column: 3 },
        { id: "esp", label: "ESP32 gadget", column: 3 },
        { id: "web", label: "React radar UI", details: ["Canvas · live feed"], column: 3 },
      ],
      edges: [
        { from: "sdr", to: "ingest", label: "SBS · TCP" },
        { from: "ingest", to: "db", label: "JPA batches" },
        { from: "ingest", to: "mqtt", label: "Geofence events", kind: "async" },
        { from: "mqtt", to: "esp", label: "Overhead alerts", kind: "async" },
        { from: "db", to: "api", label: "JPA" },
        { from: "db", to: "ai", label: "Read-only SQL" },
        { from: "api", to: "web", label: "REST · WebSocket", kind: "duplex" },
      ],
      caption:
        "A Raspberry Pi with an RTL-SDR dongle and a 1090 MHz antenna picks up live aircraft transponder broadcasts. The readsb decoder turns them into a data stream that a Spring Boot service reads over TCP, groups into individual flights, and writes to PostgreSQL in batches. From there, a REST API and a live WebSocket feed power the React radar UI, the FastAPI AI layer answers plain-English questions by generating read-only SQL queries, and geofence events are published over MQTT to an ESP32 desk gadget that alerts when an aircraft passes overhead. (Work in progress — this is the intended design.)",
    },
    screenshots: ["/projects/Sky-Tracker-AI/architecture-v1.0.png"],
  },
  {
    slug: "Portfolio",
    title: "Personal Portfolio — Self-Hosted Static Site",
    description: "This very site: a fully static Next.js export served by nginx on a Raspberry Pi behind Cloudflare, built privacy-first (no cookies, no analytics) and accessibility-first (WCAG 2.2 AA).",
    year: "2026",
    category: "Apps & Systems",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "nginx", "Cloudflare", "Raspberry Pi"],
    status: "live",
    githubUrl: "https://github.com/faivern/portfolio",
    liveUrl: "https://gustaffaivre.dev",
    architecture: [
      { label: "Frontend", value: "Next.js 16 App Router · React 19 · Tailwind CSS 4" },
      { label: "Rendering", value: "Fully static export — no Node server at runtime" },
      { label: "Web server", value: "nginx — CSP/HSTS headers, static routing, immutable asset caching" },
      { label: "Edge", value: "Cloudflare — DNS, TLS termination, www→apex redirect" },
      { label: "Host", value: "Raspberry Pi — out/ deployed via rsync" },
      { label: "Privacy/A11y", value: "No cookies or analytics · WCAG 2.2 AA" },
    ],
    diagram: {
      nodes: [
        { id: "visitor", label: "Visitor", column: 0 },
        { id: "cf", label: "Cloudflare", details: ["DNS · TLS termination", "www→apex 301"], column: 1 },
        { id: "nginx", label: "nginx · Raspberry Pi", details: ["Security headers", "Static routing · caching"], column: 2 },
        { id: "out", label: "Static export", details: ["next build → out/", "Plain HTML/CSS/JS"], column: 3 },
      ],
      edges: [
        { from: "visitor", to: "cf", label: "HTTPS" },
        { from: "cf", to: "nginx", label: "Proxied" },
        { from: "nginx", to: "out", label: "try_files" },
      ],
      caption:
        "Every request hits Cloudflare first, which handles DNS, terminates TLS, and redirects www to the apex domain before proxying to nginx on a Raspberry Pi. nginx applies the HTTP security headers (CSP, HSTS, nosniff, frame-ancestors) — a static export can't set them from next.config.ts — and serves plain HTML/CSS/JS straight from disk, with hashed build assets cached immutably. There is no Node server at runtime: deploying is just `next build` and rsyncing the `out/` folder to the Pi.",
    },
    screenshots: [], // TODO: add "/projects/Portfolio/screenshot-1.png" (homepage preview for the live-site card)
  },
  {
    slug: "AI-Customer-Insight",
    title: "AI Customer Insight CLI",
    description: "A command-line tool that turns raw customer feedback (CSV files) into a structured Markdown report — sentiment, key themes, quick wins, and long-term actions — using the OpenAI API.",
    year: "2025",
    category: "CLI Tools",
    techStack: ["Python", "OpenAI API", "pandas", "typer"],
    status: "demo",
    githubUrl: "https://github.com/faivern/ai-customer-insight",
    architecture: [
      { label: "Input", value: "Customer feedback CSV" },
      { label: "Pipeline", value: "Python CLI — pandas stats, sampling, guards" },
      { label: "AI", value: "OpenAI Responses API" },
      { label: "Output", value: "Markdown insight report" },
    ],
    diagram: {
      nodes: [
        { id: "csv", label: "Feedback CSV", details: ["Reviews · surveys"], column: 0 },
        { id: "cli", label: "CLI pipeline", details: ["pandas stats", "Sampling · guards"], column: 1 },
        { id: "openai", label: "OpenAI API", column: 2 },
        { id: "report", label: "Markdown report", details: ["Themes · actions"], column: 2 },
      ],
      edges: [
        { from: "csv", to: "cli", label: "pandas" },
        { from: "cli", to: "openai", label: "Responses API", kind: "duplex" },
        { from: "cli", to: "report", label: "Render" },
      ],
      caption:
        "The CLI loads a feedback CSV with pandas and computes basic stats such as response count and average rating. It then sends a sample of the feedback to the OpenAI API, merges the model's summary with those stats, and renders everything as a Markdown report with key themes, quick wins, and long-term recommendations.",
    },
    screenshots: [],
  },
  {
    slug: "Content-Management-AI",
    title: "Secure AI Text Analysis CLI",
    description: "A security-first command-line tool that summarizes, translates, and analyzes the sentiment of .txt and .pdf files, with prompt-injection protection, schema-validated AI responses, and structured JSON output.",
    year: "2025",
    category: "CLI Tools",
    techStack: ["Python", "OpenAI API", "PyPDF2", "pytest"],
    status: "demo",
    githubUrl: "https://github.com/faivern/content-management-ai",
    architecture: [
      { label: "Input", value: ".txt / .pdf files — language auto-detected" },
      { label: "Pipeline", value: "Python CLI — retries with exponential backoff" },
      { label: "Security", value: "Prompt-injection isolation · strict JSON schema validation" },
      { label: "AI", value: "OpenAI API" },
      { label: "Output", value: "Timestamped, schema-validated JSON" },
    ],
    diagram: {
      nodes: [
        { id: "file", label: ".txt / .pdf input", column: 0 },
        { id: "cli", label: "CLI pipeline", details: ["Language detection", "Retry · backoff"], column: 1 },
        { id: "openai", label: "OpenAI API", column: 2 },
        { id: "json", label: "JSON output", details: ["Schema-validated"], column: 2 },
      ],
      edges: [
        { from: "file", to: "cli", label: "Extract text" },
        { from: "cli", to: "openai", label: "Isolated prompts", kind: "duplex" },
        { from: "cli", to: "json", label: "Validate · save" },
      ],
      caption:
        "The CLI extracts text from a .txt or .pdf file and detects its language. Before sending anything to the OpenAI API, it wraps the text in isolation markers — a first line of defense against prompt-injection attacks hidden inside the document. Every response is validated against a strict JSON schema before it is accepted, failed API calls are retried with exponential backoff, and results are saved as timestamped JSON files with word count and detected language.",
    },
    screenshots: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
