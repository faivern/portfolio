import type { CaseStudy } from "./types";

export const webApplicationSecurity: CaseStudy = {
  context: "Web security lab · SQL injection & XSS · 2026",
  sections: [
    {
      id: "objective",
      title: "Objective & background",
      blocks: [
        {
          type: "paragraph",
          text: "I worked through a web exploitation workflow in a deliberately vulnerable Cyber Range: identifying HTTP services, testing authentication, extracting database content, and demonstrating reflected and stored cross-site scripting. The aim was to understand how each vulnerability works, verify its impact, and explain the defenses that address it. These were guided lab scenarios with supplied targets and example payloads.",
        },
      ],
    },
    {
      id: "environment",
      title: "Lab environment",
      blocks: [
        {
          type: "paragraph",
          text: "All testing was scoped to the lab network 10.0.56.0/24. I used the ToolBox host at 10.0.56.6 for Nmap, Hydra, sqlmap, and an HTTP listener. Athos provided a password-guessing exercise, Porthos exposed SQL injection, and Aramis provided the XSS scenarios.",
        },
        {
          type: "table",
          caption: "Targets used in the documented workflow",
          headers: ["Host", "Role"],
          rows: [
            ["10.0.56.2 · Athos", "HTTP login and dictionary attack"],
            ["10.0.56.4 · Porthos", "Login bypass and database extraction"],
            [
              "10.0.56.9 · Aramis",
              "Reflected and stored XSS, as shown in the browser evidence",
            ],
            [
              "10.0.56.6 · ToolBox",
              "Scanning, command-line tools, and lab cookie receiver",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "The reflected-XSS heading in my original report lists a different address; the screenshots show Aramis at 10.0.56.9. This write-up follows the captured evidence.",
        },
      ],
    },
    {
      id: "enumeration",
      title: "Enumeration & authentication",
      blocks: [
        {
          type: "paragraph",
          text: "I began with host discovery, then scanned individual hosts for services and versions. On Athos, browser developer tools showed that the login form sent a POST request with username and password parameters and returned “Invalid credentials” on failure. I used those details to configure Hydra’s HTTP form module with the rockyou.txt dictionary. Hydra found a valid password, and logging in returned the first lab flag.",
        },
        {
          type: "code",
          language: "bash",
          caption: "Discovery and service identification on the lab network",
          code: "nmap -sn -n 10.0.56.0/24\nnmap -sV -sC -n 10.0.56.4",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/web-application-security/service-enumeration.png",
              width: 1034,
              height: 296,
              alt: "Nmap service scan of Porthos at 10.0.56.4 showing HTTP on port 80",
              caption:
                "Service enumeration identified the Porthos HTTP application.",
            },
            {
              src: "/projects/web-application-security/password-guessing.png",
              width: 1167,
              height: 301,
              alt: "Hydra output reporting a valid login for the Athos lab account",
              caption:
                "Hydra found a working password using the observed form parameters.",
            },
          ],
        },
      ],
    },
    {
      id: "sql-injection",
      title: "SQL injection: bypass & extraction",
      blocks: [
        {
          type: "paragraph",
          text: "On Porthos, my notes record a database error after submitting a single quote in the username field. Using the supplied query structure, I tested a payload that closed the username string and commented out the password comparison. The application granted access as admin without a valid password.",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/web-application-security/login-bypass.png",
              width: 811,
              height: 404,
              alt: "Porthos admin page welcoming admin and displaying the login-bypass flag",
              caption:
                "Authenticated admin access after the SQL injection login bypass.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Inside the application, developer tools showed that document searches used GET /admin with a q parameter. An always-true condition returned all documents. A UNION test with three NULL values established a compatible result shape; I then used information_schema to enumerate the database structure and extract the flags table.",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/web-application-security/manual-extraction.png",
              width: 915,
              height: 64,
              alt: "Porthos search result containing the DumpTables flag and two NULL result columns",
              caption:
                "Manual UNION-based extraction returned the lab flag from the database.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "I repeated the database enumeration and table extraction with sqlmap. The manual result explained how the query could be manipulated; the automated result reproduced the flag extraction from porthos_db.flags.",
        },
        {
          type: "code",
          language: "bash",
          caption: "Recorded sqlmap workflow against the lab search endpoint",
          code: 'sqlmap -u "http://10.0.56.4/admin?q=Log" --dbs\nsqlmap -u "http://10.0.56.4/admin?q=Log" -D porthos_db --tables\nsqlmap -u "http://10.0.56.4/admin?q=Log" -D porthos_db -T flags --dump',
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/web-application-security/sqlmap-extraction.png",
              width: 554,
              height: 166,
              alt: "sqlmap output showing one entry dumped from porthos_db.flags",
              caption: "sqlmap reproduced the extraction from the flags table.",
            },
          ],
        },
      ],
    },
    {
      id: "reflected-xss",
      title: "Reflected XSS & session access",
      blocks: [
        {
          type: "paragraph",
          text: "Aramis reflected its query parameter into the search page. A heading tag rendered as HTML, and a script displaying “Hello” produced a browser alert. This established that input could execute as JavaScript in the application’s page context.",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/web-application-security/reflected-script.png",
              width: 362,
              height: 150,
              alt: "Browser alert displaying Hello on the Aramis application at 10.0.56.9",
              caption:
                "JavaScript execution confirmed reflected XSS in the search input.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "I started an HTTP listener on ToolBox and used the lab payload to send document.cookie to it. After the simulated user Alice followed the crafted link sent through the lab chat, the listener received her cookie. Setting the browser’s auth cookie to that value gave me access as Alice and exposed the reflected-XSS flag.",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/web-application-security/alice-session.png",
              width: 600,
              height: 445,
              alt: "Aramis page welcoming Alice and displaying the reflected-XSS flag above the comment form",
              caption:
                "Reusing the captured lab cookie provided authenticated access as Alice.",
            },
          ],
        },
      ],
    },
    {
      id: "stored-xss",
      title: "Stored XSS & administrator interaction",
      blocks: [
        {
          type: "paragraph",
          text: "As Alice, I tested the comment field. The alert payload executed immediately and remained active after a reload, showing that the application stored and rendered the script. I then stored the cookie-capture payload and submitted the affected comments URL through the report feature.",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/web-application-security/stored-script.png",
              width: 529,
              height: 544,
              alt: "Aramis comment page with a Hello alert from the stored script",
              caption:
                "The comment payload executed again after reloading the page, as recorded in the report.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The lab administrator’s visit triggered a request to ToolBox containing a flag cookie. Decoding its Base64 value revealed the final flag. This demonstrated execution in the administrator’s browser; the recorded outcome was recovery of that flag, not a separately verified administrator login.",
        },
        {
          type: "images",
          images: [
            {
              src: "/projects/web-application-security/admin-cookie.png",
              width: 1475,
              height: 105,
              alt: "ToolBox HTTP server log receiving a request with a flag cookie from the lab administrator",
              caption:
                "The report workflow triggered a request containing the administrator’s lab flag cookie.",
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
          type: "table",
          caption: "Outcomes documented in the hand-in",
          headers: ["Test", "Observed result"],
          rows: [
            [
              "Dictionary attack",
              "Valid Athos credentials and authenticated access.",
            ],
            ["SQL login bypass", "Porthos admin page and login-bypass flag."],
            ["Database extraction", "Flag recovered manually and with sqlmap."],
            [
              "Reflected XSS",
              "Script execution, cookie capture, and access as Alice.",
            ],
            [
              "Stored XSS",
              "Persistent execution and capture of the administrator’s flag cookie.",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "The five flag outcomes belong to deliberately vulnerable applications. They demonstrate the techniques in this environment; they do not establish that the same payloads would work against a hardened application.",
        },
      ],
    },
    {
      id: "mitigations",
      title: "Mitigations & limitations",
      blocks: [
        {
          type: "paragraph",
          text: "My report proposed rate limiting, progressive delays, temporary lockouts, and stronger authentication for password guessing. For SQL injection, the primary fix is parameterized queries, supported by least-privilege database permissions and error handling that avoids exposing database details.",
        },
        {
          type: "paragraph",
          text: "For XSS, I identified context-aware output encoding, safe rendering of user content, and sanitization where HTML must be allowed. A restrictive Content Security Policy provides another layer. HttpOnly prevents JavaScript from reading an authentication cookie, while Secure restricts its transport to HTTPS; neither replaces fixing the injection point. These were proposed countermeasures, not changes I implemented and retested.",
        },
      ],
    },
    {
      id: "lessons",
      title: "Lessons learned",
      blocks: [
        {
          type: "paragraph",
          text: "Inspecting the actual HTTP request was central to each step: the form parameters and failure message shaped the password test, and the search parameter exposed the database query surface. Working through SQL extraction manually before using sqlmap made the automated results easier to interpret. Comparing reflected and stored XSS showed how persistence changes the trigger: one needed a crafted link, while the other ran when a visitor opened stored content.",
        },
      ],
    },
  ],
};
