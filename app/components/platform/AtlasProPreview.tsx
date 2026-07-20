import type { ReactNode } from "react";

import {
  AtlasButton,
  AtlasSurface,
} from "@/app/components/design-system";

import { getAtlasCapabilityDefinition } from "@/app/services";

import type {
  AtlasCapabilityEvaluation,
  AtlasPlan,
} from "@/app/types";

export type AtlasProPreviewProps = {
  evaluation: AtlasCapabilityEvaluation;
  title?: string;
  description?: string;
  eyebrow?: string;
  upgradeHref?: string;
  actionLabel?: string;
  icon?: ReactNode;
  className?: string;
};

function formatPlanName(plan: AtlasPlan): string {
  switch (plan) {
    case "free":
      return "Atlas Free";

    case "pro":
      return "Atlas Pro";

    case "internal":
      return "Atlas Internal";
  }
}

export default function AtlasProPreview({
  evaluation,
  title,
  description,
  eyebrow = "Premium capability",
  upgradeHref,
  actionLabel = "Explore Atlas Pro",
  icon,
  className = "",
}: AtlasProPreviewProps) {
  const definition = getAtlasCapabilityDefinition(
    evaluation.capability
  );

  const resolvedTitle = title ?? definition.name;
  const resolvedDescription =
    description ?? definition.description;

  return (
    <AtlasSurface
      tone="elevated"
      glow
      className={[
        "p-6 sm:p-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              {eyebrow}
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
              {resolvedTitle}
            </h2>
          </div>

          {icon && (
            <div
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
            >
              {icon}
            </div>
          )}
        </div>

        <p className="max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
          {resolvedDescription}
        </p>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Required plan
            </p>

            <p className="mt-1 font-semibold text-white">
              {formatPlanName(evaluation.requiredPlan)}
            </p>
          </div>

          {upgradeHref && (
            <AtlasButton href={upgradeHref}>
              {actionLabel}
            </AtlasButton>
          )}
        </div>
      </div>
    </AtlasSurface>
  );
}