
import type { CaseStudy } from "./types";

export const soc001: CaseStudy = {
  context: "Personal SOC home lab · Detection engineering · 2026",
  techniques: [
    {
      id: "T1110.001",
      name: "Password Guessing",
      url: "https://attack.mitre.org/techniques/T1110/001/",
    },
  ],
  sections: [
    {
      id: "objective",
      title: "Objective & background",
      blocks: [
        {
          type: "paragraph",
          text: "The objective of this lab was to simulate SSH password-guessing attempts and detect them using Wazuh SIEM. I built a virtual environment with Windows and Linux endpoints, investigated the resulting authentication logs, and developed a custom detection rule to identify repeated login failures.",
        },
      ],
    },
    {
      id: "environment",
      title: "Lab environment",
      blocks: [
        {
          type: "paragraph",
          text: "The environment consists of three virtual machines running in VMware Workstation: an Ubuntu server hosting Wazuh Manager, Indexer and Dashboard, an Ubuntu endpoint running OpenSSH, and a Windows 11 endpoint used to simulate the attack. Both endpoints have Wazuh agents installed and communicate with the server over an isolated NAT network.",
        },
        {
          type: "diagram",
          caption: "",
          nodes: [
            {
              title: "Windows 11",
              detail: "PowerShell SSH client · .131",
            },
            {
              title: "Ubuntu endpoint",
              detail:
                "OpenSSH → systemd journal → Wazuh Agent · .134",
            },
            {
              title: "Ubuntu Wazuh server",
              detail: "Manager → Indexer → Dashboard",
            },
          ],
        },
        {
          type: "paragraph",
          text: "SSH authentication events are recorded in the Linux system journal, collected by the Wazuh agent, and forwarded to the manager for analysis. The Linux agent also monitors a dedicated test directory, /home/soclab/soc-case/, for file integrity changes.",
        },
      ],
    },
    {
      id: "simulation",
      title: "Attack simulation",
      blocks: [
        {
          type: "paragraph",
          text: "Using PowerShell on Windows, I attempted to connect to the Linux test account and deliberately entered incorrect passwords to generate authentication failures. Initially, the Ubuntu firewall (UFW) blocked SSH connections. I resolved this by allowing port 22 from the isolated lab subnet.",
        },
        {
          type: "code",
          language: "bash",
          caption: "SSH connection from Windows to the Linux test account",
          code: "ssh soclab@192.168.142.134",
        },
        {
          type: "paragraph",
          text: "Before creating a detection rule, I needed to confirm that the authentication failures were actually reaching Wazuh. I followed the events from Ubuntu's system journal to the Threat Hunting dashboard.",
        },
        {
          type: "timeline",
          items: [
            {
              title: "Generate authentication failures",
              detail:
                "Repeated incorrect SSH passwords against the soclab test account.",
            },
            {
              title: "Verify log collection",
              detail:
                "Locate the failed attempts in the Linux system journal and Wazuh Threat Hunting.",
            },
            {
              title: "Identify the matching rule",
              detail:
                "Confirm that the incoming authentication failures match Wazuh rule 5760.",
            },
          ],
        },
      ],
    },
    {
      id: "evidence",
      title: "Log analysis & evidence",
      blocks: [
        {
          type: "paragraph",
          text: "The failed login attempts appeared in Wazuh under rule 5760, which identifies unsuccessful SSH authentication. Wazuh also generated alerts using its built-in brute-force detection rule 5763. This confirmed that the events were being collected and analyzed before I introduced my own rule.",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/SOC-001/03-wazuh-threat-hunting.png",
              width: 1001,
              height: 267,
              alt: "Wazuh Threat Hunting displaying SSH and PAM authentication failures from the Ubuntu endpoint",
              caption:
                "SSH authentication failures detected by Wazuh, including events matching rule 5760.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The events identified the source IP as 192.168.142.131 and the targeted account as soclab, matching the Windows client and Linux account used in the simulation. Related PAM and SSH messages can describe the same authentication attempt, so they should not automatically be counted as separate password guesses.",
        },
      ],
    },
    {
      id: "detection",
      title: "Detection engineering",
      blocks: [
        {
          type: "paragraph",
          text: "After identifying rule 5760 as the source of individual SSH authentication failures, I created custom rule 100101. It correlates repeated failures from the same source IP within a 20-second window and generates a level 10 alert when the configured threshold is reached.",
        },
        {
          type: "paragraph",
          text: "Although Wazuh already includes brute-force detection, creating my own rule allowed me to explore how event correlation, detection thresholds, and source IP matching work. The rule uses a configured frequency of five matching events within 20 seconds, rather than counting password prompts directly.",
        },
        {
          type: "code",
          language: "xml",
          caption: "Custom Wazuh correlation rule — rules/ssh-bruteforce.xml",
          code: `<group name="local,sshd,">

  <rule id="100101" level="10" frequency="5" timeframe="20">
    <if_matched_sid>5760</if_matched_sid>
    <same_srcip />
    <description>SOC LAB: SSH brute-force - repeated authentication failures from $(srcip)</description>
    <mitre>
      <id>T1110.001</id>
    </mitre>
    <group>authentication_failures,brute_force,</group>
  </rule>

</group>`,
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/SOC-001/04-custom-detection-rule.png",
              width: 840,
              height: 276,
              alt: "Wazuh custom detection rule 100101 configured with frequency, timeframe and source IP correlation",
              caption:
                "Custom rule 100101, configured to correlate repeated SSH authentication failures from the same source IP.",
            },
          ],
        },
      ],
    },
    {
      id: "validation",
      title: "Results & validation",
      blocks: [
        {
          type: "paragraph",
          text: "After validating the configuration and restarting Wazuh Manager, I repeated the SSH authentication attempts. The custom rule successfully generated a live level 10 alert in the Wazuh Dashboard, confirming that the correlation logic was active and processing incoming security events.",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/SOC-001/05-custom-rule-alert.png",
              width: 1128,
              height: 993,
              alt: "Wazuh Dashboard showing a live level 10 alert from custom rule 100101 with source IP and target account",
              caption:
                "Successful detection: custom rule 100101 generated a level 10 alert containing the source IP and targeted account.",
            },
          ],
        },
        {
          type: "table",
          caption: "Observed detection results",
          headers: ["Validation", "Result"],
          rows: [
            [
              "SSH authentication failures",
              "Detected by built-in Wazuh rule 5760.",
            ],
            [
              "Built-in brute-force detection",
              "Rule 5763 triggered during the simulation.",
            ],
            [
              "Custom correlation rule",
              "Rule 100101 successfully generated a live level 10 alert.",
            ],
            [
              "Source identification",
              "The custom alert included source IP 192.168.142.131 and target account soclab.",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "The live alert confirmed that the rule worked for the simulated authentication burst. Additional controlled tests with slower attempts and multiple source IPs would be needed to evaluate how reliably the detection performs under different conditions.",
        },
      ],
    },
    {
      id: "fim",
      title: "File integrity monitoring",
      blocks: [
        {
          type: "paragraph",
          text: "As a separate exercise, I configured Wazuh File Integrity Monitoring (FIM) to watch a test configuration file on the Linux endpoint. I then modified config.txt, changing its contents from security=enabled to security=disabled.",
        },
        {
          type: "paragraph",
          text: "Wazuh detected the modification through rule 550 and recorded changes to the file's hashes, size, and text content. With report_changes enabled, the actual modification was visible in syscheck.diff. These were test values, not real security settings being enabled or disabled.",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/SOC-001/06-file-integrity-monitoring-details.png",
              width: 1136,
              height: 1020,
              alt: "Wazuh File Integrity Monitoring event showing modified file hashes and a text diff from security enabled to disabled",
              caption:
                "FIM detected the modification of config.txt, including the changed file hashes and text diff.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The SSH detection and FIM monitoring were independent exercises. While both produced security events, no automatic correlation between authentication failures and file modifications was configured.",
        },
      ],
    },
    {
      id: "limitations",
      title: "Findings & limitations",
      blocks: [
        {
          type: "paragraph",
          text: "Repeated authentication failures can indicate password guessing, but they do not prove that an account has been compromised. Legitimate users entering incorrect passwords may also trigger alerts, creating false positives. Conversely, slower attempts spread over a longer period or distributed across multiple IP addresses may avoid the configured threshold.",
        },
        {
          type: "paragraph",
          text: "File Integrity Monitoring provides evidence that a file changed, but the configuration used in this lab does not establish which user made the modification. The SSH and FIM events therefore demonstrate separate detection capabilities rather than a confirmed sequence of malicious activity.",
        },
      ],
    },
    {
      id: "lessons",
      title: "Lessons learned",
      blocks: [
        {
          type: "paragraph",
          text: "One of the main takeaways was the importance of understanding incoming logs before developing detection rules. I initially expected SSH failures to match rule 5716, but the actual events matched 5760. Inspecting the logs and their decoded fields helped me build a working correlation rule rather than relying on assumptions.",
        },
        {
          type: "paragraph",
          text: "The lab gave me practical experience with centralized security monitoring, event investigation, custom detection logic, and file integrity monitoring. It also highlighted why detecting an event is only one part of security analysis: understanding its context, limitations, and potential significance is just as important.",
        },
      ],
    },
  ],
};
