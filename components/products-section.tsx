"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/lib/use-products";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowRight } from "lucide-react";

const filterTabs = ["All", "Furniture", "Decor", "Lighting"];

export function ProductsSection() {
  const { addItem } = useCart();
  const { products } = useProducts();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section id="shop" className="py-16 md:py-24 px-4 bg-secondary/50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-2 font-sans">
            One-of-a-Kind
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-balance">
            Featured Finds
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto leading-relaxed">
            Each item in our collection has been hand-selected for its
            character, craftsmanship, and story.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 min-h-[40px] rounded-full text-sm font-medium tracking-wide transition-all ${
                activeFilter === tab
                  ? "bg-foreground text-background"
                  : "bg-card text-muted-foreground border border-border hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <Badge className="bg-accent text-accent-foreground border-0 text-[10px] uppercase tracking-wider">
                        New Arrival
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge variant="destructive" className="text-[10px] uppercase tracking-wider border-0 bg-destructive text-primary-foreground">
                        Sale
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-2.5 py-1 bg-background/90 backdrop-blur-sm text-foreground text-[10px] uppercase tracking-wider rounded-full font-medium">
                      {product.era}
                    </span>
                  </div>
                  {/* Quick-add on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button
                      className="w-full bg-foreground/90 backdrop-blur-sm text-background hover:bg-foreground text-xs uppercase tracking-wider"
                      onClick={(e) => {
                        e.preventDefault();
                        addItem(product);
                      }}
                    >
                      <ShoppingBag className="h-3.5 w-3.5 mr-2" />
                      Quick Add
                    </Button>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    {product.category} &middot; {product.condition}
                  </p>
                  <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl font-bold text-foreground">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/product/${product.id}`}
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-accent hover:gap-2 transition-all font-medium"
                  >
                    View
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
