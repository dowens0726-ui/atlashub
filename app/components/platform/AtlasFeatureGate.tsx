"use client";

import type { ReactNode } from "react";

import useAtlasCapability from "@/app/hooks/useAtlasCapability";

import AtlasProPreview from "./AtlasProPreview";

import type {
  AtlasCapability,
  AtlasCapabilityEvaluation,
} from "@/app/types";

export type AtlasFeatureGateProps = {
  capability: AtlasCapability;
  children: ReactNode;
  fallback?: ReactNode;
  preview?: ReactNode;
  upgradeHref?: string;
  previewTitle?: string;
  previewDescription?: string;
  previewEyebrow?: string;
  previewActionLabel?: string;
  previewClassName?: string;
};

function shouldRenderPreview(
  evaluation: AtlasCapabilityEvaluation
): boolean {
  return (
    evaluation.status === "preview" &&
    evaluation.previewAvailable
  );
}

export default function AtlasFeatureGate({
  capability,
  children,
  fallback = null,
  preview,
  upgradeHref,
  previewTitle,
  previewDescription,
  previewEyebrow,
  previewActionLabel,
  previewClassName,
}: AtlasFeatureGateProps) {
  const evaluation = useAtlasCapability(capability);

  if (evaluation.enabled) {
    return <>{children}</>;
  }

  if (!shouldRenderPreview(evaluation)) {
    return <>{fallback}</>;
  }

  if (preview !== undefined) {
    return <>{preview}</>;
  }

  return (
    <AtlasProPreview
      evaluation={evaluation}
      title={previewTitle}
      description={previewDescription}
      eyebrow={previewEyebrow}
      upgradeHref={upgradeHref}
      actionLabel={previewActionLabel}
      className={previewClassName}
    />
  );
}