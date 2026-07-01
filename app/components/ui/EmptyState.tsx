import Button from "./Button";

type EmptyStateProps = {
  icon: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export default function EmptyState({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
      <div className="text-5xl">{icon}</div>

      <h2 className="mt-5 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-zinc-400">
        {description}
      </p>

      {buttonText && onButtonClick && (
        <div className="mt-8">
          <Button onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
}