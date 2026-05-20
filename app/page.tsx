"use client";

import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { CategoriesSection } from "@/components/categories-section";
import { ProductsSection } from "@/components/products-section";
import { AboutSection, ContactSection } from "@/components/about-section";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <HeroSection />
        <CategoriesSection />
        <ProductsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
