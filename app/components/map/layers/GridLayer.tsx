export default function GridLayer() {
  return (
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
      }}
    />
  );
}