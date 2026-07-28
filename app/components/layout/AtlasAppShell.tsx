import type {
  ReactNode,
} from "react";

import {
  AtlasShellWorld,
} from "@/app/components/world";

import AtlasSidebar from "./AtlasSidebar";
import AtlasTopBar from "./AtlasTopBar";


export type AtlasAppShellVariant =
  | "standard"
  | "executive";


type AtlasAppShellProps = {
  children:
    ReactNode;

  world?:
    | "legacy"
    | "none";

  variant?:
    AtlasAppShellVariant;
};


const contentVariantClasses:
  Record<
    AtlasAppShellVariant,
    string
  > = {
    standard:
      "mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8",

    executive:
      "max-w-none px-3 py-4 sm:px-4 sm:py-5 lg:px-5 lg:py-6 xl:px-6 2xl:px-8",
  };


export default function AtlasAppShell({
  children,
  world = "legacy",
  variant = "standard",
}: AtlasAppShellProps) {
  return (
    <div className="atlas-app-shell relative isolate flex min-h-screen overflow-x-hidden text-white">
      {world === "legacy" ? (
        <AtlasShellWorld />
      ) : null}

      <div className="relative z-20 sticky top-0 hidden h-screen shrink-0 lg:block">
        <AtlasSidebar />
      </div>

      <div className="relative z-10 flex min-h-screen min-w-0 flex-1 flex-col">
        <AtlasTopBar />

        <main className="atlas-app-shell__main relative flex-1 overflow-hidden">
          <div
            aria-hidden="true"
            className="atlas-app-shell__main-glow pointer-events-none absolute inset-0"
          />

          <div
            data-atlas-shell-variant={
              variant
            }
            className={[
              "relative w-full",
              contentVariantClasses[
                variant
              ],
            ].join(" ")}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
