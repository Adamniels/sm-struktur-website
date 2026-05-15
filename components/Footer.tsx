import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-cream/80">
      <div className="page-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <p className="font-serif text-2xl text-cream tracking-wide">
              SM Struktur
            </p>
            <p className="font-sans text-sm leading-relaxed text-cream/60 max-w-xs">
              Fine furniture and bespoke woodwork. Each piece built with intention, designed to last a lifetime.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="font-sans text-xs tracking-widest uppercase text-gold">
              Navigate
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Work", href: "/portfolio" },
                { label: "Commissions", href: "/commissions" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-cream/70 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="font-sans text-xs tracking-widest uppercase text-gold">
              Get in Touch
            </p>
            <div className="space-y-2">
              <Link
                href="/contact"
                className="block font-sans text-sm text-cream/70 hover:text-gold transition-colors duration-300"
              >
                Inquire about a piece
              </Link>
              <Link
                href="/commissions"
                className="block font-sans text-sm text-cream/70 hover:text-gold transition-colors duration-300"
              >
                Start a commission
              </Link>
            </div>
            {/* Gold decorative line */}
            <div className="w-12 h-px bg-gold mt-6" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-sans text-xs text-cream/40">
            &copy; {year} SM Struktur. All rights reserved.
          </p>
          <p className="font-sans text-xs text-cream/30 italic font-serif">
            Handcrafted in Norway
          </p>
        </div>
      </div>
    </footer>
  );
}
