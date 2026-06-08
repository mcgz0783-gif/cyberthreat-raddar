const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const NEWS = [
  { id:1, cat:"Threat Intel", color:"danger", title:"Critical Zero-Day in Apache HTTP Server Actively Exploited", date:"Apr 22, 2025", read:"4 min", summary:"Security researchers have confirmed active exploitation of a critical RCE vulnerability in Apache HTTP Server affecting millions of web servers globally.", tags:["CVE-2025","RCE","Apache"], icon:"⚠️", cover: U("photo-1614064641938-3bbee52942c7") },
  { id:2, cat:"Data Breach", color:"warning", title:"Major Healthcare Provider Exposes 12M Patient Records", date:"Apr 21, 2025", read:"3 min", summary:"A misconfigured cloud storage bucket exposed sensitive patient data including SSNs, medical histories, and insurance details for over 12 million individuals.", tags:["Healthcare","Cloud","PII"], icon:"🏥", cover: U("photo-1576091160550-2173dba999ef") },
  { id:3, cat:"AI Security", color:"primary", title:"LLM Prompt Injection Attacks Surge 340% in Q1 2025", date:"Apr 20, 2025", read:"5 min", summary:"New threat intelligence report reveals dramatic increase in AI-targeted attacks as enterprises accelerate LLM adoption without adequate security controls.", tags:["AI","LLM","Prompt Injection"], icon:"🤖", cover: U("photo-1677442136019-21780ecad995") },
  { id:4, cat:"Tools", color:"success", title:"CISA Releases Updated Vulnerability Scanning Framework", date:"Apr 19, 2025", read:"3 min", summary:"The Cybersecurity and Infrastructure Security Agency published an enhanced version of their vulnerability scanning toolkit with improved detection for modern attack vectors.", tags:["CISA","Scanning","Framework"], icon:"🛡️", cover: U("photo-1563013544-824ae1b704d3") },
  { id:5, cat:"Ransomware", color:"danger", title:"LockBit 4.0 Targets Critical Infrastructure in Europe", date:"Apr 18, 2025", read:"6 min", summary:"LockBit's latest variant employs advanced evasion techniques and has successfully compromised 23 critical infrastructure organizations across seven European nations.", tags:["Ransomware","LockBit","Critical Infra"], icon:"🔒", cover: U("photo-1550751827-4bd374c3f58b") },
  { id:6, cat:"Nation State", color:"primary", title:"APT41 Campaign Targets Semiconductor Supply Chain", date:"Apr 17, 2025", read:"7 min", summary:"Mandiant researchers attribute a sophisticated 8-month espionage campaign targeting semiconductor manufacturers to Chinese state-sponsored threat actor APT41.", tags:["APT41","Espionage","Supply Chain"], icon:"🌐", cover: U("photo-1451187580459-43490279c0fa") },
];

export const BLOGS = [
  { id:1, title:"Zero Trust Architecture: A Practical Implementation Guide", author:"Dr. Sarah Chen", date:"Apr 20, 2025", read:"12 min", cat:"Architecture", summary:"Zero Trust is no longer optional. This comprehensive guide walks through implementing ZTA in legacy enterprise environments, covering identity, microsegmentation, and continuous verification.", img:"🏗️", featured:true, cover: U("photo-1518770660439-4636190af475") },
  { id:2, title:"The Anatomy of a Modern Phishing Campaign", author:"Marcus Webb", date:"Apr 18, 2025", read:"8 min", cat:"Threat Analysis", summary:"Breaking down a real-world spear-phishing operation from initial recon to credential harvesting — and how defenders can identify each stage.", img:"🎣", featured:false, cover: U("photo-1526374965328-7f61d4dc18c5") },
  { id:3, title:"Kubernetes Security Hardening: Beyond the Basics", author:"Aisha Patel", date:"Apr 15, 2025", read:"15 min", cat:"Cloud Security", summary:"Most K8s deployments are misconfigured by default. Here's a deep-dive into RBAC, network policies, secrets management, and runtime security.", img:"☸️", featured:false, cover: U("photo-1544197150-b99a580bb7a8") },
  { id:4, title:"Building a SOC From Scratch in 90 Days", author:"James Okonkwo", date:"Apr 12, 2025", read:"20 min", cat:"Blue Team", summary:"A realistic roadmap for standing up a functional Security Operations Center with limited budget — covering tooling, processes, and people.", img:"🖥️", featured:true, cover: U("photo-1573164713714-d95e436ab8d6") },
  { id:5, title:"Bug Bounty Strategies That Actually Pay Off", author:"Eva Lindqvist", date:"Apr 10, 2025", read:"10 min", cat:"Offensive Security", summary:"After earning $200K+ in bug bounties, here are the methodologies, target selection criteria, and report writing tips that separate top earners from the rest.", img:"💰", featured:false, cover: U("photo-1555066931-4365d14bab8c") },
  { id:6, title:"Threat Intelligence Feeds: Signal vs Noise", author:"Raj Iyer", date:"Apr 8, 2025", read:"9 min", cat:"Threat Intel", summary:"With hundreds of TI feeds available, knowing which ones to trust and how to operationalize them is critical. Here's a framework for evaluation.", img:"📡", featured:false, cover: U("photo-1551288049-bebda4e38f71") },
];

export const INSIGHTS = [
  { id:1, title:"The State of Ransomware 2025: Industrialization of Cybercrime", author:"CyberSec Research Team", date:"Apr 22, 2025", read:"18 min", cat:"Annual Report", key:"Ransomware-as-a-Service ecosystems have matured into enterprise-scale operations with customer support, affiliate programs, and revenue sharing models.", img:"📊", cover: U("photo-1460925895917-afdab827c52f") },
  { id:2, title:"How Generative AI is Reshaping the Threat Landscape", author:"Dr. Yuki Tanaka", date:"Apr 18, 2025", read:"14 min", cat:"AI Analysis", key:"Defenders must now contend with AI-generated malware that mutates to evade signature-based detection in real time.", img:"🧠", cover: U("photo-1620712943543-bcc4688e7485") },
  { id:3, title:"Critical Infrastructure Under Siege: Lessons from 2024", author:"NATO Cyber Centre", date:"Apr 14, 2025", read:"22 min", cat:"Policy Brief", key:"Nation-state actors increasingly target civilian infrastructure as a low-cost, high-impact tool for geopolitical coercion.", img:"⚡", cover: U("photo-1473341304170-971dccb5ac1e") },
  { id:4, title:"CISO Burnout Crisis: The Human Cost of Cyber Defense", author:"CyberHealth Initiative", date:"Apr 10, 2025", read:"11 min", cat:"Industry Trends", key:"62% of CISOs report severe burnout, with the average tenure dropping to 18 months. The talent retention crisis is becoming a security risk.", img:"🧑‍💼", cover: U("photo-1573497019940-1c28c88b4f3e") },
];

export const BOOKS = [
  { id:1, title:"The Art of Intrusion", author:"Kevin Mitnick", year:2023, cat:"Offensive Security", desc:"True stories of real hackers who broke into banks, government computers, and the phone system. An essential read for understanding attacker psychology.", pages:288, icon:"🔓", cover: U("photo-1550751827-4bd374c3f58b") },
  { id:2, title:"Hacking: The Art of Exploitation", author:"Jon Erickson", year:2022, cat:"Technical", desc:"A deep dive into the technical aspects of exploits, shellcode, network attacks, and cryptographic weaknesses with hands-on examples.", pages:488, icon:"💻", cover: U("photo-1555949963-aa79dcee981c") },
  { id:3, title:"The Web Application Hacker's Handbook", author:"Stuttard & Pinto", year:2024, cat:"Web Security", desc:"The definitive guide to finding and exploiting web application security flaws, covering OWASP Top 10 and beyond.", pages:912, icon:"🌐", cover: U("photo-1451187580459-43490279c0fa") },
  { id:4, title:"Blue Team Handbook", author:"Don Murdoch", year:2023, cat:"Blue Team", desc:"Concise reference guide for incident responders covering detection, analysis, and response procedures with practical checklists.", pages:204, icon:"🛡️", cover: U("photo-1563206767-5b18f218e8de") },
  { id:5, title:"Threat Intelligence and Me", author:"Chris Roberts", year:2024, cat:"Threat Intel", desc:"A practical guide to building and operationalizing a threat intelligence program from the ground up in any organization size.", pages:320, icon:"📡", cover: U("photo-1504384308090-c894fdcc538d") },
  { id:6, title:"Zero Trust Networks", author:"Gilman & Barth", year:2023, cat:"Architecture", desc:"Building secure systems in untrusted networks. Covers the design principles, protocols, and implementation strategies for ZTA.", pages:240, icon:"🏗️", cover: U("photo-1558494949-ef010cbdcc31") },
  { id:7, title:"Practical Malware Analysis", author:"Sikorski & Honig", year:2022, cat:"Malware", desc:"The hands-on guide to dissecting malicious software. Learn the tools, techniques, and processes used by professional malware analysts.", pages:800, icon:"🦠", cover: U("photo-1526374965328-7f61d4dc18c5") },
  { id:8, title:"Social Engineering: The Science of Human Hacking", author:"Christopher Hadnagy", year:2023, cat:"Social Engineering", desc:"Understanding the psychological principles behind manipulation and how to build human-centered security awareness programs.", pages:320, icon:"🎭", cover: U("photo-1521737604893-d14cc237f11d") },
  { id:9, title:"Building & Using AI Agents to Make Money", author:"CyberHawk UG", year:2026, cat:"AI & Automation", desc:"A practical playbook for designing, deploying, and monetizing AI agents using Lovable, Cursor, GitHub, Vercel, Supabase, and Stripe — with real workflows for TikTok payouts, e-commerce, and crypto rails.", pages:228, icon:"🤖" },
];

export const TICKER_ITEMS = [
  "⚡ CRITICAL: Apache Zero-Day CVE-2025-1234 under active exploitation",
  "🔴 ALERT: LockBit 4.0 targets EU critical infrastructure",
  "🤖 AI prompt injection attacks up 340% in Q1 2025",
  "🛡️ CISA releases updated vulnerability scanning framework v3.2",
  "🔵 Patch Tuesday: Microsoft addresses 87 vulnerabilities",
  "📊 IBM X-Force: Average breach cost hits $5.3M in 2025",
  "🌐 APT41 active in semiconductor supply chain espionage",
];

export const STATS = [
  { val:"2,365", label:"Cyberattacks/Day", icon:"⚡" },
  { val:"$5.3M", label:"Avg Breach Cost", icon:"💸" },
  { val:"95%", label:"Human Factor", icon:"🧑‍💻" },
  { val:"280", label:"Days to Detect", icon:"🕐" },
];

export const TOOLS = [
  { name:"Threat Map", icon:"🗺️", desc:"Live global cyberattack visualization", color:"hsl(var(--danger))" },
  { name:"CVE Search", icon:"🔍", desc:"Search latest vulnerabilities by CVE ID", color:"hsl(var(--primary))" },
  { name:"Hash Checker", icon:"#️⃣", desc:"Verify file integrity & detect malware", color:"hsl(var(--success))" },
  { name:"IP Reputation", icon:"🌐", desc:"Check IP addresses against threat feeds", color:"#9b5de5" },
  { name:"SSL Inspector", icon:"🔐", desc:"Analyze SSL/TLS certificate security", color:"#ff6b35" },
  { name:"News API", icon:"📡", desc:"Live cybersecurity feed aggregator", color:"hsl(var(--warning))" },
];

export type NewsItem = typeof NEWS[number];
export type BlogItem = typeof BLOGS[number];
export type InsightItem = typeof INSIGHTS[number];
export type BookItem = typeof BOOKS[number];

export const colorVar = (c: string) => {
  if (c === "danger" || c === "success" || c === "warning" || c === "primary") return `hsl(var(--${c}))`;
  return c;
};
