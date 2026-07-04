import Link from "next/link";

const legalLinks = [
  { href: "/about", label: "About" },
  { href: "/data-policy", label: "Data Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div>
            <h2 className="text-xl font-black text-white">ATLAS</h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
              Spend Less Time Searching. More Time Playing.
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              The premium companion platform for GTA VI.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Resources
            </h3>

            <div className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-400 transition hover:text-emerald-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-zinc-800 pt-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Atlas. Built by{" "}
            <span className="font-semibold text-zinc-300">
              Daniel Owens
            </span>
            .
          </p>

          <p>Version 0.50 • Discovery Update</p>
        </div>
      </div>
    </footer>
  );
}