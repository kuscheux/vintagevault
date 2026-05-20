"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useProducts } from "@/lib/use-products";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SiteHeader() {
  const { totalItems, setIsCartOpen } = useCart();
  const { products } = useProducts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = searchQuery.length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.era.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
              href="/#shop"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/#categories"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/#about"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Our Story
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
            <Button
              variant="ghost"
              size="icon"
              className="min-w-[44px] min-h-[44px]"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search products"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative min-w-[44px] min-h-[44px]"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            <Link
              href="/#contact"
              className="hidden md:inline-flex text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors ml-4"
            >
              Visit Us
            </Link>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="border-t border-border bg-background px-4 py-4">
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search vintage treasures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-base"
                  autoFocus
                />
              </div>
              {filteredProducts.length > 0 && (
                <div className="mt-3 flex flex-col gap-1 max-h-80 overflow-y-auto">
                  {filteredProducts.slice(0, 5).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <div className="relative w-12 h-12 rounded overflow-hidden shrink-0 bg-muted">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.category} &middot; {product.era}
                        </p>
                      </div>
                      <span className="ml-auto text-sm font-serif font-bold text-foreground shrink-0">
                        ${product.price.toLocaleString()}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
              {searchQuery.length > 1 && filteredProducts.length === 0 && (
                <p className="mt-3 text-sm text-muted-foreground text-center py-4">
                  No items found for &ldquo;{searchQuery}&rdquo;
                </p>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden border-t border-border bg-background"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {[
                { label: "Shop", href: "/#shop" },
                { label: "Collections", href: "/#categories" },
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
