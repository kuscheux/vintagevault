"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Facebook } from "lucide-react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="border-t border-border bg-card">
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-foreground">
                Vintage Vault
              </span>
            </Link>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed max-w-sm">
              Curated antiques and vintage finds in the heart of Newnan,
              Georgia. Every piece tells a story worth sharing.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.instagram.com/vintagevaultantique"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/p/Vintage-Vault-Antique-Marketplace-61573782123669"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-[0.2em] mb-4">
              Shop
            </h4>
            <nav className="flex flex-col gap-2.5" aria-label="Footer shop links">
              <Link
                href="/#shop"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                All Items
              </Link>
              <Link
                href="/#categories"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Furniture
              </Link>
              <Link
                href="/#categories"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Decor
              </Link>
              <Link
                href="/#categories"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Lighting
              </Link>
            </nav>
          </div>

          {/* Info Links */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-[0.2em] mb-4">
              Info
            </h4>
            <nav className="flex flex-col gap-2.5" aria-label="Footer info links">
              <Link
                href="/#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Our Story
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Visit Us
              </Link>
              <a
                href="tel:+16786753890"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                (678) 675-3890
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Shipping & Returns
              </a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-[0.2em] mb-4">
              Stay in Touch
            </h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Get notified about new arrivals and special events.
            </p>
            {submitted ? (
              <div className="bg-secondary rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-foreground">
                  Thanks for subscribing!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  We&apos;ll keep you in the loop.
                </p>
              </div>
            ) : (
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubmitted(true);
                }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 min-w-0 px-3 py-2.5 min-h-[44px] text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 min-h-[44px] bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity tracking-wide"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Vintage Vault. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
