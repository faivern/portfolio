// Project copy is written for a quick recruiter scan. Keep it human and concise.
// Use technicalProof for the engineering details behind each project.
// Project media is served locally to avoid third-party image and video requests.

export const projectCategories = [
  "Web",
  "Systems & Integration",
  "Device Apps",
  "CLI Tools",
  "Security Lab",
] as const;

export type ProjectArea = "Software Development" | "Cybersecurity";

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
  credit?: {
    author: string;
    sourceUrl: string;
    license: string;
    licenseUrl: string;
  };
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

type ProjectBase = {
  areas: ProjectArea[];
  projectType: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  wip?: boolean;
  category: ProjectCategory;
  platforms: ProjectPlatform[];
  techStack: string[];
  status: "live" | "demo" | "completed";
  /* Preview image for the /projects index card; defaults to the first screenshot. */
  cardImage?: ProjectMedia;
  githubUrl?: string;
  liveUrl?: string;
  video?: string;
  videos?: ProjectVideo[];
  videoPoster?: string;
  showVideoPosterInGallery?: boolean;
  videoCaption?: string;
  videoPlaceholder?: boolean;
  screenshots: ProjectMedia[];
};

export type SoftwareProject = ProjectBase & {
  caseStudy?: undefined;
  problemTitle?: string;
  problem: string;
  solution: string;
  highlights: ProjectHighlight[];
  technicalProof: ProjectProof[];
  example?: ProjectExample;
};

export type SecurityProject = ProjectBase & { caseStudy: string };

export type Project = SoftwareProject | SecurityProject;

export const projects: Project[] = [
  {
    slug: "web-application-security",
    title: "Web Application Security: SQL Injection & XSS",
    tagline:
      "From HTTP enumeration to database extraction and session access in a deliberately vulnerable lab.",
    description:
      "A web security lab covering authentication attacks, manual and automated SQL injection, reflected and stored XSS, and proposed countermeasures.",
    areas: ["Cybersecurity"],
    projectType: "Security Lab",
    caseStudy: "web-application-security",
    year: "2026",
    category: "Security Lab",
    platforms: ["Web", "CLI"],
    techStack: ["Nmap", "Hydra", "sqlmap", "Python 3"],
    status: "completed",
    cardImage: {
      src: "/projects/web-application-security/login-bypass.png",
      width: 811,
      height: 404,
      alt: "Porthos admin page welcoming admin and displaying the login-bypass flag",
      caption:
        "Authenticated admin access after the SQL injection login bypass.",
    },
    screenshots: [],
  },
  {
    slug: "linux-firewall-engineering",
    title: "Linux Firewall Engineering: Filtering & Access Control",
    tagline:
      "Stateful forwarding, client-specific access, and ICMP rate limiting, with an evidence review of scan controls.",
    description:
      "An iptables lab covering default-deny policies, stateful forwarding, Telnet access controls, ICMP rate limiting, and the limits of scan-control validation.",
    areas: ["Cybersecurity"],
    projectType: "Security Lab",
    caseStudy: "linux-firewall-engineering",
    year: "2025",
    category: "Security Lab",
    platforms: ["CLI", "Desktop"],
    techStack: ["Linux", "iptables", "Nmap", "VMware"],
    status: "completed",
    cardImage: {
      src: "/projects/linux-firewall-engineering/final-rule-counters.png",
      width: 829,
      height: 434,
      alt: "Numbered FORWARD rules with HTTP accepts above recent checks, a 15-second window, and zero scan-drop counters",
      caption:
        "The saved rules and counters expose differences from the written scan-control configuration.",
    },
    screenshots: [],
  },
  {
    slug: "FRA-Exfiltratoren",
    title: "FRA CTF: Exfiltratören — Network Traffic Forensics",
    tagline:
      "Tracing a suspected data leak through FTP, email, and UDP traffic in FRA’s seven-flag challenge. Three flags documented.",
    description:
      "A PCAP investigation covering FTP transfers, an email attachment, and a custom UDP transfer. I used Wireshark, Python, CyberChef, and ExifTool to examine the evidence and document three of the seven flags.",
    areas: ["Cybersecurity"],
    projectType: "CTF Write-up",
    caseStudy: "FRA-Exfiltratoren",
    year: "2026",
    category: "Security Lab",
    platforms: ["Desktop", "CLI"],
    techStack: ["CyberChef", "Wireshark", "Python 3", "dCode"],
    status: "demo",
    wip: true,
    cardImage: {
      src: "/projects/FRA-Exfiltratoren/ftp-control.png",
      width: 1488,
      height: 750,
      alt: "Wireshark capture showing FTP commands and the upload of msg.txt",
      caption: "Following file transfers and other clues in a captured FTP session.",
    },
    screenshots: [],
  },
  {
    areas: ["Software Development"],
    projectType: "Full-stack Application",
    slug: "Cinelas",
    title: "Cinelas — Movie & TV Discovery",
    tagline:
      "A live film and TV platform for discovering titles, tracking what you watch, and finding where to stream them.",
    description:
      "Cinelas combines search, recommendations, watchlists, viewing progress, and streaming availability across more than 1.3 million films and series.",
    problem:
      "Finding something to watch often means switching between streaming services, recommendation sites, and personal watchlists.",
    solution:
      "I built Cinelas to bring discovery, title details, personal lists, viewing progress, and multi-category reviews into one responsive application.",
    highlights: [
      {
        title: "Search in your own words",
        detail:
          "Ask for a film by mood, story, actor, or a scene you remember instead of relying only on filters.",
      },
      {
        title: "1.3M+ titles",
        detail: "Search a catalogue of more than 1.3 million films and series.",
      },
      {
        title: "From discovery to watchlist",
        detail:
          "Find a title, check where it streams, save it to a list, and track or review it later.",
      },
    ],
    technicalProof: [
      {
        title: "Grounded recommendations (RAG)",
        detail:
          "A retrieval-augmented generation (RAG) workflow searches a prepared index of film and TV records for relevant matches. Azure OpenAI uses the retrieved titles to select and explain recommendations, keeping suggestions grounded in catalogue data.",
      },
      {
        title: "Checks around AI output",
        detail:
          "The recommendation flow filters out watched titles and verifies suggestions against the catalogue before displaying them. Authentication, usage limits, caching, and monitoring help manage performance and API costs.",
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
        alt: "Cinelas AI chat showing a film recommendation in response to a natural-language question",
        caption:
          "Uses catalogue matches to support recommendations from natural-language requests.",
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
    slug: "SOC-001",
    title: "SOC Home Lab: SSH Brute-Force Detection with Wazuh SIEM",
    tagline:
      "From failed SSH logins to a live SIEM alert: a custom Wazuh rule and a separate file-integrity investigation.",
    description:
      "A three-VM SOC lab where I investigated SSH login failures, developed a source-IP correlation rule, and tested file integrity monitoring.",
    areas: ["Cybersecurity"],
    projectType: "Security Lab",
    caseStudy: "SOC-001",
    category: "Security Lab",
    platforms: ["Self-hosted"],
    year: "2026",
    status: "completed",
    techStack: [
      "Wazuh SIEM",
      "Ubuntu Linux",
      "Windows",
      "OpenSSH",
      "VMware Workstation",
      "File Integrity Monitoring",
      "XML detection rules",
    ],
    githubUrl: "https://github.com/faivern/soc-detection-lab",
    cardImage: {
      src: "/projects/SOC-001/05-custom-rule-alert.png",
      width: 1128,
      height: 993,
      alt: "Wazuh alert raised by the lab's custom SSH brute-force rule, showing the matched rule and source address.",
      caption: "Live Wazuh alert generated by custom rule 100101.",
    },
    screenshots: [],
  },
  {
    areas: ["Software Development"],
    projectType: "Full-stack Application",
    slug: "Booking-Platform",
    title: "Online Booking",
    tagline:
      "A booking flow for customers and a real-time dashboard for staff managing appointments.",
    description:
      "A booking application with customer verification, live staff updates, and automated booking emails and reminders.",
    problem:
      "Manual bookings can interrupt staff, lead to missing information, and make confirmations harder to track.",
    solution:
      "I built a guided appointment flow for customers, alongside a staff dashboard that receives booking updates in real time.",
    highlights: [
      {
        title: "Book in a few steps",
        detail:
          "Services, times, details, and confirmation form one clear flow.",
      },
      {
        title: "Live staff view",
        detail: "New bookings appear without refreshing the dashboard.",
      },
      {
        title: "Automated follow-up",
        detail: "Customer verification, confirmation emails, and scheduled reminders reduce repetitive administration.",
      },
    ],
    technicalProof: [
      {
        title: "Real-time by design",
        detail:
          "SignalR delivers booking updates to the relevant organisation dashboard without requiring a page refresh.",
      },
      {
        title: "Background processing",
        detail:
          "Background services handle confirmation emails and reminders separately from the customer booking flow.",
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
        caption:
          "Staff can filter, review, and update the day’s bookings in one place.",
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
    areas: ["Software Development"],
    projectType: "Device Application",
    slug: "Cinelas-TV",
    title: "Cinelas TV — Self-Hosted Media Browser",
    tagline:
      "A Google TV app that brings a personal media library, film discovery, and streaming-service links into one remote-friendly interface.",
    description:
      "Cinelas TV combines a Jellyfin media library, TMDB catalogue data, provider links, and personal lists in a Google TV application.",
    problem:
      "A personal media library and streaming subscriptions are usually spread across different apps, making it harder to see all available viewing options in one place.",
    solution:
      "I built a remote-friendly interface that plays locally owned media through Jellyfin and shows regional streaming providers for other titles. Users can open supported provider apps or save titles to their own lists.",
    highlights: [
      {
        title: "One discovery view",
        detail:
          "Browse films and series independently of any one streaming service’s catalogue.",
      },
      {
        title: "Playback or provider link",
        detail:
          "Play items from the Jellyfin library or open a supported streaming-provider app.",
      },
      {
        title: "Personal watchlists",
        detail:
          "Save titles to personal lists organised by viewer profile.",
      },
    ],
    technicalProof: [
      {
        title: "TV-focused client",
        detail:
          "The React and Capacitor client handles the remote-control interface, while a Raspberry Pi hosts nginx, the .NET API, PostgreSQL, and Jellyfin.",
      },
      {
        title: "Separate discovery and playback",
        detail:
          "TMDB supplies metadata and regional provider availability. Jellyfin serves personally owned media through proxied URLs, keeping catalogue discovery separate from local playback.",
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
        title: "Open a streaming provider",
        description:
          "Choose a streaming provider for a title outside the local library and open its Google TV app.",
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
          "Launch Cinelas TV, choose a viewer profile, and browse with the remote.",
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
    areas: ["Software Development"],
    projectType: "Systems & Hardware",
    slug: "Distributed-Ad-Platform",
    title: "Newspaper Advertising Platform",
    tagline:
      "A newspaper advertising workflow connecting a self-service website, subscriber API, and desktop administration tool.",
    description:
      "A .NET advertising system that retrieves subscriber details through an API and handles subscriber and business pricing separately.",
    problem:
      "The advertising application needs subscriber details without maintaining a second, potentially conflicting copy of the subscriber database.",
    solution:
      "I separated subscriber management from the advertising website. Subscribers can retrieve their details with a subscription number and place an advert at no charge, while businesses are charged the configured 40 SEK fee.",
    highlights: [
      {
        title: "Self-service intake",
        detail:
          "One guided web flow adapts to subscribers and business advertisers.",
      },
      {
        title: "Subscriber pricing",
        detail:
          "A subscription number retrieves customer details and applies the subscriber price.",
      },
      {
        title: "Single source of subscriber data",
        detail:
          "Subscriber records are maintained by one service and retrieved through its API.",
      },
    ],
    technicalProof: [
      {
        title: "Separate services and databases",
        detail:
          "The advertising and subscriber services have separate responsibilities, data models, and databases.",
      },
      {
        title: "Shared subscriber API",
        detail:
          "The advertising website reads subscriber details through an HTTP API; a Windows Forms client uses the same API to manage those records.",
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
        alt: "Web application showing a grid of advertisements with subscriber and business labels, prices, and sellers",
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
    areas: ["Software Development"],
    projectType: "Systems & Hardware",
    slug: "Sky-Tracker-AI",
    title: "Sky Tracker AI",
    tagline:
      "A personal ADS-B receiver and web dashboard for following aircraft overhead and exploring recorded flight activity.",
    description:
      "Sky Tracker AI collects aircraft transponder broadcasts and presents them through a live map and flight history, with further alerting and AI features under development.",
    problemTitle: "What I wanted to explore",
    problem:
      "I wanted to combine a Raspberry Pi and radio receiver with software I built myself, then turn aircraft broadcasts into something I could explore through a browser. The project began with live tracking and grew into flight history and statistics, with alerts and AI-assisted queries planned as later steps.",
    solution:
      "A 1090 MHz antenna and RTL-SDR receiver feed aircraft broadcasts to a Raspberry Pi. A Java service processes the observations, stores flight data, and serves a React dashboard with live positions and history. Planned work includes geofence alerts and natural-language queries over the recorded data.",
    highlights: [
      {
        title: "Live radar",
        detail:
          "Follow aircraft positions received through my own antenna and ADS-B receiver, rather than an external flight-tracking feed.",
      },
      {
        title: "Flight history",
        detail:
          "Review recorded flight sessions and compare aircraft by speed, altitude, or distance from the receiver.",
      },
      {
        title: "Designed for alerts",
        detail:
          "The planned alerting phase covers geofences and emergency transponder codes.",
      },
    ],
    technicalProof: [
      {
        title: "From radio signal to web UI",
        detail:
          "The Raspberry Pi decodes ADS-B signals and streams them to a Spring Boot service, which processes flight observations for the live dashboard and historical queries.",
      },
      {
        title: "Flight-session processing",
        detail:
          "The service groups position updates into flight sessions and applies sampling and retention logic to manage stored data.",
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
      "TypeScript",
      "Supabase",
      "Raspberry Pi",
    ],
    status: "demo",
    githubUrl: "https://github.com/faivern/sky-tracker-ai",
    video: "/projects/Sky-Tracker-AI/skytracker-beta-demo.mp4",
    videoPoster: "/projects/Sky-Tracker-AI/live-view.png",
    showVideoPosterInGallery: true,
    videoCaption:
      "A short tour of the live map, flight history, route replay, comparisons, and alerts.",
    screenshots: [
      {
        src: "/projects/Sky-Tracker-AI/live-view.png",
        width: 1906,
        height: 903,
        alt: "Sky Tracker AI live map showing an aircraft detected by the home receiver",
        caption:
          "The live map shows aircraft detected by the receiver at my home.",
      },
      {
        src: "/projects/Sky-Tracker-AI/leaderboard.png",
        width: 510,
        height: 545,
        alt: "Sky Tracker AI comparison showing the fastest detected aircraft, with flight names, dates, and speeds",
        caption:
          "Compare recorded flights by speed, altitude, and proximity to the receiver.",
      },
    ],
  },
  {
    areas: ["Software Development"],
    projectType: "Website",
    slug: "Portfolio",
    title: "Personal Portfolio",
    tagline:
      "The portfolio you are viewing: a static Next.js site designed for accessibility and privacy, served from a Raspberry Pi.",
    description:
      "A statically exported Next.js portfolio, self-hosted on a Raspberry Pi, without analytics or tracking cookies.",
    problem:
      "I wanted a portfolio that felt personal, loaded quickly, and worked well without relying on visitor tracking.",
    solution:
      "I built a business-card-inspired landing page and a collection of lightweight project case studies, with keyboard accessibility and privacy in mind.",
    highlights: [
      {
        title: "No analytics",
        detail: "The site does not use analytics or visitor-tracking scripts.",
      },
      {
        title: "Accessibility",
        detail: "Navigation and components are designed for keyboard and screen-reader use.",
      },
      {
        title: "Self-hosted",
        detail:
          "A Raspberry Pi serves the static export through nginx, with public access routed through a Cloudflare Tunnel.",
      },
    ],
    technicalProof: [
      {
        title: "Static by design",
        detail:
          "Next.js exports the pages as static files, avoiding a continuously running application server for the portfolio itself.",
      },
      {
        title: "Accessibility in practice",
        detail:
          "The UI includes semantic landmarks, visible focus states, sufficient text contrast, and reduced-motion support.",
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
        caption:
          "The business-card landing page introduces the site and provides navigation.",
      },
    ],
  },
  {
    areas: ["Software Development"],
    projectType: "CLI Tool",
    slug: "AI-Customer-Insight",
    title: "AI Customer Insights",
    tagline:
      "A Python CLI that turns CSV customer feedback into a structured report of common themes and possible improvements.",
    description:
      "AI Customer Insights analyses customer feedback from CSV files and produces a structured report using the OpenAI API.",
    problem:
      "Reviewing large collections of customer feedback manually takes time and can make recurring issues hard to spot.",
    solution:
      "I built a guided CLI that validates the input CSV, calculates summary metrics, and uses an LLM to group feedback into themes and suggested actions. It displays a preview and saves the report as Markdown.",
    highlights: [
      {
        title: "Guided from the start",
        detail:
          "Choose a customer feedback file and follow a clear step-by-step process.",
      },
      {
        title: "Visible progress",
        detail:
          "The CLI reports progress through validation, metrics, input checks, AI analysis, and report generation.",
      },
      {
        title: "Preview and saved report",
        detail:
          "The terminal shows the main findings while a full Markdown report is saved.",
      },
    ],
    technicalProof: [
      {
        title: "Input validation",
        detail:
          "The tool checks required CSV columns, limits sample sizes, and treats customer feedback as data rather than instructions to the model.",
      },
      {
        title: "Consistent report structure",
        detail:
          "Model output is validated before being formatted alongside metrics and suggested actions in a consistent Markdown report.",
      },
    ],
    example: {
      inputLabel: "Raw feedback",
      input:
        "Hundreds of CSV rows\n“Checkout fails on mobile.”\n“Support was quick and friendly.”",
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
      "The example run shows CSV analysis, a terminal preview, and a saved Markdown report.",
    screenshots: [
      {
        src: "/projects/AI-Customer-Insight/Input-and-Worflow.png",
        width: 1091,
        height: 878,
        alt: "AI Customer Insight terminal showing five completed analysis stages, dataset metrics, an insight preview, and the saved report path",
        caption:
          "The terminal shows each stage of the workflow and previews the main findings.",
      },
      {
        src: "/projects/AI-Customer-Insight/Output-Full-Report.png",
        width: 1579,
        height: 891,
        alt: "Generated customer insight report showing response metrics, a summary, top themes, prioritised improvements, quick wins, and long-term actions",
        caption:
          "The Markdown report organises metrics, recurring themes, and suggested actions.",
      },
    ],
  },
  {
    areas: ["Software Development"],
    projectType: "CLI Tool",
    slug: "Content-Management-AI",
    title: "AI Document Assistant",
    tagline:
      "A Python CLI for summarising, translating, and analysing the sentiment of text and PDF documents.",
    description:
      "AI Document Assistant processes text files and PDFs to produce summaries, translations, or sentiment analysis.",
    problem:
      "Long documents can be time-consuming to review, especially when the goal is to extract key points or translate content.",
    solution:
      "I built a command-line workflow that reads a text file or PDF, runs the selected analysis, and displays and saves the result.",
    highlights: [
      {
        title: "Concise summaries",
        detail:
          "Produces a short overview and a list of key points from longer documents.",
      },
      {
        title: "Three analysis modes",
        detail:
          "Summarise, translate, or assess sentiment through the same CLI.",
      },
      {
        title: "Reusable output",
        detail:
          "Use the same workflow for lecture notes, reports, and other text-based material.",
      },
    ],
    technicalProof: [
      {
        title: "Text and PDF input",
        detail:
          "Text and PDF files follow the same workflow, including language detection and word-count reporting.",
      },
      {
        title: "Saved results",
        detail:
          "Results are checked, displayed in the terminal, and saved as timestamped JSON.",
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
      "A CLI demonstration from document selection to saved output.",
    screenshots: [
      {
        src: "/projects/AI-Content-Manager/lecture-note-input.png",
        width: 776,
        height: 730,
        alt: "AI Content Management terminal showing the summarize workflow processing a 3.5 megabyte university Security Fundamentals PDF",
        caption:
          "The CLI reads a lecture PDF, detects its language, and produces a structured summary.",
      },
      {
        src: "/projects/AI-Content-Manager/lecture-note-result.png",
        width: 898,
        height: 795,
        alt: "AI Content Management terminal showing a concise Security Fundamentals lecture summary and five extracted key points",
        caption:
          "The example condenses course material into a summary and five key points.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
