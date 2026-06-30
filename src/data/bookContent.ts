import aiAgentsCover from "@/assets/ai-agents-cover.jpg";
import { AI_AGENTS_BOOK } from "./aiAgentsBook";

export const CUSTOM_COVERS: Record<number, string> = { 
  9: aiAgentsCover
};

export const BOOK_CONTENT: Record<number, {
  cover: { tagline: string; blurb: string };
  toc: string[];
  chapters: { title: string; pages: string[] }[];
}> = {
  1: {
    cover: { tagline: "True stories of real hackers.", blurb: "An essential read for understanding attacker psychology." },
    toc: ["Foreword", "The Intrusion", "Afterword"],
    chapters: [
      { title: "Foreword", pages: ["This is placeholder content for Foreword."] },
      { title: "The Intrusion", pages: ["This is placeholder content for The Intrusion."] },
      { title: "Afterword", pages: ["This is placeholder content for Afterword."] },
    ],
  },
  2: {
    cover: { tagline: "A deep dive into exploits.", blurb: "Hands-on examples of shellcode and network attacks." },
    toc: ["Introduction", "Exploitation", "Conclusion"],
    chapters: [
      { title: "Introduction", pages: ["This is placeholder content for Introduction."] },
      { title: "Exploitation", pages: ["This is placeholder content for Exploitation."] },
      { title: "Conclusion", pages: ["This is placeholder content for Conclusion."] },
    ],
  },
  3: {
    cover: { tagline: "The definitive guide.", blurb: "Covering OWASP Top 10 and beyond." },
    toc: ["Overview", "Web Flaws", "Advanced Attacks"],
    chapters: [
      { title: "Overview", pages: ["This is placeholder content for Overview."] },
      { title: "Web Flaws", pages: ["This is placeholder content for Web Flaws."] },
      { title: "Advanced Attacks", pages: ["This is placeholder content for Advanced Attacks."] },
    ],
  },
  4: {
    cover: { tagline: "Concise reference guide.", blurb: "Procedures for incident responders." },
    toc: ["Detection", "Analysis", "Response"],
    chapters: [
      { title: "Detection", pages: ["This is placeholder content for Detection."] },
      { title: "Analysis", pages: ["This is placeholder content for Analysis."] },
      { title: "Response", pages: ["This is placeholder content for Response."] },
    ],
  },
  5: {
    cover: { tagline: "Building a TI program.", blurb: "From the ground up." },
    toc: ["Foundation", "Operationalization", "Future"],
    chapters: [
      { title: "Foundation", pages: ["This is placeholder content for Foundation."] },
      { title: "Operationalization", pages: ["This is placeholder content for Operationalization."] },
      { title: "Future", pages: ["This is placeholder content for Future."] },
    ],
  },
  6: {
    cover: { tagline: "Building secure systems.", blurb: "Strategies for ZTA." },
    toc: ["Design Principles", "Protocols", "Implementation"],
    chapters: [
      { title: "Design Principles", pages: ["This is placeholder content for Design Principles."] },
      { title: "Protocols", pages: ["This is placeholder content for Protocols."] },
      { title: "Implementation", pages: ["This is placeholder content for Implementation."] },
    ],
  },
  7: {
    cover: { tagline: "Dissecting malicious software.", blurb: "Hands-on guide." },
    toc: ["Tools", "Techniques", "Processes"],
    chapters: [
      { title: "Tools", pages: ["This is placeholder content for Tools."] },
      { title: "Techniques", pages: ["This is placeholder content for Techniques."] },
      { title: "Processes", pages: ["This is placeholder content for Processes."] },
    ],
  },
  8: {
    cover: { tagline: "Science of human hacking.", blurb: "Psychological principles." },
    toc: ["Manipulation", "Human Factors", "Awareness"],
    chapters: [
      { title: "Manipulation", pages: ["This is placeholder content for Manipulation."] },
      { title: "Human Factors", pages: ["This is placeholder content for Human Factors."] },
      { title: "Awareness", pages: ["This is placeholder content for Awareness."] },
    ],
  },
  9: AI_AGENTS_BOOK,
};

