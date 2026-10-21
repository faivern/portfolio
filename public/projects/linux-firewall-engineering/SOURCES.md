# Evidence provenance

Screenshots extracted from the author’s `lab-context/Lab_2_Gustaf_Faivre_V2.pdf` at original pixel dimensions. Embedded images decoded to RGB PNG; no cropping, retouching, or generated evidence. PDF page numbers below are one-based.

| Asset | PDF page | Embedded image xref |
| --- | --- | --- |
| default-policy.png | 5 | 42 |
| stateful-forwarding.png | 6 | 46 |
| telnet-allowed.png | 8 | 55 |
| telnet-blocked.png | 9 | 58 |
| icmp-normal.png | 11 | 66 |
| icmp-flood.png | 11 | 67 |
| scan-stage-ping.png | 14 | 76 |
| http-timeout.png | 14 | 77 |
| nmap-discovery.png | 14 | 78 |
| final-rule-counters.png | 15 | 81 |

Copy adapted from the author’s report. The task brief `lab-context/lab2-firewalls-2025.pdf` was used for intended topology and tests; no assignment graphics are reproduced. The three experiments reset their rules and must not be presented as one cumulative production ruleset.

Evidence review corrections:
- Page 7’s Windows ping targets 192.168.1.10, inconsistent with the inside host 192.168.2.10. That screenshot is not used to prove inbound blocking.
- Page 14 says ping succeeded, but its screenshot shows 5 sent, 0 received. The case study reports the screenshot result.
- Page 14’s curl times out during connection; page 15 has outbound HTTP rule hits but no return hits. HTTP success and a server-side root cause are unverified.
- Written recent rules specify 30 seconds and placement before service accepts. Page 15 shows 15 seconds, HTTP accepts ahead of the checks, duplicate rules, and zero DROP counters. The NEW/--set ACCEPT is broader than the stated service allow-list.
- No new lab execution occurred. Proposed fixes and retests are explicitly separated from recorded observations.

Reference checks for the retrospective analysis: https://man7.org/linux/man-pages/man8/iptables-extensions.8.html and https://nmap.org/book/host-discovery-controls.html .
