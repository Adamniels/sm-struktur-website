/**
 * The Sanity Studio now runs as a standalone process, separate from Next.js.
 * This page simply points you to it.
 *
 * To open the studio, run this command in a second terminal:
 *   npm run studio
 *
 * The studio will be available at http://localhost:3333
 *
 * For production, deploy the studio with:
 *   npx sanity deploy
 * This gives you a permanent URL like https://sm-struktur.sanity.studio
 */

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-forest flex items-center justify-center">
      <div className="text-center max-w-lg px-8">
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-gold mb-6">
          Admin
        </p>
        <h1 className="font-serif text-4xl text-cream mb-6" style={{ fontWeight: 300 }}>
          Sanity Studio
        </h1>
        <div className="w-12 h-px bg-gold mx-auto mb-8" />
        <p className="font-sans text-sm text-cream/60 leading-relaxed mb-10">
          The content studio runs as a separate process. Open a second terminal in your project folder and run:
        </p>
        <code className="block bg-cream/10 text-gold font-mono text-sm px-6 py-4 rounded-sm mb-10">
          npm run studio
        </code>
        <p className="font-sans text-sm text-cream/60 leading-relaxed mb-2">
          Then open the studio at:
        </p>
        <a
          href="http://localhost:3333"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm text-gold hover:text-gold-light underline underline-offset-4 transition-colors"
        >
          http://localhost:3333
        </a>
        <div className="mt-12 pt-8 border-t border-cream/10">
          <p className="font-sans text-xs text-cream/30">
            For production, run{" "}
            <code className="text-gold/60">npx sanity deploy</code>{" "}
            to get a permanent studio URL.
          </p>
        </div>
      </div>
    </div>
  );
}
