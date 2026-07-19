import type { ReactNode } from "react";

type AtlasCommandCenterProps = {
  children: ReactNode;
  className?: string;
};

export default function AtlasCommandCenter({
  children,
  className = "",
}: AtlasCommandCenterProps) {
  return (
    <div
      className={[
        "relative space-y-10 lg:space-y-12",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 -z-10 h-80 w-80 rounded-full bg-cyan-400/[0.035] blur-3xl"
      />

      {children}
    </div>
  );
}