"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";


type AtlasNavigationIcon =
  | "dashboard"
  | "copilot"
  | "profile"
  | "planner"
  | "businesses"
  | "vehicles"
  | "properties"
  | "weapons"
  | "explorer"
  | "rankings";


type AtlasNavigationItem = {
  label:
    string;

  href:
    string;

  icon:
    AtlasNavigationIcon;

  description:
    string;

  signal?:
    string;
};


type AtlasNavigationSection = {
  label:
    string;

  code:
    string;

  items:
    AtlasNavigationItem[];
};


type AtlasNavigationProps = {
  onNavigate?:
    () => void;
};


const navigationSections:
  AtlasNavigationSection[] = [
    {
      label:
        "Command",

      code:
        "CMD",

      items: [
        {
          label:
            "Dashboard",

          href:
            "/dashboard",

          icon:
            "dashboard",

          description:
            "Empire command center",

          signal:
            "Live",
        },

        {
          label:
            "Copilot",

          href:
            "/copilot",

          icon:
            "copilot",

          description:
            "Atlas AI guidance",

          signal:
            "AI",
        },

        {
          label:
            "Profile",

          href:
            "/profile",

          icon:
            "profile",

          description:
            "Player identity",
        },

        {
          label:
            "Planner",

          href:
            "/planner",

          icon:
            "planner",

          description:
            "Objectives and strategy",
        },
      ],
    },

    {
      label:
        "Empire",

      code:
        "EMP",

      items: [
        {
          label:
            "Businesses",

          href:
            "/data/businesses",

          icon:
            "businesses",

          description:
            "Business operations",
        },

        {
          label:
            "Vehicles",

          href:
            "/vehicles",

          icon:
            "vehicles",

          description:
            "Vehicle intelligence",
        },

        {
          label:
            "Properties",

          href:
            "/properties",

          icon:
            "properties",

          description:
            "Property portfolio",
        },

        {
          label:
            "Weapons",

          href:
            "/weapons",

          icon:
            "weapons",

          description:
            "Loadout intelligence",
        },
      ],
    },

    {
      label:
        "Intelligence",

      code:
        "INT",

      items: [
        {
          label:
            "Explorer",

          href:
            "/explorer",

          icon:
            "explorer",

          description:
            "World discovery",
        },

        {
          label:
            "Rankings",

          href:
            "/rankings",

          icon:
            "rankings",

          description:
            "Performance rankings",
        },
      ],
    },
  ];


function isNavigationItemActive(
  pathname:
    string,

  href:
    string
): boolean {
  if (
    href ===
    "/dashboard"
  ) {
    return pathname ===
      "/dashboard";
  }

  return (
    pathname === href ||
    pathname.startsWith(
      `${href}/`
    )
  );
}


export default function AtlasNavigation({
  onNavigate,
}: AtlasNavigationProps) {
  const pathname =
    usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="space-y-7"
    >
      {navigationSections.map(
        (
          section
        ) => (
          <section
            key={
              section.label
            }
          >
            <div className="mb-3 flex items-center gap-3 px-3">
              <span className="text-[0.5rem] font-black uppercase tracking-[0.2em] text-cyan-100/34">
                {section.code}
              </span>

              <span className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />

              <p className="text-[0.52rem] font-black uppercase tracking-[0.24em] text-white/26">
                {section.label}
              </p>
            </div>

            <div className="space-y-1.5">
              {section.items.map(
                (
                  item
                ) => {
                  const active =
                    isNavigationItemActive(
                      pathname,
                      item.href
                    );

                  return (
                    <Link
                      key={
                        item.href
                      }
                      href={
                        item.href
                      }
                      aria-current={
                        active
                          ? "page"
                          : undefined
                      }
                      title={
                        item.description
                      }
                      onClick={
                        onNavigate
                      }
                      className={[
                        "group relative flex min-h-[3.55rem] items-center gap-3 overflow-hidden rounded-2xl border px-3",
                        "transition-all duration-200 ease-out",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
                        active
                          ? "border-cyan-300/22 bg-[linear-gradient(90deg,rgba(34,211,238,0.13),rgba(34,211,238,0.045))] text-white shadow-[0_18px_38px_-24px_rgba(34,211,238,0.9)]"
                          : "border-transparent text-white/42 hover:border-white/[0.07] hover:bg-white/[0.035] hover:text-white",
                      ].join(
                        " "
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={[
                          "relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border",
                          "transition-all duration-200",
                          active
                            ? "border-cyan-300/25 bg-cyan-300/[0.1] text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.15)]"
                            : "border-white/[0.06] bg-white/[0.025] text-white/34 group-hover:border-white/[0.1] group-hover:text-white/68",
                        ].join(
                          " "
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,232,249,0.12),transparent_70%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        />

                        <AtlasNavigationGlyph
                          icon={
                            item.icon
                          }
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-[0.72rem] font-bold tracking-[-0.01em]">
                            {item.label}
                          </span>

                          {item.signal ? (
                            <span className={[
                              "rounded-full border px-1.5 py-0.5",
                              "text-[0.42rem] font-black uppercase tracking-[0.12em]",
                              active
                                ? "border-cyan-300/18 bg-cyan-300/[0.07] text-cyan-100/62"
                                : "border-white/[0.06] bg-white/[0.02] text-white/22",
                            ].join(
                              " "
                            )}>
                              {item.signal}
                            </span>
                          ) : null}
                        </span>

                        <span
                          className={[
                            "mt-0.5 block truncate text-[0.55rem]",
                            active
                              ? "text-cyan-100/48"
                              : "text-white/22 group-hover:text-white/34",
                          ].join(
                            " "
                          )}
                        >
                          {item.description}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className={[
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border",
                          "text-[0.65rem] transition-all duration-200",
                          active
                            ? "translate-x-0 border-cyan-300/12 bg-cyan-300/[0.05] text-cyan-200/72 opacity-100"
                            : "-translate-x-1 border-transparent text-white/20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                        ].join(
                          " "
                        )}
                      >
                        →
                      </span>

                      {active ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="absolute inset-y-2 left-0 w-[2px] rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.95)]"
                          />

                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/22 to-transparent"
                          />
                        </>
                      ) : null}
                    </Link>
                  );
                }
              )}
            </div>
          </section>
        )
      )}
    </nav>
  );
}


type AtlasNavigationGlyphProps = {
  icon:
    AtlasNavigationIcon;
};


function AtlasNavigationGlyph({
  icon,
}: AtlasNavigationGlyphProps) {
  const commonClasses =
    "relative h-4 w-4";

  switch (
    icon
  ) {
    case "dashboard":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={
            commonClasses
          }
        >
          <path
            d="M4 13.5 12 6l8 7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M7 12.5V19h10v-6.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M10 19v-4h4v4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "copilot":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={
            commonClasses
          }
        >
          <path
            d="m12 3 1.2 5.8L19 10l-5.8 1.2L12 17l-1.2-5.8L5 10l5.8-1.2L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          <path
            d="m18 15 .5 2.5L21 18l-2.5.5L18 21l-.5-2.5L15 18l2.5-.5L18 15Z"
            fill="currentColor"
          />
        </svg>
      );

    case "profile":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={
            commonClasses
          }
        >
          <circle
            cx="12"
            cy="8"
            r="3.2"
            stroke="currentColor"
            strokeWidth="1.6"
          />

          <path
            d="M5.5 19c.8-3.3 3-5 6.5-5s5.7 1.7 6.5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case "planner":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={
            commonClasses
          }
        >
          <rect
            x="5"
            y="5.5"
            width="14"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />

          <path
            d="M8 3.5v4M16 3.5v4M8.5 11h7M8.5 15h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case "businesses":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={
            commonClasses
          }
        >
          <path
            d="M4 20V9l8-4 8 4v11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />

          <path
            d="M8 20v-6h8v6M8 10h.01M12 10h.01M16 10h.01"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "vehicles":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={
            commonClasses
          }
        >
          <path
            d="m5 15 1.4-5h11.2l1.4 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <rect
            x="4"
            y="13"
            width="16"
            height="5"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />

          <path
            d="M7 18v2M17 18v2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case "properties":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={
            commonClasses
          }
        >
          <path
            d="m4 11 8-7 8 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M6.5 10v10h11V10M10 20v-6h4v6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "weapons":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={
            commonClasses
          }
        >
          <path
            d="M5 12h14M12 5v14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          <circle
            cx="12"
            cy="12"
            r="5"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          <circle
            cx="12"
            cy="12"
            r="1.5"
            fill="currentColor"
          />
        </svg>
      );

    case "explorer":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={
            commonClasses
          }
        >
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="currentColor"
            strokeWidth="1.6"
          />

          <path
            d="m15.5 8.5-2 5-5 2 2-5 5-2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "rankings":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={
            commonClasses
          }
        >
          <path
            d="M6 19v-5h3v5M10.5 19V9h3v10M15 19V5h3v14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />

          <path
            d="M4 19.5h16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}