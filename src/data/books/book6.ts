export const BOOK6_CONTENT = {
  cover: {
    tagline: "Building secure systems in untrusted networks.",
    blurb: "The traditional perimeter is dead. Zero Trust is a security model that assumes no user or system is trusted by default, even if they are already inside the network. This book explains the principles and implementation of ZTA."
  },
  toc: [
    "Introduction: The Death of the Perimeter",
    "Chapter 1: The Core Principles of Zero Trust",
    "Chapter 2: Identity-Centric Security",
    "Chapter 3: Microsegmentation and Software-Defined Perimeters",
    "Chapter 4: Continuous Verification and Monitoring",
    "Chapter 5: Implementing Zero Trust in Legacy Environments",
    "Conclusion: The Path Forward for Enterprise Security"
  ],
  chapters: [
    {
      title: "Introduction: The Death of the Perimeter",
      pages: [
        "For decades, security was built around a 'castle and moat' model. But with the rise of cloud computing, remote work, and mobile devices, that moat has evaporated. Attackers who breach the perimeter now have free rein inside the network.\n\nZero Trust is the necessary response to this new reality. It shifts the focus from where you are to who you are and what you are trying to access."
      ]
    },
    {
      title: "Chapter 1: The Core Principles of Zero Trust",
      pages: [
        "Zero Trust is built on three pillars: Never Trust, Always Verify; Assume Breach; and Least Privilege Access.\n\nThis chapter explores these principles in depth, explaining why they are essential for building a resilient security posture in a world where the internal network is just as dangerous as the public internet."
      ]
    },
    {
      title: "Chapter 2: Identity-Centric Security",
      pages: [
        "In a Zero Trust world, identity is the new perimeter. We discuss the importance of strong authentication (MFA), identity and access management (IAM), and the concept of 'workload identity'.\n\nSecurity policies are no longer based on IP addresses, but on the verified identity of the user and the health of the device they are using."
      ]
    },
    {
      title: "Chapter 3: Microsegmentation and Software-Defined Perimeters",
      pages: [
        "If an attacker gets in, you want to limit their ability to move laterally. Microsegmentation breaks the network into small, isolated zones, each with its own security controls.\n\nSoftware-Defined Perimeters (SDP) take this even further, making resources invisible to everyone except authorized and verified users. We explore the technologies and architectures that make this possible."
      ]
    },
    {
      title: "Chapter 4: Continuous Verification and Monitoring",
      pages: [
        "Zero Trust isn't a 'one and done' check. Access must be continuously verified based on the current context—such as the user's location, the time of day, and the security state of their device.\n\nThis chapter discusses the role of automation and analytics in providing real-time monitoring and adaptive access control."
      ]
    },
    {
      title: "Chapter 5: Implementing Zero Trust in Legacy Environments",
      pages: [
        "Most organizations can't start from scratch. We provide a practical roadmap for migrating to a Zero Trust architecture, starting with the most critical resources and gradually expanding the model across the entire enterprise.\n\nWe also address the challenges of integrating legacy systems that were never designed with Zero Trust in mind."
      ]
    },
    {
      title: "Conclusion: The Path Forward for Enterprise Security",
      pages: [
        "Zero Trust is a journey, not a destination. It requires a fundamental shift in mindset and culture, but the rewards are a significantly stronger and more flexible security posture.\n\nAs the digital landscape continues to evolve, Zero Trust will become the foundation upon which all modern security is built."
      ]
    }
  ]
};
