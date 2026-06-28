import { SEO } from "@/components/SEO";
import { SectionHeader } from "../Misc";

export function AboutPage() {
  const team = [
    { 
      name: "Samuel Mucunguzi", 
      role: "Software Eng., Architecture & CEO", 
      bio: "Visionary lead at cyberhawk-ug.store. Architect of our global threat intelligence systems and author of essential cybersecurity literature designed to empower professionals in the digital economy.", 
      icon: "🛡️" 
    },
    { 
      name: "Dr. FadJuma", 
      role: "Associate Dev & ENT Specialist", 
      bio: "Close associate and owner of HeritageENT. Specialist in ENT systems and digital strategy, ensuring CyberHawk's infrastructure meets global enterprise standards.", 
      icon: "🧬" 
    },
    { name:"Alex Voronov", role:"Editor in Chief", bio:"Former CISO at a Fortune 500 fintech. 15 years in offensive security.", icon:"👨‍💻" },
    { name:"Mira Okafor", role:"Head of Research", bio:"Threat intelligence analyst, ex-NSA, focused on nation-state actors.", icon:"👩‍🔬" },
    { name:"Sofia Castellanos", role:"Community", bio:"Connects 40,000+ security professionals worldwide.", icon:"🧑‍🏫" },
  ];
  const values = [
    { icon:"🎯", title:"Accuracy First", text:"Every story is verified across multiple sources before publication." },
    { icon:"⚡", title:"Speed Matters", text:"Critical threats reach our readers within minutes of disclosure." },
    { icon:"🌐", title:"Open Knowledge", text:"Security education should be accessible — not locked behind paywalls." },
    { icon:"🛡️", title:"Defender's Edge", text:"We exist to give defenders a fighting chance against well-resourced adversaries." },
  ];

  return (
    <section className="container mx-auto px-6 py-14">
      <SEO 
        title="About — CyberSec Updates" 
        description="Learn about our mission, our CEO Samuel Mucunguzi, our associate Dr. FadJuma, and the team behind CyberSec Updates."
        path="/about"
      />
      <SectionHeader eyebrow="Mission" title="About CyberSec Updates" subtitle="We are builders, breakers, and defenders dedicated to making the global digital ecosystem safer through clear-eyed reporting and rigorous analysis." />

      {/* CEO SPOTLIGHT */}
      <div className="card-cyber p-8 lg:p-12 mb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-1">
            {/* CEO PHOTO */}
            <div className="aspect-[3/4] w-full max-w-[300px] mx-auto bg-surface border-2 border-primary/30 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-primary" />
              <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-primary" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="font-mono text-xs text-primary tracking-[4px] mb-4 uppercase text-left">Leadership // Founder</div>
            <h2 className="font-display font-black text-white text-4xl lg:text-5xl mb-4 text-left">Samuel Mucunguzi</h2>
            <div className="font-mono text-sm text-primary/80 mb-6 tracking-wider uppercase text-left">Software Eng., Architecture & CEO @ cyberhawk-ug.store</div>
            
            <div className="space-y-4 text-foreground/80 leading-relaxed text-lg text-left">
              <p>
                As the driving force behind CyberHawk, Samuel Mucunguzi has revolutionized how threat intelligence is processed and distributed. With a deep background in software engineering and systems architecture, he built the core infrastructure that powers our real-time global monitoring network.
              </p>
              <p>
                Beyond technical leadership, Samuel is a prolific author who has published a series of foundational cybersecurity books. These works are essential for anyone looking to explore the digital world, providing the roadmap to not only defend critical systems but to thrive and create value in the modern cyber economy. His mission is to ensure that the tools for digital success are available to everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ASSOCIATE SPOTLIGHT */}
      <div className="card-cyber p-8 lg:p-12 mb-16 relative overflow-hidden border-border/40">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-border/40" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="aspect-square w-full max-w-[240px] mx-auto bg-surface border border-border/60 relative overflow-hidden">
            </div>
            <div className="aspect-video w-full max-w-[240px] mx-auto bg-surface border border-border/60 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&w=600&q=80" 
                alt="HeritageENT Logo" 
                className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-all duration-500"
              />
            </div>
            <a 
              href="https://www.eritageentcare.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-primary tracking-widest text-center hover:underline mt-2"
            >
              WWW.ERITAGEENTCARE.COM →
            </a>
          </div>
          <div className="lg:col-span-2">
            <div className="font-mono text-xs text-muted-foreground tracking-[4px] mb-4 uppercase text-left">Strategic Associate // Partner</div>
            <h2 className="font-display font-black text-white text-3xl lg:text-4xl mb-3 text-left">Dr. FadJuma</h2>
            <div className="font-mono text-sm text-primary/70 mb-6 tracking-wider uppercase text-left">Developer, ENT Specialist & Overseer of HeritageENT</div>
            
            <div className="space-y-4 text-foreground/85 leading-relaxed text-base text-left">
              <p>
                Dr. FadJuma serves as a close associate developer and technical advisor to the CyberHawk ecosystem. With a specialized focus on ENT (Enterprise Network Threat Tracking) and digital infrastructure, he provides critical oversight that ensures our systems remain resilient and scalable.
              </p>
              <p>
                As the owner and overseer of <strong>HeritageENT</strong>, Dr. FadJuma bridges the gap between high-level architectural design and practical enterprise application. His contributions are pivotal in maintaining the integrity of our digital world, helping users explore and benefit from secure, high-performance technology environments.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="card-cyber p-8">
          <div className="text-4xl mb-4">📡</div>
          <h3 className="font-display font-bold text-white text-2xl mb-3">Our Mission</h3>
          <p className="text-foreground/85 leading-relaxed">
            To deliver the highest-signal cybersecurity intelligence on the internet — fast, accurate, and actionable. We translate noise into knowledge so defenders can move at the speed of the threat.
          </p>
        </div>
        <div className="card-cyber p-8">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="font-display font-bold text-white text-2xl mb-3">Our Reach</h3>
          <p className="text-foreground/85 leading-relaxed">
            Read by 40,000+ security professionals across 90+ countries. From startup engineers to Fortune 100 CISOs and government agencies, our work informs the people protecting the world's most critical systems.
          </p>
        </div>
      </div>

      <h3 className="section-title mb-8">Core Values</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {values.map(v => (
          <div key={v.title} className="card-cyber p-6">
            <div className="text-3xl mb-3">{v.icon}</div>
            <h4 className="font-display font-bold text-white mb-2 tracking-wider">{v.title}</h4>
            <p className="text-sm text-foreground/85 leading-relaxed">{v.text}</p>
          </div>
        ))}
      </div>

      <h3 className="section-title mb-8">The Team</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {team.map(t => (
          <div key={t.name} className="card-cyber p-6 text-center">
            <div className="hex-badge w-20 h-20 bg-primary/15 border border-primary mx-auto flex items-center justify-center text-4xl mb-4">
              {t.icon}
            </div>
            <h4 className="font-display font-bold text-white mb-1">{t.name}</h4>
            <div className="font-mono text-[11px] text-primary tracking-widest mb-3">{t.role.toUpperCase()}</div>
            <p className="text-xs text-foreground/85 leading-relaxed">{t.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
