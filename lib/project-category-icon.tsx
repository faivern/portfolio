import type { SVGProps } from "react";
import type { ProjectCategory } from "@/app/projects/data";

type Props = SVGProps<SVGSVGElement> & {
  category: ProjectCategory;
};

export function ProjectCategoryIcon({ category, ...props }: Props) {
  const shared = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };

  if (category === "Web") {
    return (
      <svg {...shared}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 9h17M3.5 15h17M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21M12 3C9.8 5.4 8.7 8.4 8.7 12S9.8 18.6 12 21" />
      </svg>
    );
  }

  if (category === "Systems & Integration") {
    return (
      <svg {...shared}>
        <circle cx="12" cy="12" r="2.5" />
        <circle cx="5" cy="5" r="2" />
        <circle cx="19" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="m6.5 6.5 3.7 3.7m3.6 0 3.7-3.7m-7.3 7.3-3.7 3.7m7.3-3.7 3.7 3.7" />
      </svg>
    );
  }

  if (category === "Device Apps") {
    return (
      <svg {...shared}>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </svg>
  );
}
