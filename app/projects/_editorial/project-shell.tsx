import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/lib/theme-toggle";
import styles from "./article.module.css";

export default function ProjectShell({
  area,
  children,
}: {
  area: "software" | "security";
  children: ReactNode;
}) {
  return (
    <div className={`project-surface area-${area} flex-1 ${styles.surface}`}>
      <div className={styles.shell}>
        <nav aria-label="Project navigation" className="flex items-center justify-between gap-4">
          <Link href="/projects" className={`link-rule py-2 ${styles.meta}`}>
            ←&#xFE0E; All projects
          </Link>
          <ThemeToggle />
        </nav>
        {children}
      </div>
    </div>
  );
}
