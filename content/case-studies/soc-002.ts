import type { CaseStudy } from "./types";

export const soc002: CaseStudy = {
  "context": "TryHackMe SOC lab · Alert investigation & triage · 2026",
  "sections": [
    {
      "id": "overview",
      "title": "Investigating phishing and firewall alerts",
      "blocks": [
        {
          "type": "paragraph",
          "text": "In TryHackMe’s simulated SOC lab, I was assigned four phishing and firewall alerts to investigate. I used Splunk to search firewall logs, checked URLs and IP addresses with TryDetectThis, and used employee records to identify affected users. For each alert, I documented the evidence, classified it as a true or false positive, and assessed whether further investigation was needed."
        }
      ]
    },
    {
      "id": "microsoft-phishing",
      "title": "01 · Microsoft impersonation: the connection was allowed",
      "blocks": [
        {
          "type": "images",
          "images": [
            {
              "src": "/projects/SOC-002/case-4-page-1-1.png",
              "width": 2048,
              "height": 565,
              "alt": "Phishing alert impersonating Microsoft account security.",
              "caption": "Phishing alert impersonating Microsoft account security."
            }
          ]
        },
        {
          "type": "heading",
          "text": "What caught my attention"
        },
        {
          "type": "paragraph",
          "text": "The subject said “Unusual Sign-In Activity on Your Microsoft Account”, but I immediately noticed m1crosoftsupport in the embedded link. The substituted character stood out as typosquatting. I wanted to check whether any endpoints had made contact."
        },
        {
          "type": "images",
          "images": [
            {
              "src": "/projects/SOC-002/case-4-page-2-1.png",
              "width": 962,
              "height": 751,
              "alt": "Splunk firewall results showing an allowed connection to the suspicious destination.",
              "caption": "Splunk firewall results showing an allowed connection to the suspicious destination."
            }
          ]
        },
        {
          "type": "heading",
          "text": "Following the evidence"
        },
        {
          "type": "paragraph",
          "text": "I checked the firewall events in Splunk and found that the connection was allowed. I then traced the source IP to C. Allen in the employee documentation. An allowed event does not prove that the website fully loaded or that credentials were submitted."
        },
        {
          "type": "images",
          "images": [
            {
              "src": "/projects/SOC-002/case-4-page-3-1.png",
              "width": 960,
              "height": 745,
              "alt": "TryDetectThis returning a malicious verdict for the impersonation URL.",
              "caption": "TryDetectThis returning a malicious verdict for the impersonation URL."
            }
          ]
        },
        {
          "type": "heading",
          "text": "Triage decision"
        },
        {
          "type": "paragraph",
          "text": "The URL check also returned a malicious result. I classified the alert as a true positive and recommended escalation. What I could not establish was whether C. Allen’s credentials had been stolen. My recommendations were to rotate the credentials and block the destination; the notes do not record those actions being carried out."
        }
      ],
      "presentation": "story"
    },
    {
      "id": "report-microsoft",
      "title": "Microsoft impersonation",
      "blocks": [
        {
          "type": "facts",
          "items": [
            {
              "label": "Classification",
              "value": "True positive"
            }
          ]
        },
        {
          "type": "heading",
          "text": "Evidence and findings"
        },
        {
          "type": "paragraph",
          "text": "The email impersonated Microsoft account security and linked to https://m1crosoftsupport.co/login. The URL reputation check returned a malicious result."
        },
        {
          "type": "heading",
          "text": "Affected entity and evidence"
        },
        {
          "type": "paragraph",
          "text": "The firewall search showed an allowed connection. The source IP was associated with C. Allen in the employee documentation."
        },
        {
          "type": "heading",
          "text": "Escalation and recommendations"
        },
        {
          "type": "paragraph",
          "text": "Escalate for further investigation, investigate possible credential exposure, rotate the affected user’s credentials and blacklist the destination."
        },
        {
          "type": "heading",
          "text": "Limitations"
        },
        {
          "type": "paragraph",
          "text": "The allowed event does not establish that the page fully loaded, credentials were submitted or an account was compromised. Credential theft remains unknown."
        }
      ],
      "presentation": "report"
    },
    {
      "id": "correlated-phishing",
      "title": "02 · Connecting a phishing email to a blocked request",
      "blocks": [
        {
          "type": "images",
          "images": [
            {
              "src": "/projects/SOC-002/case-3-page-1-1.png",
              "width": 2048,
              "height": 208,
              "alt": "The next phishing alert in the SOC queue.",
              "caption": "The next phishing alert in the SOC queue."
            }
          ]
        },
        {
          "type": "heading",
          "text": "What caught my attention"
        },
        {
          "type": "paragraph",
          "text": "Learning from the earlier investigation, I checked the sender against the available documentation first. I could not find them, so I continued investigating the email and its URL. An absent directory entry alone would not prove malicious intent."
        },
        {
          "type": "images",
          "images": [
            {
              "src": "/projects/SOC-002/case-3-page-1-3.png",
              "width": 1007,
              "height": 760,
              "alt": "URL reputation evidence captured during the phishing investigation.",
              "caption": "URL reputation evidence captured during the phishing investigation."
            }
          ]
        },
        {
          "type": "heading",
          "text": "Following the evidence"
        },
        {
          "type": "paragraph",
          "text": "The URL was classified as malicious. I then needed to find out whether any endpoints had attempted to access it, and whether those connections were allowed or blocked."
        },
        {
          "type": "images",
          "images": [
            {
              "src": "/projects/SOC-002/case-3-page-2-1.png",
              "width": 951,
              "height": 767,
              "alt": "Splunk search correlating the email URL with a blocked firewall event.",
              "caption": "Splunk search correlating the email URL with a blocked firewall event."
            }
          ]
        },
        {
          "type": "code",
          "language": "text",
          "caption": "Search used to investigate the URL in firewall events",
          "code": "datasource=firewall \"3sHkX3da12340\""
        },
        {
          "type": "heading",
          "text": "Triage decision"
        },
        {
          "type": "paragraph",
          "text": "The action was blocked. I matched the source IP to Hannah Harris using the employee documentation. The connection attempt occurred approximately 74 seconds after the email arrived, which strongly supports a relationship between the two events. It does not prove Hannah personally clicked the link or that credentials were compromised. This is the same URL and workstation investigated in the firewall alert below."
        }
      ],
      "presentation": "story"
    },
    {
      "id": "report-correlated",
      "title": "Phishing and blocked web request",
      "blocks": [
        {
          "type": "facts",
          "items": [
            {
              "label": "Classification",
              "value": "True positive"
            }
          ]
        },
        {
          "type": "heading",
          "text": "Evidence and findings"
        },
        {
          "type": "paragraph",
          "text": "The email URL returned a malicious reputation result. A Splunk firewall search for 3sHkX3da12340 identified a blocked connection associated with Hannah Harris."
        },
        {
          "type": "heading",
          "text": "Correlation"
        },
        {
          "type": "paragraph",
          "text": "The connection attempt occurred approximately 74 seconds after the suspicious email was received. The matching URL and timing strongly support a relationship between the phishing email and the blocked request."
        },
        {
          "type": "heading",
          "text": "Limitations"
        },
        {
          "type": "paragraph",
          "text": "This does not prove that Hannah personally clicked the link or that credentials were compromised. The event is related to the firewall alert documented in the next report."
        }
      ],
      "presentation": "report"
    },
    {
      "id": "blocked-destination",
      "title": "03 · Triaging a blocked malicious destination",
      "blocks": [
        {
          "type": "images",
          "images": [
            {
              "src": "/projects/SOC-002/case-2-page-1-2.png",
              "width": 2048,
              "height": 397,
              "alt": "High-severity firewall alert for an outbound request blocked by the organisation’s blacklist.",
              "caption": "High-severity firewall alert for an outbound request blocked by the organisation’s blacklist."
            }
          ]
        },
        {
          "type": "heading",
          "text": "What caught my attention"
        },
        {
          "type": "paragraph",
          "text": "This alert was high priority and involved a request from inside the network. The firewall had blocked access to a blacklisted URL. I investigated the destination IP, 67.199.248.11, to understand the alert beyond the blacklist match."
        },
        {
          "type": "images",
          "images": [
            {
              "src": "/projects/SOC-002/case-2-page-2-1.png",
              "width": 941,
              "height": 791,
              "alt": "TryDetectThis classifying the destination IP as malicious.",
              "caption": "TryDetectThis classifying the destination IP as malicious."
            }
          ]
        },
        {
          "type": "heading",
          "text": "Following the evidence"
        },
        {
          "type": "paragraph",
          "text": "The reputation result was malicious, and the employee directory linked source IP 10.20.2.17 to Hannah Harris. I classified the alert as a true positive. The recorded request was blocked, but that alone could not rule out other activity. I recommended investigating how the employee encountered the URL and checking activity around the event."
        }
      ],
      "presentation": "story"
    },
    {
      "id": "report-firewall",
      "title": "Blocked malicious destination",
      "blocks": [
        {
          "type": "facts",
          "items": [
            {
              "label": "Classification",
              "value": "True positive"
            },
            {
              "label": "Time of activity",
              "value": "November 5, 2026 · 05:04:25"
            },
            {
              "label": "Employee",
              "value": "Hannah Harris"
            },
            {
              "label": "Source IP",
              "value": "10.20.2.17"
            },
            {
              "label": "Destination IP",
              "value": "67.199.248.11"
            },
            {
              "label": "Port / protocol",
              "value": "80 / HTTP"
            },
            {
              "label": "URL",
              "value": "http://bit.ly/3sHkX3da12340"
            },
            {
              "label": "Firewall rule",
              "value": "Blocked Websites"
            },
            {
              "label": "Action",
              "value": "Blocked"
            }
          ]
        },
        {
          "type": "heading",
          "text": "Reason for classifying as true positive"
        },
        {
          "type": "paragraph",
          "text": "The firewall detected an outbound request to a URL listed in the organisation’s blacklist or threat intelligence feeds. TryDetectThis classified the destination IP as malicious. The employee directory identified the source workstation as belonging to Hannah Harris."
        },
        {
          "type": "heading",
          "text": "Reason for escalation"
        },
        {
          "type": "paragraph",
          "text": "The alert was high severity and involved an internal workstation attempting to reach a blacklisted external URL. Further investigation was recommended to determine how the employee encountered the URL and whether related suspicious activity occurred before or after the event."
        },
        {
          "type": "heading",
          "text": "Limitations"
        },
        {
          "type": "paragraph",
          "text": "The firewall blocked the recorded connection. The available evidence does not establish workstation compromise or data exfiltration."
        }
      ],
      "presentation": "report"
    },
    {
      "id": "onboarding",
      "title": "04 · Closing an onboarding alert as a false positive",
      "blocks": [
        {
          "type": "images",
          "images": [
            {
              "src": "/projects/SOC-002/case-1-page-1-2.png",
              "width": 2048,
              "height": 423,
              "alt": "Onboarding email asking the recipient to complete a profile through an external link.",
              "caption": "Onboarding email asking the recipient to complete a profile through an external link."
            }
          ]
        },
        {
          "type": "heading",
          "text": "What caught my attention"
        },
        {
          "type": "paragraph",
          "text": "The urgent subject caught my attention: pressure to act quickly can make someone more likely to share credentials by mistake. The message also pointed to an external sign-in link, so I investigated the URL."
        },
        {
          "type": "images",
          "images": [
            {
              "src": "/projects/SOC-002/case-1-page-2-1.png",
              "width": 1034,
              "height": 844,
              "alt": "TryDetectThis returning a clean result for the onboarding URL.",
              "caption": "TryDetectThis returning a clean result for the onboarding URL."
            }
          ]
        },
        {
          "type": "heading",
          "text": "Following the evidence"
        },
        {
          "type": "paragraph",
          "text": "The URL check returned clean. I also confirmed that J. Garcia was an employee and that the recipient address matched the directory. This verified the recipient, not the sender. HTTPS protects the connection; it does not establish that a site is trustworthy."
        },
        {
          "type": "heading",
          "text": "Triage decision"
        },
        {
          "type": "paragraph",
          "text": "The content was consistent with onboarding, and the checks I performed found no malicious indicators. I classified the alert as a false positive based on that evidence, while recognising that sender verification and network activity checks would provide greater confidence."
        }
      ],
      "presentation": "story"
    },
    {
      "id": "report-onboarding",
      "title": "Onboarding false positive",
      "blocks": [
        {
          "type": "facts",
          "items": [
            {
              "label": "Classification",
              "value": "False positive"
            },
            {
              "label": "Time of activity",
              "value": "November 5, 2026 · 06:02"
            },
            {
              "label": "Sender",
              "value": "onboarding@hrconnex.thm"
            },
            {
              "label": "Recipient",
              "value": "j.garcia@thetrydaily.thm"
            },
            {
              "label": "Subject",
              "value": "Action Required: Finalize Your Onboarding Profile"
            },
            {
              "label": "URL",
              "value": "https://hrconnex.thm/onboarding/15400654060/jgarcia"
            },
            {
              "label": "Attachments",
              "value": "None"
            }
          ]
        },
        {
          "type": "heading",
          "text": "Reason for classifying as false positive"
        },
        {
          "type": "paragraph",
          "text": "The urgent subject and external link initially appeared suspicious. TryDetectThis returned a clean result with no malicious indicators identified by the tool. The employee directory confirmed that J. Garcia worked at TheTryDaily and that the recipient address matched."
        },
        {
          "type": "heading",
          "text": "Decision rationale"
        },
        {
          "type": "paragraph",
          "text": "The message was consistent with an employee onboarding process, and no malicious indicators were identified during the checks performed. Based on the available evidence, I classified the alert as a false positive."
        },
        {
          "type": "heading",
          "text": "Limitations"
        },
        {
          "type": "paragraph",
          "text": "URL reputation alone cannot guarantee safety. Additional verification of the sender and network activity would provide greater confidence."
        }
      ],
      "presentation": "report"
    }
  ]
};
