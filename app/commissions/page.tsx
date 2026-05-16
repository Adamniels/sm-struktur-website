import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commissions",
  description:
    "Commission a bespoke piece — furniture and woodwork made to order, built around your space and story.",
};

export default function CommissionsPage() {
  return (
    <>
      <section className="pt-36 pb-16 bg-cream">
        <div className="page-container">
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-gold mb-4">
            Bespoke Work
          </p>
          <h1
            className="font-serif text-display-lg text-forest mb-6"
            style={{ fontWeight: 300 }}
          >
            Commissions
          </h1>
          <div className="w-12 h-px bg-gold" />
        </div>
      </section>

      <section className="bg-cream pb-24">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <p className="font-sans text-base text-charcoal/70 leading-relaxed">
                Every commission starts with a conversation. We want to understand
                the space, the way you live in it, and what the piece needs to do —
                before a single sketch is drawn.
              </p>
              <p className="font-sans text-base text-charcoal/70 leading-relaxed">
                From there we work closely with you through design, material
                selection, and build — keeping you involved at every stage.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-forest text-cream font-sans text-sm tracking-widest uppercase px-8 py-4 hover:bg-forest-dark transition-colors duration-300"
                >
                  Start a Conversation
                </Link>
              </div>
            </div>

            {/* Process steps */}
            <div className="space-y-8">
              {[
                { step: "01", title: "Conversation", body: "Tell us about your space, your vision, and your timeline. No brief is too rough to start with." },
                { step: "02", title: "Design & Quote", body: "We produce sketches and a detailed quote. No surprises — everything is agreed before work begins." },
                { step: "03", title: "Build", body: "Your piece is built by hand in the workshop. We send progress updates throughout." },
                { step: "04", title: "Delivery", body: "We deliver and install the piece ourselves, and make sure everything is exactly right." },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-6">
                  <span className="font-serif text-3xl text-gold/40 leading-none mt-1 flex-shrink-0">
                    {step}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-forest mb-2">{title}</h3>
                    <p className="font-sans text-sm text-charcoal/60 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-forest py-20">
        <div className="page-container text-center">
          <h2
            className="font-serif text-display-md text-cream mb-6"
            style={{ fontWeight: 300 }}
          >
            Ready to talk?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-gold text-gold font-sans text-sm tracking-widest uppercase px-8 py-4 hover:bg-gold hover:text-forest transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
