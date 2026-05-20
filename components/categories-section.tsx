import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/products";
import { ArrowRight } from "lucide-react";

export function CategoriesSection() {
  return (
    <section id="categories" className="py-16 md:py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-2 font-sans">
              Browse By
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-balance">
              Collections
            </h2>
          </div>
          <Link
            href="/#shop"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-accent hover:text-foreground transition-colors font-medium group"
          >
            View All Items
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/#shop`}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] md:aspect-[3/4]"
            >
              <Image
                src={category.image}
                alt={`${category.name} collection`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent group-hover:from-foreground/80 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-8">
                <span className="inline-block px-2.5 py-1 bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-[10px] uppercase tracking-[0.2em] rounded mb-3 border border-primary-foreground/20">
                  {category.count} {category.count === 1 ? "Item" : "Items"}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground">
                  {category.name}
                </h3>
                <p className="text-primary-foreground/70 text-sm mt-1">
                  {category.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-primary-foreground/80 text-xs uppercase tracking-wider mt-4 group-hover:gap-2.5 transition-all">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
