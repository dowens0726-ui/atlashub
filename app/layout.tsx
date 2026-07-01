import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AtlasHub",
  description: "Spend less time searching. More time playing.",
};

<Footer />

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-zinc-950 text-white">
  <div className="flex min-h-screen flex-col">
    <Navbar />

    <main className="flex-1">
      {children}
    </main>

    <Footer />
  </div>
</body>
    </html>
  );
}
