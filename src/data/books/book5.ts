export const BOOK5_CONTENT = {
  cover: {
    tagline: "A practical guide to building and operationalizing a threat intelligence program.",
    blurb: "Threat intelligence is more than just a feed of IOCs. This book teaches you how to turn data into actionable insights, covering the entire TI lifecycle from requirements gathering to dissemination and feedback."
  },
  toc: [
    "Introduction: The Value of Threat Intel",
    "Chapter 1: The Intelligence Cycle",
    "Chapter 2: Types of Intelligence: Strategic, Operational, Tactical",
    "Chapter 3: Sourcing and Evaluating Data",
    "Chapter 4: Analysis Techniques and Cognitive Biases",
    "Chapter 5: Operationalizing Intel: Integration with SOC and IR",
    "Conclusion: The Future of Threat Intelligence"
  ],
  chapters: [
    {
      title: "Introduction: The Value of Threat Intel",
      pages: [
        "In a rapidly evolving threat landscape, knowing your enemy is half the battle. Threat intelligence provides the context needed to prioritize security efforts and make informed decisions.\n\nThis chapter explains why TI is essential for modern organizations and how it shifts the defense from reactive to proactive."
      ]
    },
    {
      title: "Chapter 1: The Intelligence Cycle",
      pages: [
        "Intelligence is a process, not a product. We explore the traditional cycle: Planning and Direction, Collection, Processing, Analysis and Production, Dissemination, and Feedback.\n\nEach stage is critical. If you don't start with clear requirements (Planning), your collection will be aimless and your analysis will be irrelevant."
      ]
    },
    {
      title: "Chapter 2: Types of Intelligence: Strategic, Operational, Tactical",
      pages: [
        "Intelligence serves different audiences. Strategic intel helps executives understand long-term trends and geopolitical risks. Operational intel focuses on specific threat actors and their TTPs.\n\nTactical intel provides the immediate, technical indicators (like IPs and hashes) used by security tools to detect and block attacks. Understanding these distinctions is key to building a balanced program."
      ]
    },
    {
      title: "Chapter 3: Sourcing and Evaluating Data",
      pages: [
        "Not all data is created equal. This chapter discusses where to find threat data—from open-source feeds to commercial providers and internal logs.\n\nWe also cover how to evaluate the quality of your sources. Is the data timely? Is it accurate? Is it relevant to your specific industry and geography? Filtering out the noise is one of the biggest challenges in TI."
      ]
    },
    {
      title: "Chapter 4: Analysis Techniques and Cognitive Biases",
      pages: [
        "Analysis is where the magic happens. We discuss structured analytic techniques (SATs) that help analysts think more clearly and avoid common pitfalls like confirmation bias and groupthink.\n\nThe goal is to move beyond simply reporting what happened to explaining *why* it matters and what is likely to happen next."
      ]
    },
    {
      title: "Chapter 5: Operationalizing Intel: Integration with SOC and IR",
      pages: [
        "Intelligence is useless if it sits in a report. This chapter covers how to integrate TI into the daily workflows of the SOC and the incident response team.\n\nFrom automating the ingestion of IOCs to providing context during an investigation, we show how TI makes every other part of the security organization more effective."
      ]
    },
    {
      title: "Conclusion: The Future of Threat Intelligence",
      pages: [
        "The future of TI lies in automation and collaboration. As attackers use AI, defenders must also use AI to process data at scale and identify patterns that humans might miss.\n\nWe also discuss the importance of information sharing within the community. When one organization learns something about a threat, everyone benefits. Collective defense is our strongest weapon."
      ]
    }
  ]
};
