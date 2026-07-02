const TESTIMONIALS = [
  {
    name: "John Doe",
    role: "SOC Analyst",
    text: "The Ethical Hacking for Beginners book was a game changer for me. It broke down complex topics into digestible chunks.",
    avatar: "👤"
  },
  {
    name: "Jane Smith",
    role: "Computer Science Student",
    text: "CyberHawk UG is my go-to resource for staying updated with the latest AI tools and security trends.",
    avatar: "👩‍💻"
  },
  {
    name: "David Okello",
    role: "IT Security Manager",
    text: "Professional, innovative, and highly educational. A must-have resource for any security practitioner in Africa.",
    avatar: "🛡️"
  }
];

export function Testimonials() {
  return (
    <section className="bg-surface/30 border-y border-border overflow-hidden">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-primary tracking-[3px] uppercase mb-3">▸ Community</div>
          <h2 className="section-title mb-4">What Our Readers Say</h2>
          <p className="text-muted-foreground">Join 10,000+ subscribers who trust CyberHawk UG for their security education.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card-cyber p-8 flex flex-col gap-6 relative">
              <div className="text-primary opacity-20 text-6xl absolute top-4 right-8 font-serif">"</div>
              <p className="text-foreground/90 italic leading-relaxed relative z-10">
                {t.text}
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display font-bold text-white leading-none">{t.name}</div>
                  <div className="font-mono text-[10px] text-primary uppercase mt-1 tracking-widest">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
