import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { NoiseTexture } from "@/components/effects/NoiseTexture";
import { CursorSpotlight } from "@/components/effects/CursorSpotlight";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Friends Universe — Seven Friends. Seven Birthdays. Infinite Memories.",
  description:
    "A premium, glossy, interactive birthday countdown and celebration experience for Habib, Nafi, Shaira, Neha, Mahi, Mim, and Shiam.",
  keywords: [
    "Friends Universe",
    "Birthday Countdown",
    "Habib",
    "Nafi",
    "Shaira",
    "Neha",
    "Mahi",
    "Mim",
    "Shiam",
    "Bangladesh Timezone",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans relative min-h-screen text-slate-100 bg-[#080D1A]`}>
        {/* Layered Animated Background Effects */}
        <AuroraBackground />
        <ParticleBackground />
        <NoiseTexture />
        <CursorSpotlight />

        {/* Global Floating Glass Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="relative z-10 min-h-[calc(100vh-200px)]">
          {children}
        </main>

        {/* Global Glossy Footer */}
        <Footer />
      </body>
    </html>
  );
}
