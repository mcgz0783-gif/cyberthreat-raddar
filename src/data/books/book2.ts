export const BOOK2_CONTENT = {
  cover: {
    tagline: "A deep dive into the technical aspects of exploits, shellcode, and network attacks.",
    blurb: "Hacking is the art of creative problem solving. In this book, Jon Erickson teaches you the technical skills needed to understand how vulnerabilities work and how to write your own exploits. It's a hands-on journey from basic C programming to advanced buffer overflows and cryptographic attacks."
  },
  toc: [
    "Introduction: What is Hacking?",
    "Chapter 1: Programming Foundations (C & Assembly)",
    "Chapter 2: Exploitation: The Buffer Overflow",
    "Chapter 3: Networking and Packet Manipulation",
    "Chapter 4: Shellcode and Payloads",
    "Chapter 5: Cryptography and its Weaknesses",
    "Conclusion: The Ethics of Exploitation"
  ],
  chapters: [
    {
      title: "Introduction: What is Hacking?",
      pages: [
        "Hacking is often misunderstood as simply breaking into computers. In reality, it is a mindset of extreme curiosity and creative problem-solving. It's about looking at a system and seeing not just what it was designed to do, but what it *can* be made to do.\n\nErickson defines hacking as the act of following one's curiosity to its logical (and often unintended) conclusion. This book provides the technical foundation to turn that curiosity into actionable skill."
      ]
    },
    {
      title: "Chapter 1: Programming Foundations (C & Assembly)",
      pages: [
        "To exploit a program, you must first understand how it works at the lowest level. This chapter introduces the C programming language and how it translates into Assembly code and machine instructions.\n\nWe cover memory management, pointers, and the stack. Understanding how the CPU handles function calls and local variables is the key to mastering memory-based vulnerabilities.",
        "Example: A simple C program is dissected to show how variables are stored in memory and how the instruction pointer (EIP) dictates the flow of execution. This is the 'ground truth' of computing."
      ]
    },
    {
      title: "Chapter 2: Exploitation: The Buffer Overflow",
      pages: [
        "The buffer overflow is the classic exploit. By sending more data than a program expects, an attacker can overwrite adjacent memory, including the return address of a function.\n\nThis chapter walks through the process of 'smashing the stack'. We learn how to calculate the exact offset needed to redirect the program's execution to a piece of malicious code (shellcode) that we've injected into the buffer.",
        "Step-by-step: 1. Identify a vulnerable function (like strcpy). 2. Determine the buffer size. 3. Crafts a payload that overflows the buffer. 4. Control the EIP to point to our shellcode."
      ]
    },
    {
      title: "Chapter 3: Networking and Packet Manipulation",
      pages: [
        "Modern hacking is almost always performed over a network. This chapter dives into the OSI model, TCP/IP, and how to use tools like tcpdump and Wireshark to intercept and analyze traffic.\n\nWe explore techniques like ARP spoofing and session hijacking. By inserting ourselves into the middle of a communication (MitM), we can see data that was intended for others and even modify it in real-time."
      ]
    },
    {
      title: "Chapter 4: Shellcode and Payloads",
      pages: [
        "Shellcode is the 'business end' of an exploit. It's a small piece of code, written in assembly, that performs a specific action—usually opening a remote shell on the victim's machine.\n\nThis chapter teaches you how to write your own shellcode, how to make it 'null-free' so it can pass through string-handling functions, and how to use encoders to bypass basic signature-based detection."
      ]
    },
    {
      title: "Chapter 5: Cryptography and its Weaknesses",
      pages: [
        "Cryptography is the bedrock of security, but it is only as strong as its implementation. We look at common cryptographic primitives and how they can be attacked.\n\nFrom brute-forcing weak passwords to exploiting implementation flaws in protocols like SSL/TLS, this chapter shows that even mathematically sound algorithms can be defeated if the surrounding system is flawed."
      ]
    },
    {
      title: "Conclusion: The Ethics of Exploitation",
      pages: [
        "With great power comes great responsibility. Erickson concludes by discussing the ethical considerations of being a hacker. The skills learned in this book should be used to build better systems, not to cause harm.\n\nTrue mastery comes from understanding the darkness to better protect the light. The journey of a hacker never ends; there is always a new system to explore and a new puzzle to solve."
      ]
    }
  ]
};
