import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to inquire about a piece or start a commission.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-36 pb-16 bg-cream">
        <div className="page-container">
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-gold mb-4">
            Get in Touch
          </p>
          <h1
            className="font-serif text-display-lg text-forest mb-6"
            style={{ fontWeight: 300 }}
          >
            Contact
          </h1>
          <div className="w-12 h-px bg-gold" />
        </div>
      </section>

      <section className="bg-cream pb-24">
        <div className="page-container">
          <div className="max-w-xl">
            <p className="font-sans text-base text-charcoal/70 leading-relaxed mb-10">
              Whether you have a question about a specific piece, want to start a
              commission, or just want to say hello — use the form below and we
              will get back to you within a day or two.
            </p>

            {/* Contact form — wired up when Resend is configured */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-charcoal/50 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border border-sand-dark focus:border-forest outline-none px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/30 transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-charcoal/50 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-transparent border border-sand-dark focus:border-forest outline-none px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/30 transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-charcoal/50 mb-2">
                  Piece of Interest
                </label>
                <input
                  type="text"
                  name="piece"
                  className="w-full bg-transparent border border-sand-dark focus:border-forest outline-none px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/30 transition-colors duration-200"
                  placeholder="Which piece are you asking about? (optional)"
                />
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-charcoal/50 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full bg-transparent border border-sand-dark focus:border-forest outline-none px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/30 transition-colors duration-200 resize-none"
                  placeholder="Tell us what you have in mind..."
                />
              </div>

              <p className="font-sans text-xs text-charcoal/30 italic">
                Form submission will be wired up once the API route is configured.
              </p>

              <button
                type="submit"
                className="bg-forest text-cream font-sans text-sm tracking-widest uppercase px-10 py-4 hover:bg-forest-dark transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
