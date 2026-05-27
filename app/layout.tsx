import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/app/providers";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f0ebe2",
};

export const metadata: Metadata = {
  title: "Vintage Vault | Antiques, Vintage Clothing & Housewares | Newnan, GA",
  description:
    "Visit Vintage Vault Antique Marketplace for antiques, vintage furniture, clothing, and housewares at 680 N Hwy 29, Newnan, GA. Call 678-675-3890.",
  keywords: [
    "vintage",
    "antiques",
    "Newnan GA",
    "vintage furniture",
    "vintage clothing",
    "housewares",
    "antique shop",
    "Newnan antiques",
    "680 US 29 N",
  ],
  openGraph: {
    title: "Vintage Vault | Antiques, Vintage Clothing & Housewares",
    description:
      "Antiques, vintage furniture, clothing, and housewares at 680 N Hwy 29, Newnan, GA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
