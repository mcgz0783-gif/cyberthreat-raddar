import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "What is CyberHawk UG?",
    answer: "CyberHawk UG is a leading cybersecurity and AI education platform focused on providing high-quality, accessible learning resources for professionals and students, particularly in Africa and globally."
  },
  {
    question: "Are the books original?",
    answer: "Yes, all books published by CyberHawk UG are original, high-quality manuscripts authored by our team of experts, led by Samuel Mucunguzi."
  },
  {
    question: "Can I get a physical copy of the books?",
    answer: "Currently, our books are primarily available as digital downloads (PDF/EPUB) to ensure instant access and affordability. We are exploring physical distribution options for the future."
  },
  {
    question: "How can I contribute to the blog?",
    answer: "We welcome technical contributions! Please contact us through our 'Secure Channels' on the contact page to discuss potential guest posts or editorial collaborations."
  },
  {
    question: "Is there a community I can join?",
    answer: "Yes! By subscribing to our newsletter, you become part of our growing community of 10,000+ security enthusiasts. We also have active social media channels for real-time discussion."
  }
];

export function FAQ() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-mono text-xs text-primary tracking-[3px] uppercase mb-3">▸ Support</div>
          <h2 className="section-title mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about our platform, books, and mission.</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border bg-surface/50 px-6">
              <AccordionTrigger className="text-white font-display font-bold hover:text-primary transition-colors text-left py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
