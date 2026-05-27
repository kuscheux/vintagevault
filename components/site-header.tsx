"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden min-w-[44px] min-h-[44px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Desktop Navigation - Left */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            <Link
              href="/#about"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Our Story
            </Link>
            <Link
              href="/#contact"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Visit Us
            </Link>
          </nav>

          {/* Center Logo */}
          <Link href="/" className="flex flex-col items-center leading-none absolute left-1/2 -translate-x-1/2">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Vintage Vault
            </span>
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-0.5">
              Newnan, Georgia
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <Link
              href="/#contact"
              className="hidden md:inline-flex text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Visit Us
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden border-t border-border bg-background"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {[
                { label: "Our Story", href: "/#about" },
                { label: "Visit Us", href: "/#contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="py-3 text-base uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
