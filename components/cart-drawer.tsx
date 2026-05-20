"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, X, ShoppingBag, Truck } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const freeShippingThreshold = 500;
  const remainingForFreeShipping = freeShippingThreshold - totalPrice;

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="px-5 pt-5 pb-0">
          <SheetTitle className="font-serif text-xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({totalItems})
          </SheetTitle>
          <SheetDescription className="sr-only">
            Shopping cart with {totalItems} items
          </SheetDescription>
        </SheetHeader>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="px-5 py-3">
            {remainingForFreeShipping > 0 ? (
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Truck className="h-3.5 w-3.5" />
                  <span>
                    Add <strong className="text-foreground">${remainingForFreeShipping.toLocaleString()}</strong> more
                    for free shipping
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div
                    className="bg-accent rounded-full h-1.5 transition-all duration-500"
                    style={{
                      width: `${Math.min((totalPrice / freeShippingThreshold) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-accent font-medium">
                <Truck className="h-3.5 w-3.5" />
                <span>You qualify for free shipping!</span>
              </div>
            )}
          </div>
        )}

        <Separator />

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <ShoppingBag className="h-7 w-7 text-muted-foreground/50" />
              </div>
              <p className="font-serif text-lg text-foreground mb-1">
                Your cart is empty
              </p>
              <p className="text-sm text-muted-foreground mb-6 max-w-[240px]">
                Browse our collection and add your favorite vintage finds.
              </p>
              <Button
                variant="outline"
                className="text-sm"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 group"
                >
                  <Link
                    href={`/product/${item.product.id}`}
                    className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-secondary"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.product.id}`}
                          className="font-serif text-sm font-semibold text-foreground truncate block hover:text-accent transition-colors"
                          onClick={() => setIsCartOpen(false)}
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.product.era} &middot; {item.product.condition}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-serif text-sm font-bold text-foreground">
                        $
                        {(
                          item.product.price * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <SheetFooter className="border-t border-border px-5 py-5">
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-serif text-xl font-bold text-foreground">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <Button
                asChild
                className="w-full min-h-[48px] bg-accent text-accent-foreground hover:opacity-90 font-medium text-sm uppercase tracking-[0.15em]"
              >
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                >
                  Proceed to Checkout
                </Link>
              </Button>
              <button
                className="text-xs text-center text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
