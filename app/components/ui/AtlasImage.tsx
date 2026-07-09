"use client";

import Image from "next/image";
import { useState } from "react";

type AtlasImageProps = {
  src?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

export default function AtlasImage({
  src,
  alt,
  className,
  fill = false,
  width = 800,
  height = 450,
}: AtlasImageProps) {
  const [imageSrc, setImageSrc] = useState(
    src || "/placeholders/vehicle.webp"
  );

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      onError={() =>
        setImageSrc("/placeholders/vehicle.webp")
      }
    />
  );
}