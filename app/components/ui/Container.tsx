import type { ReactNode } from "react";

type ContainerSize = "default" | "wide" | "full";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
};

const sizes = {
  default: "max-w-6xl",
  wide: "max-w-[1600px]",
  full: "max-w-none",
};

export default function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 ${sizes[size]} ${className}`}
    >
      {children}
    </div>
  );
}