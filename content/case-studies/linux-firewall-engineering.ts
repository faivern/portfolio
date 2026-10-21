import type { CaseStudy } from "./types";

export const linuxFirewallEngineering: CaseStudy = {
  context: "Linux firewall lab · Traffic filtering & validation · 2025",
  sources: [
    {
      title: "iptables extension reference",
      url: "https://man7.org/linux/man-pages/man8/iptables-extensions.8.html",
      detail:
        "Reference for the limit and recent matches used when reviewing the recorded rules.",
    },
    {
      title: "Nmap: Host Discovery Controls",
      url: "https://nmap.org/book/host-discovery-controls.html",
      detail:
        "Explains why a failed discovery probe does not establish that port scanning is prevented.",
    },
  ],
  sections: [
    {
      id: "objective",
      title: "Objective & background",
      blocks: [
        {
          type: "paragraph",
          text: "I configured a Linux gateway with iptables to control traffic between two virtual networks. The work covered default policies, stateful forwarding, a client-specific Telnet exception, ICMP rate limiting, and an experiment with connection-rate controls. I verified behavior using client commands and firewall counters, with mixed results in the final scan-control stage.",
        },
      ],
    },
    {
      id: "environment",
      title: "Lab environment",
      blocks: [
        {
          type: "diagram",
          caption:
            "Two virtual LANs connected by a Linux gateway; “outside” refers to the other lab subnet.",
          nodes: [
            {
              title: "Outside · LAN 2",
              detail: "Kali 192.168.1.11 and Windows XP 192.168.1.12",
            },
            {
              title: "Linux gateway",
              detail: "eth0: 192.168.1.1/24 · eth1: 192.168.2.1/24",
            },
            {
              title: "Inside · LAN 1",
              detail: "Metasploitable 192.168.2.10",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The rules ran on the gateway. INPUT covered traffic addressed to the gateway itself, OUTPUT covered traffic it originated, and FORWARD covered traffic crossing between the LANs. I flushed rules and reapplied the default policies between experiments, so the following stages represent separate configurations.",
        },
      ],
    },
    {
      id: "policy",
      title: "Default policy & stateful forwarding",
      blocks: [
        {
          type: "paragraph",
          text: "I set INPUT and FORWARD to DROP and left OUTPUT at ACCEPT. This required explicit permission for traffic entering or crossing the gateway while allowing the gateway to initiate traffic. I then permitted new connections from the inside interface and established or related return traffic from outside.",
        },
        {
          type: "code",
          language: "bash",
          caption:
            "Default policies and forwarding rules recorded in the first experiment",
          code: "iptables -P INPUT DROP\niptables -P FORWARD DROP\niptables -P OUTPUT ACCEPT\n\niptables -A FORWARD -i eth1 -o eth0 -m state --state NEW,ESTABLISHED -j ACCEPT\niptables -A FORWARD -i eth0 -o eth1 -m state --state ESTABLISHED,RELATED -j ACCEPT",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/linux-firewall-engineering/default-policy.png",
              width: 672,
              height: 182,
              alt: "iptables listing with INPUT and FORWARD set to DROP and OUTPUT set to ACCEPT",
              caption:
                "The initial default policies restricted inbound and forwarded traffic.",
            },
            {
              src: "/projects/linux-firewall-engineering/stateful-forwarding.png",
              width: 811,
              height: 131,
              alt: "FORWARD chain showing NEW and ESTABLISHED outbound traffic and ESTABLISHED RELATED return traffic",
              caption:
                "State-based rules allowed inside-initiated connections and their return traffic.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The inside host successfully pinged Kali with three replies and no loss. My report also describes a failed inbound ping, but that screenshot targets 192.168.1.10 rather than the inside host at 192.168.2.10. It therefore does not reliably verify the intended inbound-blocking test.",
        },
      ],
    },
    {
      id: "access-control",
      title: "Client-specific access control",
      blocks: [
        {
          type: "paragraph",
          text: "For the Telnet exception, I identified the Windows XP machine’s MAC address with ipconfig /all and allowed TCP port 23 from that source on the outside interface. Windows reached a Metasploitable login session, while the Kali attempt remained at “Trying”. The matching firewall counter also increased.",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/linux-firewall-engineering/telnet-allowed.png",
              width: 648,
              height: 345,
              alt: "Windows XP Telnet session logged into the Metasploitable lab host",
              caption:
                "The permitted Windows client established a Telnet session.",
            },
            {
              src: "/projects/linux-firewall-engineering/telnet-blocked.png",
              width: 408,
              height: 126,
              alt: "Kali Telnet command remaining at Trying 192.168.2.10",
              caption:
                "The Kali connection did not progress to a login prompt during the recorded test.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "This was an access-control exercise using a legacy lab service. A MAC match identifies a source on the adjacent network segment; it is not a substitute for user authentication or an encrypted remote-access protocol.",
        },
      ],
    },
    {
      id: "icmp",
      title: "ICMP rate limiting",
      blocks: [
        {
          type: "paragraph",
          text: "In a fresh ruleset, I allowed incoming echo requests at one packet per second with a burst allowance of three, and allowed echo replies back out. Normal ping received five replies from five requests. The flood test sent 757 packets and received 14 replies, approximately 98% loss.",
        },
        {
          type: "code",
          language: "bash",
          caption: "ICMP rules recorded in the isolated rate-limit experiment",
          code: "iptables -A FORWARD -i eth0 -o eth1 -p icmp --icmp-type echo-request -m limit --limit 1/second --limit-burst 3 -j ACCEPT\niptables -A FORWARD -i eth1 -o eth0 -p icmp --icmp-type echo-reply -j ACCEPT",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/linux-firewall-engineering/icmp-normal.png",
              width: 573,
              height: 217,
              alt: "Kali ping showing five packets transmitted and five received with no loss",
              caption:
                "Normal-rate ICMP succeeded in the isolated rate-limit experiment.",
            },
            {
              src: "/projects/linux-firewall-engineering/icmp-flood.png",
              width: 721,
              height: 291,
              alt: "Kali flood ping reporting 757 packets transmitted and 14 received with about 98 percent loss",
              caption:
                "The flood test experienced approximately 98% packet loss.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The limit match supplies a shared allowance for packets matching this rule. The result shows rate restriction in this test, not a general denial-of-service defense or an ability to distinguish intent.",
        },
      ],
    },
    {
      id: "scan-control",
      title: "Scan-control experiment",
      blocks: [
        {
          type: "paragraph",
          text: "For the final stage, I added service exceptions and experimented with the recent module to track new TCP traffic from Kali. My written configuration described a ten-hit threshold over 30 seconds. However, the captured final rules use a 15-second window and place HTTP accepts before the recent checks. These are materially different configurations.",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/linux-firewall-engineering/final-rule-counters.png",
              width: 829,
              height: 434,
              alt: "Numbered FORWARD rules with HTTP accepts above recent checks, a 15-second window, and zero scan-drop counters",
              caption:
                "The saved rules and counters expose differences from the written scan-control configuration.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Reviewing that screenshot also reveals a broad ACCEPT for new TCP traffic below the threshold, duplicate entries, and zero hits on the scan DROP rules. As written, the broad ACCEPT can permit traffic beyond the intended service exceptions, and the earlier HTTP accepts bypass the later checks. The screenshot does not demonstrate that the rate-control drop rule triggered.",
        },
      ],
    },
    {
      id: "validation",
      title: "Results & validation",
      blocks: [
        {
          type: "table",
          caption:
            "Final scan-control stage: evidence takes precedence over success labels",
          headers: ["Test", "Recorded evidence"],
          rows: [
            [
              "Windows Telnet",
              "An established Metasploitable session is shown.",
            ],
            [
              "Kali ping",
              "Five requests, zero replies: the screenshot contradicts the success label.",
            ],
            [
              "Kali HTTP",
              "curl timed out. Outbound HTTP counters increased, with no matching return traffic shown.",
            ],
            [
              "Kali Nmap",
              "“Host seems down”; no completed port scan is shown.",
            ],
            [
              "recent threshold",
              "The final listing shows zero hits on the scan DROP rules.",
            ],
          ],
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/linux-firewall-engineering/scan-stage-ping.png",
              width: 583,
              height: 142,
              alt: "Final-stage ping to 192.168.2.10 showing five packets sent and none received",
              caption:
                "The final-stage screenshot shows 100% loss, contrary to the report’s success label.",
            },
            {
              src: "/projects/linux-firewall-engineering/http-timeout.png",
              width: 504,
              height: 133,
              alt: "curl to 192.168.2.10 timing out after 3001 milliseconds",
              caption:
                "curl did not establish a working HTTP exchange within the test timeout.",
            },
            {
              src: "/projects/linux-firewall-engineering/nmap-discovery.png",
              width: 718,
              height: 98,
              alt: "Nmap reporting that the host seems down and suggesting the Pn option",
              caption:
                "Nmap stopped at host discovery; this is not proof that port enumeration was prevented.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The HTTP counters show that packets matched an allow rule; they do not establish a completed TCP handshake or HTTP response. My original report suggested an environment issue, but the supplied evidence does not establish the cause. Nmap’s discovery result likewise cannot establish that the host cannot be enumerated.",
        },
      ],
    },
    {
      id: "limitations",
      title: "Limitations & next tests",
      blocks: [
        {
          type: "paragraph",
          text: "A follow-up would first reconcile the active rules with the intended policy: remove duplicate entries, restore only the required service permissions, and check rule order. I would then retest each allowed flow in both directions, recording counters and packet captures to locate the missing replies. These changes and tests have not been performed as part of this write-up.",
        },
        {
          type: "paragraph",
          text: "For scan controls, I would compare discovery-enabled scanning with a lab scan that skips discovery, then test bursts above and below the threshold, slower probes, and multiple sources. A rate threshold may affect legitimate clients opening many connections while missing slower activity.",
        },
      ],
    },
    {
      id: "lessons",
      title: "Lessons learned",
      blocks: [
        {
          type: "paragraph",
          text: "The stateful-forwarding and ICMP experiments gave me practical experience with interface direction, connection state, and measurable filtering behavior. Reviewing the final stage reinforced that a rule counter is only one piece of evidence: it must agree with the client result and return path. A timed-out command or incomplete scan should lead to investigation, rather than being counted automatically as a successful security control.",
        },
      ],
    },
  ],
};
