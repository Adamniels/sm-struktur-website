"use client";

import { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const strings = {
  sv: {
    name: "Namn",
    namePlaceholder: "Ditt namn",
    email: "E-post",
    emailPlaceholder: "din@epost.se",
    piece: "Objekt av intresse",
    piecePlaceholder: "Vilket objekt gäller din fråga? (valfritt)",
    message: "Meddelande",
    messagePlaceholder: "Berätta vad du har i åtanke...",
    send: "Skicka meddelande",
    sending: "Skickar...",
    success: "Tack! Ditt meddelande har skickats. Jag återkommer inom kort.",
    error: "Något gick fel. Försök igen eller kontakta mig direkt.",
  },
  en: {
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "your@email.com",
    piece: "Piece of Interest",
    piecePlaceholder: "Which piece are you asking about? (optional)",
    message: "Message",
    messagePlaceholder: "Tell us what you have in mind...",
    send: "Send Message",
    sending: "Sending...",
    success: "Thank you! Your message has been sent. I'll get back to you shortly.",
    error: "Something went wrong. Please try again or contact me directly.",
  },
};

export default function ContactForm() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pieceParam = searchParams.get("piece") ?? "";

  const locale: Locale = pathname.startsWith("/en") ? "en" : "sv";
  const t = strings[locale];

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      piece: (form.elements.namedItem("piece") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-16 text-center">
        <div className="w-12 h-px bg-gold mx-auto mb-8" />
        <p className="font-serif text-2xl text-forest mb-4">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-sans text-xs tracking-widest uppercase text-charcoal/50 mb-2">
            {t.name}
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full bg-transparent border border-sand-dark focus:border-forest outline-none px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/30 transition-colors duration-200"
            placeholder={t.namePlaceholder}
          />
        </div>
        <div>
          <label className="block font-sans text-xs tracking-widest uppercase text-charcoal/50 mb-2">
            {t.email}
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full bg-transparent border border-sand-dark focus:border-forest outline-none px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/30 transition-colors duration-200"
            placeholder={t.emailPlaceholder}
          />
        </div>
      </div>

      <div>
        <label className="block font-sans text-xs tracking-widest uppercase text-charcoal/50 mb-2">
          {t.piece}
        </label>
        <input
          type="text"
          name="piece"
          defaultValue={pieceParam}
          className="w-full bg-transparent border border-sand-dark focus:border-forest outline-none px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/30 transition-colors duration-200"
          placeholder={t.piecePlaceholder}
        />
      </div>

      <div>
        <label className="block font-sans text-xs tracking-widest uppercase text-charcoal/50 mb-2">
          {t.message}
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full bg-transparent border border-sand-dark focus:border-forest outline-none px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/30 transition-colors duration-200 resize-none"
          placeholder={t.messagePlaceholder}
        />
      </div>

      {status === "error" && (
        <p className="font-sans text-xs text-red-600">{t.error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-forest text-cream font-sans text-sm tracking-widest uppercase px-10 py-4 hover:bg-forest-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? t.sending : t.send}
      </button>
    </form>
  );
}
