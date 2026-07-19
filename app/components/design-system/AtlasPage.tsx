import type { ReactNode } from "react";

type AtlasPageProps = {
  children: ReactNode;
  className?: string;
};

export default function AtlasPage({
  children,
  className = "",
}: AtlasPageProps) {
  return (
    <main
      className={[
        "min-h-screen",
        "bg-gradient-to-br",
        "from-zinc-950",
        "via-zinc-900",
        "to-black",
        "text-white",
        "px-6",
        "py-8",
        "lg:px-10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        {children}
      </div>
    </main>
  );
}
