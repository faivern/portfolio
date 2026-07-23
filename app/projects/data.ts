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
