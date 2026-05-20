import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[75vh] md:h-[90vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-store.jpg"
          aria-label="Vintage Vault store atmosphere"
        >
          <source src="/videos/vintage-vault-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-foreground/10" />

        <div className="absolute inset-0 flex items-end px-4 pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl text-left">
              <p className="text-primary-foreground/70 text-xs md:text-sm uppercase tracking-[0.4em] mb-4 font-sans">
                Curated Antiques &amp; Vintage Finds &mdash; Since 2015
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[1.05] text-balance">
                Every Piece Tells a Story
              </h1>
              <p className="mt-4 md:mt-6 max-w-lg text-primary-foreground/80 text-base md:text-lg leading-relaxed">
                Discover one-of-a-kind treasures from decades past, carefully
                selected and lovingly preserved in the heart of Newnan, Georgia.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#shop"
                  className="inline-flex items-center justify-center px-10 py-3.5 min-h-[48px] bg-accent text-accent-foreground text-sm uppercase tracking-[0.2em] font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Shop Collection
                </Link>
                <Link
                  href="/#about"
                  className="inline-flex items-center justify-center px-10 py-3.5 min-h-[48px] border border-primary-foreground/30 text-primary-foreground text-sm uppercase tracking-[0.2em] font-medium rounded-lg hover:bg-primary-foreground/10 transition-colors"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { value: "500+", label: "Unique Items Sold" },
            { value: "10+", label: "Years in Newnan" },
            { value: "100%", label: "Authenticity Guaranteed" },
            { value: "4.9\u2605", label: "Customer Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
