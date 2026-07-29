"use client";

import type {
  ReactNode,
} from "react";

import {
  usePathname,
} from "next/navigation";

import Footer from "./Footer";
import Navbar from "./Navbar";


type RootChromeProps = {
  children:
    ReactNode;
};


const atlasOSRoutes:
  string[] = [
    "/advisor",
    "/copilot",
    "/dashboard",
    "/explorer",
    "/garage-builder",
    "/map",
    "/onboarding",
    "/planner",
    "/profile",
    "/properties",
    "/rankings",
    "/data/businesses",
  ];


function isAtlasOSRoute(
  pathname:
    string
): boolean {
  return atlasOSRoutes.some(
    (
      route
    ) =>
      pathname === route ||
      pathname.startsWith(
        `${route}/`
      )
  );
}


export default function RootChrome({
  children,
}: RootChromeProps) {
  const pathname =
    usePathname();

  const atlasOSRoute =
    isAtlasOSRoute(
      pathname
    );

  if (
    atlasOSRoute
  ) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}