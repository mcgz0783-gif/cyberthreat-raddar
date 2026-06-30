export const BOOK7_CONTENT = {
  cover: {
    tagline: "The hands-on guide to dissecting malicious software.",
    blurb: "Malware is one of the most effective tools in an attacker's arsenal. This book teaches you how to analyze malicious code safely, using both static and dynamic techniques to understand what the malware does and how to defend against it."
  },
  toc: [
    "Introduction: The World of Malware",
    "Chapter 1: Setting Up a Safe Malware Analysis Environment",
    "Chapter 2: Basic Static Analysis: Triage and Fingerprinting",
    "Chapter 3: Basic Dynamic Analysis: Monitoring System Behavior",
    "Chapter 4: Advanced Static Analysis: Disassembling and Decompiling",
    "Chapter 5: Advanced Dynamic Analysis: Debugging and Memory Analysis",
    "Conclusion: Operationalizing Malware Analysis"
  ],
  chapters: [
    {
      title: "Introduction: The World of Malware",
      pages: [
        "Malware comes in many forms, from simple viruses to sophisticated ransomware and rootkits. This chapter provides an overview of the malware landscape and the motivations of the people who create it.\n\nWe discuss the importance of malware analysis for incident responders, threat hunters, and security researchers."
      ]
    },
    {
      title: "Chapter 1: Setting Up a Safe Malware Analysis Environment",
      pages: [
        "The first rule of malware analysis is: Never analyze malware on a machine you care about. We walk through the process of building a secure, isolated sandbox using virtual machines and dedicated hardware.\n\nWe also discuss the importance of network isolation and how to use tools like INetSim to simulate a fake internet for the malware to interact with."
      ]
    },
    {
      title: "Chapter 2: Basic Static Analysis: Triage and Fingerprinting",
      pages: [
        "Static analysis involves examining the malware without actually running it. We look at file headers, strings, and imported functions to get a quick sense of what the malware might be capable of.\n\nTools like PEiD, Strings, and VirusTotal are essential in this phase for identifying known malware families and common techniques."
      ]
    },
    {
      title: "Chapter 3: Basic Dynamic Analysis: Monitoring System Behavior",
      pages: [
        "Dynamic analysis involves running the malware in a controlled environment and observing its behavior. We monitor file system changes, registry modifications, and network connections.\n\nTools like Process Monitor, Process Hacker, and Wireshark provide a wealth of information about how the malware interacts with the host system and the outside world."
      ]
    },
    {
      title: "Chapter 4: Advanced Static Analysis: Disassembling and Decompiling",
      pages: [
        "When basic techniques aren't enough, we must dive into the code itself. We use disassemblers like IDA Pro and Ghidra to turn machine code back into human-readable assembly.\n\nThis chapter teaches you how to follow the flow of execution, identify key functions, and understand the logic of complex malware."
      ]
    },
    {
      title: "Chapter 5: Advanced Dynamic Analysis: Debugging and Memory Analysis",
      pages: [
        "Advanced dynamic analysis involves using debuggers like x64dbg and OllyDbg to step through the malware's execution line by line. We can modify memory, bypass anti-analysis checks, and extract hidden payloads.\n\nWe also cover memory forensics using Volatility to find malware that resides only in RAM, leaving no trace on the disk."
      ]
    },
    {
      title: "Conclusion: Operationalizing Malware Analysis",
      pages: [
        "Malware analysis is only useful if its findings are put to work. We discuss how to use the results of your analysis to create better detection rules (like YARA and Snort), improve incident response, and inform threat intelligence.\n\nThe field of malware analysis is constantly evolving as attackers develop new ways to evade detection and analysis. Continuous learning is essential for any professional in this space."
      ]
    }
  ]
};
