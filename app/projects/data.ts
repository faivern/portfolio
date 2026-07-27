// Project copy is written for a one-minute recruiter scan. Keep the story
// human and concise; use `technicalProof` for the engineering signal.
// Media is always local so the portfolio makes no third-party requests.
export const projectCategories = [
  "Web",
  "Systems & Integration",
  "Device Apps",
  "CLI Tools",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectPlatform =
  | "Web"
  | "Website"
  | "Google TV"
  | "Desktop"
  | "API"
  | "Backend"
  | "Hardware"
  | "CLI"
  | "Self-hosted"
  | "Self-hosted server";

export type ProjectHighlight = {
  title: string;
  detail: string;
};

export type ProjectProof = {
  title: string;
  detail: string;
};

export type ProjectMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type ProjectExample = {
  inputLabel: string;
  input: string;
  outputLabel: string;
  output: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  highlights: ProjectHighlight[];
  technicalProof: ProjectProof[];
  example?: ProjectExample;
  year: string;
  wip?: boolean;
  category: ProjectCategory;
  platforms: ProjectPlatform[];
  techStack: string[];
  status: "live" | "demo";
  githubUrl?: string;
  liveUrl?: string;
  video?: string;
  screenshots: ProjectMedia[];
};

export const projects: Project[] = [
  {
    slug: "Cinelas",
    title: "Movie & TV Discovery Platform",
    tagline:
      "A live discovery platform that turns 1.3 million titles into a personal place to discover, track, and find where to watch.",
    description:
      "Cinelas combines movie and TV tracking with an Azure OpenAI RAG pipeline for grounded, natural-language discovery.",
    problem:
      "Streaming offers endless choice, but finding something worth watching often means bouncing between services, lists, and review sites.",
    solution:
      "Cinelas brings discovery, rich title information, personal lists, viewing progress, and detailed ratings into one responsive product anyone can use.",
    highlights: [
      {
        title: "Ask naturally",
        detail:
          "Search by mood, theme, plot, actor, or half-remembered scene, not just predefined filters.",
      },
      {
        title: "1.3M+ titles",
        detail:
          "Movies and shows stay searchable in one catalogue.",
      },
      {
        title: "Discovery to decision",
        detail:
          "Move from a suggestion to streaming providers, custom lists, viewing progress, and detailed ratings.",
      },
    ],
    technicalProof: [
      {
        title: "Grounded recommendations (RAG)",
        detail:
          "Cinelas uses retrieval-augmented generation (RAG): it searches 15,000 prepared movie and show records by meaning, then gives the closest matches to Azure OpenAI to choose and explain. The AI works from real catalogue results instead of guessing.",
      },
      {
        title: "Reliable, controlled AI",
        detail:
          "Cinelas removes titles already watched and checks every suggestion against its catalogue, preventing invented results. Sign-in, usage limits, caching, and monitoring keep the live service reliable and its costs predictable.",
      },
    ],
    year: "2026",
    category: "Web",
    platforms: ["Web"],
    techStack: [
      "RAG",
      ".NET",
      "React",
      "Azure",
      "Docker",
      "pgvector",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Azure OpenAI",
    ],
    status: "live",
    githubUrl: "https://www.github.com/faivern/streaming-app",
    liveUrl: "https://cinelas.com",
    screenshots: [
      {
        src: "/projects/cinelasMedia/screenshot-1.png",
        width: 1911,
        height: 912,
        alt: "Cinelas home page showing rows of movie and television recommendations",
        caption: "The live discovery experience at cinelas.com.",
      },
      {
        src: "/projects/Cinelas/ai-chat.png",
        width: 986,
        height: 1185,
        alt: "Cinelas AI chat with RAG pipeline showing a recommendation for a movie based on a natural-language question",
        caption: "Turns natural-language questions into grounded recommendations.",
      },
      {
        src: "/projects/Cinelas/review.webp",
        width: 536,
        height: 906,
        alt: "Cinelas review form with separate ratings for story, acting, visuals, and soundtrack",
        caption: "A review captures more nuance than a single star score.",
      },
    ],
  },
  {
    slug: "Booking-Platform",
    title: "Booking Platform for Service Businesses",
    tagline:
      "A complete booking journey for customers, with a live operations view for the people running the business.",
    description:
      "A booking platform with customer verification, real-time staff updates, and automated confirmations and reminders.",
    problem:
      "Phone-based booking creates interruptions, missed details, and avoidable no-shows for both customers and staff.",
    solution:
      "Customers choose and confirm an appointment in a guided flow while staff manage availability and see every new booking arrive instantly.",
    highlights: [
      {
        title: "Book in a few steps",
        detail: "Services, times, details, and confirmation form one clear flow.",
      },
      {
        title: "Live staff view",
        detail: "New bookings appear without refreshing the dashboard.",
      },
      {
        title: "Less chasing",
        detail: "Verification, confirmations, and reminders run automatically.",
      },
    ],
    technicalProof: [
      {
        title: "Real-time by design",
        detail:
          "SignalR pushes booking changes directly to the correct organisation dashboard.",
      },
      {
        title: "Work happens off-screen",
        detail:
          "Background services queue emails and schedule reminders without slowing the booking flow.",
      },
    ],
    year: "2026",
    category: "Web",
    platforms: ["Web"],
    techStack: ["React", ".NET", "SQL Server", "Twilio", "SignalR"],
    status: "demo",
    githubUrl: "https://github.com/faivern/booking-service-platform",
    video: "/projects/Booking-Platform/booking-demo.mp4",
    screenshots: [
      {
        src: "/projects/Booking-Platform/admin-dashboard.webp",
        width: 1920,
        height: 947,
        alt: "Booking administration dashboard listing appointments and their current status",
        caption: "Staff can filter, review, and update the day’s bookings in one place.",
      },
      {
        src: "/projects/Booking-Platform/customer-booking.webp",
        width: 1920,
        height: 1334,
        alt: "Customer booking flow showing a calendar and available appointment times",
        caption: "Availability is presented as a guided customer journey.",
      },
      {
        src: "/projects/Booking-Platform/confirmation-email.webp",
        width: 760,
        height: 607,
        alt: "Appointment confirmation email with service, date, time, and booking details",
        caption: "Customers receive the details automatically after booking.",
      },
    ],
  },
  {
    slug: "Cinelas-TV",
    title: "Self-Hosted Media Browser for Google TV",
    tagline:
      "A remote-first television experience that connects rich movie discovery with a private media library at home.",
    description:
      "A Google TV app for browsing movie information and playing a personal media library from a self-hosted server.",
    problem:
      "Personal media and online discovery usually live in separate interfaces that were designed for a mouse, not a sofa and remote.",
    solution:
      "Cinelas TV joins both worlds in a focused ten-foot interface, with the library and streaming server running privately on a Raspberry Pi.",
    highlights: [
      {
        title: "Made for the sofa",
        detail: "Every screen and action works with a television remote.",
      },
      {
        title: "Browse, then play",
        detail: "Rich title details sit beside the media already owned.",
      },
      {
        title: "Private by default",
        detail: "The personal library stays on a server at home.",
      },
    ],
    technicalProof: [
      {
        title: "Small server, smooth playback",
        detail:
          "Video streams directly to the TV so the Raspberry Pi does not become a bottleneck.",
      },
      {
        title: "Two surfaces, one product",
        detail:
          "A Google TV client and self-hosted API are designed as one connected experience.",
      },
    ],
    example: {
      inputLabel: "On the television",
      input: "Discover titles\nNavigate by remote\nChoose from your library",
      outputLabel: "On the home server",
      output: "Match metadata\nFind the media file\nStream directly to Google TV",
    },
    year: "2026",
    category: "Device Apps",
    platforms: ["Google TV", "Self-hosted server"],
    techStack: [
      "React",
      "Capacitor",
      "ASP.NET Core",
      "PostgreSQL",
      "Jellyfin",
      "Docker",
    ],
    status: "demo",
    screenshots: [],
  },
  {
    slug: "Distributed-Ad-Platform",
    title: "Distributed Ad Platform",
    tagline:
      "Three independent applications that keep advertisements and subscriber information working as one system.",
    description:
      "A systems integration project connecting a web application, central API, and desktop administration client.",
    problem:
      "When separate tools manage related information, duplicated data and manual hand-offs quickly create disagreements.",
    solution:
      "The platform separates advertising and subscriber responsibilities while connecting the web, API, and desktop experiences through clear service boundaries.",
    highlights: [
      {
        title: "Three applications",
        detail: "Web, API, and desktop clients each have a focused job.",
      },
      {
        title: "Shared truth",
        detail: "Interfaces read and update subscriber data through one service.",
      },
      {
        title: "Independent parts",
        detail: "Each application can change without replacing the whole system.",
      },
    ],
    technicalProof: [
      {
        title: "Boundaries with a purpose",
        detail:
          "Advertising and subscriber data live in separate applications and databases.",
      },
      {
        title: "One service, different clients",
        detail:
          "The website and Windows application communicate with the same HTTP API.",
      },
    ],
    year: "2025",
    category: "Systems & Integration",
    platforms: ["Web", "Desktop", "API"],
    techStack: [
      "ASP.NET Core MVC",
      "Web API",
      "EF Core",
      "SQL Server",
      "WinForms",
    ],
    status: "demo",
    githubUrl: "https://github.com/faivern/distributed-ad-platform",
    screenshots: [
      {
        src: "/projects/Distributed-Ad-Platform/ad-system.webp",
        width: 1468,
        height: 1271,
        alt:
          "Web application showing a grid of advertisements with subscriber and business labels, prices, and sellers",
        caption: "The public-facing web application manages the advertising side.",
      },
      {
        src: "/projects/Distributed-Ad-Platform/desktop-subscriber.webp",
        width: 1141,
        height: 637,
        alt: "Windows desktop application for creating and managing subscribers",
        caption: "A separate desktop client manages subscribers through the shared API.",
      },
    ],
  },
  {
    slug: "Sky-Tracker-AI",
    title: "ADS-B Flight Tracker with AI Query Layer",
    tagline:
      "A real antenna-to-screen system that turns aircraft broadcasts into a live radar, useful answers, and a physical alert.",
    description:
      "A work-in-progress integrated system spanning radio hardware, live data, a radar interface, AI queries, and an ESP32 desk gadget.",
    problem:
      "Aircraft broadcast a constant stream of useful data, but radio messages alone do not answer the simple question: what is above me right now?",
    solution:
      "Sky Tracker captures those signals, turns them into flight sessions and a live map, and makes the history searchable in everyday language.",
    highlights: [
      {
        title: "Real-world input",
        detail: "A home antenna receives broadcasts from actual aircraft.",
      },
      {
        title: "Ask naturally",
        detail: "Questions become safe, read-only lookups over flight history.",
      },
      {
        title: "Software meets hardware",
        detail: "An ESP32 desk light reacts when aircraft enter the area.",
      },
    ],
    technicalProof: [
      {
        title: "A complete data journey",
        detail:
          "Radio data moves through ingestion, PostgreSQL, an API, WebSockets, and the radar UI.",
      },
      {
        title: "AI with guardrails",
        detail:
          "The query service uses parameterised SQL and a read-only database connection.",
      },
    ],
    year: "2026",
    wip: true,
    category: "Systems & Integration",
    platforms: ["Web", "Backend", "Hardware"],
    techStack: [
      "Java",
      "Spring Boot",
      "React",
      "FastAPI",
      "PostgreSQL",
      "ESP32",
    ],
    status: "demo",
    githubUrl: "https://github.com/faivern/sky-tracker-ai",
    screenshots: [
      {
        src: "/projects/Sky-Tracker-AI/architecture-v1.0.png",
        width: 1527,
        height: 877,
        alt: "Sky Tracker architecture from radio antenna through ingestion, database, web radar, AI service, and ESP32 alert",
        caption: "One data path connects an antenna in the garden to software and hardware experiences.",
      },
    ],
  },
  {
    slug: "Portfolio",
    title: "Personal Portfolio: Self-Hosted Static Site",
    tagline:
      "The site you are using now: a private, accessible portfolio served from a Raspberry Pi at home.",
    description:
      "A privacy-first, accessible static portfolio with no tracking or third-party requests, self-hosted on a Raspberry Pi.",
    problem:
      "A portfolio should be memorable and easy for anyone to use without quietly trading visitor privacy for convenience.",
    solution:
      "This site presents the work as a tactile digital business card and fast static case studies, with accessibility and privacy built into every layer.",
    highlights: [
      {
        title: "Zero tracking",
        detail: "No cookies, analytics, or requests to third parties.",
      },
      {
        title: "Built for everyone",
        detail: "Keyboard and screen-reader use are treated as core paths.",
      },
      {
        title: "Self-hosted",
        detail: "A Raspberry Pi serves the static export through nginx.",
      },
    ],
    technicalProof: [
      {
        title: "Static on purpose",
        detail:
          "Every route is exported to plain files, reducing server work and attack surface.",
      },
      {
        title: "Accessible details",
        detail:
          "Landmarks, focus handling, contrast, and reduced motion are part of the design system.",
      },
    ],
    year: "2026",
    category: "Web",
    platforms: ["Website", "Self-hosted"],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "nginx",
      "Cloudflare",
      "Raspberry Pi",
    ],
    status: "live",
    githubUrl: "https://github.com/faivern/portfolio",
    liveUrl: "https://gustaffaivre.dev",
    screenshots: [
      {
        src: "/projects/Portfolio/screenshot-1.png",
        width: 934,
        height: 551,
        alt: "Portfolio home page showing a letterpress-style business card on a dark desk",
        caption: "The business card is both the introduction and the navigation.",
      },
    ],
  },
  {
    slug: "AI-Customer-Insight",
    title: "AI Customer Insight CLI",
    tagline:
      "A focused tool that turns a spreadsheet of customer comments into the report a decision-maker actually needs.",
    description:
      "A command-line tool that combines statistics and AI to turn raw customer feedback into structured, actionable reports.",
    problem:
      "Useful themes hide inside hundreds of comments, and reading them manually is slow, subjective, and difficult to repeat.",
    solution:
      "The tool combines ratings with language analysis to produce a consistent report of sentiment, themes, quick wins, and longer-term actions.",
    highlights: [
      {
        title: "From CSV to report",
        detail: "One command turns raw comments into readable Markdown.",
      },
      {
        title: "Numbers plus narrative",
        detail: "Ratings support the themes and recommendations.",
      },
      {
        title: "Ready to act on",
        detail: "Quick wins are separated from longer-term improvements.",
      },
    ],
    technicalProof: [
      {
        title: "Works beyond one prompt",
        detail:
          "Large files are sampled and processed without exceeding model limits.",
      },
      {
        title: "Repeatable output",
        detail:
          "A defined report structure makes different feedback runs easy to compare.",
      },
    ],
    example: {
      inputLabel: "Raw feedback",
      input:
        'Hundreds of CSV rows\n“Checkout fails on mobile.”\n“Support was quick and friendly.”',
      outputLabel: "Decision-ready report",
      output:
        "Overall sentiment\nTop recurring themes\nQuick wins\nLong-term actions",
    },
    year: "2025",
    category: "CLI Tools",
    platforms: ["CLI"],
    techStack: ["Python", "OpenAI API", "pandas", "typer"],
    status: "demo",
    githubUrl: "https://github.com/faivern/ai-customer-insight",
    screenshots: [],
  },
  {
    slug: "Content-Management-AI",
    title: "Secure AI Text Analysis CLI",
    tagline:
      "A deliberately sceptical document assistant that summarises, translates, and reads sentiment without trusting every input or output.",
    description:
      "A security-first command-line assistant for summarising, translating, and analysing sentiment in text and PDF documents.",
    problem:
      "AI can speed up document work, but an uploaded file can contain hostile instructions and a model response can arrive in an unexpected shape.",
    solution:
      "The assistant isolates document content, performs the requested analysis, and validates the structured result before saving or showing it.",
    highlights: [
      {
        title: "Three useful jobs",
        detail: "Summarise, translate, or gauge sentiment from one tool.",
      },
      {
        title: "More than plain text",
        detail: "Both text files and PDFs follow the same clear workflow.",
      },
      {
        title: "Checked before trusted",
        detail: "Unexpected AI responses are rejected rather than passed on.",
      },
    ],
    technicalProof: [
      {
        title: "Defends its instructions",
        detail:
          "Document content is isolated so embedded prompts cannot quietly change the task.",
      },
      {
        title: "Fails clearly",
        detail:
          "Schema validation, retries, and explicit errors make model failures manageable.",
      },
    ],
    example: {
      inputLabel: "Untrusted document",
      input: "TXT or PDF\nRequested task\nPotential embedded instructions",
      outputLabel: "Validated result",
      output: "Known JSON shape\nLanguage and word count\nTimestamped output file",
    },
    year: "2025",
    category: "CLI Tools",
    platforms: ["CLI"],
    techStack: ["Python", "OpenAI API", "PyPDF2", "pytest"],
    status: "demo",
    githubUrl: "https://github.com/faivern/content-management-ai",
    screenshots: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
