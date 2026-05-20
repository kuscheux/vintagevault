"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart-context";

const storeEmail = "vintagevaultantiquemarketplace@yahoo.com";
const storePhone = "(678) 675-3890";

type CompletedOrder = {
  number: string;
  summary: string;
  subtotal: number;
  deliveryFee: number;
  estimatedTotal: number;
};

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [fulfillment, setFulfillment] = useState("pickup");
  const [payment, setPayment] = useState("invoice");
  const [submitted, setSubmitted] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(
    null
  );
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "GA",
    zip: "",
    notes: "",
  });

  const deliveryFee = fulfillment === "delivery" && totalPrice < 500 ? 65 : 0;
  const estimatedTotal = totalPrice + deliveryFee;

  const orderSummary = useMemo(() => {
    return items
      .map(
        (item) =>
          `${item.quantity} x ${item.product.name} - $${(
            item.product.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");
  }, [items]);

  const mailtoHref = useMemo(() => {
    const currentOrderSummary = completedOrder?.summary ?? orderSummary;
    const currentSubtotal = completedOrder?.subtotal ?? totalPrice;
    const currentDeliveryFee = completedOrder?.deliveryFee ?? deliveryFee;
    const currentEstimatedTotal =
      completedOrder?.estimatedTotal ?? estimatedTotal;
    const currentOrderNumber = completedOrder?.number ?? "";
    const subject = encodeURIComponent(
      `Vintage Vault order ${currentOrderNumber}`
    );
    const body = encodeURIComponent(
      [
        `Order: ${currentOrderNumber}`,
        `Name: ${form.firstName} ${form.lastName}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Fulfillment: ${fulfillment}`,
        `Payment preference: ${payment}`,
        "",
        "Items:",
        currentOrderSummary,
        "",
        `Subtotal: $${currentSubtotal.toLocaleString()}`,
        `Estimated fulfillment: $${currentDeliveryFee.toLocaleString()}`,
        `Estimated total: $${currentEstimatedTotal.toLocaleString()}`,
        "",
        `Address: ${form.address}, ${form.city}, ${form.state} ${form.zip}`,
        `Notes: ${form.notes}`,
      ].join("\n")
    );

    return `mailto:${storeEmail}?subject=${subject}&body=${body}`;
  }, [
    completedOrder,
    deliveryFee,
    estimatedTotal,
    form,
    fulfillment,
    orderSummary,
    payment,
    totalPrice,
  ]);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCompletedOrder({
      number: `VV-${Date.now().toString().slice(-6)}`,
      summary: orderSummary,
      subtotal: totalPrice,
      deliveryFee,
      estimatedTotal,
    });
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <AnnouncementBar />
        <SiteHeader />
        <main className="flex-1 px-4 py-12">
          <section className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-6 text-center md:p-10">
            <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
            <h1 className="mt-5 font-serif text-3xl font-bold">
              Order Request Received
            </h1>
            <p className="mt-3 text-muted-foreground">
              Your request number is {completedOrder?.number}. Vintage Vault will confirm
              item availability, pickup or delivery details, and payment before
              anything is charged.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild className="bg-accent text-accent-foreground hover:opacity-90">
                <a href={mailtoHref}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Order Copy
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/#shop">Continue Shopping</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Prefer to finish by phone? Call {storePhone}.
            </p>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <SiteHeader />
      <main className="flex-1 bg-secondary/30 px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/#shop"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </Link>

          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
              Checkout
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold md:text-5xl">
              Reserve Your Finds
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Submit your order request and Vintage Vault will confirm that each
              one-of-a-kind item is still available before collecting payment.
            </p>
          </div>

          {items.length === 0 ? (
            <section className="rounded-lg border border-border bg-card p-8 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground/60" />
              <h2 className="mt-4 font-serif text-2xl font-semibold">
                Your cart is empty
              </h2>
              <p className="mt-2 text-muted-foreground">
                Add an item before starting checkout.
              </p>
              <Button asChild className="mt-6 bg-accent text-accent-foreground hover:opacity-90">
                <Link href="/#shop">Shop Collection</Link>
              </Button>
            </section>
          ) : (
            <form
              onSubmit={placeOrder}
              className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]"
            >
              <section className="space-y-6">
                <Panel title="Contact Information" icon={<Mail className="h-5 w-5" />}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="First name">
                      <Input required value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} />
                    </Field>
                    <Field label="Last name">
                      <Input required value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} />
                    </Field>
                    <Field label="Email">
                      <Input required inputMode="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
                    </Field>
                    <Field label="Phone">
                      <Input required inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
                    </Field>
                  </div>
                </Panel>

                <Panel title="Fulfillment" icon={<Truck className="h-5 w-5" />}>
                  <RadioGroup value={fulfillment} onValueChange={setFulfillment}>
                    <RadioCard
                      value="pickup"
                      title="Store pickup"
                      description="Pick up at 680 N Hwy 29, Newnan, GA after confirmation."
                    />
                    <RadioCard
                      value="delivery"
                      title="Local delivery"
                      description="Vintage Vault will confirm delivery timing and fees before payment."
                    />
                    <RadioCard
                      value="shipping"
                      title="Shipping quote"
                      description="Best for smaller items. Furniture may need custom handling."
                    />
                  </RadioGroup>

                  {fulfillment !== "pickup" && (
                    <div className="mt-5 grid gap-4 sm:grid-cols-6">
                      <Field label="Street address" className="sm:col-span-6">
                        <Input required value={form.address} onChange={(event) => updateField("address", event.target.value)} />
                      </Field>
                      <Field label="City" className="sm:col-span-2">
                        <Input required value={form.city} onChange={(event) => updateField("city", event.target.value)} />
                      </Field>
                      <Field label="State" className="sm:col-span-2">
                        <Input required value={form.state} onChange={(event) => updateField("state", event.target.value)} />
                      </Field>
                      <Field label="ZIP" className="sm:col-span-2">
                        <Input required value={form.zip} onChange={(event) => updateField("zip", event.target.value)} />
                      </Field>
                    </div>
                  )}
                </Panel>

                <Panel title="Payment Preference" icon={<CreditCard className="h-5 w-5" />}>
                  <RadioGroup value={payment} onValueChange={setPayment}>
                    <RadioCard
                      value="invoice"
                      title="Send invoice"
                      description="Receive a secure payment link after item availability is confirmed."
                    />
                    <RadioCard
                      value="phone"
                      title="Pay by phone"
                      description={`Vintage Vault will call you at ${storePhone} to complete payment.`}
                    />
                    <RadioCard
                      value="pickup"
                      title="Pay at pickup"
                      description="Pay in store when you collect your reserved items."
                    />
                  </RadioGroup>
                </Panel>

                <Panel title="Order Notes" icon={<PackageCheck className="h-5 w-5" />}>
                  <Textarea
                    className="min-h-28"
                    placeholder="Delivery details, item questions, preferred pickup time..."
                    value={form.notes}
                    onChange={(event) => updateField("notes", event.target.value)}
                  />
                </Panel>
              </section>

              <aside className="h-fit rounded-lg border border-border bg-card p-5 lg:sticky lg:top-24">
                <h2 className="font-serif text-2xl font-semibold">
                  Order Summary
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
                <div className="mt-5 space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-secondary">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium leading-snug">
                          {item.product.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Qty {item.quantity} · {item.product.category}
                        </p>
                      </div>
                      <p className="font-serif font-semibold">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <Separator className="my-5" />
                <div className="space-y-3 text-sm">
                  <SummaryLine label="Subtotal" value={`$${totalPrice.toLocaleString()}`} />
                  <SummaryLine
                    label="Estimated fulfillment"
                    value={deliveryFee ? `$${deliveryFee.toLocaleString()}` : "Confirmed after request"}
                  />
                  <div className="flex items-center justify-between pt-3 text-base font-semibold">
                    <span>Estimated total</span>
                    <span className="font-serif text-2xl">
                      ${estimatedTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="mt-6 w-full min-h-[48px] bg-accent text-accent-foreground hover:opacity-90 uppercase tracking-[0.15em]"
                >
                  Place Order Request
                </Button>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  No payment is collected on this site. Items are reserved after
                  Vintage Vault confirms availability.
                </p>
              </aside>
            </form>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-accent">
          {icon}
        </div>
        <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <Label className="mb-2">{label}</Label>
      {children}
    </div>
  );
}

function RadioCard({
  value,
  title,
  description,
}: {
  value: string;
  title: string;
  description: string;
}) {
  return (
    <Label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 hover:bg-secondary/60">
      <RadioGroupItem value={value} className="mt-0.5" />
      <span>
        <span className="block font-medium text-foreground">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
          {description}
        </span>
      </span>
    </Label>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
