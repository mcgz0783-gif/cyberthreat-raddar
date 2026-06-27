import { SectionHeader } from "../Misc";

export function TermsPage() {
  return (
    <section className="container mx-auto px-6 py-14 max-w-4xl">
      <SEO 
        title="Terms of Service — CyberSec Updates" 
        description="Guidelines for using the CyberSec Updates platform."
        path="/terms"
      />
      <SectionHeader eyebrow="Legal" title="Terms of Service" subtitle="Last updated: June 2026" />
      <div className="card-cyber p-8 space-y-6 text-foreground/85 text-[15px] leading-relaxed">
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">1. Acceptance</h2>
          <p>By accessing cyberhawk-ug.store you agree to these terms. If you disagree, do not use the platform.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">2. Use of Content</h2>
          <p>Articles, books, and tools are provided for educational and informational purposes. You may share excerpts with attribution. Republishing entire works requires written permission.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">3. Acceptable Use</h2>
          <p>You will not (a) attempt to compromise the platform, (b) use it to conduct unauthorized intrusions against third parties, (c) scrape at rates that affect availability, or (d) misrepresent your identity.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">4. Tools Disclaimer</h2>
          <p>Security tools provided here are diagnostic aids. You are responsible for ensuring you have authorization before scanning, analyzing, or testing any system you do not own.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">5. No Warranty</h2>
          <p>The service is provided "as is" without warranty of any kind. We do not guarantee uninterrupted access or that content is free of errors.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">6. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, CyberHawk UG is not liable for indirect, incidental, or consequential damages arising from use of the platform.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-2">7. Changes</h2>
          <p>We may update these terms. Material changes will be announced on the homepage and via the newsletter at least 14 days in advance.</p>
        </div>
      </div>
    </section>
  );
}
