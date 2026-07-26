import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { SectionHeader } from "../Misc";

export function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    setSent(true);
  };

  const channels = [
    { icon:"✉", label:"Email", val:"mcgz0783@gmail.com" },
    { icon:"📞", label:"Phone", val:"0783699626" },
    { icon:"💬", label:"WhatsApp", val:"0788213106" },
    { icon:"🔐", label:"PGP", val:"0xA1B2 C3D4 E5F6 7890" },
  ];

  return (
    <section className="container mx-auto px-6 py-14">
      <SEO 
        title="Contact cyberhawk UG | Cybersecurity Intelligence Platform" 
        description="Get in touch with cyberhawk UG for tip-offs, partnerships, speaking requests, or general inquiries."
        path="/contact"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact cyberhawk UG",
            "description": "Secure communication channels for cybersecurity intelligence and inquiries.",
            "url": "https://www.cyberhawk-ug.store/contact",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "mcgz0783@gmail.com",
              "telephone": "+256-783699626",
              "contactType": "customer service"
            }
          })}
        </script>
      </Helmet>

      <SectionHeader eyebrow="Establish Connection" title="Contact cyberhawk UG" subtitle="Tip-offs, partnerships, speaking requests, or general inquiries — drop us a line through any secure channel." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-cyber p-8">
          {sent ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="font-display font-black text-white text-2xl tracking-wider uppercase mb-3">Transmission Received</h3>
              <p className="text-foreground/85">We will respond within 24-48 hours through the secure channel.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] text-primary tracking-widest uppercase mb-2 block">Operator Name</label>
                  <input className="input-cyber" placeholder="Your name" value={form.name} onChange={e => update("name", e.target.value)} />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-primary tracking-widest uppercase mb-2 block">Secure Email</label>
                  <input type="email" className="input-cyber" placeholder="you@domain.com" value={form.email} onChange={e => update("email", e.target.value)} />
                </div>
              </div>
              <div>
                <label className="font-mono text-[11px] text-primary tracking-widest uppercase mb-2 block">Subject</label>
                <input className="input-cyber" placeholder="What's this about?" value={form.subject} onChange={e => update("subject", e.target.value)} />
              </div>
              <div>
                <label className="font-mono text-[11px] text-primary tracking-widest uppercase mb-2 block">Message</label>
                <textarea className="input-cyber" placeholder="Type your encrypted payload..." value={form.message} onChange={e => update("message", e.target.value)} />
              </div>
              <button type="submit" className="btn-cyber self-start mt-2">▸ TRANSMIT MESSAGE</button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {channels.map(c => (
            <div key={c.label} className="card-cyber p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl text-primary">{c.icon}</div>
                <div className="font-mono text-[11px] text-primary tracking-widest">{c.label.toUpperCase()}</div>
              </div>
              <div className="text-foreground text-sm break-all font-mono">{c.val}</div>
            </div>
          ))}
          <div className="card-cyber p-5 bg-gradient-primary border-primary/40">
            <div className="font-mono text-[11px] text-primary tracking-widest mb-2">RESPONSE TIME</div>
            <div className="font-display font-black text-white text-2xl">24–48h</div>
            <div className="text-xs text-foreground/85 mt-1">For tip-offs marked URGENT, we respond within 4 hours.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
