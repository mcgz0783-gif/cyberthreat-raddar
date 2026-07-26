export const BOOK3_CONTENT = {
  cover: {
    tagline: "The definitive guide to finding and exploiting web application security flaws.",
    blurb: "Web applications are the front line of modern business and the primary target for attackers. This handbook covers the entire landscape of web security, from mapping the application's attack surface to exploiting complex logic flaws and injection vulnerabilities."
  },
  toc: [
    "Introduction: The State of Web Security",
    "Chapter 1: Mapping the Application",
    "Chapter 2: Attacking Authentication",
    "Chapter 3: Attacking Session Management",
    "Chapter 4: Injection Attacks (SQLi, XSS, XXE)",
    "Chapter 5: Attacking Application Logic",
    "Chapter 6: Attacking Users: XSS and CSRF",
    "Conclusion: Building Secure Web Applications"
  ],
  chapters: [
    {
      title: "Introduction: The State of Web Security",
      pages: [
        "Web applications have evolved from simple static pages to complex, highly interactive systems. This complexity has introduced a vast array of new security risks. The authors emphasize that automated scanners can only find a fraction of these flaws; manual, expert analysis is required.\n\nThis book is designed to provide that expertise, walking you through the methodologies used by professional penetration testers to secure the web."
      ]
    },
    {
      title: "Chapter 1: Mapping the Application",
      pages: [
        "Before you can attack an application, you must understand it. Mapping involves identifying all the entry points, the technologies in use, and the underlying data structures.\n\nWe discuss techniques for spidering, identifying hidden content, and analyzing how the application handles different types of input. Tools like Burp Suite are essential in this phase for intercepting and modifying requests.",
        "A thorough map is the foundation of a successful assessment. If you miss a single parameter or an obscure API endpoint, you might miss the most critical vulnerability."
      ]
    },
    {
      title: "Chapter 2: Attacking Authentication",
      pages: [
        "Authentication is the gatekeeper. Attackers look for ways to bypass it entirely or to compromise legitimate credentials. This chapter covers common flaws in login mechanisms, such as weak password policies, insecure 'remember me' functions, and predictable password resets.\n\nWe also explore more advanced techniques like credential stuffing and exploiting flaws in multi-factor authentication (MFA) implementations."
      ]
    },
    {
      title: "Chapter 3: Attacking Session Management",
      pages: [
        "Once a user is authenticated, the application must track their session. If the session tokens are predictable or poorly protected, an attacker can hijack the session and impersonate the user.\n\nThis chapter dives into the mechanics of cookies, session IDs, and the various ways they can be compromised, including session fixation and session sniffing."
      ]
    },
    {
      title: "Chapter 4: Injection Attacks (SQLi, XSS, XXE)",
      pages: [
        "Injection remains one of the most prevalent and damaging types of web vulnerability. We cover SQL injection (SQLi) in depth, showing how to extract data from databases and even execute OS commands.\n\nWe also look at Cross-Site Scripting (XSS) and XML External Entity (XXE) attacks, explaining the root causes and providing practical examples of exploitation and remediation."
      ]
    },
    {
      title: "Chapter 5: Attacking Application Logic",
      pages: [
        "Logic flaws are often the most interesting and difficult to find. They occur when the application's business logic is flawed, allowing a user to perform actions they shouldn't be able to—like buying an item for $0.01.\n\nThis chapter provides a framework for identifying these flaws by thinking through the application's intended workflows and finding ways to subvert them."
      ]
    },
    {
      title: "Chapter 6: Attacking Users: XSS and CSRF",
      pages: [
        "Security isn't just about the server; it's also about the users. Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) target the user's browser to perform unauthorized actions or steal sensitive information.\n\nWe explain how these attacks work and why they are so effective, even against well-secured servers. The focus is on how to protect users through proper output encoding and anti-CSRF tokens."
      ]
    },
    {
      title: "Conclusion: Building Secure Web Applications",
      pages: [
        "The best way to fix vulnerabilities is to prevent them from ever being introduced. The authors conclude with a set of best practices for developers, emphasizing the importance of secure coding, regular testing, and a robust security culture.\n\nWeb security is a constant battle, but with the right knowledge and tools, it is a battle that can be won."
      ]
    }
  ]
};
