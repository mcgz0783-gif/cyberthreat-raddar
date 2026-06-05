import { SectionHeader } from "../Misc";

const COURSES = [
  { title: "TryHackMe — Pre Security Path", provider: "TryHackMe", level: "Beginner", hours: 28, url: "https://tryhackme.com/path/outline/presecurity", icon: "🧑‍🎓", desc: "Networking, Linux, Windows, and web fundamentals — the prerequisites every aspiring practitioner needs." },
  { title: "PortSwigger Web Security Academy", provider: "PortSwigger", level: "Beginner → Advanced", hours: 120, url: "https://portswigger.net/web-security", icon: "🌐", desc: "The free version of the industry-standard web app hacking curriculum. Hundreds of labs from XSS to deserialization." },
  { title: "SANS Cyber Aces", provider: "SANS", level: "Beginner", hours: 30, url: "https://tutorials.cyberaces.org/tutorials", icon: "🛡️", desc: "Free intro to operating systems, networking, and scripting — taught by SANS instructors." },
  { title: "Cisco — Introduction to Cybersecurity", provider: "Cisco Networking Academy", level: "Beginner", hours: 15, url: "https://www.netacad.com/courses/introduction-to-cybersecurity", icon: "📡", desc: "Free certificate-bearing course covering the threat landscape and defensive basics." },
  { title: "Open Security Training", provider: "OST2", level: "Intermediate", hours: 80, url: "https://ost2.fyi/", icon: "🔬", desc: "University-grade material on reverse engineering, exploitation, and OS internals — completely free." },
  { title: "MITRE ATT&CK Defender (MAD)", provider: "MITRE", level: "Intermediate", hours: 20, url: "https://mad-certified.mitre-engenuity.org/", icon: "🎯", desc: "Free ATT&CK fundamentals training — the framework every blue teamer must speak." },
  { title: "Google Cybersecurity Certificate", provider: "Coursera (Google)", level: "Beginner", hours: 160, url: "https://www.coursera.org/professional-certificates/google-cybersecurity", icon: "🔐", desc: "Audit free; covers SOC basics, SIEM, Python, and Linux. Strong portfolio piece." },
  { title: "OverTheWire — Bandit", provider: "OverTheWire", level: "Beginner", hours: 10, url: "https://overthewire.org/wargames/bandit/", icon: "⚔️", desc: "Hands-on Linux command-line wargames — the gateway to every CTF career." },
];

export function CoursesPage() {
  return (
    <section className="container mx-auto px-6 py-14">
      <SectionHeader eyebrow="Education" title="Free Cybersecurity Courses" subtitle="Hand-picked, world-class training programmes that cost nothing to start." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map(c => (
          <a key={c.title} href={c.url} target="_blank" rel="noopener noreferrer" className="card-cyber p-6 flex flex-col gap-3 group hover:border-primary/60 transition-colors">
            <div className="flex items-start justify-between">
              <div className="text-4xl">{c.icon}</div>
              <span className="font-mono text-[10px] text-primary tracking-widest">{c.level.toUpperCase()}</span>
            </div>
            <h3 className="font-display font-bold text-white text-lg leading-tight">{c.title}</h3>
            <p className="text-xs font-mono text-muted-foreground">{c.provider} · ~{c.hours}h</p>
            <p className="text-sm text-foreground/75 leading-relaxed flex-1">{c.desc}</p>
            <span className="font-mono text-xs text-primary tracking-widest mt-1">▸ START LEARNING →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
