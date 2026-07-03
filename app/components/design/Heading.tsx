import type { ElementType, ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
};

const styles = {
  1: "text-4xl font-black text-white md:text-6xl",
  2: "text-3xl font-black text-white md:text-4xl",
  3: "text-2xl font-bold text-white",
  4: "text-xl font-bold text-white",
};

export default function Heading({
  children,
  level = 2,
  className = "",
}: HeadingProps) {
  const Component = (`h${level}` as ElementType);

  return (
    <Component className={`${styles[level]} ${className}`}>
      {children}
    </Component>
  );
}