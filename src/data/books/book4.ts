export const BOOK4_CONTENT = {
  cover: {
    tagline: "Concise reference guide for incident responders.",
    blurb: "When an incident occurs, time is of the essence. This handbook provides a structured approach to incident response, with checklists, technical references, and best practices for the blue team. It's a vital tool for anyone tasked with defending a modern enterprise network."
  },
  toc: [
    "Introduction: The Role of the Blue Team",
    "Chapter 1: The Incident Response Lifecycle",
    "Chapter 2: Evidence Collection and Forensics",
    "Chapter 3: Network Traffic Analysis for Defenders",
    "Chapter 4: Host-Based Analysis and EDR",
    "Chapter 5: Threat Hunting Methodologies",
    "Chapter 6: Remediation and Recovery",
    "Conclusion: Building a Resilient Defense"
  ],
  chapters: [
    {
      title: "Introduction: The Role of the Blue Team",
      pages: [
        "The blue team is the shield. Their job is to prevent, detect, and respond to threats in real-time. This chapter defines the scope of blue teaming and the essential skills every defender needs.\n\nFrom understanding the MITRE ATT&CK framework to mastering the tools of the trade, we set the stage for a proactive defense strategy."
      ]
    },
    {
      title: "Chapter 1: The Incident Response Lifecycle",
      pages: [
        "Incident response is a structured process. We follow the NIST framework: Preparation, Detection & Analysis, Containment, Eradication & Recovery, and Post-Incident Activity.\n\nThis chapter provides practical checklists for each phase, ensuring that nothing is missed when the pressure is on. Preparation is key; a team that hasn't practiced its response will fail when a real attack occurs.",
        "Crucially, we discuss the 'Golden Hour' of incident response—the critical time immediately following a detection where actions can make the difference between a minor blip and a catastrophic breach."
      ]
    },
    {
      title: "Chapter 2: Evidence Collection and Forensics",
      pages: [
        "Digital evidence is fragile. This chapter covers the principles of forensic sound evidence collection. We learn how to preserve memory, disk images, and network logs in a way that maintains their integrity for legal or internal investigations.\n\nTools like FTK Imager and volatility are introduced, along with the importance of maintaining a clear chain of custody."
      ]
    },
    {
      title: "Chapter 3: Network Traffic Analysis for Defenders",
      pages: [
        "The network never lies. By analyzing traffic, defenders can see where an attacker has been and what they were doing. We cover how to identify command-and-control (C2) traffic, data exfiltration, and lateral movement.\n\nTechniques for using SIEMs and IDS/IPS systems to alert on suspicious patterns are discussed, along with the nuances of analyzing encrypted traffic."
      ]
    },
    {
      title: "Chapter 4: Host-Based Analysis and EDR",
      pages: [
        "Endpoint Detection and Response (EDR) is a game-changer for the blue team. This chapter explains how EDR tools provide visibility into process execution, file changes, and network connections on individual hosts.\n\nWe learn how to use these tools to 'roll back' an attack and to identify the root cause of an infection. We also discuss traditional host-based analysis using system logs and artifacts like the Windows Registry."
      ]
    },
    {
      title: "Chapter 5: Threat Hunting Methodologies",
      pages: [
        "Don't wait for the alert. Threat hunting is the practice of proactively searching for signs of compromise that have bypassed existing security controls.\n\nThis chapter introduces various hunting models, such as hypothesis-based hunting and intel-based hunting. The goal is to find the 'low and slow' attackers who are trying to remain under the radar."
      ]
    },
    {
      title: "Chapter 6: Remediation and Recovery",
      pages: [
        "Once an attack is understood, it must be neutralized. We cover the steps for eradicating the threat and safely restoring systems to their normal state.\n\nRecovery isn't just about restoring from backups; it's about ensuring the vulnerability that allowed the attack is fixed so it doesn't happen again. We also discuss the importance of the 'lessons learned' phase to improve future response."
      ]
    },
    {
      title: "Conclusion: Building a Resilient Defense",
      pages: [
        "Defense is a marathon, not a sprint. The author concludes by emphasizing the need for continuous improvement and adaptation. The threat landscape is always changing, and the blue team must change with it.\n\nResilience isn't about being unhackable; it's about being able to withstand an attack and recover quickly. That is the true goal of the blue team."
      ]
    }
  ]
};
