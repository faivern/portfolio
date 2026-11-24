import type { ReactNode } from "react";
import ProjectShell from "../_editorial/project-shell";

export default function CrateCtfLayout({ children }: { children: ReactNode }) {
  return <ProjectShell area="security">{children}</ProjectShell>;
}
