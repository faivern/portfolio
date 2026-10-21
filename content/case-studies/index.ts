import { webApplicationSecurity } from "./web-application-security";
import { linuxFirewallEngineering } from "./linux-firewall-engineering";
import { soc001 } from "./soc-001";
import { fraExfiltratoren } from "./fra-exfiltratoren";
import type { CaseStudy } from "./types";
export const caseStudies: Record<string, CaseStudy> = {
  "SOC-001": soc001,
  "web-application-security": webApplicationSecurity,
  "linux-firewall-engineering": linuxFirewallEngineering,
  "FRA-Exfiltratoren": fraExfiltratoren,
};
