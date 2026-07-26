import {
  TechStackIcon,
  type TechStackIconName,
} from "@/lib/tech-stack-icon";

const dotnet = "netcore" satisfies TechStackIconName;
const python = "python" satisfies TechStackIconName;
const fallbackIcon = "techstackicons" satisfies TechStackIconName;

const technologyIcons: Record<string, TechStackIconName> = {
  ".NET": dotnet,
  "ASP.NET Core": dotnet,
  "ASP.NET Core MVC": dotnet,
  "EF Core": dotnet,
  "Web API": dotnet,
  SignalR: dotnet,
  React: "react",
  PostgreSQL: "postgresql",
  Docker: "docker",
  Azure: "azure",
  "SQL Server": "microsoft",
  Twilio: "twilio",
  Java: "java",
  "Spring Boot": "spring",
  "C#": "c#",
  FastAPI: python,
  ESP32: "c++",
  Capacitor: "ionic",
  Jellyfin: "linux",
  "Next.js": "nextjs",
  JavaScript: "js",
  TypeScript: "typescript",
  Tailwind: "tailwindcss",
  "Tailwind CSS": "tailwindcss",
  HTML: "html5",
  CSS: "css3",
  MongoDB: "mongodb",
  Linux: "linux",
  Git: "git",
  GitHub: "github",
  "Azure DevOps": "azure",
  nginx: "nginx",
  Cloudflare: "cloudflare",
  "Raspberry Pi": "raspberrypi",
  Python: python,
  "OpenAI API": "openai",
  "Claude Code": "claude",
  pandas: "pandas",
  PyPDF2: python,
  pytest: "pytest",
  typer: python,
  WinForms: "windows11",
};

type TechnologyBadgeProps = {
  as?: "li" | "span";
  technology: string;
  variant?: "compact" | "full" | "profile";
};

export function TechnologyBadge({
  as: Tag = "span",
  technology,
  variant = "compact",
}: TechnologyBadgeProps) {
  const technologyIcon = technologyIcons[technology] ?? fallbackIcon;
  const className =
    variant === "full"
      ? "inline-flex items-center gap-1.5 rounded-sm border border-foreground/15 px-2.5 py-1 font-sans text-[0.65rem] normal-case tracking-normal text-muted [text-shadow:none]"
      : variant === "profile"
        ? "inline-flex items-center gap-1.5 rounded-sm border border-foreground/15 px-2 py-1 font-sans text-[0.65rem] normal-case leading-none tracking-normal text-muted [text-shadow:none]"
        : "inline-flex items-center gap-1.5 rounded-sm border border-foreground/15 px-2 py-1 font-sans text-[0.65rem] tracking-[0.08em] text-muted";
  const iconClassName =
    variant === "profile" ? "h-3.5 w-3.5" : "h-3 w-3";

  return (
    <Tag className={className}>
      <span aria-hidden="true" className={`${iconClassName} shrink-0`}>
        <TechStackIcon className="h-full w-full" name={technologyIcon} />
      </span>
      {technology}
    </Tag>
  );
}
