import Image from "next/image";

type HeroImageProps = {
  src?: string;
  alt: string;
  fallback?: string;
  priority?: boolean;
};

export default function HeroImage({
  src,
  alt,
  fallback = "/placeholders/vehicle.webp",
  priority = false,
}: HeroImageProps) {
  const imageSrc = src || fallback;

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(min-width: 1280px) 1200px, 100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
    </div>
  );
}