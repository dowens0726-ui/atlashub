type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "rounded-lg px-4 py-2 text-sm font-medium transition-colors";

  const variants = {
    primary:
      "bg-emerald-500 text-zinc-950 hover:bg-emerald-400",
    secondary:
      "border border-zinc-700 bg-transparent text-white hover:border-emerald-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}