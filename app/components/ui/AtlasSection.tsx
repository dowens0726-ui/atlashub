import type { ReactNode } from "react";

type AtlasSectionProps = {
  children: ReactNode;
  className?: string;
};

export default function AtlasSection({
  children,
  className = "",
}: AtlasSectionProps) {
  return (
    <section className={`py-8 sm:py-10 ${className}`}>
      {children}
    </section>
  );
}