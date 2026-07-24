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
    description: "Full-stack media discovery platform featuring external API integration, AI-powered recommendations, and user management.",
    year: "2025",
    techStack: [".NET", "React", "PostgreSQL", "Docker", "Azure"],
    status: "live",
    githubUrl: "https://www.github.com/faivern/streaming-app",
    liveUrl: "https://cinelas.com",
    architecture: [
      { label: "Frontend", value: "React SPA" },
      { label: "API", value: ".NET REST services" },
      { label: "Data", value: "PostgreSQL" },
      { label: "Infra", value: "Docker · Azure" },
    ],
    video: "/projects/Cinelas/demo.mp4",
    screenshots: [
      "/projects/cinelasMedia/screenshot-1.png"
    ],
  },
  {
    slug: "Booking-Platform",
    title: "Booking Platform for Service Businesses",
    description: "Full-stack booking platform featuring real-time communication, SMS verification, and automated customer workflows.",
    year: "2026",
    techStack: ["React", ".NET", "SQL Server", "Twilio", "SignalR"],
    status: "demo",
    githubUrl: "https://github.com/faivern/booking-service-platform",
    architecture: [
      
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
        "Bookings flow through the REST API and are persisted to SQL Server via EF Core, while the SignalR hub pushes live updates to the admin dashboard. Customers confirm their phone number with a one-time code sent through Twilio SMS; confirmation and reminder emails leave via a background queue, off the request path.",
    },
    video: "/projects/Booking-Platform/booking-demo.mp4", // TODO: add the demo video
    screenshots: [],
  },
  {
    slug: "Cinelas-TV",
    title: "Self-Hosted Media Browser for Google TV",
    description: "Self-hosted media browser for Google TV combining TMDB metadata with Jellyfin playback of an owned media library, served from a Raspberry Pi.",
    year: "2026",
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
        "The Google TV app is a thin client: every request goes through nginx to the ASP.NET Core backend, which owns all business logic. Metadata comes from TMDB, application state lives in PostgreSQL, and Jellyfin streams owned media directly through nginx — the backend never proxies video bytes.",
    },
    video: "/projects/Cinelas-TV/demo.mp4", // TODO: add the demo video
    screenshots: [],
  },
  {
    slug: "Distributed-Ad-Platform",
    title: "Distributed Ad Platform",
    description: "Distributed .NET system for managing advertisements and subscribers across decoupled services — an MVC web app, a Web API, and a WinForms desktop client kept in sync over HTTP.",
    year: "2026",
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
        "Two decoupled services each own their database: the AdSystem MVC app manages ads and advertisers in its own SQL Server database and syncs subscriber changes to the SubscriberSystem Web API over HTTP, while the WinForms desktop client talks to the same API for subscriber CRUD.",
    },
    screenshots: [],
  },
  {
    slug: "Sky-Tracker-AI",
    title: "ADS-B Flight Tracker with AI Query Layer",
    description: "End-to-end flight tracking platform: a Raspberry Pi with an RTL-SDR antenna captures live aircraft broadcasts into PostgreSQL, visualized in a radar UI with an MQTT-connected ESP32 gadget and a natural-language AI query layer.",
    year: "2026",
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
        "A Raspberry Pi with an RTL-SDR dongle and 1090 MHz antenna captures live aircraft transponder broadcasts, decoded by readsb and streamed over TCP to a Spring Boot ingest service that sessionizes flights and fills PostgreSQL. A REST API serves stats and a live WebSocket feed to the React radar UI, the FastAPI AI layer answers natural-language questions with read-only parameterized SQL, and geofence events travel over MQTT to an ESP32 desk gadget. (Work in progress — this is the intended design.)",
    },
    screenshots: ["/projects/Sky-Tracker-AI/architecture-v1.0.png"],
  },
  {
    slug: "AI-Customer-Insight",
    title: "AI Customer Insight CLI",
    description: "Command-line tool that turns raw customer feedback CSVs into structured Markdown insight reports — sentiment, key themes, quick wins, and long-term actions — using the OpenAI API.",
    year: "2026",
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
        "The CLI loads a feedback CSV with pandas, computes stats like response count and average rating, then sends a sampled batch to the OpenAI Responses API. The model's summary is merged with the computed stats and rendered as a Markdown report with themes, recommended improvements, quick wins, and long-term actions.",
    },
    screenshots: [],
  },
  {
    slug: "Content-Management-AI",
    title: "Secure AI Text Analysis CLI",
    description: "Security-first CLI for intelligent text analysis — summarization, translation, and sentiment — on .txt and .pdf files, with prompt-injection protection, schema-validated responses, and structured JSON output.",
    year: "2025",
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
        "The CLI extracts text from .txt or .pdf files, detects the language, and sends it to the OpenAI API wrapped in isolation markers as a first layer of prompt-injection protection. Responses are validated against a strict JSON schema before being accepted, API calls retry with exponential backoff, and results are saved as timestamped JSON with word count and detected language.",
    },
    screenshots: [],
  },
  {
    slug: "project-three",
    title: "Project Three", 
    description: "Keep each description to a single sentence.",
    year: "2023",
    techStack: ["Go", "Docker", "AWS"],
    status: "demo",
    githubUrl: "https://github.com/your-username/project-three", // TODO: replace with the real repo
    architecture: [
      // Map each layer/role to its choice, e.g.
      { label: "Service", value: "Go" },
      { label: "Infra", value: "Docker · AWS" },
    ],
    video: "/projects/project-three/demo.mp4", // TODO: add the demo video
    screenshots: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
