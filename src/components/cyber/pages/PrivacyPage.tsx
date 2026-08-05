import { SEO } from "@/components/SEO";
import { SectionHeader } from "../Misc";

export function PrivacyPage() {
  return (
    <section className="container mx-auto px-6 py-14 max-w-4xl">
      <SEO 
        title="Privacy Policy | CyberHawk UG" 
        description="Information on how cyberhawk UG collects, uses, and protects your data."
        path="/privacy"
      />
      <SectionHeader eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: June 2026" />
      <div className="card-cyber p-8 space-y-6 text-foreground/85 text-[15px] leading-relaxed">
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">1. Information We Collect</h2>
          <p>cyberhawk UG ("we", "us") collects only what is needed to deliver the platform: email addresses for newsletter subscribers, messages submitted via the contact form, and anonymized analytics through Vercel Analytics and other privacy-respecting tools.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">2. How We Use Your Data</h2>
          <p>To send the briefings you requested, respond to inquiries, secure the service against abuse, and improve content. We never sell your data and never share it with advertisers.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">3. Cookies</h2>
          <p>We use a minimal set of first-party cookies for session state and aggregate analytics. You can disable cookies in your browser without losing access to public content.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">4. Your Rights</h2>
          <p>You may request a copy of your data, ask for corrections, or request deletion by emailing <span className="text-primary">mcgz0783@gmail.com</span>. We respond within 30 days as required by GDPR and Uganda's Data Protection and Privacy Act, 2019.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">5. Security</h2>
          <p>All traffic is encrypted via TLS 1.3. Stored data is encrypted at rest. Access to operational systems is restricted, logged, and reviewed regularly.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">6. Contact</h2>
          <p>Questions? Reach us at <span className="text-primary">mcgz0783@gmail.com</span> or WhatsApp <span className="text-primary">0788213106</span>.</p>
        </div>
      </div>
    </section>
  );
}
