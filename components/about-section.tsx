import Image from "next/image";
import { MapPin, Clock, Phone, Mail, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const testimonials = [
  {
    quote:
      "Wonderful little hidden antique shop with great prices, a wide selection of furniture, clothing and decor/knick-knacks. Highly highly recommend giving this shop a visit! Staff is really friendly and helpful as well.",
    author: "Lorelei",
    since: "Local Guide · 179 reviews · 9 months ago",
    rating: 5,
  },
  {
    quote:
      "Nice store, owners are wonderful, pleasant and very helpful. Found some beautiful frames and jewelry, and they even are searching for something specific for me with their connections. Prices were very reasonable.",
    author: "brian leslie",
    since: "Local Guide · 184 reviews · 6 months ago",
    rating: 5,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/images/about-store.jpg"
                alt="Inside Vintage Vault antique store"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-2 md:-right-6 bg-card border border-border rounded-xl p-5 shadow-lg max-w-[220px]">
              <p className="font-serif text-3xl font-bold text-foreground">10+</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Years serving the Newnan community
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-accent mb-2 font-sans font-medium">
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-[1.1]">
              A Passion for the Past
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Nestled in the historic downtown of Newnan, Georgia, Vintage
                Vault is more than an antique store &mdash; it&apos;s a destination for
                treasure hunters, history lovers, and anyone who appreciates the
                beauty of things built to last.
              </p>
              <p>
                We travel across the Southeast sourcing unique vintage pieces,
                from mid-century modern furniture to Victorian-era curiosities.
                Every item is carefully inspected, restored when needed, and
                presented with the story of its origins.
              </p>
              <p>
                Whether you&apos;re furnishing a new home, searching for the
                perfect gift, or simply love to browse, we invite you to step
                inside and discover something extraordinary.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "500+", label: "Items Curated" },
                { value: "200+", label: "Happy Homes" },
                { value: "12", label: "States Sourced" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 md:mt-28">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-accent mb-2 font-sans font-medium">
              What People Say
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
              Loved by Collectors
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                <blockquote className="text-foreground leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-semibold text-foreground text-sm">
                    {t.author}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.since}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-4 bg-primary text-primary-foreground"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Info */}
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-primary-foreground/60 mb-2 font-sans">
              Come See Us
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-balance leading-[1.1]">
              Visit the Vault
            </h2>
            <p className="mt-4 text-primary-foreground/75 leading-relaxed max-w-md">
              Curating Charm, One Booth at a Time! Stop by for a warm welcome
              and a treasure hunt you won&apos;t forget.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Location</h3>
                  <p className="text-primary-foreground/75 text-sm leading-relaxed mt-0.5">
                    680 N Hwy 29, Newnan, GA 30263<br />
                    Across the street from the VFW
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Store Hours</h3>
                  <div className="text-primary-foreground/75 text-sm leading-relaxed mt-0.5 space-y-0.5">
                    <p>Tuesday - Saturday: 10am - 6pm</p>
                    <p>Sunday: 12pm - 5pm</p>
                    <p>Monday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Phone</h3>
                  <a href="tel:+16786753890" className="text-primary-foreground/75 text-sm mt-0.5 hover:text-primary-foreground transition-colors">
                    (678) 675-3890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Email</h3>
                  <a href="mailto:vintagevaultantiquemarketplace@yahoo.com" className="text-primary-foreground/75 text-sm mt-0.5 hover:text-primary-foreground transition-colors break-all">
                    vintagevaultantiquemarketplace@yahoo.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Map / CTA Card */}
          <div className="bg-primary-foreground/10 border border-primary-foreground/15 rounded-xl p-6 md:p-8">
            <h3 className="font-serif text-2xl font-bold mb-3">
              Plan Your Visit
            </h3>
            <p className="text-primary-foreground/75 text-sm leading-relaxed mb-6">
              Located in the charming downtown square of Newnan, Georgia &mdash;
              just 35 minutes south of Atlanta. Free parking available on
              surrounding streets.
            </p>
            <div className="aspect-video bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.5!2d-84.7997!3d33.3801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIyJzQ4LjQiTiA4NMKwNDcnNTkuMCJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "sepia(0.25) saturate(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vintage Vault location in Newnan, Georgia"
                className="rounded-lg"
              />
            </div>
            <a
              href="https://maps.google.com/?q=680+N+Hwy+29+Newnan+GA+30263"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-6 py-3 min-h-[48px] bg-primary-foreground text-primary text-sm uppercase tracking-wider font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
