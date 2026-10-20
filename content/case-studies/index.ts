import { soc001 } from "./soc-001";
import { fraExfiltratoren } from "./fra-exfiltratoren";
import type { CaseStudy } from "./types";
export const caseStudies: Record<string, CaseStudy> = {
  "SOC-001": soc001,
  "FRA-Exfiltratoren": fraExfiltratoren,
};
