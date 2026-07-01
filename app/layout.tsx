import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FeedbackButton from "./components/feedback/FeedbackButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Atlas | GTA VI Companion",
    template: "%s | Atlas",
  },

  description:
    "Spend Less Time Searching. More Time Playing. Atlas is the modern companion platform for GTA VI featuring vehicles, weapons, comparisons, guides, and more.",

  keywords: [
    "GTA VI",
    "Grand Theft Auto 6",
    "GTA 6",
    "Atlas",
    "AtlasHub",
    "GTA VI Vehicles",
    "GTA VI Weapons",
    "GTA VI Compare",
    "GTA VI Companion",
    "GTA VI Guide",
  ],

  authors: [
    {
      name: "Daniel Owens",
    },
  ],

  creator: "Daniel Owens",

  metadataBase: new URL("http://localhost:3000"),

  openGraph: {
    title: "Atlas | GTA VI Companion",
    description:
      "Spend Less Time Searching. More Time Playing.",
    siteName: "Atlas",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Atlas | GTA VI Companion",
    description:
      "Spend Less Time Searching. More Time Playing.",
  },
};

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

<FeedbackButton />
</body>
    </html>
  );
}
