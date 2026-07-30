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

export type ProjectVideo = {
  src: string;
  title: string;
  description: string;
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
  videos?: ProjectVideo[];
  videoPoster?: string;
  videoCaption?: string;
  videoPlaceholder?: boolean;
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
    videoPoster: "/projects/Booking-Platform/admin-dashboard.webp",
    videoCaption:
      "A guided demonstration of the customer and staff booking experience.",
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
      "One place to explore every film and series: play what you own, jump to the service that has what you don’t, and save the rest for later.",
    description:
      "Cinelas TV is a Google TV media hub that streams an owned Jellyfin library, finds regional streaming availability, and keeps personal watchlists.",
    problem:
      "Personal collections and streaming subscriptions live in separate apps, each showing only its own world. Finding The Godfather should not mean searching every service — or forgetting about it when it is unavailable.",
    solution:
      "Cinelas TV gathers the whole catalogue in one remote-friendly hub. Owned titles play from Jellyfin. For everything else, it shows the services carrying the title in the viewer’s region; choosing Netflix, for example, closes Cinelas TV and opens Netflix on the television. Unavailable titles can stay on a personal list until they reach a service or the viewer buys them.",
    highlights: [
      {
        title: "One catalogue, no walls",
        detail:
          "Discover titles beyond what individual streaming platforms choose to surface.",
      },
      {
        title: "From poster to playback",
        detail:
          "Play owned media directly or hand an unowned title to the right TV app.",
      },
      {
        title: "Keep it for later",
        detail:
          "Per-profile lists remember titles worth streaming later or adding to the collection.",
      },
    ],
    technicalProof: [
      {
        title: "A thin TV app",
        detail:
          "The Capacitor-wrapped React app stays focused on the remote-controlled experience while a Raspberry Pi runs nginx, the .NET API, PostgreSQL, and Jellyfin.",
      },
      {
        title: "The right source for each job",
        detail:
          "TMDB supplies catalogue and regional provider data; Jellyfin alone serves owned media through proxied URLs, keeping discovery and playback clearly separated.",
      },
    ],
    year: "2026",
    category: "Device Apps",
    platforms: ["Google TV", "Self-hosted server"],
    techStack: [
      "React",
      "TypeScript",
      "Capacitor",
      "Android",
      ".NET",
      "PostgreSQL",
      "Jellyfin",
      "nginx",
      "Docker",
      "Raspberry Pi",
      "TMDB",
    ],
    status: "demo",
    githubUrl: "https://github.com/faivern/cinelas-tv",
    videos: [
      {
        src: "/projects/CinelasTv/1-notownedmedia-app-redirection.mp4",
        title: "Continue in the right streaming app",
        description:
          "Find a title outside the owned library, choose an available provider, and hand playback to its Google TV app.",
      },
      {
        src: "/projects/CinelasTv/2-search-ownedmedia.mp4",
        title: "Search and play owned media",
        description:
          "Search the personal catalogue and start streaming an owned title directly from Jellyfin.",
      },
      {
        src: "/projects/CinelasTv/3-launch-profile-frontapge.mp4",
        title: "Launch into a personal home screen",
        description:
          "Open Cinelas TV, choose a viewer profile, and arrive at a remote-friendly discovery experience.",
      },
      {
        src: "/projects/CinelasTv/4-mediadetails-trailer.mp4",
        title: "Explore details and watch a trailer",
        description:
          "Open a title to review its key details and preview the trailer before deciding what to watch.",
      },
    ],
    screenshots: [],
  },
  {
    slug: "Distributed-Ad-Platform",
    title: "Distributed Ad Platform",
    tagline:
      "A self-service advertising workflow for a newspaper, connecting subscriber benefits, business advertisers, and back-office management without duplicating customer data.",
    description:
      "A newspaper advertising platform that reuses subscriber records through an API, automates advertiser pricing, and keeps subscriber administration separate.",
    problem:
      "A newspaper needs to serve both subscribers and business advertisers. Copying subscriber details into the advertising system would create duplicate records, extra administration, and a greater risk of conflicting customer information.",
    solution:
      "Subscribers identify themselves with a subscription number, review details retrieved from the subscriber service, and place an advert for free. Companies enter their own billing details and receive the standard 40 SEK advertising price automatically.",
    highlights: [
      {
        title: "Self-service intake",
        detail:
          "One guided web flow adapts to subscribers and business advertisers.",
      },
      {
        title: "Subscriber benefit",
        detail:
          "A subscription number unlocks saved customer details and zero-cost advertising.",
      },
      {
        title: "Less duplicate data",
        detail:
          "Subscriber information remains owned by one system and is reused through its API.",
      },
    ],
    technicalProof: [
      {
        title: "Two systems, two databases",
        detail:
          "Advertising and subscriber responsibilities stay independently deployable, with their own data models and storage.",
      },
      {
        title: "API-led workflows",
        detail:
          "The advertising site retrieves existing customers while a Windows CRUD client manages subscriber records through the same HTTP API.",
      },
    ],
    year: "2025",
    category: "Systems & Integration",
    platforms: ["Web", "Desktop", "API"],
    techStack: [
      "ASP.NET Core MVC",
      "Bootstrap",
      "Web API",
      "EF Core",
      "SQL Server",
      "WinForms",
    ],
    status: "demo",
    githubUrl: "https://github.com/faivern/distributed-ad-platform",
    video: "/projects/Distributed-Ad-Platform/ad-platform-demo.mp4",
    videoCaption:
      "A walkthrough of the connected advertising and subscriber-management workflows.",
    screenshots: [
      {
        src: "/projects/Distributed-Ad-Platform/ad-system.webp",
        width: 1468,
        height: 1271,
        alt:
          "Web application showing a grid of advertisements with subscriber and business labels, prices, and sellers",
        caption:
          "The advertising site clearly distinguishes subscriber and business listings.",
      },
      {
        src: "/projects/Distributed-Ad-Platform/desktop-subscriber.webp",
        width: 1141,
        height: 637,
        alt: "Windows desktop application for creating and managing subscribers",
        caption:
          "Back-office staff manage the subscriber records reused by the advertising workflow.",
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
      "The site you are using now: a privacy-friendly, accessible portfolio self-hosted on a Raspberry Pi at my home.",
    description:
      "A privacy-first, accessible static portfolio with no tracking or third-party requests, self-hosted on a Raspberry Pi.",
    problem:
      "A portfolio should be memorable and easy for anyone to use without quietly trading visitor privacy for convenience.",
    solution:
      "This site presents the work as a tactile digital business card and fast static case studies, with accessibility and privacy built into every layer.",
    highlights: [
      {
        title: "Zero tracking",
        detail: "No cookies, analytics, or tracking scripts.",
      },
      {
        title: "Built for everyone",
        detail: "Keyboard and screen-reader use are treated as core paths.",
      },
      {
        title: "Self-hosted",
        detail: "A Raspberry Pi serves the static export through nginx, exposed securely through a Cloudflare Tunnel.",
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
      "A guided CLI that turns a CSV of customer comments into a decision-ready report, with every analysis stage made visible.",
    description:
      "A guided command-line tool that validates customer feedback, combines dataset metrics with AI analysis, and produces a structured Markdown report.",
    problem:
      "Useful themes hide inside hundreds of comments, and reading them manually is slow, subjective, and difficult to repeat.",
    solution:
      "The guided workflow validates the CSV, calculates dataset metrics, prepares safe samples, previews the findings, and saves themes and prioritised actions as a shareable Markdown report.",
    highlights: [
      {
        title: "Guided from the start",
        detail:
          "Run it with no arguments to choose a CSV interactively, or provide a path directly.",
      },
      {
        title: "Progress you can see",
        detail:
          "Five clear stages show validation, metrics, safety checks, AI analysis, and report creation.",
      },
      {
        title: "Useful before you leave",
        detail:
          "A terminal preview surfaces the top themes and next steps while the full report is saved.",
      },
    ],
    technicalProof: [
      {
        title: "Guarded inputs",
        detail:
          "Required columns are validated, samples are capped and sanitised, and feedback is treated as untrusted data rather than instructions.",
      },
      {
        title: "Structured, repeatable output",
        detail:
          "Model responses are checked before a fixed report structure turns metrics and insights into comparable findings.",
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
    video: "/projects/AI-Customer-Insight/AI-Customer-Insight-Demo.mp4",
    videoCaption:
      "The guided workflow turns an example CSV into a preview and a saved customer insight report.",
    screenshots: [
      {
        src: "/projects/AI-Customer-Insight/Input-and-Worflow.png",
        width: 1091,
        height: 878,
        alt:
          "AI Customer Insight terminal showing five completed analysis stages, dataset metrics, an insight preview, and the saved report path",
        caption:
          "The CLI keeps validation, safety checks, progress, and the most useful findings visible.",
      },
      {
        src: "/projects/AI-Customer-Insight/Output-Full-Report.png",
        width: 1579,
        height: 891,
        alt:
          "Generated customer insight report showing response metrics, a summary, top themes, prioritised improvements, quick wins, and long-term actions",
        caption:
          "The saved Markdown report separates evidence, themes, quick wins, and longer-term actions.",
      },
    ],
  },
  {
    slug: "Content-Management-AI",
    title: "AI Content Management",
    tagline:
      "A document assistant that turns unstructured text and PDFs into concise summaries, translations, and sentiment insights.",
    description:
      "AI Content Management turns unstructured text and PDFs into actionable summaries, translations, and sentiment insights.",
    problem:
      "Reviewing long documents by hand takes time and makes it easy to miss the themes, concerns, and details that deserve attention.",
    solution:
      "The CLI reads a text file or PDF, runs the chosen analysis, and presents a structured result that can be reviewed immediately and reused later.",
    highlights: [
      {
        title: "Summaries that scan",
        detail:
          "Condenses long material into a short overview and focused key points.",
      },
      {
        title: "Three workflows",
        detail:
          "Summarise, translate, or analyse sentiment from one guided interface.",
      },
      {
        title: "Useful across teams",
        detail:
          "Turn course material, reports, or customer feedback into actionable insights.",
      },
    ],
    technicalProof: [
      {
        title: "Mixed document input",
        detail:
          "Text files and PDFs share the same workflow, with source language and word count detected during processing.",
      },
      {
        title: "Structured, reusable results",
        detail:
          "Each analysis is validated, shown in the terminal, and saved as timestamped JSON for later use.",
      },
    ],
    year: "2026",
    category: "CLI Tools",
    platforms: ["CLI"],
    techStack: ["Python", "OpenAI API", "PyPDF2", "pytest"],
    status: "demo",
    githubUrl: "https://github.com/faivern/content-management-ai",
    video: "/projects/AI-Content-Manager/content-manager-demo.mp4",
    videoCaption:
      "A guided demonstration of the document-analysis workflow from source selection to saved result.",
    screenshots: [
      {
        src: "/projects/AI-Content-Manager/lecture-note-input.png",
        width: 776,
        height: 730,
        alt:
          "AI Content Management terminal showing the summarize workflow processing a 3.5 megabyte university Security Fundamentals PDF",
        caption:
          "A university lecture PDF moves through reading, language detection, summarisation, and structured output.",
      },
      {
        src: "/projects/AI-Content-Manager/lecture-note-result.png",
        width: 898,
        height: 795,
        alt:
          "AI Content Management terminal showing a concise Security Fundamentals lecture summary and five extracted key points",
        caption:
          "The result turns 1,266 words of course material into a concise summary and five revision-ready key points.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
