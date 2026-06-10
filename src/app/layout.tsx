import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.modernwebsystems.com"),
  title: "Modern Web Systems | Business Consulting, AI Websites & Automation",
  description:
    "We build AI-driven websites, automation systems, and workflows that help businesses outcompete, increase efficiency, lower costs, and dramatically grow revenue.",
  keywords: [
    "web development",
    "AI websites",
    "business automation",
    "SEO optimization",
    "workflow automation",
    "business consulting",
  ],
  openGraph: {
    title: "Modern Web Systems",
    description:
      "Business consulting, AI-powered websites, and automation systems that transform how you compete.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
