import type {
  Metadata,
} from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import {
  CommandProvider,
} from "./components/command";

import FeedbackButton from "./components/feedback/FeedbackButton";
import RootChrome from "./components/layout/RootChrome";

import "./globals.css";


const geistSans =
  Geist({
    variable:
      "--font-geist-sans",

    subsets: [
      "latin",
    ],
  });


const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",

    subsets: [
      "latin",
    ],
  });


export const metadata:
  Metadata = {
    title: {
      default:
        "Atlas | GTA VI Companion",

      template:
        "%s | Atlas",
    },

    description:
      "Spend Less Time Searching. More Time Playing. Atlas is the modern companion platform for GTA VI featuring vehicles, weapons, comparisons, guides, and more.",
  };


export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={[
        geistSans.variable,
        geistMono.variable,
        "h-full antialiased",
      ].join(" ")}
    >
      <body className="min-h-screen bg-zinc-950 text-white">
        <CommandProvider>
          <RootChrome>
            {children}
          </RootChrome>

          <FeedbackButton />
        </CommandProvider>
      </body>
    </html>
  );
}