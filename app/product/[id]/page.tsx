"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useProducts } from "@/lib/use-products";
import { useCart } from "@/lib/cart-context";
import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  ShoppingBag,
  Shield,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  Check,
  Star,
} from "lucide-react";

function ProductDetail() {
  const params = useParams();
  const { addItem } = useCart();
  const { products, loading } = useProducts();
  const [addedToCart, setAddedToCart] = useState(false);
  const product = products.find((p) => p.id === params.id);

  if (!product && loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-secondary animate-pulse mb-6" />
        <p className="text-muted-foreground">Loading item...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
          <ShoppingBag className="h-7 w-7 text-muted-foreground/50" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-foreground mb-3">
          Item Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-sm">
          This piece may have already found a new home. That&apos;s the beauty
          of vintage &mdash; each item is one-of-a-kind.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm uppercase tracking-wider font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <nav
          className="flex items-center gap-2 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <span className="text-border">/</span>
          <Link
            href="/#shop"
            className="hover:text-foreground transition-colors"
          >
            Shop
          </Link>
          <span className="text-border">/</span>
          <Link
            href="/#shop"
            className="hover:text-foreground transition-colors"
          >
            {product.category}
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-secondary sticky top-24">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-accent text-accent-foreground border-0 text-[10px] uppercase tracking-wider">
                    New Arrival
                  </Badge>
                )}
                {product.originalPrice && (
                  <Badge
                    variant="destructive"
                    className="text-[10px] uppercase tracking-wider border-0 bg-destructive text-primary-foreground"
                  >
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % Off
                  </Badge>
                )}
              </div>
              {/* Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors border border-border/50"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-4 w-4" />
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors border border-border/50"
                  aria-label="Share product"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="outline" className="text-[10px] uppercase tracking-[0.15em] font-medium">
                {product.category}
              </Badge>
              <Badge variant="outline" className="text-[10px] uppercase tracking-[0.15em] font-medium">
                {product.era}
              </Badge>
              <Badge variant="outline" className="text-[10px] uppercase tracking-[0.15em] font-medium">
                {product.condition}
              </Badge>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance leading-[1.1]">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">(Verified Authentic)</span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-foreground">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <Separator className="my-6" />

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Specs Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1 font-medium">
                  Era
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {product.era}
                </p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1 font-medium">
                  Condition
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {product.condition}
                </p>
              </div>
              {product.dimensions && (
                <div className="bg-secondary rounded-lg p-4 col-span-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1 font-medium">
                    Dimensions
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {product.dimensions}
                  </p>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <div className="mt-8 flex gap-3">
              <Button
                className={`flex-1 min-h-[52px] text-sm uppercase tracking-[0.15em] font-medium transition-all ${
                  addedToCart
                    ? "bg-green-700 text-primary-foreground hover:bg-green-700"
                    : "bg-accent text-accent-foreground hover:opacity-90"
                }`}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="min-w-[52px] min-h-[52px] border-border"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center gap-2 p-3 bg-secondary rounded-lg">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium leading-tight">
                  Authenticity Guaranteed
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-3 bg-secondary rounded-lg">
                <Truck className="h-5 w-5 text-accent" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium leading-tight">
                  Careful Packing
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-3 bg-secondary rounded-lg">
                <RotateCcw className="h-5 w-5 text-accent" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium leading-tight">
                  7-Day Returns
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <Tabs defaultValue="details">
                <TabsList className="w-full">
                  <TabsTrigger value="details" className="flex-1">
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="shipping" className="flex-1">
                    Shipping
                  </TabsTrigger>
                  <TabsTrigger value="care" className="flex-1">
                    Care
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-4">
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      This {product.category.toLowerCase()} piece dates to the{" "}
                      {product.era} and is in {product.condition.toLowerCase()}{" "}
                      condition. Each item at Vintage Vault is personally
                      inspected and authenticated.
                    </p>
                    {product.dimensions && (
                      <p>
                        <strong className="text-foreground">Dimensions:</strong>{" "}
                        {product.dimensions}
                      </p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="shipping" className="pt-4">
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      Free shipping on orders over $500. Standard delivery in
                      5-7 business days. Furniture items may require white-glove
                      delivery (additional charges may apply).
                    </p>
                    <p>
                      Local pickup available at our Newnan, GA location at no
                      charge.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="care" className="pt-4">
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <p>
                      Vintage items require gentle care. We recommend dusting
                      with a soft, dry cloth. Avoid harsh chemicals and direct
                      sunlight to preserve the original patina.
                    </p>
                    <p>
                      For furniture pieces, use a quality wood polish sparingly.
                      Detailed care instructions are included with your
                      purchase.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 md:mt-28">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-accent mb-1 font-sans font-medium">
                  More to Love
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  You May Also Like
                </h2>
              </div>
              <Link
                href="/#shop"
                className="hidden md:inline-flex text-sm uppercase tracking-wider text-accent hover:text-foreground transition-colors font-medium"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/product/${rp.id}`}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={rp.image}
                      alt={rp.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="inline-block px-2 py-0.5 bg-background/90 text-foreground text-[9px] uppercase tracking-wider rounded-full">
                        {rp.era}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
                      {rp.category}
                    </p>
                    <h3 className="font-serif text-sm md:text-base font-semibold text-foreground leading-snug">
                      {rp.name}
                    </h3>
                    <p className="font-serif text-base md:text-lg font-bold text-foreground mt-1">
                      ${rp.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <SiteHeader />
      <main className="flex-1">
        <ProductDetail />
      </main>
      <SiteFooter />
    </div>
  );
}
