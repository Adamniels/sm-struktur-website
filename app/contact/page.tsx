import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

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

            <Suspense fallback={<div className="h-96" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
