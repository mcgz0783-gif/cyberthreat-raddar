import { SectionHeader } from "../Misc";

export function AboutPage() {
  const team = [
    { name:"Alex Voronov", role:"Editor in Chief", bio:"Former CISO at a Fortune 500 fintech. 15 years in offensive security.", icon:"👨‍💻" },
    { name:"Mira Okafor", role:"Head of Research", bio:"Threat intelligence analyst, ex-NSA, focused on nation-state actors.", icon:"👩‍🔬" },
    { name:"Kenji Hara", role:"Lead Engineer", bio:"Builds the security tools and infrastructure powering the platform.", icon:"🧑‍💻" },
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
      <SectionHeader eyebrow="Mission" title="About CyberSec Updates" subtitle="We are builders, breakers, and defenders dedicated to making the global digital ecosystem safer through clear-eyed reporting and rigorous analysis." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="card-cyber p-8">
          <div className="text-4xl mb-4">📡</div>
          <h3 className="font-display font-bold text-white text-2xl mb-3">Our Mission</h3>
          <p className="text-foreground/70 leading-relaxed">
            To deliver the highest-signal cybersecurity intelligence on the internet — fast, accurate, and actionable. We translate noise into knowledge so defenders can move at the speed of the threat.
          </p>
        </div>
        <div className="card-cyber p-8">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="font-display font-bold text-white text-2xl mb-3">Our Reach</h3>
          <p className="text-foreground/70 leading-relaxed">
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
            <p className="text-sm text-foreground/70 leading-relaxed">{v.text}</p>
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
            <p className="text-xs text-foreground/70 leading-relaxed">{t.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
