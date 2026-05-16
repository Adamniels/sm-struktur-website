"use client";

import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const pieceParam = searchParams.get("piece") ?? "";

  return (
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
          defaultValue={pieceParam}
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
  );
}
